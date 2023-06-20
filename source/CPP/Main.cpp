﻿#include "./Mian.hpp";
bool _________HMC_DEBUG__________;

void ____HMC_DEBUG_RUN_MESS____(napi_env env, string error_message)
{
    if (_________HMC_DEBUG__________)
    {
        napi_value run_script_result;
        string error_message_str = string("console.error(new Error(String.raw`\n");
        error_message_str.append(error_message);
        error_message_str.append("`))");
        napi_run_script(env, _create_String(env, error_message_str), &run_script_result);
    }
}
// 判断 x64 系统
BOOL isSystemFor64bit()
{
    SYSTEM_INFO SystemInfo;
    GetNativeSystemInfo(&SystemInfo);
    if (SystemInfo.wProcessorArchitecture == PROCESSOR_ARCHITECTURE_IA64 || SystemInfo.wProcessorArchitecture == PROCESSOR_ARCHITECTURE_AMD64)
        return TRUE;
    else
        return FALSE;
}

// 系统空闲时间
napi_value getSystemIdleTime(napi_env env, napi_callback_info info)
{
    napi_value sum;
    LASTINPUTINFO lpi;
    lpi.cbSize = sizeof(lpi);
    GetLastInputInfo(&lpi);
    int64_t SystemIdleTime = ((GetTickCount() - lpi.dwTime) / 1000);
    napi_create_int64(env, SystemIdleTime, &sum);
    return sum;
}
static napi_value systemStartTime(napi_env env, napi_callback_info info)
{
    // napi_status status;
    napi_value Results;
    if (_WIN32_WINNT >= 0x0600)
    {
        napi_create_int64(env, (uint64_t)GetTickCount64(), &Results);
    }
    else
    {
        napi_create_int32(env, (uint32_t)GetTickCount(), &Results);
    }
    return Results;
}
// 进程阻塞
static napi_value sleep(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);

    if (argc < 1)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments");
        return NULL;
    }

    napi_valuetype valuetype0;
    status = napi_typeof(env, args[0], &valuetype0);
    assert(status == napi_ok);

    if (valuetype0 != napi_number)
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return NULL;
    }

    int Set_time;
    status = napi_get_value_int32(env, args[0], &Set_time);
    assert(status == napi_ok);
    napi_value Sleep_info;
    Sleep(Set_time);
    status = napi_get_boolean(env, true, &Sleep_info);
    assert(status == napi_ok);

    return Sleep_info;
}
// 判断是否是管理员权限
napi_value isAdmin(napi_env env, napi_callback_info info)
{
    napi_value info_isAdmin;
    napi_get_boolean(env, IsUserAnAdmin(), &info_isAdmin);
    return info_isAdmin;
}
// 执行软件的打开
auto win32ToShellExecute(LPCSTR openType, string lpFile, string lpParameters, string lpDirectory, bool OPEN_Hide)
{
    int OPEN_Hide_Code = 5;
    if (OPEN_Hide)
    {
        OPEN_Hide_Code = 0;
    }
    auto ToShellExecute = ShellExecute(
        NULL,
        (LPCTSTR)openType,
        (LPCTSTR)lpFile.c_str(),
        (LPCTSTR)lpParameters.c_str(),
        (LPCTSTR)lpDirectory.c_str(),
        OPEN_Hide_Code);
    return (long long)ToShellExecute;
}
// 打开软件
bool Attain_openApp(string lpFile, string lpParameters, string lpDirectory, bool OPEN_Hide)
{
    auto ToShellExecute = win32ToShellExecute((LPCSTR) "open", lpFile, lpParameters, lpDirectory, OPEN_Hide);
    if (ToShellExecute > 32)
        return true;
    else
        return false;
}
// 打开软件并将其提升为管理员权限
bool Attain_openAppToUAC(string lpFile, string lpParameters, string lpDirectory, bool OPEN_Hide)
{
    auto ToShellExecute = win32ToShellExecute((LPCSTR) "runas", lpFile, lpParameters, lpDirectory, OPEN_Hide);
    if (ToShellExecute > 32)
        return true;
    else
        return false;
}

// 执行可执行文件让其独立运行
static napi_value openApp(napi_env env, napi_callback_info info)
{
    napi_value ToShellExecute;
    napi_status status;
    size_t argc = 5;
    napi_value args[5];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        if (argc < 5)
        {
            string WrongString = "Wrong length of arguments =>";
            WrongString.append(to_string(argc).c_str());
            napi_throw_type_error(env, NULL, WrongString.c_str());
            return NULL;
        }

        napi_valuetype valuetype0;
        status = napi_typeof(env, args[0], &valuetype0);
        assert(status == napi_ok);

        napi_valuetype valuetype1;
        status = napi_typeof(env, args[1], &valuetype1);
        assert(status == napi_ok);

        if (valuetype0 != napi_string || valuetype0 != napi_string)
        {

            napi_throw_type_error(env, NULL, "Wrong arguments");
            return NULL;
        }
    }
    else
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return NULL;
    }
    // 参数1 打开的可执行文件
    string lpFile = call_String_NAPI_WINAPI_A(env, args[0]);
    // 参数2 命令行
    string lpParameters = call_String_NAPI_WINAPI_A(env, args[1]);
    // 参数3 cwd
    string lpDirectory = call_String_NAPI_WINAPI_A(env, args[2]);
    // 参数4 是否显示
    bool OPEN_Hide;
    napi_get_value_bool(env, args[3], &OPEN_Hide);
    // 参数5 是否提升到管理员权限
    bool OPEN_TO_UAC;
    napi_get_value_bool(env, args[4], &OPEN_TO_UAC);
    // 执行
    bool OpenToShellExecute;
    if (OPEN_TO_UAC)
        OpenToShellExecute = Attain_openApp(lpFile, lpParameters, lpDirectory, OPEN_Hide);
    else
        OpenToShellExecute = Attain_openAppToUAC(lpFile, lpParameters, lpDirectory, OPEN_Hide);
    napi_get_boolean(env, OpenToShellExecute, &ToShellExecute);
    return ToShellExecute;
}
// 权限提升
BOOL EnableShutDownPriv()
{
    HANDLE Handle_Token = NULL;
    TOKEN_PRIVILEGES PermissionAttribute = {0};
    // 打开当前程序的权限令牌
    bool is_Open_Process_Token = OpenProcessToken(GetCurrentProcess(), TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY, &Handle_Token);
    if (!is_Open_Process_Token)
    {
        return FALSE;
    }
    // 获得某一特定权限的权限标识LUID 保存到权限属性中
    if (!LookupPrivilegeValue(NULL, SE_SHUTDOWN_NAME, &PermissionAttribute.Privileges[0].Luid))
    {
        CloseHandle(Handle_Token);
        return FALSE;
    }
    PermissionAttribute.Privileges[0].Attributes = SE_PRIVILEGE_ENABLED;
    PermissionAttribute.PrivilegeCount = 1;
    // 提升到系统权限
    if (!AdjustTokenPrivileges(Handle_Token, FALSE, &PermissionAttribute, sizeof(TOKEN_PRIVILEGES), NULL, NULL))
    {
        CloseHandle(Handle_Token);
        return FALSE;
    }
    return TRUE;
}
// 执行注销，关机，重启
BOOL ReSetWindows(DWORD dwReason, BOOL aims)
{
    if (dwReason != EWX_LOGOFF && dwReason != EWX_REBOOT && dwReason != EWX_SHUTDOWN)
        return FALSE;
    OSVERSIONINFO osvi = {0};
    osvi.dwOSVersionInfoSize = sizeof(OSVERSIONINFO);
    dwReason |= (aims != FALSE) ? EWX_FORCE : EWX_FORCEIFHUNG;
    return ExitWindowsEx(dwReason, 0);
}
// 执行注销，关机，重启，锁定
static napi_value powerControl(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);

    if (argc < 1)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments");
        return NULL;
    }

    napi_valuetype valuetype0;
    status = napi_typeof(env, args[0], &valuetype0);
    assert(status == napi_ok);

    if (valuetype0 != napi_number)
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return NULL;
    }
    if (!EnableShutDownPriv())
    {
        napi_throw_type_error(env, NULL, "Unable to elevate to system privileges");
    }

    int Flage;
    status = napi_get_value_int32(env, args[0], &Flage);
    assert(status == napi_ok);
    bool is_Success = FALSE;
    napi_value napi_info_bool;
    switch (Flage)
    {
    case 1001: // 关机
        is_Success = ReSetWindows(EWX_SHUTDOWN, true);
        break;
    case 1002: // 重启
        is_Success = ReSetWindows(EWX_REBOOT, true);
        break;
    case 1003: // 注销
        is_Success = ReSetWindows(EWX_LOGOFF, false);
        break;
    case 1005: // 锁定
        is_Success = LockWorkStation();
        break;
    }
    status = napi_get_boolean(env, is_Success, &napi_info_bool);
    assert(status == napi_ok);
    return napi_info_bool;
}
// 获取前台活动窗口句柄
napi_value getForegroundWindow(napi_env env, napi_callback_info info)
{
    napi_value napi_value_info;
    HWND _ActiveWindow = GetForegroundWindow();
    int64_t nWnd = (int64_t)_ActiveWindow;
    napi_create_int64(env, nWnd, &napi_value_info);
    return napi_value_info;
}

// 关闭显示器
napi_value shutMonitors(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value napi_value_info;
    status = napi_get_boolean(env, true, &napi_value_info);
    assert(status == napi_ok);
    EnableShutDownPriv();
    SendMessage(FindWindow(0, 0), WM_SYSCOMMAND, SC_MONITORPOWER, 2);
    return napi_value_info;
}
// 打开显示器
napi_value showMonitors(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value napi_value_info;
    status = napi_get_boolean(env, true, &napi_value_info);
    assert(status == napi_ok);
    EnableShutDownPriv();
    SendMessage(FindWindow(0, 0), WM_SYSCOMMAND, SC_MONITORPOWER, -1);
    return napi_value_info;
}

// 设置窗口的系统右键(不考虑参数正确性 在js中会定义类型安全)
static napi_value getSystemMenu(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);

    if (argc < 2)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments");
        return _create_bool_Boolean(env, FALSE);
    }

    napi_valuetype valuetype1;
    status = napi_typeof(env, args[1], &valuetype1);
    assert(status == napi_ok);
    napi_valuetype valuetype0;
    status = napi_typeof(env, args[0], &valuetype0);
    assert(status == napi_ok);
    if (valuetype0 != napi_number || valuetype1 != napi_boolean)
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return _create_bool_Boolean(env, FALSE);
    }

    bool bRevert;
    status = napi_get_value_bool(env, args[1], &bRevert);
    assert(status == napi_ok);
    int64_t LookHWND;
    status = napi_get_value_int64(env, args[0], &LookHWND);
    assert(status == napi_ok);
    HWND __HWND = (HWND)LookHWND;
    bool is_GetSystemMenu = GetSystemMenu(__HWND, bRevert);
    return _create_bool_Boolean(env, is_GetSystemMenu);
}
/**
 * @brief 显示窗口
 * @URL: https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-showwindow?redirectedfrom=MSDN
 * (不考虑参数正确性 在js中会定义类型安全)
 * @param env
 * @param info
 * @return napi_value
 */
static napi_value lookHandleShowWindow(napi_env env, napi_callback_info info)
{
    napi_value ShowWindow_info;
    size_t argc = 1;
    napi_value args[1];
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    if (argc)
    {
        size_t argc = 2;
        napi_value args[1];
        napi_get_cb_info(env, info, &argc, args, NULL, NULL);
        int64_t Process_HWND;
        napi_get_value_int64(env, args[0], &Process_HWND);
        int _isShowWindow;
        napi_get_value_int32(env, args[1], &_isShowWindow);
        // 查找窗口  不存在则返回false
        HWND hWnd = (HWND)Process_HWND;
        bool isWindowShow = ShowWindow(hWnd, _isShowWindow);
        napi_get_boolean(env, isWindowShow, &ShowWindow_info);
    }
    return ShowWindow_info;
}

