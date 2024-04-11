#include "./main.h"

#include <hmc_napi_value_util.h>
#include <hmc_util.h>

#include <node_api.h>
#include <string>
#include <any>
#include <thread>
#include <vector>
#include <atomic>
#include <shared_mutex>
#include <optional>
#include <functional>
#include <mutex>

class PromiseFunctionUtil
{
public:
    typedef std::function<std::any(std::vector<std::any> *arguments_list)> WorkFuncType;
    typedef std::function<napi_value(napi_env env, std::any *result_any_data)> FuncFormatResultValue;
    typedef std::function<void(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue args_value)> formatArgsCallBackType;
    typedef std::atomic<napi_async_work> workHandle;
    typedef std::atomic<napi_async_work> *pWorkHandle;
    typedef std::atomic<napi_deferred> deferredHandle;
    typedef std::atomic<napi_deferred> *pdeferredHandle;

    static void exports(napi_env env, napi_value exports, std::string name, napi_callback cb);
    static void exports(napi_env env, napi_value exports, std::string name, napi_callback cbAsync, napi_callback cbSync);
    static void completeWork(napi_env env, napi_status status, std::atomic<napi_async_work> *work, std::atomic<napi_deferred> *deferred, std::vector<std::any> *arguments_list, std::any *resultSend, FuncFormatResultValue FormatResultValue);

    // 由参数自定义格式化方法
    static napi_value startWork(napi_env env, napi_callback_info info, std::atomic<napi_async_work> *work, std::atomic<napi_deferred> *deferred, napi_async_execute_callback execute, napi_async_complete_callback complete, std::vector<std::any> *arguments_list, std::optional<formatArgsCallBackType> formatArgsCallBack);
    static napi_value startSync(napi_env env, napi_callback_info info, std::function<std::any(std::vector<std::any> *arguments_list)> PromiseWorkFunc, std::function<napi_value(napi_env env, std::any *result_any_data)> FormatResultValue, std::optional<formatArgsCallBackType> formatArgsCallBack);

private:
};

void PromiseFunctionUtil::exports(napi_env env, napi_value exports, std::string name, napi_callback cb)
{
    napi_value exported_function;

    napi_create_function(env,
                         name.c_str(),
                         name.length(),
                         cb,
                         NULL,
                         &exported_function);

    napi_set_named_property(env, exports, name.c_str(), exported_function);

    // 注册变量传递
    napi_wrap(env, exports, NULL, NULL, NULL, NULL);
}

void PromiseFunctionUtil::completeWork(napi_env env, napi_status status, std::atomic<napi_async_work> *work, std::atomic<napi_deferred> *deferred, std::vector<std::any> *arguments_list, std::any *resultSend, FuncFormatResultValue FormatResultValue)
{
    if (status != napi_ok)
        return;

    try
    {
        napi_resolve_deferred(env, deferred->load(), FormatResultValue(env, resultSend));
    }
    catch (...)
    {
        napi_value error = NULL;
        napi_create_string_utf8(env, "error -> FormatResultValue(env, *resultSend) an error has occurred", NAPI_AUTO_LENGTH, &error);

        napi_reject_deferred(env, deferred->load(), error);
    }

    // 清理与此运行关联的工作环境
    napi_delete_async_work(env, work->load());

    work->store(NULL);
    deferred->store(NULL);
    resultSend->reset();
    (*resultSend) = std::any();
    arguments_list->clear();
    arguments_list->resize(0);
}

void PromiseFunctionUtil::exports(napi_env env, napi_value exports, std::string name, napi_callback cbAsync, napi_callback cbSync)
{
    PromiseFunctionUtil::exports(env, exports, name, cbAsync);
    PromiseFunctionUtil::exports(env, exports, name + "Sync", cbSync);
}

napi_value PromiseFunctionUtil::startWork(napi_env env, napi_callback_info info, std::atomic<napi_async_work> *work, std::atomic<napi_deferred> *deferred, napi_async_execute_callback execute, napi_async_complete_callback complete, std::vector<std::any> *arguments_list, std::optional<formatArgsCallBackType> formatArgsCallBack)
{
    napi_value result, work_name, promise;

    if (napi_get_null(env, &result) != napi_ok)
    {
        result = NULL;
    }

    std::string work_message = std::string(__FUNCTION__).append("  work_message ->  ");

    // 上个函数还没结束
    if (work->load() != NULL)
    {
        // work_message.append("error < Promise workspace has not been released. > ");
        // napi_throw_error(env, "TASK_CONFLICT", work_message.c_str());
        return result;
    }

    // 创建一个字符串来描述这个异步操作。

    work_message.append("Node-API Deferred Promise from Async Work Item");

    napi_create_string_utf8(env, work_message.c_str(), work_message.length(), &work_name);

    napi_async_work addon_napi_async_work = NULL;
    napi_deferred addon_deferred = NULL;

    // 创建一个延迟的promise对象，在完成时我们将解决它
    if (napi_create_promise(env, &addon_deferred, &promise) != napi_ok)
    {
        work_message.append("error < Promise Creation failed. > ");
        napi_throw_error(env, "Creation_failed", work_message.c_str());
        return result;
    };
    if (formatArgsCallBack.has_value())
    {

        auto input = hmc_NodeArgsValue(env, info);
        formatArgsCallBack.value()(env, info, arguments_list, input);
    }
    else
    {

        auto input = hmc_NodeArgsValue(env, info).get_values();

        for (size_t i = 0; i < input.size(); i++)
        {
            arguments_list->push_back(input.at(i));
        }
    }

    // 创建一个异步工作项，传递插件数据，这将使
    // 工作线程访问上述创建的延迟的 promise对象
    if (napi_create_async_work(env,
                               NULL,
                               work_name,
                               execute,
                               complete, NULL, &addon_napi_async_work) != napi_ok)
    {
        work_message.append("error < Promise Creation work async failed. > ");
        napi_throw_error(env, "Creation_failed", work_message.c_str());
        return result;
    };

    // 添加进node的异步队列
    napi_queue_async_work(env, addon_napi_async_work);

    work->store(addon_napi_async_work);
    deferred->store(addon_deferred);
    return promise;
}

