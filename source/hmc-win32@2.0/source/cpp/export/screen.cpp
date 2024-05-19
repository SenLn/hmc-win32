#include "./export.h"
#include "hmc_screen_util.h"
#include "hmc_napi_value_util.h"

napi_value captureBmpToFile(napi_env env, napi_callback_info info)
{
    napi_value result = as_Null();
    auto input = hmc_NodeArgsValue(env, info);
    input.eq({{0, js_string},
              {1, js_number},
              {2, js_number},
              {3, js_number},
              {4, js_number}},
             true);

    std::wstring BmpFilePath = at_StringW(0);
    int ix = at_Number32(1);
    int iy = at_Number32(2);
    int nScopeWidth = at_Number32(3);
    int nScopeHeight = at_Number32(4);

    hmc_screen_util::captureBmpToFile(BmpFilePath, ix, iy, nScopeWidth, nScopeHeight);

    return result;
}

napi_value captureBmpToBuff(napi_env env, napi_callback_info info)
{
    napi_value result = as_Null();
    auto input = hmc_NodeArgsValue(env, info);
    input.eq({{0, js_number},
              {1, js_number},
              {2, js_number},
              {3, js_number}},
             true);

    int ix = at_Number32(0);
    int iy = at_Number32(1);
    int nScopeWidth = at_Number32(2);
    int nScopeHeight = at_Number32(3);

    std::vector<std::uint8_t> buffer;

    hmc_screen_util::captureBmpToBuffer(buffer, ix, iy, nScopeWidth, nScopeHeight);

    if (!buffer.empty())
    {
        result = as_Buffer(buffer);
        return result;
    }

    return result;
}


namespace exp_captureBmp2
{
    NEW_PROMISE_FUNCTION2_DEFAULT_FUN;

    void exp_captureBmp2::AddArgsToCallBack(napi_env env, napi_callback_info info, std::vector<std::any> *ArgumentsList, hmc_NodeArgsValue input)
    {
        input.eq(0, {js_number, js_bigint}, true);
        input.eq(1, {js_number, js_bigint}, true);

        // hwnd:number
        int64_t ihwnd = at_Number64Or(0, 0);
        int igrade = at_Number64Or(1, 0);

        ArgumentsList->push_back(ihwnd);
        ArgumentsList->push_back(igrade);
    }

    // 需要异步的函数
    std::any exp_captureBmp2::PromiseWorkFunc(std::vector<std::any> *arguments_list)
    {
        std::any result = std::any();
        HWND Handle = (HWND)std::any_cast<int64_t>(arguments_list->at(0));
        int grade = std::any_cast<int>(arguments_list->at(1));

        return result;
    }

    // 格式化<需要异步的函数>返回值到js 返回值
    napi_value exp_captureBmp2::FormatResultValue(napi_env env, std::any *result_any_data)
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

void exports_screen_async_fun(napi_env env, napi_value exports)
{
    PromiseFunctionUtil::exports(env, exports, "captureBmp2", exp_captureBmp2::startWork, exp_captureBmp2::startSync);
}