// 判断该句柄的窗口是否正在使用中(不考虑参数正确性 在js中会定义类型安全)
static napi_value isHandleWindowVisible(napi_env env, napi_callback_info info)
{
    napi_value ShowWindow_info;
    size_t argc = 1;
    napi_value args[1];
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        napi_get_cb_info(env, info, &argc, args, NULL, NULL);
        int64_t Process_HWND;
        napi_get_value_int64(env, args[0], &Process_HWND);

        HWND hWnd = (HWND)Process_HWND;
        bool isWindowShow = IsWindowVisible(hWnd);
        napi_get_boolean(env, isWindowShow, &ShowWindow_info);
    }
    return ShowWindow_info;
}
// 查找并关闭该窗口(不考虑参数正确性 在js中会定义类型安全)
static napi_value lookHandleCloseWindow(napi_env env, napi_callback_info info)
{
    napi_value CloseWindow_info;
    size_t argc = 1;
    napi_value args[1];
    napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        napi_get_cb_info(env, info, &argc, args, NULL, NULL);
        int64_t Process_HWND;
        napi_get_value_int64(env, args[0], &Process_HWND);

        HWND hWnd = (HWND)Process_HWND;
        bool isWindowShow = CloseWindow(hWnd);
        napi_get_boolean(env, isWindowShow, &CloseWindow_info);
    }
    return CloseWindow_info;
}
// 获取句柄对应的窗口的标题(不考虑参数正确性 在js中会定义类型安全)
static napi_value lookHandleGetTitle(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value HandleTitle;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    int64_t Process_Handle;
    status = napi_get_value_int64(env, args[0], &Process_Handle);
    HWND hWindow = (HWND)Process_Handle;
    LRESULT result = 0;
    CHAR wszTitle[MAX_PATH] = {0};
    result = GetWindowTextA(hWindow, wszTitle, MAX_PATH);
    string To_U8;
    To_U8.append(_A2U8_(wszTitle).c_str());
    napi_create_string_utf8(env, To_U8.c_str(), NAPI_AUTO_LENGTH, &HandleTitle);
    return HandleTitle;
}
// 设置句柄对应的窗口的标题(不考虑参数正确性 在js中会定义类型安全)
static napi_value lookHandleSetTitle(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value SetTitleInfo;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    int64_t Process_Handle;
    status = napi_get_value_int64(env, args[0], &Process_Handle);
    HWND hWindow = (HWND)Process_Handle;
    string _Title_ = call_String_NAPI_WINAPI_A(env, args[1]);
    string To_U8_Title;
    To_U8_Title.append(_Title_.c_str());
    bool isWindowShow = SetWindowTextA(hWindow, (LPCSTR)_Title_.c_str());
    napi_get_boolean(env, isWindowShow, &SetTitleInfo);
    return SetTitleInfo;
}
UINT TextToUINT(string key)
{
    if (key == "MB_OK")
        return MB_OK;
    if (key == "MB_ABORTRETRYIGNORE")
        return MB_ABORTRETRYIGNORE;
    if (key == "MB_SERVICE_NOTIFICATION")
        return MB_SERVICE_NOTIFICATION;
    if (key == "MB_TOPMOST")
        return MB_TOPMOST;
    if (key == "MB_SETFOREGROUND")
        return MB_SETFOREGROUND;
    if (key == "MB_RTLREADING")
        return MB_RTLREADING;
    if (key == "MB_RIGHT")
        return MB_RIGHT;
    if (key == "MB_DEFAULT_DESKTOP_ONLY")
        return MB_DEFAULT_DESKTOP_ONLY;
    if (key == "MB_TASKMODAL")
        return MB_TASKMODAL;
    if (key == "MB_SYSTEMMODAL")
        return MB_SYSTEMMODAL;
    if (key == "MB_APPLMODAL")
        return MB_APPLMODAL;
    if (key == "MB_DEFBUTTON4")
        return MB_DEFBUTTON4;
    if (key == "MB_DEFBUTTON3")
        return MB_DEFBUTTON3;
    if (key == "MB_DEFBUTTON2")
        return MB_DEFBUTTON2;
    if (key == "MB_ICONHAND")
        return MB_ICONHAND;
    if (key == "MB_DEFBUTTON1")
        return MB_DEFBUTTON1;
    if (key == "MB_ICONERROR")
        return MB_ICONERROR;
    if (key == "MB_ICONSTOP")
        return MB_ICONSTOP;
    if (key == "MB_ICONQUESTION")
        return MB_ICONQUESTION;
    if (key == "MB_ICONASTERISK")
        return MB_ICONASTERISK;
    if (key == "MB_ICONINFORMATION")
        return MB_ICONINFORMATION;
    if (key == "MB_ICONWARNING")
        return MB_ICONWARNING;
    if (key == "MB_ICONEXCLAMATION")
        return MB_ICONEXCLAMATION;
    if (key == "MB_YESNOCANCEL")
        return MB_YESNOCANCEL;
    if (key == "MB_YESNO")
        return MB_YESNO;
    if (key == "MB_RETRYCANCEL")
        return MB_RETRYCANCEL;
    if (key == "MB_OKCANCEL")
        return MB_OKCANCEL;
    if (key == "MB_HELP")
        return MB_HELP;
    if (key == "MB_CANCELTRYCONTINUE")
        return MB_CANCELTRYCONTINUE;

    return MB_OK;
}
// 消息封装
static napi_value messageBox(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value MessageBoxInfo;
    size_t argc = 3;
    napi_value args[3];
    status = $napi_get_cb_info(argc, args);
    if (argc < 3)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
        return NULL;
    }
    for (size_t i = 0; i < 3; i++)
    {
        napi_valuetype valuetype;
        status = napi_typeof(env, args[i], &valuetype);
        assert(status == napi_ok);
        if (valuetype != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    string lpText = call_String_NAPI_WINAPI_A(env, args[0]);
    string lpCaption = call_String_NAPI_WINAPI_A(env, args[1]);
    string TextUINT = call_String_NAPI_WINAPI_A(env, args[2]);
    int To_MessageBoxA = MessageBoxA(NULL, (LPCSTR)lpText.c_str(), (LPCSTR)lpCaption.c_str(), TextToUINT(TextUINT));
    napi_create_int32(env, To_MessageBoxA, &MessageBoxInfo);
    return MessageBoxInfo;
}
// 消息封装
static napi_value alert(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value MessageBoxInfo;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    if (argc < 2)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
        return NULL;
    }
    for (size_t i = 0; i < 2; i++)
    {
        napi_valuetype valuetype;
        status = napi_typeof(env, args[i], &valuetype);
        assert(status == napi_ok);
        if (valuetype != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    string lpText = call_String_NAPI_WINAPI_A(env, args[0]);
    string lpCaption = call_String_NAPI_WINAPI_A(env, args[1]);
    int To_MessageBoxA = MessageBoxA(NULL, (LPCSTR)lpText.c_str(), (LPCSTR)lpCaption.c_str(), MB_OK);
    if (To_MessageBoxA == 1 || To_MessageBoxA == 6)
    {
        return _create_bool_Boolean(env, true);
    }
    else
    {
        return _create_bool_Boolean(env, false);
    }
}
static napi_value confirm(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value MessageBoxInfo;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    if (argc < 2)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
        return NULL;
    }
    for (size_t i = 0; i < 2; i++)
    {
        napi_valuetype valuetype;
        status = napi_typeof(env, args[i], &valuetype);
        assert(status == napi_ok);
        if (valuetype != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    string lpText = call_String_NAPI_WINAPI_A(env, args[0]);
    string lpCaption = call_String_NAPI_WINAPI_A(env, args[1]);
    int To_MessageBoxA = MessageBoxA(NULL, (LPCSTR)lpText.c_str(), (LPCSTR)lpCaption.c_str(), MB_OKCANCEL);
    if (To_MessageBoxA == 1 || To_MessageBoxA == 6)
    {
        return _create_bool_Boolean(env, true);
    }
    else
    {
        return _create_bool_Boolean(env, false);
    }
}
static napi_value MessageStop(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value MessageBoxInfo;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    if (argc < 2)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
        return NULL;
    }
    for (size_t i = 0; i < 2; i++)
    {
        napi_valuetype valuetype;
        status = napi_typeof(env, args[i], &valuetype);
        assert(status == napi_ok);
        if (valuetype != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    string lpText = call_String_NAPI_WINAPI_A(env, args[0]);
    string lpCaption = call_String_NAPI_WINAPI_A(env, args[1]);
    int To_MessageBoxA = MessageBoxA(NULL, (LPCSTR)lpText.c_str(), (LPCSTR)lpCaption.c_str(), MB_ICONERROR);
    return NULL;
}

static napi_value MessageError(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value MessageBoxInfo;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    if (argc < 2)
    {
        napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
        return NULL;
    }
    for (size_t i = 0; i < 2; i++)
    {
        napi_valuetype valuetype;
        status = napi_typeof(env, args[i], &valuetype);
        assert(status == napi_ok);
        if (valuetype != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    string lpText = call_String_NAPI_WINAPI_A(env, args[0]);
    string lpCaption = call_String_NAPI_WINAPI_A(env, args[1]);
    int To_MessageBoxA = MessageBoxA(NULL, (LPCSTR)lpText.c_str(), (LPCSTR)lpCaption.c_str(), MB_ICONEXCLAMATION);
    return NULL;
}

HWND GetHwndByPid(DWORD dwProcessID)
{
    HWND Look_Get_Top_Window_HWND = GetTopWindow(0);
    HWND Info_HWND = NULL;
    while (Look_Get_Top_Window_HWND)
    {
        DWORD pid = 0;
        DWORD of_TheardId = GetWindowThreadProcessId(Look_Get_Top_Window_HWND, &pid);
        if (of_TheardId != 0)
        {
            if (pid == dwProcessID && GetParent(Look_Get_Top_Window_HWND) == NULL && ::IsWindowVisible(Look_Get_Top_Window_HWND))
                Info_HWND = Look_Get_Top_Window_HWND;
        }
        Look_Get_Top_Window_HWND = GetNextWindow(Look_Get_Top_Window_HWND, GW_HWNDNEXT);
    }
    return Info_HWND;
}
// 获取进程id对应的窗口句柄 (如果有)
static napi_value getProcessHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value ProcessHandle;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }

    int Process_PID;
    status = napi_get_value_int32(env, args[0], &Process_PID);

    HANDLE GetProcessHandle = GetHwndByPid((DWORD)Process_PID);
    if (GetProcessHandle == nullptr)
    {
        napi_get_null(env, &ProcessHandle);
        return ProcessHandle;
    }
    napi_create_int64(env, int64_t(GetProcessHandle), &ProcessHandle);

    return ProcessHandle;
}

// 判断是否是64位系统
napi_value isSystemX64(napi_env env, napi_callback_info info)
{
    napi_value info_isAdmin;
    napi_get_boolean(env, isSystemFor64bit(), &info_isAdmin);
    return info_isAdmin;
}
// 获取折叠托盘窗口句柄
HWND GetNotifyOverflowTryHwnd()
{
    HWND hWnd = FindWindowW((LPCWSTR)L"NotifyIconOverflowWindow", NULL);
    hWnd = FindWindowExW(hWnd, NULL, (LPCWSTR)L"ToolbarWindow32", NULL);
    return hWnd;
}
// 获取托盘窗口句柄
HWND GetSystemTrayHwnd()
{
    HWND hWnd = FindWindowW((LPCWSTR)L"Shell_TrayWnd", NULL);
    if (hWnd)
    {
        hWnd = FindWindowExW(hWnd, NULL, (LPCWSTR)L"TrayNotifyWnd", NULL);
        if (hWnd)
        {
            hWnd = FindWindowExW(hWnd, NULL, (LPCWSTR)L"SysPager", NULL);
            if (hWnd)
                hWnd = FindWindowExW(hWnd, NULL, (LPCWSTR)L"ToolbarWindow32", NULL);
        }
    }
    if (!hWnd)
        return nullptr;
    return hWnd;
};

// 获取托盘图标
static napi_value getTrayList(napi_env env, napi_callback_info info)
{
    napi_status status;
    vector<HWND> Main_HWND_List;
    vector<string> Path_List;
    vector<string> Title_List;
    vector<long> Buttons_id_List;

    HWND hWndList[2] = {GetSystemTrayHwnd(), GetNotifyOverflowTryHwnd()};
    for (size_t i = 0; i < 2; i++)
    {
        HWND hWnd = hWndList[i];

        // 获取托盘进程ID
        DWORD dwProcessId = 0;
        GetWindowThreadProcessId(hWnd, &dwProcessId);
        if (dwProcessId == 0)
            break;

        // 获取托盘进程句柄
        HANDLE hProcess = OpenProcess(PROCESS_VM_OPERATION | PROCESS_VM_READ | PROCESS_VM_WRITE, FALSE, dwProcessId);
        if (hProcess == NULL)
            break;

        // 分配内存，用来接收 TBBUTTON 结构体
        LPVOID Pointer_Icon_Buttons = VirtualAllocEx(hProcess, 0, 4096, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
        if (Pointer_Icon_Buttons == NULL)
            break;
        // 初始化
        BYTE Byte_Buffer_Pointer[1024] = {0};
        DWORD Index_Icon_Buttons = 0;
        HWND Main_HWND = NULL;
        long Index_Icon_Buttons_id;
        int Index_data_Close_Set = 12;
        int Index_String_Close_Set = 18;

        // 判断 x64(64位和32位字数不一样)
        if (isSystemFor64bit())
        {
            Index_data_Close_Set += 4;
            Index_String_Close_Set += 6;
        }

        // 获取托盘图标个数
        int Tray_button_Length = 0;
        Tray_button_Length = SendMessage(hWnd, TB_BUTTONCOUNT, 0, 0);
        if (Tray_button_Length == 0)
            break;

        // 遍历托盘
        for (int i = 0; i < Tray_button_Length; i++)
        {
            // 获取 TBBUTTON 结构
            if (!SendMessage(hWnd, TB_GETBUTTON, i, (LPARAM)Pointer_Icon_Buttons))
                break;

            // 获取 TBBUTTON.dwData
            if (!ReadProcessMemory(hProcess, (LPVOID)((DWORD)Pointer_Icon_Buttons + Index_data_Close_Set), &Index_Icon_Buttons, 4, 0))
                break;
            // 解析文本
            if (Index_Icon_Buttons)
            {
                if (!ReadProcessMemory(hProcess, (LPCVOID)Index_Icon_Buttons, Byte_Buffer_Pointer, 1024, 0))
                    break;
                Main_HWND_List.push_back((*((HWND *)Byte_Buffer_Pointer)));
                Path_List.push_back(_W2U8_((WCHAR *)Byte_Buffer_Pointer + Index_String_Close_Set));
                Title_List.push_back(_W2U8_((WCHAR *)Byte_Buffer_Pointer + Index_String_Close_Set + MAX_PATH));
                Buttons_id_List.push_back(Index_Icon_Buttons_id);
            }

            Index_Icon_Buttons = 0;
        }
        if (VirtualFreeEx(hProcess, Pointer_Icon_Buttons, 0, MEM_RELEASE) == 0 || CloseHandle(hProcess) == 0)
            break;
    }
    napi_value lock_Process_ID_List;
    status = napi_create_array(env, &lock_Process_ID_List);
    for (unsigned index = 0; index < Main_HWND_List.size(); index++)
    {
        napi_value cur_item, cur_Index, cur_Path, cur_Name, Objcet_key_Name, Objcet_key_Pid, Objcet_key_Path;
        HWND _HWND_ = Main_HWND_List[index];
        string IndexName = Path_List[index];
        string FilePath = Title_List[index];
        long Buttons_id = Buttons_id_List[index];
        status = napi_create_int64(env, (int64_t)_HWND_, &cur_Index);
        status = napi_create_string_utf8(env, IndexName.c_str(), NAPI_AUTO_LENGTH, &cur_Name);
        status = napi_create_string_utf8(env, FilePath.c_str(), NAPI_AUTO_LENGTH, &cur_Path);
        status = napi_create_object(env, &cur_item);
        // {}.path
        string key_Name = "path";
        status = napi_create_string_utf8(env, key_Name.c_str(), NAPI_AUTO_LENGTH, &Objcet_key_Name);
        assert(status == napi_ok);
        // {}.handle
        string key_Process_id = "handle";
        status = napi_create_string_utf8(env, key_Process_id.c_str(), NAPI_AUTO_LENGTH, &Objcet_key_Pid);
        // {}.info
        string key_Process_Path = "info";
        status = napi_create_string_utf8(env, key_Process_Path.c_str(), NAPI_AUTO_LENGTH, &Objcet_key_Path);
        assert(status == napi_ok);
        // {handle:000,path:"123.exe",info:"是个图标"}
        status = napi_set_property(env, cur_item, Objcet_key_Name, cur_Name);
        status = napi_set_property(env, cur_item, Objcet_key_Pid, cur_Index);
        status = napi_set_property(env, cur_item, Objcet_key_Path, cur_Path);
        assert(status == napi_ok);
        // [].push({pid:000,name:"123.exe"})

        status = napi_set_element(env, lock_Process_ID_List, index, cur_item);
        assert(status == napi_ok);
    }

    return lock_Process_ID_List;
}
// 设置句柄的不透明度
static napi_value setHandleTransparent(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    int64_t Process_Handle;
    status = napi_get_value_int64(env, args[0], &Process_Handle);
    int Set_Process_Handle_Alpha;
    status = napi_get_value_int32(env, args[1], &Set_Process_Handle_Alpha);
    HWND hWnd = (HWND)Process_Handle;
    BYTE _Alpha = (BYTE)Set_Process_Handle_Alpha;
    // 获取窗口的拓展属性
    LONG SetWindowsStyleEx = ::GetWindowLong(hWnd, GWL_EXSTYLE);
    // 在原来的拓展属性之上, 新增 WS_EX_LAYERED 拓展属性
    SetWindowsStyleEx = SetWindowsStyleEx | WS_EX_LAYERED;
    ::SetWindowLong(hWnd, GWL_EXSTYLE, SetWindowsStyleEx);
    // 设置窗口半透明度
    ::SetLayeredWindowAttributes(hWnd, NULL, _Alpha, LWA_ALPHA);
    return NULL;
}
// 获取快捷方式内容
static napi_value getShortcutLink(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    napi_value Results;
    napi_create_object(env, &Results);
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        if (argc < 1)
        {
            napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
            return NULL;
        }
        napi_valuetype valuetype0;
        status = napi_typeof(env, args[0], &valuetype0);
        assert(status == napi_ok);
        if (valuetype0 != napi_string)
        {
            napi_throw_type_error(env, NULL, "Wrong Not napi_string arguments");
            return NULL;
        }
    }
    else
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return NULL;
    };
    // 图标路径
    wstring lnkPath = call_String_NAPI_WINAPI_W(env, args[0]);
    IShellLinkA *GetShellLinkContent;
    CoInitialize(0);
    char *tempGetPathString = new char[MAX_PATH];
    char *tempGetArgumentsString = new char[MAX_PATH];
    int tempGetShowCmdNum = 0;
    char *tempGetGetIconLocationString = new char[MAX_PATH];
    int piIcon = 0;
    char *tempGetGetDescriptionString = new char[MAX_PATH];
    char *tempGetWorkingDirectoryString = new char[MAX_PATH];
    WORD *pwHotkey = new WORD;
    string ss;
    HRESULT CreateHRESULT = CoCreateInstance(CLSID_ShellLink, NULL, CLSCTX_INPROC_SERVER, IID_IShellLink, (LPVOID *)&GetShellLinkContent);
    DWORD dwReserved;
    if (SUCCEEDED(CreateHRESULT))
    {
        IPersistFile *PersistFile;
        CreateHRESULT = GetShellLinkContent->QueryInterface(IID_IPersistFile, (LPVOID *)&PersistFile);
        if (SUCCEEDED(CreateHRESULT))
        {
            CreateHRESULT = PersistFile->Load(lnkPath.c_str(), STGM_READ);

            if (SUCCEEDED(CreateHRESULT))
            {
                WIN32_FIND_DATAA wfd;
                GetShellLinkContent->GetPath(tempGetPathString, MAX_PATH, &wfd, SLGP_UNCPRIORITY | SLGP_RAWPATH);
                GetShellLinkContent->GetShowCmd(&tempGetShowCmdNum);
                GetShellLinkContent->GetArguments(tempGetArgumentsString, MAX_PATH);
                GetShellLinkContent->GetDescription(tempGetGetDescriptionString, MAX_PATH);
                GetShellLinkContent->GetIconLocation(tempGetGetIconLocationString, MAX_PATH, &piIcon);
                GetShellLinkContent->GetWorkingDirectory(tempGetWorkingDirectoryString, MAX_PATH);
                GetShellLinkContent->GetHotkey(pwHotkey);
            }
        }
        else
        {
            return Results;
        }
    }
    napi_set_property(env, Results, _create_char_string(env, "path"), _create_A2U8_string(env, tempGetPathString));
    napi_set_property(env, Results, _create_char_string(env, "showCmd"), _create_int32_Number(env, tempGetShowCmdNum));
    napi_set_property(env, Results, _create_char_string(env, "args"), _create_A2U8_string(env, tempGetArgumentsString));
    napi_set_property(env, Results, _create_char_string(env, "desc"), _create_A2U8_string(env, tempGetGetDescriptionString));
    napi_set_property(env, Results, _create_char_string(env, "icon"), _create_A2U8_string(env, tempGetGetIconLocationString));
    napi_set_property(env, Results, _create_char_string(env, "iconIndex"), _create_int64_Number(env, piIcon));
    napi_set_property(env, Results, _create_char_string(env, "cwd"), _create_A2U8_string(env, tempGetWorkingDirectoryString));
    napi_set_property(env, Results, _create_char_string(env, "hotkey"), _create_int64_Number(env, (int64_t)pwHotkey));

    return Results;
}
// 获取快捷方式内容
static napi_value setShortcutLink(napi_env env, napi_callback_info info)
{
    // napi_status status;
    // napi_value Results;
    // 最高只接受这么多参数(请注意如果没有传入这么多的数据而获取会照成内存溢出)
    const size_t M_Size = 8;
    size_t argc = M_Size;
    napi_value argv[M_Size];
    $napi_get_cb_info(argc, argv);
    string lnkPath;
    string path;
    string desc;
    string work_dir;
    string Arguments;
    string icon;
    int iShowCmd;
    int iconIndex;
    string defaultParameterSettings = "\n\nThe number of target parameters is => 2-8 \nfor:\nlnkPath:string,\npath:string,\nwork_dir?:string,\ndesc?:string,\nargs?:string,\niShowCmd?:number,\nicon?:string,\niconIndex?:number\n\n";
    if (argc == 0 || argc == 1)
    {
        string ErrorString = "Wrong length of arguments =>";
        ErrorString.append(to_string(argc).c_str());
        ErrorString.append(defaultParameterSettings);
        napi_throw_type_error(env, NULL, ErrorString.c_str());
        return NULL;
    }

    for (int i = 0; i < argc; i++)
    {
        napi_valuetype value_type;
        napi_typeof(env, argv[i], &value_type);
        if (value_type != napi_string)
        {
            if ((i == 7 || i == 5) && value_type == napi_number)
                break;
            string ErrorString = "Missing parameters";
            ErrorString.append(to_string(argc).c_str());
            ErrorString.append(defaultParameterSettings).append("\nTypeof parameter :\n");
            for (int i = 0; i < argc; i++)
            {
                napi_valuetype value_type;
                napi_typeof(env, argv[i], &value_type);
                ErrorString.append("\nargc[")
                    .append(to_string(i))
                    .append("]:");
                ErrorString.append(_NAPI_Call_Type(value_type));
            }
            napi_throw_error(env, "EINVAL", ErrorString.c_str());
            return nullptr;
        };
    }
    // 遍历方法并进行定义(因为js是接受多种参数传入的)
    switch (argc)
    {
    case 2:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        break;
    case 3:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        work_dir.append(call_String_NAPI_WINAPI_A(env, argv[2]).c_str());
        break;
    case 4:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        work_dir.append(call_String_NAPI_WINAPI_A(env, argv[2]).c_str());
        desc.append(call_String_NAPI_WINAPI_A(env, argv[3]).c_str());
        break;
    case 5:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        work_dir.append(call_String_NAPI_WINAPI_A(env, argv[2]).c_str());
        desc.append(call_String_NAPI_WINAPI_A(env, argv[3]).c_str());
        Arguments.append(call_String_NAPI_WINAPI_A(env, argv[4]).c_str());
        break;
    case 6:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        work_dir.append(call_String_NAPI_WINAPI_A(env, argv[2]).c_str());
        desc.append(call_String_NAPI_WINAPI_A(env, argv[3]).c_str());
        Arguments.append(call_String_NAPI_WINAPI_A(env, argv[4]).c_str());
        napi_get_value_int32(env, argv[5], &iShowCmd);
        break;
    case 7:
        defaultParameterSettings.insert(0, "The iconIndex must be included when the parameter equals 7");
        napi_throw_type_error(env, NULL, defaultParameterSettings.c_str());
        break;
    case 8:
        lnkPath.append(call_String_NAPI_WINAPI_A(env, argv[0]).c_str());
        path.append(call_String_NAPI_WINAPI_A(env, argv[1]).c_str());
        work_dir.append(call_String_NAPI_WINAPI_A(env, argv[2]).c_str());
        desc.append(call_String_NAPI_WINAPI_A(env, argv[3]).c_str());
        Arguments.append(call_String_NAPI_WINAPI_A(env, argv[4]).c_str());
        napi_get_value_int32(env, argv[5], &iShowCmd);
        icon.append(call_String_NAPI_WINAPI_A(env, argv[6]).c_str());
        napi_get_value_int32(env, argv[7], &iconIndex);
        break;
    }
    HRESULT hRes = CoInitialize(NULL);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ESRCH", "HRESULT->CoCreateInstance Failed to create");
        return nullptr;
    }
    IShellLinkA *pIShellLink;
    hRes = ::CoCreateInstance(CLSID_ShellLink, nullptr, CLSCTX_INPROC_SERVER, IID_IShellLink, (void **)&pIShellLink);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ESRCH", "HRESULT->CoCreateInstance Failed to create");
        return nullptr;
    }
    hRes = pIShellLink->SetPath((LPCSTR)path.c_str());
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetPath");
        return nullptr;
    }
    hRes = pIShellLink->SetDescription((LPCSTR)desc.c_str());
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetDescription");
        return nullptr;
    }
    hRes = pIShellLink->SetWorkingDirectory((LPCSTR)work_dir.c_str());
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetWorkingDirectory");
        return nullptr;
    }
    hRes = pIShellLink->SetArguments((LPCSTR)Arguments.c_str());
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetArguments");
        return nullptr;
    }
    hRes = pIShellLink->SetShowCmd(iShowCmd);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetArguments");
        return nullptr;
    }
    hRes = pIShellLink->SetShowCmd(iShowCmd);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetArguments");
        return nullptr;
    }
    hRes = pIShellLink->SetIconLocation((LPCSTR)icon.c_str(), iconIndex);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => SetArguments");
        return nullptr;
    }
    IPersistFile *pIPersistFile;
    hRes = pIShellLink->QueryInterface(IID_IPersistFile, (void **)&pIPersistFile);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => QueryInterface");
        return nullptr;
    }

    hRes = pIPersistFile->Save(_A2W_(lnkPath.c_str()).c_str(), FALSE);
    if (!SUCCEEDED(hRes))
    {
        napi_throw_error(env, "ENOEXEC", "Error => Save");
        return nullptr;
    }
    pIPersistFile->Release();
    pIShellLink->Release();
    return NULL;
}
// 获取句柄对应的pid
static napi_value getHandleProcessID(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    DWORD processId;
    GetWindowThreadProcessId((HWND)NumHandle, &processId);
    return _create_int64_Number(env, (int64_t)processId);
}
// 获取活动窗口的pid
static napi_value getForegroundWindowProcessID(napi_env env, napi_callback_info info)
{
    DWORD processId;
    GetWindowThreadProcessId(GetForegroundWindow(), &processId);
    return _create_int64_Number(env, (int64_t)processId);
}

