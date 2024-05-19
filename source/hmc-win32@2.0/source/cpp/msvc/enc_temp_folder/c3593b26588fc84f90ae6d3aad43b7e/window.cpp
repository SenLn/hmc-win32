#include "export.h"
#include "hmc_windows_util.h"

namespace exp_CloseWindow2
{
    NEW_PROMISE_FUNCTION2_DEFAULT_FUN;

    void exp_CloseWindow2::AddArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue input)
    {
        // showContextMenu(hwnd:number, filePath:string|string[], x?:number|null, y?:number|null);
        input.eq(0, {js_number, js_bigint}, true);
        input.eq(1, {js_number, js_bigint}, true);

        // hwnd:number
        int64_t ihwnd = at_Number64Or(0, 0);
        int igrade = at_Number64Or(1, 0);

        ArgumentsList->push_back(ihwnd);
        ArgumentsList->push_back(igrade);
    }

    // 需要异步的函数
    std::any exp_CloseWindow2::PromiseWorkFunc(std::vector<std::any> *arguments_list)
    {
        std::any result = std::any();
        HWND Handle = (HWND)std::any_cast<int64_t>(arguments_list->at(0));
        int grade = std::any_cast<int>(arguments_list->at(1));

        switch (grade)
        {
        case 1:
        {

            bool isWindowCloce = ::CloseWindow(Handle);
            return isWindowCloce;
        }
        case 2:
        {

            ::SendMessage(Handle, WM_SYSCOMMAND, SC_CLOSE, 0);

            if (hmc_windows_util::isWindow(Handle)) {
                ::CloseHandle(Handle);
            }

            return false;
        }
        case 3:
        {
            DWORD threadId = ::GetWindowThreadProcessId(Handle, NULL);
            if (threadId == 0)
            {
                return false;
            }

            // 强制终止线程
            HANDLE hThread = ::OpenThread(THREAD_TERMINATE, FALSE, threadId);
            if (hThread == NULL)
            {
                return false;
            }

            BOOL result = TerminateThread(hThread, 0);
            if (!result)
            {
                ::CloseHandle(hThread);
                return false;
            }

            ::CloseHandle(hThread);
            return true;
        }
        }

        return result;
    }

    // 格式化<需要异步的函数>返回值到js 返回值
    napi_value exp_CloseWindow2::FormatResultValue(napi_env env, std::any *result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data->has_value())
        {
            return result;
        }
        result = as_Boolean(std::any_cast<bool>(result_any_data));
        return result;
    }

};

void exports_window_async_fun(napi_env env, napi_value exports)
{
    PromiseFunctionUtil::exports(env, exports, "closeWindow2", exp_CloseWindow2::startWork, exp_CloseWindow2::startSync);
}
