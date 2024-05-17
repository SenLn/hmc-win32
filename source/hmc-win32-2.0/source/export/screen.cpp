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
        napi_status status;
        napi_value Results;

        if (buffer.size() < 1)
        {
            return NULL;
        }

        // 此内存块会被 BufferFinalizer 自动释放
        void *yourPointer = ::malloc(buffer.size());

        if (yourPointer != NULL)
        {

            ::memcpy(yourPointer, buffer.data(), buffer.size());

            status = napi_create_external_buffer(env, buffer.size(), reinterpret_cast<void *>(buffer.data()),NULL, reinterpret_cast<void *>(buffer.data()), &Results);
            if (status != napi_ok)
            {
                return NULL;
            }
        }

        return Results;
    }

    return result;
}