// 获取鼠标位置
napi_value getMetrics(napi_env env, napi_callback_info info)
{
    POINT point;
    napi_value Results;
    napi_create_object(env, &Results);
    GetCursorPos(&point);
    int x = point.x; // 鼠标x轴
    int y = point.y; // 鼠标y轴
    napi_set_property(env, Results, _create_char_string(env, "x"), _create_int32_Number(env, x));
    napi_set_property(env, Results, _create_char_string(env, "y"), _create_int32_Number(env, y));
    napi_set_property(env, Results, _create_char_string(env, "left"), _create_int32_Number(env, x));
    napi_set_property(env, Results, _create_char_string(env, "top"), _create_int32_Number(env, y));
    return Results;
}
// 获取屏幕大小
napi_value getDeviceCaps(napi_env env, napi_callback_info info)
{
    napi_value Results;
    napi_create_object(env, &Results);
    int width = GetSystemMetrics(SM_CXSCREEN);  // 鼠标x轴
    int height = GetSystemMetrics(SM_CYSCREEN); // 鼠标y轴
    napi_set_property(env, Results, _create_char_string(env, "width"), _create_int32_Number(env, width));
    napi_set_property(env, Results, _create_char_string(env, "height"), _create_int32_Number(env, height));
    return Results;
}
// 获取鼠标位置窗口
napi_value getPointWindow(napi_env env, napi_callback_info info)
{
    POINT curPoint;
    if (!GetCursorPos(&curPoint))
        return _create_int64_Number(env, 0);
    HWND mainWindow = WindowFromPoint(curPoint);
    return _create_int64_Number(env, (int64_t)mainWindow);
}
// 获取鼠标位置窗口的名称
napi_value getPointWindowName(napi_env env, napi_callback_info info)
{
    POINT curPoint;
    if (!GetCursorPos(&curPoint))
        return _create_int64_Number(env, 0);
    HWND mainWindow = WindowFromPoint(curPoint);
    DWORD processId;
    GetWindowThreadProcessId(mainWindow, &processId);
    HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, processId);
    char lpFilename[1024];
    if (hProcess == nullptr)
    {
        return _create_A2U8_string(env, "");
    }
    GetModuleBaseNameA(hProcess, NULL, (LPSTR)lpFilename, 1024);
    return _create_A2U8_string(env, lpFilename);
}
// 获取鼠标位置窗口的pid
napi_value getPointWindowProcessId(napi_env env, napi_callback_info info)
{
    POINT curPoint;
    if (!GetCursorPos(&curPoint))
        return _create_int64_Number(env, 0);
    HWND mainWindow = WindowFromPoint(curPoint);
    DWORD processId;
    GetWindowThreadProcessId(mainWindow, &processId);
    return _create_int32_Number(env, (int64_t)processId);
}
napi_value getPointWindowMain(napi_env env, napi_callback_info info)
{
    napi_value ProcessHandle;
    POINT curPoint;
    if (!GetCursorPos(&curPoint))
        return _create_int64_Number(env, 0);
    HWND mainWindow = WindowFromPoint(curPoint);
    DWORD processId;
    GetWindowThreadProcessId(mainWindow, &processId);
    HANDLE GetProcessHandle = GetHwndByPid((DWORD)processId);

    if (GetProcessHandle == nullptr)
    {
        napi_get_null(env, &ProcessHandle);
        return ProcessHandle;
    }

    napi_create_int64(env, int64_t(GetProcessHandle), &ProcessHandle);
    return ProcessHandle;
}
// 获取窗口位置大小信息
static napi_value getWindowRect(napi_env env, napi_callback_info info)
{
    napi_value Results;
    napi_create_object(env, &Results);
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    int64_t Process_Handle;
    status = napi_get_value_int64(env, args[0], &Process_Handle);
    napi_value DefaultValue = _create_int32_Number(env, 0);
    napi_set_property(env, Results, _create_char_string(env, "top"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "bottom"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "left"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "right"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "y"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "x"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "width"), DefaultValue);
    napi_set_property(env, Results, _create_char_string(env, "height"), DefaultValue);

    HWND hHWND = (HWND)Process_Handle;
    if (hHWND)
    {
        // 获取窗口原始大小
        RECT lpRect;
        GetWindowRect(hHWND, &lpRect);
        napi_set_property(env, Results, _create_char_string(env, "top"), _create_int32_Number(env, lpRect.top));
        napi_set_property(env, Results, _create_char_string(env, "bottom"), _create_int32_Number(env, lpRect.bottom));
        napi_set_property(env, Results, _create_char_string(env, "left"), _create_int32_Number(env, lpRect.left));
        napi_set_property(env, Results, _create_char_string(env, "right"), _create_int32_Number(env, lpRect.right));
        napi_set_property(env, Results, _create_char_string(env, "y"), _create_int32_Number(env, lpRect.top));
        napi_set_property(env, Results, _create_char_string(env, "x"), _create_int32_Number(env, lpRect.left));
        napi_set_property(env, Results, _create_char_string(env, "width"), _create_int32_Number(env, lpRect.right - lpRect.left));
        napi_set_property(env, Results, _create_char_string(env, "height"), _create_int32_Number(env, lpRect.top - lpRect.bottom));
    }
    return Results;
}
// 设置窗口大小
static napi_value setWindowMode(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 5;
    napi_value args[5];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        if (argc < 5)
        {
            napi_throw_type_error(env, NULL, "Wrong length of arguments =>" + argc);
            return _create_bool_Boolean(env, FALSE);
        }
        for (size_t i = 0; i < argc; i++)
        {
            napi_valuetype valuetype;
            status = napi_typeof(env, args[i], &valuetype);
            assert(status == napi_ok);
            if (valuetype != napi_number && valuetype != napi_null)
            {
                napi_throw_type_error(env, NULL, "Wrong Not napi_number arguments");
                return _create_bool_Boolean(env, FALSE);
            }
        }
    }
    else
    {
        napi_throw_type_error(env, NULL, "Wrong arguments");
        return _create_bool_Boolean(env, FALSE);
    };
    int64_t Process_HWND;
    napi_get_value_int64(env, args[0], &Process_HWND);
    int x;
    napi_get_value_int32(env, args[1], &x);
    int y;
    napi_get_value_int32(env, args[2], &y);
    int width;
    napi_get_value_int32(env, args[3], &width);
    int height;
    napi_get_value_int32(env, args[4], &height);
    // 获取窗口原始大小
    HWND hHWND = (HWND)Process_HWND;
    if (hHWND)
    {
        RECT rect;
        GetWindowRect(hHWND, &rect);
        int DeviceCapsWidth = GetSystemMetrics(SM_CXSCREEN);
        int DeviceCapsHeight = GetSystemMetrics(SM_CYSCREEN);
        int Env_height = (DeviceCapsHeight - rect.top) - (DeviceCapsHeight - rect.bottom);
        int Env_width = (DeviceCapsWidth - rect.left) - (DeviceCapsWidth - rect.right);

        // 重新设置窗口大小
        MoveWindow(hHWND, x == 0 ? rect.left : x, y == 0 ? rect.top : y, width < 1 ? Env_width : width, height < 1 ? Env_height : height, true);
        return _create_bool_Boolean(env, TRUE);
    }
    else
    {
        return _create_bool_Boolean(env, FALSE);
    }
}

