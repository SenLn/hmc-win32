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

    hmc_screen_util::CaptureBmp(BmpFilePath, ix, iy, nScopeWidth, nScopeHeight);

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

    hmc_screen_util::CaptureBmp(buffer, ix, iy, nScopeWidth, nScopeHeight);

    if (!buffer.empty())
    {
        result = hmc_napi_create_value::Buffer(env, buffer);
    }

    return result;
}
