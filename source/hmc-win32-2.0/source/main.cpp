#include "./main.h"
#include "./export/export.h"
#include <stdlib.h>




static void hmc_gc_func()
{


}

static napi_value Init(napi_env env, napi_value exports)
{

    napi_property_descriptor BIND_NAPI_METHOD[] = {

        // screen.cpp
        DECLARE_NAPI_METHODRM("captureBmpToBuff", captureBmpToBuff),
        DECLARE_NAPI_METHODRM("captureBmpToFile", captureBmpToFile),
        
    };
    
    napi_define_properties(env, exports, sizeof(BIND_NAPI_METHOD) / sizeof(BIND_NAPI_METHOD[0]), BIND_NAPI_METHOD);

    atexit(hmc_gc_func);

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