// 结束句柄对应的窗口
static napi_value closedHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    SendMessage(Handle, WM_SYSCOMMAND, SC_CLOSE, 0);
    // 让win可以回收该句柄
    CloseHandle(Handle);
    return NULL;
}

// 设置/取消窗口顶设
static napi_value setWindowTop(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    RECT rect;
    if (!GetWindowRect(Handle, &rect))
        return _create_bool_Boolean(env, FALSE);
    if (GetWindowLong(Handle, GWL_EXSTYLE) & WS_EX_TOPMOST)
    {
        return _create_bool_Boolean(env, SetWindowPos(Handle, HWND_NOTOPMOST, rect.left, rect.top, abs(rect.right - rect.left), abs(rect.bottom - rect.top), SWP_SHOWWINDOW));
    }
    else
        return _create_bool_Boolean(env, SetWindowPos(Handle, HWND_TOPMOST, rect.left, rect.top, abs(rect.right - rect.left), abs(rect.bottom - rect.top), SWP_SHOWWINDOW));
}

// 判断是否窗口顶设
static napi_value hasWindowTop(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_bool_Boolean(env, GetWindowLong(Handle, GWL_EXSTYLE) & WS_EX_TOPMOST);
}

// 判断该句柄是否有效
static napi_value isHandle(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_bool_Boolean(env, GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle));
}
// 获取子窗口的父窗口
static napi_value getMainWindow(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_int64_Number(env, (int64_t)GetTopWindow(Handle));
}
// 判断该句柄是否有效
static napi_value isEnabled(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_bool_Boolean(env, IsWindowEnabled(Handle));
}
// 设置窗口禁用
static napi_value setWindowEnabled(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t M_size = 2;
    size_t argc = M_size;
    napi_value args[M_size];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = M_size;
        napi_value args[M_size];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    bool is_WindowEnabledCommand;
    napi_get_value_bool(env, args[0], &is_WindowEnabledCommand);
    return _create_bool_Boolean(env, EnableWindow(Handle, is_WindowEnabledCommand));
}

HWND SetWindowJitter_Handle;
int SetWindowJitter_Sleep_time = 50;   // 休眠的时间，为60毫秒
int SetWindowJitter_Move_distance = 6; // 移动5像素

