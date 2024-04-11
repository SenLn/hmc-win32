#include <hmc_napi_value_util.h>
#include <hmc_util.h>

#include <string>
#include <any>
#include <thread>
#include <vector>
#include <atomic>
#include <shared_mutex>
#include <optional>
#include <functional>
#include <mutex>

namespace PromiseFunction
{

    std::any resultSend = std::any();
    std::vector<std::any> arguments_list = {};
    napi_value FormatResultValue(napi_env env, std::any *result_any_data);
    std::any PromiseWorkFunc(std::vector<std::any> *arguments_list);
    // void FunArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue args_value);

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
        // return PromiseFunctionUtil::startWork(env, info, &work, &deferred, asyncWorkFun, completeWork, &arguments_list, FunArgsToCallBack);
        return PromiseFunctionUtil::startWork(env, info, &work, &deferred, asyncWorkFun, completeWork, &arguments_list, GpArgsToCallBack);
    }

    napi_value startSync(napi_env env, napi_callback_info info)
    {
        // return PromiseFunctionUtil::startWork(env, info, &work, &deferred, asyncWorkFun, completeWork, &arguments_list, FunArgsToCallBack);
        return PromiseFunctionUtil::startWork(env, info, &work, &deferred, asyncWorkFun, completeWork, &arguments_list, GpArgsToCallBack);
    }

    // 以下由当前函数功能进行自定义
    // 如果需要自定义格式化args 需要在导出时候声明用于导出的函数  或者编辑 startWork / startSync 例如：
    // PromiseFunctionUtil::exports(env, exports, "startThread", PromiseFunction::startWork, PromiseFunction::startSync);
    // PromiseFunction::GpArgsToCallBack = PromiseFunction::AddArgsToCallBack;
    void FunArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue args_value)
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
    PromiseFunction::GpArgsToCallBack = PromiseFunction::FunArgsToCallBack;

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
