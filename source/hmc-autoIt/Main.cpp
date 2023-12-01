﻿#include "Main.h"

// #pragma comment(lib, "./AutoItX3/AutoItX3_DLL.lib")
// #pragma comment(lib, "./AutoItX3/AutoItX3\\AutoItX3_x64_DLL.lib")

#ifdef _MSC_VER

#ifdef _M_IX86
#pragma comment(lib, "F:\\source\\CPP\\hmc-win32\\source\\hmc-autoIt\\AutoItX3\\AutoItX3_DLL.lib")

#elif defined(_M_X64) || defined(_M_AMD64)
#pragma comment(lib, "F:\\source\\CPP\\hmc-win32\\source\\hmc-autoIt\\AutoItX3\\AutoItX3_x64_DLL.lib")

#endif //_M_IX86
#endif //_MSC_VER

// HMC_CHECK_CATCH
// 在node环境
#ifdef SRC_NODE_API_H_
#define HMC_CHECK_CATCH                        \
    catch (char *err)                          \
    {                                          \
        napi_throw_type_error(env, NULL, err); \
        return NULL;                           \
    }

// 不在node环境
#else
#define HMC_CHECK_CATCH            \
    catch (char *err)              \
    {                              \
        if (HMC_IS_DEUG_COUT == 1) \
        {                          \
            cout << err << "\n";   \
        }                          \
    }
#endif // SRC_NODE_API_H_

#define AU3_INTDEFAULT (-2147483647) // "Default" value for _some_ int parameters (largest negative number)

#define is_arg_String(index) hmc_napi_util::assert::isString(env, argv[index])
#define is_arg_Number(index) hmc_napi_util::assert::isNumber(env, argv[index])
#define is_arg_Leng(min, max) hmc_napi_util::assert::argsSize(env, argc, min, max)
#define is_arg_String_or(index, or_value) (hmc_napi_util::assert::isString(env, argv[index]) ? hmc_napi_util::get_value::string_utf16(env, argv[index]) : wstring(or_value))
#define is_arg_Number_or(index, or_value) (hmc_napi_util::assert::isNumber(env, argv[index]) ? hmc_napi_util::get_value::number_int(env, argv[index]) : or_value)