void SetWindowJitter()
{
    RECT rect;
    // 获取指定窗口的位置
    if (!GetWindowRect(SetWindowJitter_Handle, &rect))
        return;
    int DeviceCapsWidth = GetSystemMetrics(SM_CXSCREEN);
    int DeviceCapsHeight = GetSystemMetrics(SM_CYSCREEN);
    // 计算出来源来的宽高 屏幕和坐标的减法可以得到窗口大小(带阴影)
    int Env_height = (DeviceCapsHeight - rect.top) - (DeviceCapsHeight - rect.bottom);
    int Env_width = (DeviceCapsWidth - rect.left) - (DeviceCapsWidth - rect.right);
    // 抖动6次
    for (size_t i = 0; i < 6; i++)
    {
        MoveWindow(SetWindowJitter_Handle, rect.left + SetWindowJitter_Move_distance, rect.top + SetWindowJitter_Move_distance - 3, Env_width, Env_height, TRUE);
        Sleep(SetWindowJitter_Sleep_time);
        MoveWindow(SetWindowJitter_Handle, rect.left, rect.top, Env_width, Env_height, TRUE);
        Sleep(SetWindowJitter_Sleep_time);
        MoveWindow(SetWindowJitter_Handle, rect.left - SetWindowJitter_Move_distance, rect.top - SetWindowJitter_Move_distance - 3, Env_width, Env_height, TRUE);
        Sleep(SetWindowJitter_Sleep_time);
        MoveWindow(SetWindowJitter_Handle, rect.left, rect.top, Env_width, Env_height, TRUE);
    }
}
// 窗口抖动
static napi_value windowJitter(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    SetWindowJitter_Handle = (HWND)NumHandle;
    std::thread(SetWindowJitter).detach();
    return NULL;
}
// 设置窗口焦点
static napi_value setWindowFocus(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_bool_Boolean(env, SetFocus(Handle));
}
// 判断该句柄是否有效
static napi_value updateWindow(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = 1;
        napi_value args[1];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    return _create_bool_Boolean(env, UpdateWindow(Handle));
}
// 获取所有窗口
static napi_value getAllWindows(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Results;
    status = napi_create_array(env, &Results);
    assert(status == napi_ok);
    // 获取桌面句柄
    HWND hwnd = GetDesktopWindow();
    // 获取桌面子窗口句柄
    hwnd = GetWindow(hwnd, GW_CHILD);
    int counter = 0;
    for (size_t index = 0; hwnd != NULL; index++)
    {
        DWORD dwStyle = GetClassLong(hwnd, GCL_STYLE);
        LPSTR lpClassName;
        RECT lpRect;
        // 获取窗口大小
        DwmGetWindowAttribute(hwnd, DWMWA_EXTENDED_FRAME_BOUNDS, &lpRect, sizeof(RECT));
        // 获取窗口名
        CHAR windowTitle[MAX_PATH] = {0};
        GetWindowTextA(hwnd, windowTitle, MAX_PATH);
        GetClassNameA(hwnd, lpClassName, MAX_PATH);
        int DeviceCapsWidth = GetSystemMetrics(SM_CXSCREEN);
        int DeviceCapsHeight = GetSystemMetrics(SM_CYSCREEN);
        // 窗口位置
        napi_value coordinateInformation;
        status = napi_create_object(env, &coordinateInformation);
        assert(status == napi_ok);
        napi_set_property(env, coordinateInformation, _create_char_string(env, "top"), _create_int32_Number(env, lpRect.top));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "bottom"), _create_int32_Number(env, lpRect.bottom));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "left"), _create_int32_Number(env, lpRect.left));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "right"), _create_int32_Number(env, lpRect.right));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "y"), _create_int32_Number(env, lpRect.top));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "x"), _create_int32_Number(env, lpRect.left));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "width"), _create_int32_Number(env, (DeviceCapsWidth - lpRect.left) - (DeviceCapsWidth - lpRect.right)));
        napi_set_property(env, coordinateInformation, _create_char_string(env, "height"), _create_int32_Number(env, (DeviceCapsHeight - lpRect.top) - (DeviceCapsHeight - lpRect.bottom)));
        // {handle,rect:coordinateInformation,title}
        napi_value PushwindowContents;
        status = napi_create_object(env, &PushwindowContents);
        assert(status == napi_ok);
        // napi_set_property(env, PushwindowContents, _create_char_string(env, "rect"), coordinateInformation);
        napi_set_property(env, PushwindowContents, _create_char_string(env, "title"), _create_A2U8_string(env, windowTitle));
        napi_set_property(env, PushwindowContents, _create_char_string(env, "handle"), _create_int64_Number(env, (int64_t)hwnd));
        napi_set_property(env, PushwindowContents, _create_char_string(env, "style"), _create_int64_Number(env, (int64_t)dwStyle));
        napi_set_property(env, PushwindowContents, _create_char_string(env, "className"), _create_A2U8_string(env, lpClassName));
        status = napi_set_element(env, Results, counter, PushwindowContents);
        assert(status == napi_ok);
        hwnd = GetNextWindow(hwnd, GW_HWNDNEXT);
        counter = counter + 1;
    }

    return Results;
}
static napi_value getAllWindowsNot(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Results;
    status = napi_create_array(env, &Results);
    assert(status == napi_ok);
    return Results;
}

// 隐藏托盘图标
static napi_value SetWindowInTaskbarVisible(napi_env env, napi_callback_info info)
{
    napi_status status;
    const size_t M_size = 2;
    size_t argc = M_size;
    napi_value args[M_size];
    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc)
    {
        size_t argc = M_size;
        napi_value args[M_size];
        status = $napi_get_cb_info(argc, args);
        assert(status == napi_ok);
    }
    int64_t NumHandle;
    napi_get_value_int64(env, args[0], &NumHandle);
    HWND Handle = (HWND)NumHandle;
    bool is_WindowEnabledCommand;
    napi_get_value_bool(env, args[1], &is_WindowEnabledCommand);
    // 初始化COM
    LPVOID lp_COM = NULL;
    CoInitialize(lp_COM);
    // 获取托盘
    HRESULT hr;
    ITaskbarList *pTaskbarList;
    hr = CoCreateInstance(CLSID_TaskbarList, NULL, CLSCTX_INPROC_SERVER, IID_ITaskbarList, (void **)&pTaskbarList);
    // 开始操作
    if (SUCCEEDED(hr))
    {
        pTaskbarList->HrInit();
        if (is_WindowEnabledCommand)
            pTaskbarList->AddTab(Handle);
        else
            pTaskbarList->DeleteTab(Handle);
        pTaskbarList->Release();
        return _create_true_Boolean(env);
    }
    return _create_false_Boolean(env);
}

static napi_value SetBlockInput(napi_env env, napi_callback_info info)
{
    napi_status status;
    // 最高只接受这么多参数(请注意如果没有传入这么多的数据而获取会照成内存溢出)
    const size_t M_Size = 1;
    size_t argc = M_Size;
    napi_value args[M_Size];
    status = $napi_get_cb_info(argc, args);
    // int parameter_01;
    if (argc == 0)
        napi_throw_type_error(env, NULL, "Wrong arguments size=> 0\n parameter_01:boolean");
    bool Set_Block;
    napi_get_value_bool(env, args[0], &Set_Block);
    return _create_bool_Boolean(env, BlockInput(Set_Block));
}

static napi_value CallSystem(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Results;
    // 最高只接受这么多参数(请注意如果没有传入这么多的数据而获取会照成内存溢出)
    const size_t M_Size = 1;
    size_t argc = M_Size;
    napi_value args[M_Size];
    status = $napi_get_cb_info(argc, args);
    string Command = call_String_NAPI_WINAPI_A(env, args[0]);
    int int_Results = system(Command.c_str());
    Results = _create_int64_Number(env, int_Results);
    return Results;
}

BOOL lockSystemInteraction(bool lockb = false)
{
    HINSTANCE hIn = NULL;
    hIn = LoadLibraryA("user32.dll");
    if (hIn)
    {
        BOOL(_stdcall * BlockInput)
        (BOOL bFlag);
        BlockInput = (BOOL(_stdcall *)(BOOL bFlag))GetProcAddress(hIn, "BlockInput");
        if (BlockInput)
            return !!BlockInput(lockb);
        else
            return FALSE;
    }
    else
        return FALSE;
    return FALSE;
}

static napi_value SetSystemHOOK(napi_env env, napi_callback_info info)
{
    napi_status status;
    // 最高只接受这么多参数(请注意如果没有传入这么多的数据而获取会照成内存溢出)
    const size_t M_Size = 1;
    size_t argc = M_Size;
    napi_value args[M_Size];
    status = $napi_get_cb_info(argc, args);
    // int parameter_01;
    if (argc == 0)
        napi_throw_type_error(env, NULL, "Wrong arguments size=> 0\n parameter_01:boolean");
    bool Set_Block;
    napi_get_value_bool(env, args[0], &Set_Block);
    return _create_bool_Boolean(env, lockSystemInteraction(Set_Block));
}

napi_value openURL(napi_env env, napi_callback_info info)
{
    napi_value argv[1];
    size_t argc = 1;
    napi_status status;
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

    // 检查我们是否有3个参数 - Hive, Path, Name
    if (argc < 1)
    {
        napi_throw_error(env, "EINVAL", "Wrong number of arguments");
        return nullptr;
    }

    // 检索3个参数
    for (int i = 0; i < 1; i++)
    {
        napi_valuetype value_type;
        napi_typeof(env, argv[i], &value_type);
        if (value_type != napi_string)
        {
            napi_throw_error(env, "EINVAL", "Missing parameters");
            return nullptr;
        };
    }

    string URL_String = call_String_NAPI_WINAPI_A(env, argv[0]);
    HINSTANCE hResult = ShellExecuteA(NULL, "open", URL_String.c_str(), NULL, NULL, SW_SHOWNORMAL);
    // return  _create_int64_Number(env,long(hResult));
    return _create_bool_Boolean(env, long long(hResult) >= 31);
}

napi_value openExternal(napi_env env, napi_callback_info info)
{
    napi_value argv[1];
    size_t argc = 1;
    napi_status status;
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

    // 检查我们是否有3个参数 - Hive, Path, Name
    if (argc < 1)
    {
        napi_throw_error(env, "EINVAL", "Wrong number of arguments");
        return nullptr;
    }

    // 检索3个参数
    for (int i = 0; i < 1; i++)
    {
        napi_valuetype value_type;
        napi_typeof(env, argv[i], &value_type);
        if (value_type != napi_string)
        {
            napi_throw_error(env, "EINVAL", "Missing parameters");
            return nullptr;
        };
    }

    string PATH_String = call_String_NAPI_WINAPI_A(env, argv[0]);
    string ExploerCmd = string("/select, \"");

    HINSTANCE hResult = ShellExecuteA(NULL, "open", "explorer.exe", ExploerCmd.append(PATH_String.c_str()).append("\"").c_str(), NULL, SW_SHOWNORMAL);
    // return  _create_int64_Number(env,long(hResult));

    return _create_bool_Boolean(env, long long(hResult) >= 31);
}

napi_value openPath(napi_env env, napi_callback_info info)
{
    napi_value argv[1];
    size_t argc = 1;
    napi_status status;
    status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

    // 检查我们是否有3个参数 - Hive, Path, Name
    if (argc < 1)
    {
        napi_throw_error(env, "EINVAL", "Wrong number of arguments");
        return nullptr;
    }

    // 检索3个参数
    for (int i = 0; i < 1; i++)
    {
        napi_valuetype value_type;
        napi_typeof(env, argv[i], &value_type);
        if (value_type != napi_string)
        {
            napi_throw_error(env, "EINVAL", "Missing parameters");
            return nullptr;
        };
    }

    HINSTANCE hResult = ShellExecuteA(NULL, "open", "explorer.exe", call_String_NAPI_WINAPI_A(env, argv[0]).c_str(), NULL, SW_SHOWNORMAL);
    return _create_bool_Boolean(env, long long(hResult) >= 31);
}

//? 软链接/硬链接 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

static napi_value createDirSymlink(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value args[2];

    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc <= 2)
    {
        for (size_t i = 0; i < argc; i++)
        {
            napi_valuetype type_value;
            napi_typeof(env, args[i], &type_value);
            if (type_value != napi_string)
            {
                napi_throw_type_error(env, 0, string("The input parameter is not legal and should be string").append("\n\nvalue").append(to_string(i)).append("_type:").append(_NAPI_Call_Type(type_value)).c_str());
                return NULL;
            }
        }
    }
    else
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
        return NULL;
    }

    bool mk_OK = false;
    string mapPath = call_String_NAPI_WINAPI_A(env, args[0]);
    string sourcePath = call_String_NAPI_WINAPI_A(env, args[1]);
    mk_OK = CreateSymbolicLinkA(mapPath.c_str(), sourcePath.c_str(), 0x1);
    return _create_bool_Boolean(env, mk_OK);
}