napi_value PromiseFunctionUtil::startSync(napi_env env, napi_callback_info info, std::function<std::any(std::vector<std::any> *arguments_list)> PromiseWorkFunc, std::function<napi_value(napi_env env, std::any *result_any_data)> FormatResultValue, std::optional<formatArgsCallBackType> formatArgsCallBack)
{
    napi_value result, work_name, promise;
    napi_get_null(env, &result);

    std::any resultSend = std::any();
    std::vector<std::any> arguments_list = {};

    try
    {
        if (formatArgsCallBack.has_value())
        {

            auto input = hmc_NodeArgsValue(env, info);
            formatArgsCallBack.value()(env, info, &arguments_list, input);
        }
        else
        {

            auto input = hmc_NodeArgsValue(env, info).get_values();

            for (size_t i = 0; i < input.size(); i++)
            {
                arguments_list.push_back(input.at(i));
            }
        }

        std::any data = PromiseWorkFunc(&arguments_list);
        return FormatResultValue(env, &data);
    }
    catch (const std::exception &err)
    {
        napi_throw_error(env, "catch (const std::exception&)", err.what());
        return result;
    }
    catch (...)
    {
        napi_throw_error(env, "catch (...)", "");
        return result;
    }

    return result;
}

namespace PromiseFunction
{

    std::any resultSend = std::any();
    std::vector<std::any> arguments_list = {};
    napi_value FormatResultValue(napi_env env, std::any *result_any_data);
    std::any PromiseWorkFunc(std::vector<std::any> *arguments_list);

    std::optional<PromiseFunctionUtil::formatArgsCallBackType> GpArgsToCallBack;
    // 函数名称
    std::atomic<napi_async_work> work = NULL;
    std::atomic<napi_deferred> deferred = NULL;

    // 这些函数虽然是通用的但是不能同用  需要通过静态类或者命名空间区分开 不然会导致函数空间位置不一样 导致不可预测的错误 请勿改动此
    void asyncWorkFun(napi_env env, void *data)
    {
        resultSend = PromiseWorkFunc(&arguments_list);
    }

    void completeWork(napi_env env, napi_status status, void *data)
    {
        return PromiseFunctionUtil::completeWork(env, status, &work, &deferred, &arguments_list, &resultSend, FormatResultValue);
    }

    napi_value startWork(napi_env env, napi_callback_info info)
    {
        return PromiseFunctionUtil::startWork(env, info, &work, &deferred, asyncWorkFun, completeWork, &arguments_list, GpArgsToCallBack);
    }

    napi_value startSync(napi_env env, napi_callback_info info)
    {
        return PromiseFunctionUtil::startSync(env, info, PromiseWorkFunc, FormatResultValue, GpArgsToCallBack);
    }

    // 以下由当前函数功能进行自定义
    // 如果需要自定义格式化args 需要在导出时候声明用于导出的函数 例如：
    // PromiseFunctionUtil::exports(env, exports, "startThread", PromiseFunction::startWork, PromiseFunction::startSync);
    // PromiseFunction::GpArgsToCallBack = PromiseFunction::AddArgsToCallBack;
    void AddArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue args_value)
    {
    }

    // 需要异步的函数
    std::any PromiseWorkFunc(std::vector<std::any> *arguments_list)
    {
        std::any result = std::any();
        ::Sleep(5000);
        return result;
    }

    // 格式化<需要异步的函数>返回值到js 返回值
    napi_value FormatResultValue(napi_env env, std::any *result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data->has_value())
        {
            return result;
        }

        return result;
    }

};

napi_value Init(napi_env env, napi_value exports)
{

    PromiseFunctionUtil::exports(env, exports, "startThread", PromiseFunction::startWork, PromiseFunction::startSync);
    PromiseFunction::GpArgsToCallBack = PromiseFunction::AddArgsToCallBack;

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