static napi_value nfn_Init(napi_env env, napi_callback_info info)
{
    napi_value result;
    napi_get_undefined(env, &result);
    try
    {

        fn_AU3_Init();
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_error(napi_env env, napi_callback_info info)
{
    napi_value result;
    try
    {
        result = hmc_napi_util::create_value::Number(env, fn_AU3_error());
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_AutoItSetOption(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value argv[2];
    $napi_get_cb_info(argc, argv, "nfn_AutoItSetOption");
    napi_value result;
    napi_get_undefined(env, &result);
    if (
        !hmc_napi_util::assert::argsSize(env, argc, 2, 2) &&
        (hmc_napi_util::assert::isNumber(env, argv[0]) &&
         hmc_napi_util::assert::isString(env, argv[1])))
    {
        napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
        return NULL;
    }
    try
    {
        wstring szOption = hmc_napi_util::get_value::string_wide(env, argv[0]);
        int nValue = hmc_napi_util::get_value::number_int(env, argv[1]);
        result = hmc_napi_util::create_value::Number(env, fn_AU3_AutoItSetOption(szOption, nValue));
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ClipGet(napi_env env, napi_callback_info info)
{

    napi_value result;
    napi_get_undefined(env, &result);

    try
    {
        // 这里要动态开辟内存
        return hmc_napi_util::create_value::String(env, fn_AU3_ClipGet());
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ClipPut(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value argv[1];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);

    try
    {
        wstring szClip = hmc_napi_util::get_value::string_wide(env, argv[0]);
        fn_AU3_ClipPut(szClip);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlClick(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 7;
    napi_value argv[7];
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(3, 7) && (is_arg_Number(0)) && is_arg_String(1))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        wstring szTitle = is_arg_String_or(0, L"");
        wstring szText = is_arg_String_or(1, L"");
        wstring szControl = is_arg_String_or(2, L"");
        wstring szButton = is_arg_String_or(3, L"left");
        int nNumClicks = is_arg_Number_or(4, 1);
        int nX = is_arg_Number_or(5, AU3_INTDEFAULT);
        int nY = is_arg_Number_or(6, AU3_INTDEFAULT);

        int data = fn_AU3_ControlClick(szTitle, szText, szControl, szButton, nNumClicks, nX, nY);
        return hmc_napi_util::create_value::Number(env, data);
    }
    HMC_CHECK_CATCH;
    return NULL;
}

static napi_value nfn_ControlClickByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 6;
    napi_value argv[6];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(3, 6) && (is_arg_Number(0)) && is_arg_Number(1))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        HWND hWnd = (HWND)is_arg_Number_or(0, 0);
        HWND hCtrl = (HWND)is_arg_Number_or(1, 0);
        wstring szButton = is_arg_String_or(3, L"left");
        int nNumClicks = is_arg_Number_or(3, 1);
        int nX = is_arg_Number_or(4, AU3_INTDEFAULT);
        int nY = is_arg_Number_or(5, AU3_INTDEFAULT);
        int data = fn_AU3_ControlClickByHandle(hWnd, hCtrl, szButton, nNumClicks, nX, nY);
        return hmc_napi_util::create_value::Number(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlCommand(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 5;
    napi_value argv[5];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(3, 5))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        wstring data = fn_AU3_ControlCommand(
            is_arg_String_or(0, L""),
            is_arg_String_or(1, L""),
            is_arg_String_or(2, L""),
            is_arg_String_or(3, L""),
            is_arg_String_or(4, L"left"));
        return hmc_napi_util::create_value::String(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlCommandByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 4;
    napi_value argv[4];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(3, 4))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        wstring data = fn_AU3_ControlCommandByHandle(
            (HWND)is_arg_Number_or(0, 0),
            (HWND)is_arg_Number_or(1, 0),
            is_arg_String_or(2, L""),
            is_arg_String_or(3, L""));
        return hmc_napi_util::create_value::String(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlListView(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 6;
    napi_value argv[6];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(3, 5))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        wstring data = fn_AU3_ControlListView(
            is_arg_String_or(0, L""),
            is_arg_String_or(1, L""),
            is_arg_String_or(2, L""),
            is_arg_String_or(3, L""),
            is_arg_String_or(4, L""),
            is_arg_String_or(5, L""));
        return hmc_napi_util::create_value::String(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlListViewByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 5;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(5, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
        wstring data = fn_AU3_ControlListViewByHandle((HWND)is_arg_Number_or(0, 0),
                                                      (HWND)is_arg_Number_or(1, 0),
                                                      is_arg_String_or(2, L""),
                                                      is_arg_String_or(3, L""),
                                                      is_arg_String_or(4, L""));
        return hmc_napi_util::create_value::String(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlDisable(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 3;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(3, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
      auto  data = fn_AU3_ControlDisable(is_arg_String_or(0, L""),
                                     is_arg_String_or(1, L""),
                                     is_arg_String_or(2, L""));
      return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlDisableByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 2;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(2, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        auto data = fn_AU3_ControlDisableByHandle((HWND)is_arg_Number_or(0, 0),
                                                  (HWND)is_arg_Number_or(1, 0));
        return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlEnable(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 3;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
        auto data = fn_AU3_ControlEnable(is_arg_String_or(0, L""),
                                         is_arg_String_or(1, L""),
                                         is_arg_String_or(2, L""));
        return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlEnableByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 2;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(2, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        auto data = fn_AU3_ControlEnableByHandle((HWND)is_arg_Number_or(0, 0),
                                         (HWND)is_arg_Number_or(1, 0));
        return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlFocus(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 3;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    $napi_get_cb_info(argc, argv, "");

    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
        auto data = fn_AU3_ControlFocus(is_arg_String_or(0, L""),
                                         is_arg_String_or(1, L""),
                                         is_arg_String_or(2, L""));
        return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlFocusByHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t default_len = 2;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");

    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(2, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }

        auto data = fn_AU3_ControlFocusByHandle((HWND)is_arg_Number_or(0, 0),
                                                (HWND)is_arg_Number_or(1, 0));
        return hmc_napi_util::create_value::Boolean(env, data);
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetFocus(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 2;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            ....
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetFocusByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetHandleAsText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetPos(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetPosByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlGetTextByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlHide(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlHideByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlMove(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlMoveByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlSend(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlSendByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlSetText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlSetTextByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlShow(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlShowByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlTreeView(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ControlTreeViewByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_DriveMapAdd(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_DriveMapDel(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_DriveMapGet(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_IsAdmin(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseClick(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseClickDrag(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseDown(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseGetCursor(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseGetPos(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseMove(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseUp(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_MouseWheel(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_Opt(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_PixelChecksum(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_PixelGetColor(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_PixelSearch(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ProcessClose(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ProcessExists(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ProcessSetPriority(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ProcessWait(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ProcessWaitClose(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_Run(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_RunWait(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_RunAs(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_RunAsWait(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_Send(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_Shutdown(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_Sleep(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_StatusbarGetText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_StatusbarGetTextByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_ToolTip(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinActivate(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinActivateByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinActive(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinActiveByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinClose(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinCloseByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinExists(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinExistsByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetCaretPos(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetClassList(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetClassListByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetClientSize(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetClientSizeByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetHandleAsText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetPos(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetPosByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetProcess(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetProcessByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetState(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetStateByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetText(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetTextByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetTitle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinGetTitleByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinKill(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinKillByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMenuSelectItem(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMenuSelectItemByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMinimizeAll(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMinimizeAllUndo(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMove(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinMoveByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetOnTop(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetOnTopByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetState(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetStateByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetTitle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetTitleByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetTrans(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinSetTransByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWait(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitActive(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitActiveByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitClose(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitCloseByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitNotActive(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value nfn_WinWaitNotActiveByHandle(napi_env env, napi_callback_info info)
{
     napi_status status;
    const size_t default_len = 1;
    size_t argc = default_len;
    napi_value argv[default_len];
    napi_value result;
    $napi_get_cb_info(argc, argv, "");
    napi_get_undefined(env, &result);
    try
    {
        if (is_arg_Leng(0, default_len))
        {
            napi_throw_type_error(env, NULL, string("Incorrect parameters Please pay attention to the parameter format and parameters").c_str());
            return NULL;
        }
    }
    HMC_CHECK_CATCH;
    return result;
}

static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor BIND_NAPI_METHOD[] = {
        DECLARE_NAPI_METHOD("Init", nfn_Init),
        DECLARE_NAPI_METHOD("error", nfn_error),
        DECLARE_NAPI_METHOD("AutoItSetOption", nfn_AutoItSetOption),
        DECLARE_NAPI_METHOD("ClipGet", nfn_ClipGet),
        DECLARE_NAPI_METHOD("ClipPut", nfn_ClipPut),
        DECLARE_NAPI_METHOD("ControlClick", nfn_ControlClick),
        DECLARE_NAPI_METHOD("ControlClickByHandle", nfn_ControlClickByHandle),
        DECLARE_NAPI_METHOD("ControlCommand", nfn_ControlCommand),
        DECLARE_NAPI_METHOD("ControlCommandByHandle", nfn_ControlCommandByHandle),
        DECLARE_NAPI_METHOD("ControlListView", nfn_ControlListView),
        DECLARE_NAPI_METHOD("ControlListViewByHandle", nfn_ControlListViewByHandle),
        DECLARE_NAPI_METHOD("ControlDisable", nfn_ControlDisable),
        DECLARE_NAPI_METHOD("ControlDisableByHandle", nfn_ControlDisableByHandle),
        DECLARE_NAPI_METHOD("ControlEnable", nfn_ControlEnable),
        DECLARE_NAPI_METHOD("ControlEnableByHandle", nfn_ControlEnableByHandle),
        DECLARE_NAPI_METHOD("ControlFocus", nfn_ControlFocus),
        DECLARE_NAPI_METHOD("ControlFocusByHandle", nfn_ControlFocusByHandle),
        DECLARE_NAPI_METHOD("ControlGetFocus", nfn_ControlGetFocus),
        DECLARE_NAPI_METHOD("ControlGetFocusByHandle", nfn_ControlGetFocusByHandle),
        DECLARE_NAPI_METHOD("ControlGetHandle", nfn_ControlGetHandle),
        DECLARE_NAPI_METHOD("ControlGetHandleAsText", nfn_ControlGetHandleAsText),
        DECLARE_NAPI_METHOD("ControlGetPos", nfn_ControlGetPos),
        DECLARE_NAPI_METHOD("ControlGetPosByHandle", nfn_ControlGetPosByHandle),
        DECLARE_NAPI_METHOD("ControlGetText", nfn_ControlGetText),
        DECLARE_NAPI_METHOD("ControlGetTextByHandle", nfn_ControlGetTextByHandle),
        DECLARE_NAPI_METHOD("ControlHide", nfn_ControlHide),
        DECLARE_NAPI_METHOD("ControlHideByHandle", nfn_ControlHideByHandle),
        DECLARE_NAPI_METHOD("ControlMove", nfn_ControlMove),
        DECLARE_NAPI_METHOD("ControlMoveByHandle", nfn_ControlMoveByHandle),
        DECLARE_NAPI_METHOD("ControlSend", nfn_ControlSend),
        DECLARE_NAPI_METHOD("ControlSendByHandle", nfn_ControlSendByHandle),
        DECLARE_NAPI_METHOD("ControlSetText", nfn_ControlSetText),
        DECLARE_NAPI_METHOD("ControlSetTextByHandle", nfn_ControlSetTextByHandle),
        DECLARE_NAPI_METHOD("ControlShow", nfn_ControlShow),
        DECLARE_NAPI_METHOD("ControlShowByHandle", nfn_ControlShowByHandle),
        DECLARE_NAPI_METHOD("ControlTreeView", nfn_ControlTreeView),
        DECLARE_NAPI_METHOD("ControlTreeViewByHandle", nfn_ControlTreeViewByHandle),
        DECLARE_NAPI_METHOD("DriveMapAdd", nfn_DriveMapAdd),
        DECLARE_NAPI_METHOD("DriveMapDel", nfn_DriveMapDel),
        DECLARE_NAPI_METHOD("DriveMapGet", nfn_DriveMapGet),
        DECLARE_NAPI_METHOD("IsAdmin", nfn_IsAdmin),
        DECLARE_NAPI_METHOD("MouseClick", nfn_MouseClick),
        DECLARE_NAPI_METHOD("MouseClickDrag", nfn_MouseClickDrag),
        DECLARE_NAPI_METHOD("MouseDown", nfn_MouseDown),
        DECLARE_NAPI_METHOD("MouseGetCursor", nfn_MouseGetCursor),
        DECLARE_NAPI_METHOD("MouseGetPos", nfn_MouseGetPos),
        DECLARE_NAPI_METHOD("MouseMove", nfn_MouseMove),
        DECLARE_NAPI_METHOD("MouseUp", nfn_MouseUp),
        DECLARE_NAPI_METHOD("MouseWheel", nfn_MouseWheel),
        DECLARE_NAPI_METHOD("Opt", nfn_Opt),
        DECLARE_NAPI_METHOD("PixelChecksum", nfn_PixelChecksum),
        DECLARE_NAPI_METHOD("PixelGetColor", nfn_PixelGetColor),
        DECLARE_NAPI_METHOD("PixelSearch", nfn_PixelSearch),
        DECLARE_NAPI_METHOD("ProcessClose", nfn_ProcessClose),
        DECLARE_NAPI_METHOD("ProcessExists", nfn_ProcessExists),
        DECLARE_NAPI_METHOD("ProcessSetPriority", nfn_ProcessSetPriority),
        DECLARE_NAPI_METHOD("ProcessWait", nfn_ProcessWait),
        DECLARE_NAPI_METHOD("ProcessWaitClose", nfn_ProcessWaitClose),
        DECLARE_NAPI_METHOD("Run", nfn_Run),
        DECLARE_NAPI_METHOD("RunWait", nfn_RunWait),
        DECLARE_NAPI_METHOD("RunAs", nfn_RunAs),
        DECLARE_NAPI_METHOD("RunAsWait", nfn_RunAsWait),
        DECLARE_NAPI_METHOD("Send", nfn_Send),
        DECLARE_NAPI_METHOD("Shutdown", nfn_Shutdown),
        DECLARE_NAPI_METHOD("Sleep", nfn_Sleep),
        DECLARE_NAPI_METHOD("StatusbarGetText", nfn_StatusbarGetText),
        DECLARE_NAPI_METHOD("StatusbarGetTextByHandle", nfn_StatusbarGetTextByHandle),
        DECLARE_NAPI_METHOD("ToolTip", nfn_ToolTip),
        DECLARE_NAPI_METHOD("WinActivate", nfn_WinActivate),
        DECLARE_NAPI_METHOD("WinActivateByHandle", nfn_WinActivateByHandle),
        DECLARE_NAPI_METHOD("WinActive", nfn_WinActive),
        DECLARE_NAPI_METHOD("WinActiveByHandle", nfn_WinActiveByHandle),
        DECLARE_NAPI_METHOD("WinClose", nfn_WinClose),
        DECLARE_NAPI_METHOD("WinCloseByHandle", nfn_WinCloseByHandle),
        DECLARE_NAPI_METHOD("WinExists", nfn_WinExists),
        DECLARE_NAPI_METHOD("WinExistsByHandle", nfn_WinExistsByHandle),
        DECLARE_NAPI_METHOD("WinGetCaretPos", nfn_WinGetCaretPos),
        DECLARE_NAPI_METHOD("WinGetClassList", nfn_WinGetClassList),
        DECLARE_NAPI_METHOD("WinGetClassListByHandle", nfn_WinGetClassListByHandle),
        DECLARE_NAPI_METHOD("WinGetClientSize", nfn_WinGetClientSize),
        DECLARE_NAPI_METHOD("WinGetClientSizeByHandle", nfn_WinGetClientSizeByHandle),
        DECLARE_NAPI_METHOD("WinGetHandle", nfn_WinGetHandle),
        DECLARE_NAPI_METHOD("WinGetHandleAsText", nfn_WinGetHandleAsText),
        DECLARE_NAPI_METHOD("WinGetPos", nfn_WinGetPos),
        DECLARE_NAPI_METHOD("WinGetPosByHandle", nfn_WinGetPosByHandle),
        DECLARE_NAPI_METHOD("WinGetProcess", nfn_WinGetProcess),
        DECLARE_NAPI_METHOD("WinGetProcessByHandle", nfn_WinGetProcessByHandle),
        DECLARE_NAPI_METHOD("WinGetState", nfn_WinGetState),
        DECLARE_NAPI_METHOD("WinGetStateByHandle", nfn_WinGetStateByHandle),
        DECLARE_NAPI_METHOD("WinGetText", nfn_WinGetText),
        DECLARE_NAPI_METHOD("WinGetTextByHandle", nfn_WinGetTextByHandle),
        DECLARE_NAPI_METHOD("WinGetTitle", nfn_WinGetTitle),
        DECLARE_NAPI_METHOD("WinGetTitleByHandle", nfn_WinGetTitleByHandle),
        DECLARE_NAPI_METHOD("WinKill", nfn_WinKill),
        DECLARE_NAPI_METHOD("WinKillByHandle", nfn_WinKillByHandle),
        DECLARE_NAPI_METHOD("WinMenuSelectItem", nfn_WinMenuSelectItem),
        DECLARE_NAPI_METHOD("WinMenuSelectItemByHandle", nfn_WinMenuSelectItemByHandle),
        DECLARE_NAPI_METHOD("WinMinimizeAll", nfn_WinMinimizeAll),
        DECLARE_NAPI_METHOD("WinMinimizeAllUndo", nfn_WinMinimizeAllUndo),
        DECLARE_NAPI_METHOD("WinMove", nfn_WinMove),
        DECLARE_NAPI_METHOD("WinMoveByHandle", nfn_WinMoveByHandle),
        DECLARE_NAPI_METHOD("WinSetOnTop", nfn_WinSetOnTop),
        DECLARE_NAPI_METHOD("WinSetOnTopByHandle", nfn_WinSetOnTopByHandle),
        DECLARE_NAPI_METHOD("WinSetState", nfn_WinSetState),
        DECLARE_NAPI_METHOD("WinSetStateByHandle", nfn_WinSetStateByHandle),
        DECLARE_NAPI_METHOD("WinSetTitle", nfn_WinSetTitle),
        DECLARE_NAPI_METHOD("WinSetTitleByHandle", nfn_WinSetTitleByHandle),
        DECLARE_NAPI_METHOD("WinSetTrans", nfn_WinSetTrans),
        DECLARE_NAPI_METHOD("WinSetTransByHandle", nfn_WinSetTransByHandle),
        DECLARE_NAPI_METHOD("WinWait", nfn_WinWait),
        DECLARE_NAPI_METHOD("WinWaitByHandle", nfn_WinWaitByHandle),
        DECLARE_NAPI_METHOD("WinWaitActive", nfn_WinWaitActive),
        DECLARE_NAPI_METHOD("WinWaitActiveByHandle", nfn_WinWaitActiveByHandle),
        DECLARE_NAPI_METHOD("WinWaitClose", nfn_WinWaitClose),
        DECLARE_NAPI_METHOD("WinWaitCloseByHandle", nfn_WinWaitCloseByHandle),
        DECLARE_NAPI_METHOD("WinWaitNotActive", nfn_WinWaitNotActive),
        DECLARE_NAPI_METHOD("WinWaitNotActiveByHandle", nfn_WinWaitNotActiveByHandle)};
    napi_define_properties(env, exports, sizeof(BIND_NAPI_METHOD) / sizeof(BIND_NAPI_METHOD[0]), BIND_NAPI_METHOD);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