static napi_value createSymlink(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value args[2];

    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc <= 2)
    {
        for (size_t i = 0; i < argc; i++)
        {
            napi_valuetype type_value;
            napi_typeof(env, args[i], &type_value);
            if (type_value != napi_string)
            {
                napi_throw_type_error(env, 0, string("The input parameter is not legal and should be string").append("\n\nvalue").append(to_string(i)).append("_type:").append(_NAPI_Call_Type(type_value)).c_str());
                return NULL;
            }
        }
    }
    else
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
        return NULL;
    }

    bool mk_OK = false;
    string mapPath = call_String_NAPI_WINAPI_A(env, args[0]);
    string sourcePath = call_String_NAPI_WINAPI_A(env, args[1]);
    mk_OK = CreateSymbolicLinkA(mapPath.c_str(), sourcePath.c_str(), 0x0);
    return _create_bool_Boolean(env, mk_OK);
}

static napi_value createHardLink(napi_env env, napi_callback_info info)
{
    napi_status status;
    //    napi_value isOK;
    size_t argc = 2;
    napi_value args[2];

    status = $napi_get_cb_info(argc, args);
    assert(status == napi_ok);
    if (argc <= 2)
    {
        for (size_t i = 0; i < argc; i++)
        {
            napi_valuetype type_value;
            napi_typeof(env, args[i], &type_value);
            if (type_value != napi_string)
            {
                napi_throw_type_error(env, 0, string("The input parameter is not legal and should be string").append("\n\nvalue").append(to_string(i)).append("_type:").append(_NAPI_Call_Type(type_value)).c_str());
                return NULL;
            }
        }
    }
    else
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
        return NULL;
    }
    bool mk_OK = false;
    string mapPath = call_String_NAPI_WINAPI_A(env, args[0]);
    string sourcePath = call_String_NAPI_WINAPI_A(env, args[1]);
    mk_OK = CreateHardLinkA(mapPath.c_str(), sourcePath.c_str(), NULL);
    return _create_bool_Boolean(env, mk_OK);
}

vector<HWND> enumChildWindowsList;

static BOOL CALLBACK enumchildWindowCallback(HWND hWnd, LPARAM lparam)
{
    enumChildWindowsList.push_back(hWnd);
    // cout << hWnd <<endl;
    return TRUE;
}

static napi_value enumChildWindows(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value ResultsHandleList;
    status = napi_create_array(env, &ResultsHandleList);
    if (status != napi_ok)
        return ResultsHandleList;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    if (status != napi_ok)
        return ResultsHandleList;
    if (!argc)
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
    }
    // get HWND
    int64_t NumHandle;
    status = napi_get_value_int64(env, args[0], &NumHandle);
    if (status != napi_ok)
        return ResultsHandleList;
    HWND Handle = (HWND)NumHandle;

    // is the handle
    if (!(GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle)))
        return ResultsHandleList;
    // enum
    enumChildWindowsList.clear();

    // LPARAM lm = (LPARAM)&parm; //获取结构体地址

    EnumChildWindows(Handle, enumchildWindowCallback, NULL);
    int oidSize = enumChildWindowsList.size();
    switch (true)
    {
        int sizes = enumChildWindowsList.size();
        Sleep(2);
        if (oidSize == sizes)
        {
            oidSize = sizes;
            Sleep(3);
            if (oidSize == enumChildWindowsList.size())
                break;
        }
        oidSize = sizes;
    }
    for (size_t i = 0; i < enumChildWindowsList.size(); i++)
    {
        status = napi_set_element(env, ResultsHandleList, i, _create_int64_Number(env, (int64_t)enumChildWindowsList[i]));
        if (status != napi_ok)
        {
            enumChildWindowsList.clear();
            return ResultsHandleList;
        }
    }
    enumChildWindowsList.clear();
    return ResultsHandleList;
}

/**
 * @brief 调用系统回收站api
 *
 * @param FromPath 处理的文件名称
 * @param bRecycle 允许放回回收站
 * @param isShow 取消静默
 * @return int
 */
static int API_DeleteFile(string FromPath, bool bRecycle, bool isShow)
{
    SHFILEOPSTRUCTA FileOp = {0};
    if (bRecycle)
    {
        if (isShow)
        {
            FileOp.fFlags |= FOF_ALLOWUNDO;
        }
        else
        {
            FileOp.fFlags |= FOF_ALLOWUNDO | FOF_NOCONFIRMATION;
        }
    }
    FileOp.pFrom = FromPath.c_str();
    FileOp.pTo = NULL;        // 一定要是NULL
    FileOp.wFunc = FO_DELETE; // 删除操作
    return SHFileOperationA(&FileOp);
}

static napi_value deleteFile(napi_env env, napi_callback_info info)
{
    napi_value Results = _create_int32_Number(env, 0x10000);
    napi_status status;
    size_t argc = 3;
    napi_value argv[3];
    bool isShow = false;
    bool bRecycle = true;
    status = $napi_get_cb_info(argc, argv);
    if (status != napi_ok)
    {
        return Results;
    };
    hmc_is_argc_size(argc, 1, Results);
    hmc_is_argv_type(argv, 0, 1, napi_string, Results);
    // 检索3个参数合法性
    switch (argc)
    {
    case 2:
        hmc_is_argv_type(argv, 1, 2, napi_boolean, Results);
        napi_get_value_bool(env, argv[1], &bRecycle);
        break;
    case 3:
        hmc_is_argv_type(argv, 1, 3, napi_boolean, Results);
        napi_get_value_bool(env, argv[1], &bRecycle);
        napi_get_value_bool(env, argv[2], &isShow);
        break;
    }
    string Paths = call_String_NAPI_WINAPI_A(env, argv[0]);
    int Info = API_DeleteFile(Paths, bRecycle, isShow);
    Results = _create_int32_Number(env, Info);
    return Results;
}

// 获取屏幕个数
int GetSystemMetricsLen()
{

    return (int)GetSystemMetrics(SM_CMONITORS);
}

// 获取所有屏幕的位置
vector<RECT> GetDeviceCapsAll()
{
    vector<RECT> CrectList;
    DISPLAY_DEVICE displayDevice;
    ZeroMemory(&displayDevice, sizeof(displayDevice));
    displayDevice.cb = sizeof(displayDevice);
    DEVMODE devMode;
    ZeroMemory(&devMode, sizeof(devMode));
    devMode.dmSize = sizeof(devMode);

    for (int i = 0; EnumDisplayDevices(NULL, i, &displayDevice, 0); ++i)
    {
        if (EnumDisplaySettings(displayDevice.DeviceName, ENUM_CURRENT_SETTINGS, &devMode))
        {
            int left = devMode.dmPosition.x;
            int top = devMode.dmPosition.y;
            int right = devMode.dmPosition.x + devMode.dmPelsWidth;
            int bottom = devMode.dmPosition.y + devMode.dmPelsHeight;
            RECT rect;
            rect.bottom = bottom;
            rect.left = left;
            rect.top = top;
            rect.right = right;
            CrectList.push_back(rect);
        }
    }
    return CrectList;
}

// 获取鼠标所在的屏幕的位置信息
RECT GetCurrentMonitorRect()
{
    RECT rcRet;
    rcRet.bottom = 0;
    rcRet.left = 0;
    rcRet.right = 0;
    rcRet.top = 0;
    POINT point;
    GetCursorPos(&point);
    static vector<RECT> DeviceCapsRectList = GetDeviceCapsAll();
    for (const RECT &DeviceCapsRectItme : DeviceCapsRectList)
    {

        if (::PtInRect(&DeviceCapsRectItme, point))
        {
            rcRet = DeviceCapsRectItme;
            break;
        }
    }
    return rcRet;
}

static napi_value getSystemMetricsLen(napi_env env, napi_callback_info info)
{
    napi_value Results;
    Results = _create_int32_Number(env, GetSystemMetricsLen());
    return Results;
}

static napi_value getCurrentMonitorRect(napi_env env, napi_callback_info info)
{
    napi_value Results;
    napi_status status;
    status = napi_create_object(env, &Results);
    if (status != napi_ok)
    {
        return Results;
    };
    RECT rect = GetCurrentMonitorRect();
    status = napi_set_property(env, Results, _create_char_string(env, "left"), _create_int32_Number(env, (int)rect.left));
    if (status != napi_ok)
    {
        return Results;
    };
    status = napi_set_property(env, Results, _create_char_string(env, "top"), _create_int32_Number(env, (int)rect.top));
    if (status != napi_ok)
    {
        return Results;
    };
    status = napi_set_property(env, Results, _create_char_string(env, "right"), _create_int32_Number(env, (int)rect.right));
    if (status != napi_ok)
    {
        return Results;
    };
    status = napi_set_property(env, Results, _create_char_string(env, "bottom"), _create_int32_Number(env, (int)rect.bottom));
    if (status != napi_ok)
    {
        return Results;
    };

    return Results;
}

static napi_value getDeviceCapsAll(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Results;
    status = napi_create_array(env, &Results);
    if (status != napi_ok)
    {
        return Results;
    };
    static vector<RECT> DeviceCapsRectList = GetDeviceCapsAll();
    int NextIndex = 0;
    for (const RECT &rect : DeviceCapsRectList)
    {
        napi_value NextRect;
        status = napi_create_object(env, &NextRect);
        if (status != napi_ok)
        {
            return Results;
        };
        status = napi_set_property(env, NextRect, _create_char_string(env, "left"), _create_int32_Number(env, (int)rect.left));
        if (status != napi_ok)
        {
            return Results;
        };
        status = napi_set_property(env, NextRect, _create_char_string(env, "top"), _create_int32_Number(env, (int)rect.top));
        if (status != napi_ok)
        {
            return Results;
        };
        status = napi_set_property(env, NextRect, _create_char_string(env, "right"), _create_int32_Number(env, (int)rect.right));
        if (status != napi_ok)
        {
            return Results;
        };
        status = napi_set_property(env, NextRect, _create_char_string(env, "bottom"), _create_int32_Number(env, (int)rect.bottom));
        if (status != napi_ok)
        {
            return Results;
        };
        status = napi_set_element(env, Results, NextIndex, NextRect);
        if (status != napi_ok)
        {
            return Results;
        };
        NextIndex += 1;
    }

    return Results;
}
bool pointInRECT(POINT pt, RECT inputRect);
static napi_value isMouseMonitorWindow(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1], is_OKs;
    is_OKs = _create_bool_Boolean(env, false);
    status = $napi_get_cb_info(argc, args);
    if (status != napi_ok)
        return is_OKs;
    if (!argc)
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
    }
    // get HWND
    int64_t NumHandle;
    status = napi_get_value_int64(env, args[0], &NumHandle);
    if (status != napi_ok)
    {
        return is_OKs;
    }
    HWND Handle = (HWND)NumHandle;
    bool okk = false;
    if ((GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle)))
    {
        RECT winRect;
        GetWindowRect(Handle, &winRect);
        RECT rect = GetCurrentMonitorRect();
        POINT point;
        // 位置 左和上
        point.x = (int)winRect.left;
        point.y = (int)winRect.top;

        if (::PtInRect(&rect, point))
        {
            okk = true;
        }

        // 最边缘
        point.x = (int)winRect.left + winRect.right - 1;
        point.y = (int)winRect.top + winRect.bottom - 1;

        if (::PtInRect(&rect, point))
        {
            okk = true;
        }

        is_OKs = _create_bool_Boolean(env, okk);
    }

    return is_OKs;
}

