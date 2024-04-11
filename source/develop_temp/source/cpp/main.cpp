#include "./main.h"

#include <hmc_napi_value_util.h>
#include <hmc_util.h>
#include <hmc_shell_util.h>

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

napi_value ShowContextMenu(napi_env env, napi_callback_info info)
{
    napi_value result = as_Boolean(false);

    try
    {
        auto input = hmc_NodeArgsValue(env, info);

        if (!input.eq(0, {js_null, js_number, js_bigint}, true))
        {
            return NULL;
        };

        if (!input.eq(1, {js_string, js_array}, true))
        {
            return NULL;
        };

        // hwnd:number
        int64_t ihwnd = at_Number64Or(0, 0);

        HWND hwnd = ihwnd <= 0 ? ::GetForegroundWindow() : (HWND)ihwnd;
        std::variant<std::wstring, std::vector<std::wstring>> filePath;
        int x = at_Number32Or(2, 0);
        int y = at_Number32Or(3, 0);

        // filePath:string|string[]
        if (input.eq(1, js_string, false))
        {
            filePath = input.getStringWide(1);
        }
        else
        {
            filePath = input.getArrayWstring(1);
        }

        if (x + y == 0)
        {
            POINT point;
            ::GetCursorPos(&point);
            x = point.x;
            y = point.y;
        }

        if (std::holds_alternative<std::wstring>(filePath))
        {
            std::wstring filePath2 = std::get<std::wstring>(filePath);
            bool c_result = hmc_shell_util::showContextMenu(hwnd, filePath2, x, y);
            result = as_Boolean(c_result);
        }
        else
        {
            std::vector<std::wstring> filePathList = std::get<std::vector<std::wstring>>(filePath);
            bool c_result = hmc_shell_util::showContextMenu(hwnd, filePathList, x, y);
            result = as_Boolean(c_result);
        }
    }
    catch (...)
    {
    }

    return result;
}

napi_value Init(napi_env env, napi_value exports)
{

    PromiseFunctionUtil::exports(env, exports, "showContextMenu", ShowContextMenu);

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);