static napi_value isInMonitorWindow(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 1;
    napi_value args[1], is_OKs;
    is_OKs = _create_bool_Boolean(env, false);
    status = $napi_get_cb_info(argc, args);
    if (status != napi_ok)
        return is_OKs;
    if (!argc)
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
    }
    // get HWND
    int64_t NumHandle;
    status = napi_get_value_int64(env, args[0], &NumHandle);
    if (status != napi_ok)
    {
        return is_OKs;
    }
    HWND Handle = (HWND)NumHandle;
    if ((GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle)))
    {
        bool okk = false;
        RECT winRect;
        GetWindowRect(Handle, &winRect);
        static vector<RECT> DeviceCapsRectList = GetDeviceCapsAll();
        for (const RECT &rect : DeviceCapsRectList)
        {
            POINT point;
            // 位置 左和上
            point.x = (int)winRect.left;
            point.y = (int)winRect.top;

            if (::PtInRect(&rect, point))
            {
                okk = true;
            }

            // 最边缘
            point.x = (int)winRect.left + winRect.right;
            point.y = (int)winRect.top + winRect.bottom;

            if (::PtInRect(&rect, point))
            {
                okk = true;
            }

            // 中间点匹配
            point.x = (int)winRect.left + winRect.right - 1;
            point.y = (int)winRect.top + winRect.bottom - 1;
            point.x = point.x / 2;
            point.y = point.y / 2;

            if (::PtInRect(&rect, point))
            {
                okk = true;
            }
        }
        is_OKs = _create_bool_Boolean(env, okk);
    }

    return is_OKs;
}

static napi_value getWindowClassName(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Result = _create_String(env, "");

    if (status != napi_ok)
        return Result;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    if (status != napi_ok)
        return Result;
    if (!argc)
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
    }
    // get HWND
    int64_t NumHandle;
    status = napi_get_value_int64(env, args[0], &NumHandle);
    if (status != napi_ok)
        return Result;
    HWND Handle = (HWND)NumHandle;

    // is the handle
    if (!(GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle)))
        return Result;
    LPSTR lpClassName;

    if (!GetClassNameA(Handle, lpClassName, 256))
    {
        lpClassName = "";
    };

    Result = _create_A2U8_string(env, lpClassName);

    return Result;
}

static napi_value getWindowStyle(napi_env env, napi_callback_info info)
{
    napi_status status;
    napi_value Result = _create_int64_Number(env, 0);

    if (status != napi_ok)
        return Result;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    if (status != napi_ok)
        return Result;
    if (!argc)
    {
        napi_throw_type_error(env, 0, string("The number of parameters entered is not legal size =>").append(to_string(argc)).c_str());
    }
    // get HWND
    int64_t NumHandle;
    status = napi_get_value_int64(env, args[0], &NumHandle);
    if (status != napi_ok)
        return Result;
    HWND Handle = (HWND)NumHandle;

    // is the handle
    if (!(GetWindow(Handle, GW_OWNER) == (HWND)0 && IsWindowVisible(Handle)))
        return Result;

    DWORD dwStyle = GetClassLongA(Handle, GCL_STYLE);

    Result = _create_int64_Number(env, dwStyle);
    return Result;
}

void SetWindowTitleIcon(HWND handle, string iconStr)
{
    HICON hWindowIcon = NULL;
    HICON hWindowIconBig = NULL;
    if (hWindowIcon != NULL)
        DestroyIcon(hWindowIcon);
    if (hWindowIconBig != NULL)
        DestroyIcon(hWindowIconBig);
    hWindowIcon = (HICON)LoadImageA(GetModuleHandle(NULL), iconStr.c_str(), IMAGE_ICON, 16, 16, LR_LOADFROMFILE);
    hWindowIconBig = (HICON)LoadImageA(GetModuleHandle(NULL), iconStr.c_str(), IMAGE_ICON, 32, 32, LR_LOADFROMFILE);
    SendMessage(handle, WM_SETICON, ICON_SMALL, (LPARAM)hWindowIcon);
    SendMessage(handle, WM_SETICON, ICON_BIG, (LPARAM)hWindowIconBig);
}
void SetWindowTitleIconUs32(HWND handle, string iconStr)
{
    HICON hWindowIcon = NULL;
    HICON hWindowIconBig = NULL;
    if (hWindowIcon != NULL)
        DestroyIcon(hWindowIcon);
    if (hWindowIconBig != NULL)
        DestroyIcon(hWindowIconBig);
    hWindowIcon = (HICON)LoadImageA(GetModuleHandle(NULL), iconStr.c_str(), IMAGE_ICON, 16, 16, LR_LOADFROMFILE);
    hWindowIconBig = (HICON)LoadImageA(GetModuleHandle(NULL), iconStr.c_str(), IMAGE_ICON, 32, 32, LR_LOADFROMFILE);

    HINSTANCE hIn = NULL;
    hIn = LoadLibraryA("user32.dll");
    if (hIn)
    {
        LRESULT(WINAPI * SendMessageA)
        (HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam);
        SendMessageA = (LRESULT(WINAPI *)(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam))GetProcAddress(hIn, "SendMessageA");
        if (SendMessageA)
        {

            SendMessageA(handle, WM_SETICON, ICON_SMALL, (LPARAM)hWindowIcon);
            SendMessageA(handle, WM_SETICON, ICON_BIG, (LPARAM)hWindowIconBig);
        }
        else
        {
        }
    }
    else
    {
    }
}
void SetWindowIconForExtractUs32(HWND hwnd, string iconStr, int index)
{
    HICON hIcon;
    hIcon = (HICON)ExtractIconA(NULL, iconStr.c_str(), index);
    HINSTANCE hIn = NULL;
    hIn = LoadLibraryA("user32.dll");
    if (hIn)
    {
        LRESULT(WINAPI * SendMessageA)
        (HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam);
        SendMessageA = (LRESULT(WINAPI *)(HWND hWnd, UINT Msg, WPARAM wParam, LPARAM lParam))GetProcAddress(hIn, "SendMessageA");
        if (SendMessageA)
        {
            SendMessageA(hwnd, WM_SETICON, ICON_BIG, (LPARAM)hIcon);
            SendMessageA(hwnd, WM_SETICON, ICON_SMALL, (LPARAM)hIcon);
        }
        else
        {
        }
    }
    else
    {
    }
}

void SetWindowIconForExtract(HWND hwnd, string iconStr, int index)
{
    HICON hIcon;
    hIcon = (HICON)ExtractIconA(NULL, iconStr.c_str(), index);

    SendMessageA(hwnd, WM_SETICON, ICON_BIG, (LPARAM)hIcon);
    SendMessageA(hwnd, WM_SETICON, ICON_SMALL, (LPARAM)hIcon);
}

static napi_value setWindowTitleIcon(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 2;
    napi_value args[2];
    status = $napi_get_cb_info(argc, args);
    int64_t Handle;
    status = napi_get_value_int64(env, args[0], &Handle);
    HWND handle = (HWND)Handle;
    string iconStr = call_String_NAPI_WINAPI_A(env, args[1]);

    SetWindowTitleIcon(handle, iconStr);
    UpdateWindow(handle);
    return NULL;
}
static napi_value setWindowIconForExtract(napi_env env, napi_callback_info info)
{
    napi_status status;
    size_t argc = 3;
    napi_value args[3];
    status = $napi_get_cb_info(argc, args);
    int64_t Handle;
    status = napi_get_value_int64(env, args[0], &Handle);
    HWND handle = (HWND)Handle;
    string iconStr = call_String_NAPI_WINAPI_A(env, args[1]);
    int index;
    status = napi_get_value_int32(env, args[2], &index);
    SetWindowIconForExtract(handle, iconStr, index);
    SetWindowIconForExtractUs32(handle, iconStr, index);
    UpdateWindow(handle);
    return NULL;
}

static napi_value _SET_HMC_DEBUG(napi_env env, napi_callback_info info)
{
    _________HMC_DEBUG__________ = !_________HMC_DEBUG__________;
    return _create_bool_Boolean(env, _________HMC_DEBUG__________);
}

// 获取剪贴板文本
napi_value Popen(napi_env env, napi_callback_info info)
{
    napi_status status;
    
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    string cmd = call_String_NAPI_WINAPI_A(env, args[0]);
    napi_value napi_result;

    char buffer[128];
    string result = "";
    FILE *pipe = _popen(cmd.c_str(), "r");
    if (!pipe)
    {
        // std::cerr << "无法打开管道!" << std::endl;
        return napi_result;
    }
    while (fgets(buffer, sizeof buffer, pipe) != NULL)
    {
        result += buffer;
    }
    _pclose(pipe);
    string _A2U8_result =  _A2U8_(result.c_str());
    napi_create_string_utf8(env, _A2U8_result.c_str(), NAPI_AUTO_LENGTH, &napi_result);
    return napi_result;
}

bool CreateMutex(std::string MutexName) {
    bool has_mut_exist = false;

    HANDLE hMutex = CreateMutexA(NULL, FALSE, MutexName.c_str());
    
    if (hMutex == NULL)
    {
        has_mut_exist = true;
    }
    // 检查是否已经存在同名的互斥体
    if (GetLastError() == ERROR_ALREADY_EXISTS)
    {
        has_mut_exist = true;
        CloseHandle(hMutex);
    }
    

    return !has_mut_exist;
}

bool HasMutex(std::string MutexName) {
    bool has_mut_exist = true;

    HANDLE hMutex;

	hMutex = OpenMutexA(MUTEX_ALL_ACCESS, FALSE,MutexName.c_str());
	if (NULL == hMutex)
	{
        has_mut_exist = false;
    }

    CloseHandle(hMutex);
    return has_mut_exist;
}

napi_value createMutex(napi_env env, napi_callback_info info){

    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    hmc_is_argv_type(args, 0, 1, napi_string, NULL);
    
    string MutexName = call_String_NAPI_WINAPI_A(env, args[0]);

    return  _create_bool_Boolean(env, CreateMutex(MutexName));
}

napi_value hasMutex(napi_env env, napi_callback_info info){

    napi_status status;
    size_t argc = 1;
    napi_value args[1];
    status = $napi_get_cb_info(argc, args);
    hmc_is_argv_type(args, 0, 1, napi_string, NULL);
    
    string MutexName = call_String_NAPI_WINAPI_A(env, args[0]);

    return  _create_bool_Boolean(env, HasMutex(MutexName));
}

napi_value __Popen(napi_env env, napi_callback_info info)
{
    return Popen(env, info);
}
//? -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

static napi_value Init(napi_env env, napi_value exports)
{
    // napi_value exportsMessage;
    // napi_create_object(env, &exportsMessage);

    napi_property_descriptor BIND_NAPI_METHOD[] = {
        ADD_NAPI_METHOD_Str_VALUE("version", "1.2.7"),
        ADD_NAPI_METHOD_Str_VALUE("desc", "HMC Connection System api"),
        ADD_NAPI_METHOD_Str_VALUE("platform", "win32"),
        DECLARE_NAPI_METHOD("getSystemIdleTime", getSystemIdleTime),
        DECLARE_NAPI_METHOD("sleep", sleep),
        DECLARE_NAPI_METHOD("isAdmin", isAdmin),
        DECLARE_NAPI_METHOD("openApp", openApp),
        DECLARE_NAPI_METHOD("openExternal", openExternal), //=>2-1ADD
        DECLARE_NAPI_METHOD("openURL", openURL),           //=>2-1ADD
        DECLARE_NAPI_METHOD("openPath", openPath),         //=>2-1ADD
        DECLARE_NAPI_METHOD("powerControl", powerControl),
        DECLARE_NAPI_METHOD("getForegroundWindow", getForegroundWindow),
        DECLARE_NAPI_METHOD("showMonitors", showMonitors),
        DECLARE_NAPI_METHOD("shutMonitors", shutMonitors),
        DECLARE_NAPI_METHOD("getSystemMenu", getSystemMenu),
        DECLARE_NAPI_METHOD("messageBox", messageBox),
        DECLARE_NAPI_METHOD("alert", alert),               //=>2-1ADD
        DECLARE_NAPI_METHOD("confirm", confirm),           //=>2-1ADD
        DECLARE_NAPI_METHOD("MessageError", MessageError), //=>2-1ADD
        DECLARE_NAPI_METHOD("MessageStop", MessageStop),   //=>2-1ADD
        DECLARE_NAPI_METHOD("lookHandleSetTitle", lookHandleSetTitle),
        DECLARE_NAPI_METHOD("lookHandleCloseWindow", lookHandleCloseWindow),
        DECLARE_NAPI_METHOD("isHandleWindowVisible", isHandleWindowVisible),
        DECLARE_NAPI_METHOD("lookHandleShowWindow", lookHandleShowWindow),
        DECLARE_NAPI_METHOD("lookHandleGetTitle", lookHandleGetTitle),
        DECLARE_NAPI_METHOD("getProcessHandle", getProcessHandle),
        DECLARE_NAPI_METHOD("isSystemX64", isSystemX64),
        DECLARE_NAPI_METHOD("getTrayList", getTrayList),
        DECLARE_NAPI_METHOD("setHandleTransparent", setHandleTransparent),
        DECLARE_NAPI_METHOD("getHandleProcessID", getHandleProcessID),
        DECLARE_NAPI_METHOD("getForegroundWindowProcessID", getForegroundWindowProcessID),
        DECLARE_NAPI_METHOD("getMetrics", getMetrics),
        DECLARE_NAPI_METHOD("getPointWindowProcessId", getPointWindowProcessId),
        DECLARE_NAPI_METHOD("getPointWindowName", getPointWindowName),
        DECLARE_NAPI_METHOD("getPointWindow", getPointWindow),
        DECLARE_NAPI_METHOD("getDeviceCaps", getDeviceCaps),
        DECLARE_NAPI_METHOD("getWindowRect", getWindowRect),
        DECLARE_NAPI_METHOD("setWindowMode", setWindowMode),
        DECLARE_NAPI_METHOD("closedHandle", closedHandle),
        DECLARE_NAPI_METHOD("setWindowTop", setWindowTop),
        DECLARE_NAPI_METHOD("hasWindowTop", hasWindowTop),
        DECLARE_NAPI_METHOD("windowJitter", windowJitter), //=>3-1UP to Asynchronous
        DECLARE_NAPI_METHOD("isHandle", isHandle),
        DECLARE_NAPI_METHOD("getPointWindowMain", getPointWindowMain),
        DECLARE_NAPI_METHOD("getMainWindow", getMainWindow),
        DECLARE_NAPI_METHOD("isEnabled", isEnabled),
        DECLARE_NAPI_METHOD("setWindowEnabled", setWindowEnabled),
        DECLARE_NAPI_METHODRM("setWindowFocus", setForegroundWindow),
        DECLARE_NAPI_METHODRM("setForegroundWindow", setForegroundWindow),
        DECLARE_NAPI_METHOD("updateWindow", updateWindow),
        DECLARE_NAPI_METHOD("SetWindowInTaskbarVisible", SetWindowInTaskbarVisible),
        DECLARE_NAPI_METHOD("SetBlockInput", SetBlockInput),
        DECLARE_NAPI_METHOD("system", CallSystem),
        DECLARE_NAPI_METHOD("SetSystemHOOK", SetSystemHOOK),
        DECLARE_NAPI_METHOD("systemStartTime", systemStartTime),
        DECLARE_NAPI_METHODRM("getStringRegKey", getStringRegKey),
        DECLARE_NAPI_METHODRM("hasRegistrKey", hasRegistrKey),
        DECLARE_NAPI_METHODRM("setRegistrKey", setRegistrKey),
        DECLARE_NAPI_METHODRM("createPathRegistr", createPathRegistr),
        DECLARE_NAPI_METHODRM("enumRegistrKey", enumRegistrKey),
        DECLARE_NAPI_METHODRM("getRegistrBuffValue", getRegistrBuffValue),
        DECLARE_NAPI_METHODRM("removeStringRegKeyWalk", removeStringRegKeyWalk), //=>2-9ADD
        DECLARE_NAPI_METHODRM("removeStringRegKey", removeStringRegKey),         //=>2-9ADD
        DECLARE_NAPI_METHODRM("removeStringRegValue", removeStringRegValue),     //=>2-9ADD
        DECLARE_NAPI_METHODRM("setRegistrDword", setRegistrDword),               //=>2-10ADD
        DECLARE_NAPI_METHODRM("setRegistrQword", setRegistrQword),               //=>2-10ADD
        DECLARE_NAPI_METHODRM("getRegistrDword", getRegistrDword),               //=>2-10ADD
        DECLARE_NAPI_METHODRM("getRegistrQword", getRegistrQword),               //=>2-10ADD
        DECLARE_NAPI_METHODRM("getShortcutLink", getShortcutLink),
        DECLARE_NAPI_METHODRM("setShortcutLink", setShortcutLink),
        DECLARE_NAPI_METHODRM("createSymlink", createSymlink),       //=>2-9ADD
        DECLARE_NAPI_METHODRM("createHardLink", createHardLink),     //=>2-9ADD
        DECLARE_NAPI_METHODRM("createDirSymlink", createDirSymlink), //=>2-9ADD
        DECLARE_NAPI_METHODRM("getClipboardText", getClipboardText),
        DECLARE_NAPI_METHODRM("setClipboardText", setClipboardText),
        DECLARE_NAPI_METHODRM("clearClipboard", clearClipboard),
        DECLARE_NAPI_METHODRM("getClipboardFilePaths", getClipboardFilePaths), //=>2-11ADD
        DECLARE_NAPI_METHODRM("setClipboardFilePaths", setClipboardFilePaths), //=>2-11ADD
        DECLARE_NAPI_METHOD("getHidUsbList", getHidUsbList),
        DECLARE_NAPI_METHOD("getUsbDevsInfo", getUsbDevsInfo),                           //=>2-11ADD
        DECLARE_NAPI_METHOD("enumChildWindows", enumChildWindows),                       //=>2-11ADD
        DECLARE_NAPI_METHOD("deleteFile", deleteFile),                                   //=>2-11ADD
        DECLARE_NAPI_METHOD("_SET_HMC_DEBUG", _SET_HMC_DEBUG),                           //=>2-11ADD
        DECLARE_NAPI_METHODRM("getClipboardSequenceNumber", getClipboardSequenceNumber), //=>2-12ADD
        DECLARE_NAPI_METHODRM("enumClipboardFormats", enumClipboardFormats),             //=>2-12ADD
        DECLARE_NAPI_METHODRM("getHidUsbIdList", getHidUsbIdList),                       //=>2-12ADD
        DECLARE_NAPI_METHODRM("getSystemMetricsLen", getSystemMetricsLen),               //=>2-12ADD
        DECLARE_NAPI_METHODRM("getCurrentMonitorRect", getCurrentMonitorRect),           //=>2-12ADD
        DECLARE_NAPI_METHODRM("getDeviceCapsAll", getDeviceCapsAll),                     //=>2-12ADD
        DECLARE_NAPI_METHODRM("isMouseMonitorWindow", isMouseMonitorWindow),             //=>2-12ADD
        DECLARE_NAPI_METHODRM("isInMonitorWindow", isInMonitorWindow),                   //=>2-12ADD
        // DECLARE_NAPI_METHOD("getAllWindows", getAllWindows),                          //=>2-13REMOVE
        {"getAllWindows", 0, getAllWindowsNot, 0, 0, 0, napi_writable, 0}, //=>2-13ADD
        DECLARE_NAPI_METHOD("getWindowStyle", getWindowStyle),
        DECLARE_NAPI_METHOD("getWindowClassName", getWindowClassName),
        DECLARE_NAPI_METHOD("setWindowTitleIcon", setWindowTitleIcon),
        // auto.cpp
        DECLARE_NAPI_METHODRM("setCursorPos", setCursorPos),                     //=>3-1UP
        DECLARE_NAPI_METHODRM("rightClick", rightClick),                         //=>3-1UP
        DECLARE_NAPI_METHODRM("leftClick", leftClick),                           //=>3-1UP
        DECLARE_NAPI_METHODRM("getMouseMovePoints", getMouseMovePoints),         //=>3-1UP
        DECLARE_NAPI_METHODRM("hasKeyActivate", hasKeyActivate),                 //=>3-1UP
        DECLARE_NAPI_METHODRM("getBasicKeys", getBasicKeys),                     //=>3-1UP
        DECLARE_NAPI_METHODRM("mouse", mouse),                                   //=>3-1UP
        DECLARE_NAPI_METHODRM("installKeyboardHook", installKeyboardHook),       //=>3-1ADD
        DECLARE_NAPI_METHODRM("installHookMouse", installHookMouse),             //=>3-1ADD
        DECLARE_NAPI_METHODRM("unHookMouse", unHookMouse),                       //=>3-1ADD
        DECLARE_NAPI_METHODRM("unKeyboardHook", unKeyboardHook),                 //=>3-1ADD
        DECLARE_NAPI_METHODRM("getKeyboardNextSession", getKeyboardNextSession), //=>3-1ADD
        DECLARE_NAPI_METHODRM("getMouseNextSession", getMouseNextSession),       //=>3-1ADD
        DECLARE_NAPI_METHODRM("isStartHookMouse", isStartHookMouse),             //=>3-1ADD
        DECLARE_NAPI_METHODRM("isStartKeyboardHook", isStartKeyboardHook),       //=>3-1ADD
        // windows.cpp
        DECLARE_NAPI_METHODRM("getAllWindowsHandle", getAllWindowsHandle),         //=>3-6UP
        DECLARE_NAPI_METHODRM("getProcessIdHandleStore", getProcessIdHandleStore), //=>3-6UP
        // process.cpp
        DECLARE_NAPI_METHODRM("killProcess", killProcess),                     //=>4-1UP
        DECLARE_NAPI_METHODRM("getDetailsProcessList", getDetailsProcessList), //=>4-1UP
        DECLARE_NAPI_METHODRM("getProcessList", getProcessList),               //=>4-1UP
        DECLARE_NAPI_METHODRM("hasProcess", hasProcess),                       //=>4-1UP
        DECLARE_NAPI_METHODRM("isProcess", isProcess),                         //=>4-1UP
        DECLARE_NAPI_METHODRM("getProcessidFilePath", getProcessidFilePath),   //=>4-1UP
        DECLARE_NAPI_METHODRM("getProcessName", getProcessName),               //=>4-1UP
        DECLARE_NAPI_METHODRM("getModulePathList", getModulePathList),         //=>4-1ADD
        // DECLARE_NAPI_METHODRM("getLockFileProcessList", getLockFileProcessList),    //=>4-1ADD
        DECLARE_NAPI_METHODRM("enumProcessHandle", enumProcessHandle),                 //=>4-1ADD
        DECLARE_NAPI_METHODRM("enumProcessHandlePolling", enumProcessHandlePolling),   //=>4-2ADD
        DECLARE_NAPI_METHODRM("getVolumeList", getVolumeList),                         //=>4-1ADD
        DECLARE_NAPI_METHODRM("formatVolumePath", formatVolumePath),                   //=>4-1ADD
        DECLARE_NAPI_METHODRM("getProcessThreadList", getProcessThreadList),           //=>4-3ADD
        DECLARE_NAPI_METHODRM("clearEnumProcessHandle", clearEnumProcessHandle),       //=>4-3ADD
        DECLARE_NAPI_METHODRM("getSubProcessID", getSubProcessID),                     //=>4-3ADD
        DECLARE_NAPI_METHODRM("enumAllProcessPolling", enumAllProcessPolling),         //=>4-3ADD
        DECLARE_NAPI_METHODRM("enumAllProcess", enumAllProcess),                       //=>4-3ADD
        DECLARE_NAPI_METHODRM("getProcessParentProcessID", getProcessParentProcessID), //=>4-3ADD
        DECLARE_NAPI_METHODRM("clearEnumAllProcessList", clearEnumAllProcessList),     //=>4-3ADD
        DECLARE_NAPI_METHOD("setWindowIconForExtract", setWindowIconForExtract),       //=>5-12ADD
        DECLARE_NAPI_METHOD("popen", Popen),                                           //=>5-12ADD
        DECLARE_NAPI_METHOD("_popen", __Popen),                                        //=>5-12ADD
        DECLARE_NAPI_METHODRM("sendKeyT2C", sendKeyT2C),                               //=>5-26ADD
        DECLARE_NAPI_METHODRM("sendKeyboard", sendKeyboard),                           //=>5-26ADD
        DECLARE_NAPI_METHODRM("sendKeyT2CSync", sendKeyT2CSync),                       //=>5-26ADD
        DECLARE_NAPI_METHODRM("sendBasicKeys", sendBasicKeys),                         //=>5-26ADD
        DECLARE_NAPI_METHODRM("captureBmpToFile", captureBmpToFile),                   //=>5-27ADD
        // DECLARE_NAPI_METHODRM("captureBmpToBuff", captureBmpToBuff),                //=>5-27ADD(NAPI 发送不出去 buff 以后再研究)
        DECLARE_NAPI_METHODRM("getColor", getColor),                                   //=>5-27ADD
        DECLARE_NAPI_METHOD("createMutex", createMutex),                               //=>6-21ADD
        DECLARE_NAPI_METHOD("hasMutex", hasMutex),                                     //=>6-21ADD

    };
    _________HMC_DEBUG__________ = false;

    napi_define_properties(env, exports, sizeof(BIND_NAPI_METHOD) / sizeof(BIND_NAPI_METHOD[0]), BIND_NAPI_METHOD);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
