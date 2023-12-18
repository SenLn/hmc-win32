
#include "./Main.hpp"

#include <Psapi.h>
#include <Shellapi.h>
#include <vector>
#include <process.h>
#include <Tlhelp32.h>
#pragma comment(lib, "psapi.lib")
#include <fstream>
#include <Winternl.h>


#include "./util/hmc_string_util.hpp"
#include "./util/napi_value_util.hpp"
#include "./util/fmt11.hpp"



struct HMC_PROCESSENTRY32W
{
    DWORD dwSize;
    DWORD cntUsage;
    DWORD th32ProcessID; // this process
    DWORD th32DefaultHeapID;
    DWORD th32ModuleID; // associated exe
    DWORD cntThreads;
    DWORD th32ParentProcessID; // this process's parent process
    DWORD pcPriClassBase;      // Base priority of process's threads
    DWORD dwFlags;
    wstring szExeFile; // Path
};

vector<HMC_PROCESSENTRY32W> GetProcessSnapshot(vector<DWORD> pid_list, bool early_result)
{
    vector<HMC_PROCESSENTRY32W> result = {};

    DWORD PID = 0;
    HANDLE hProcessSnapshot;
    PROCESSENTRY32W PE32;

    // gc
    std::shared_ptr<void> _shared_free_handle(nullptr, [&](void*)
        {
            if (hProcessSnapshot != NULL) {
                ::CloseHandle(hProcessSnapshot);
            } });

    hProcessSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);
    if (hProcessSnapshot == INVALID_HANDLE_VALUE)
    {
        return result;
    }

    PE32.dwSize = sizeof(PROCESSENTRY32W);

    if (!Process32FirstW(hProcessSnapshot, &PE32))
    {
        return result;
    }

    do
    {
        // ����Ҫ��������ý���
        if (early_result && result.size() == pid_list.size())
        {
            return result;
        }

        for (size_t i = 0; i < pid_list.size(); i++)
        {
            if (pid_list[i] == PE32.th32ProcessID)
            {
                HMC_PROCESSENTRY32W data = HMC_PROCESSENTRY32W{
                    PE32.dwSize + 0,
                    PE32.cntUsage + 0,
                    PE32.th32ProcessID + 0,
                    (DWORD)PE32.th32DefaultHeapID + 0,
                    PE32.th32ModuleID + 0,
                    PE32.cntThreads + 0,
                    PE32.th32ParentProcessID + 0,
                    (DWORD)PE32.pcPriClassBase,
                    PE32.dwFlags + 0,
                    wstring(PE32.szExeFile),
                };

                result.push_back(data);
            }
        }

    } while (Process32NextW(hProcessSnapshot, &PE32));

    return result;
}


vector<HMC_PROCESSENTRY32W> GetProcessSnapshot(size_t Start, size_t End)
{
    vector<DWORD> pid_list;
    if (Start >= 0 && End >= Start)
    {
        for (size_t i = Start; i < End; i++)
        {
            pid_list.push_back((DWORD)i);
        }
        return GetProcessSnapshot(pid_list, true);
    }
    return {};
}



wstring GetProcessSnapshotNameW(DWORD processID)
{
    auto GetProcessSnapshotList = GetProcessSnapshot(vector<DWORD>({ processID }), true);
    if (GetProcessSnapshotList.empty())
    {
        return L"";
    }
    else
    {
        return GetProcessSnapshotList[0].szExeFile;
    }
    return L"";
}

wstring GetProcessIdFilePathW(DWORD processID, bool is_snapshot_match)
{

    if (processID == (DWORD)0)
    {
        return L"[System Process]";
    }

    wstring result = wstring();

    HANDLE hProcess = ::OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, FALSE, processID);

    // Pwstr
    result.reserve(MAX_PATH);
    result.resize(MAX_PATH);

    // gc
    std::shared_ptr<void> _shared_free_handle(nullptr, [&](void*)
        {
            if (hProcess != NULL) {
                ::CloseHandle(hProcess);
            } });

    // win10 + ��PROCESS_QUERY_INFORMATION| PROCESS_VM_READ �򿪿��ܻᵼ��ʧ�� ��Ȩ��ȡ
    if (hProcess == NULL)
    {
        hProcess = ::OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, FALSE, processID);
        if (hProcess == NULL)
        {
            return wstring();
        }
    }

    DWORD buf_length = ::GetModuleFileNameExW(hProcess, NULL, &result[0], result.size());

    // û��ȡ�� ��ģ�鷨
    if (buf_length == 0)
    {

        // �����ȡ�Ĳ���dos·��
        buf_length = ::GetProcessImageFileNameW(hProcess, &result[0], result.size());
        if (buf_length > 0)
        {
            result.reserve(buf_length);
            result.resize(buf_length);
            return result;
        }
    }

    // �����Ƿ���
    if (buf_length == 0)
    {
        if (!::QueryFullProcessImageNameW(hProcess, 0, &result[0], &buf_length))
        {
            // ʧ�� �ͷ�string
            buf_length = 0;
            result.clear();
            result.resize(0);
            result.reserve(0);
        }
    }

    result.reserve(buf_length);
    result.resize(buf_length);

    // ���� dos ·��
    //
    if (!result.empty() && result.front() == '\\')
    {
        // vector<util_Volume> volumeList = util_getVolumeList();

        // for (size_t i = 0; i < volumeList.size(); i++)
        // {
        //     util_Volume volume = volumeList[i];
        //     if (result.find(volume.device) == 0)
        //     {
        //         result.replace(0, volume.device.length(), volume.path);
        //     }
        // }
    }

    // ���� ntoskrnl.exe ���ɼ�����
    // id ��4 (win�ں˵�i)
    // ϵͳ����idһ�㲻��
    if (result.empty() && processID < 80)
    {
        vector<HMC_PROCESSENTRY32W> ProcessSnapshotList = GetProcessSnapshot(0, processID + 1);
        DWORD ntoskrnl_pid = 0;

        // ͨ�������ж��ǲ���  ntoskrnl.exe
        for (size_t i = 0; i < ProcessSnapshotList.size(); i++)
        {
            auto data = ProcessSnapshotList[i];
            if (ntoskrnl_pid == 0 && data.szExeFile == wstring(L"System"))
            {
                ntoskrnl_pid = data.th32ProcessID;
                if (ntoskrnl_pid == processID)
                {
                    return L"C:\\Windows\\System32\\ntoskrnl.exe";
                }
            }

            if (data.th32ProcessID == processID && ntoskrnl_pid == data.th32ParentProcessID)
            {
                return L"C:\\Windows\\System32\\ntoskrnl.exe";
            }
        }

        // ���� ntoskrnl.exe �򷵻ؿ�������
        for (size_t i = 0; i < ProcessSnapshotList.size(); i++)
        {
            auto data = ProcessSnapshotList[i];
            if (data.th32ProcessID == processID)
            {
                return data.szExeFile;
            }
        }
    }

    // û��ȡ�� �ӽ��̿�����ƥ��
    if (result.empty() && is_snapshot_match)
    {
        return GetProcessSnapshotNameW(processID);
    }

    return result;
}


/**
 * @brief ��ʱ��Ȩ����
 *
 * @return BOOL
 */
BOOL EnableShutDownPriv()
{
    HANDLE Handle_Token = NULL;
    TOKEN_PRIVILEGES PermissionAttribute = { 0 };
    // �򿪵�ǰ�����Ȩ������
    bool is_Open_Process_Token = OpenProcessToken(GetCurrentProcess(), TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY, &Handle_Token);
    if (!is_Open_Process_Token)
    {
        return FALSE;
    }
    // ���ĳһ�ض�Ȩ�޵�Ȩ�ޱ�ʶLUID ���浽Ȩ��������
    if (!LookupPrivilegeValue(NULL, SE_SHUTDOWN_NAME, &PermissionAttribute.Privileges[0].Luid))
    {
        CloseHandle(Handle_Token);
        return FALSE;
    }
    PermissionAttribute.Privileges[0].Attributes = SE_PRIVILEGE_ENABLED;
    PermissionAttribute.PrivilegeCount = 1;
    // ������ϵͳȨ��
    if (!AdjustTokenPrivileges(Handle_Token, FALSE, &PermissionAttribute, sizeof(TOKEN_PRIVILEGES), NULL, NULL))
    {
        CloseHandle(Handle_Token);
        return FALSE;
    }
    return TRUE;
}



namespace fn_getAllProcessList
{
    NEW_PROMISE_FUNCTION_DEFAULT_FUN$SP;
    
    wstring GetAllProcessList(bool is_execPath) {
       
        EnableShutDownPriv();
        
        DWORD processList[1024], lpcbNeeded;
        if (!EnumProcesses(processList, sizeof(processList), &lpcbNeeded))
        {
            return L"[]";
        }

        wstring jsonValue = L"[";

        int processe_leng = lpcbNeeded / sizeof(DWORD);
        for (int i = 0; i < processe_leng; ++i)
        {
            DWORD pid = processList[i];
            wstring item = wstring(L"{\"pid\":");
            item.append(to_wstring(pid));
            // {"pid":0
            if (is_execPath) {
                item.push_back(L',');
                auto exec_path = GetProcessIdFilePathW(pid, false);
                item.append(hmc_string_util::escapeJsonString(L"path",true));
                item.push_back(L':');
                item.append(hmc_string_util::escapeJsonString(exec_path, true));
                item.push_back(L',');
                // {"pid":0,"path":"...",
                item.append(hmc_string_util::escapeJsonString(L"name", true));
                item.push_back(L':');
                item.append(hmc_string_util::escapeJsonString(hmc_string_util::getPathBaseName(exec_path), true));
                // {"pid":0,"path":"...","name":"..."
            }

            item.push_back(L'}');
            if (i < processe_leng-1) {
                item.push_back(L',');
            }

            jsonValue.append(item);
        }
        jsonValue.push_back(L']');

        return jsonValue;
    }
    // NEW_PROMISE_FUNCTION_DEFAULT_FUN end
    any PromiseWorkFunc(vector<any> arguments_list)
    {
        any result = GetAllProcessList(arguments_list.size()==1);
        return result;
    }

    napi_value format_to_js_value(napi_env env, any result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data.has_value())
        {
            return result;
        }

        result = hmc_napi_create_value::String(env,any_cast<wstring>(result_any_data));
        return result;
    }
};


vector<HMC_PROCESSENTRY32W> GetProcessSnapshot()
{
    vector<HMC_PROCESSENTRY32W> result = {};

    DWORD PID = 0;
    HANDLE hProcessSnapshot;
    PROCESSENTRY32W PE32;

    // gc
    std::shared_ptr<void> _shared_free_handle(nullptr, [&](void*)
        {
            if (hProcessSnapshot != NULL) {
                ::CloseHandle(hProcessSnapshot);
            } });

    hProcessSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);
    if (hProcessSnapshot == INVALID_HANDLE_VALUE)
    {
        return result;
    }

    PE32.dwSize = sizeof(PROCESSENTRY32W);

    if (!Process32FirstW(hProcessSnapshot, &PE32))
    {
        return result;
    }

    do
    {

        HMC_PROCESSENTRY32W data = HMC_PROCESSENTRY32W{
            PE32.dwSize + 0,
            PE32.cntUsage + 0,
            PE32.th32ProcessID + 0,
            (DWORD)PE32.th32DefaultHeapID + 0,
            PE32.th32ModuleID + 0,
            PE32.cntThreads + 0,
            PE32.th32ParentProcessID + 0,
            (DWORD)PE32.pcPriClassBase,
            PE32.dwFlags + 0,
            wstring(PE32.szExeFile),
        };

        result.push_back(data);

    } while (Process32NextW(hProcessSnapshot, &PE32));

    return result;
}



// ���� ZwQuerySystemInformation ����ǩ��
typedef NTSTATUS(NTAPI* ZwQuerySystemInformation_t)(SYSTEM_INFORMATION_CLASS, PVOID, ULONG, PULONG);
#define NT_SUCCESS(x) ((x) >= 0)
#define STATUS_INFO_LENGTH_MISMATCH 0xc0000004
#define STATUS_SUCCESS 0x00000000


namespace fn_getAllProcessNtList
{
    NEW_PROMISE_FUNCTION_DEFAULT_FUN$SP;
    // NEW_PROMISE_FUNCTION_DEFAULT_FUN end

    wstring GetAllProcessList() {

        wstring jsonValue = L"[";

        // ���� ntdll.dll
        HMODULE ntdll = LoadLibraryW(L"ntdll.dll");
        if (ntdll == NULL) {
            return L"[]";
        }
        hmc_shared_close_Library(ntdll);

        // ��ȡ ZwQuerySystemInformation ������ַ
        ZwQuerySystemInformation_t ZwQuerySystemInformation = (ZwQuerySystemInformation_t)GetProcAddress(ntdll, "NtQuerySystemInformation");
        if (ZwQuerySystemInformation == NULL) {
            return L"[]";
        }

        // ���� ZwQuerySystemInformation ��ȡϵͳ��Ϣ
        NTSTATUS status;
        ULONG bufferSize = 0;
        status = ZwQuerySystemInformation(SystemProcessInformation, NULL, 0, &bufferSize);
        if (status != STATUS_INFO_LENGTH_MISMATCH) {
            return L"[]";
        }


        PVOID buffer = VirtualAlloc((LPVOID)NULL, (DWORD)(bufferSize), MEM_COMMIT, PAGE_READWRITE);
        
        hmc_FreeVSAuto(buffer);

        if (buffer == NULL) {
            return L"[]";
        }

        status = ZwQuerySystemInformation(SystemProcessInformation, buffer, bufferSize, NULL);
        if (status != STATUS_SUCCESS) {

            return L"[]";
        }

        // ����ϵͳ��Ϣ
        PSYSTEM_PROCESS_INFORMATION processInfo = (PSYSTEM_PROCESS_INFORMATION)buffer;
        while (processInfo->NextEntryOffset) {
            auto ImageName = hmc_string_util::unicodeStringToWString(processInfo->ImageName);
            
            jsonValue.append(L"{");
            jsonValue.append(hmc_string_util::push_json_value(L"ImageName", ImageName , false, true));
            jsonValue.append(hmc_string_util::push_json_value(L"UniqueProcessId", to_wstring((INT64)processInfo->UniqueProcessId) ,true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"BasePriority", to_wstring((INT64)processInfo->BasePriority), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"NextEntryOffset", to_wstring((INT64)processInfo->NextEntryOffset), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"NumberOfThreads", to_wstring((INT64)processInfo->NumberOfThreads), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"PeakPagefileUsage", to_wstring((INT64)processInfo->PeakPagefileUsage), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"PagefileUsage", to_wstring((INT64)processInfo->PagefileUsage), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"PeakVirtualSize", to_wstring((INT64)processInfo->PeakVirtualSize), true, false));

            jsonValue.append(hmc_string_util::push_json_value(L"PeakWorkingSetSize", to_wstring((INT64)processInfo->PeakWorkingSetSize), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"QuotaNonPagedPoolUsage", to_wstring((INT64)processInfo->QuotaNonPagedPoolUsage), true, false));
           /* jsonValue.append(hmc_string_util::push_json_value(L"Reserved1", to_wstring((INT64)processInfo->Reserved1), true,false));
            jsonValue.append(hmc_string_util::push_json_value(L"Reserved2", to_wstring((INT64)processInfo->Reserved2), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"Reserved3", to_wstring((INT64)processInfo->Reserved3), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"Reserved4", to_wstring((INT64)processInfo->Reserved3), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"Reserved5", to_wstring((INT64)processInfo->Reserved4), true, false));
            jsonValue.append(hmc_string_util::push_json_value(L"Reserved6", to_wstring((INT64)processInfo->Reserved6), true, false));*/

            jsonValue.append(L"}");
            processInfo = (PSYSTEM_PROCESS_INFORMATION)((PUCHAR)processInfo + processInfo->NextEntryOffset);
            if (processInfo->NextEntryOffset) {
                jsonValue.append(L",");
            }
        }

        jsonValue.append(L"]");
        return jsonValue;
    }

    any PromiseWorkFunc(vector<any> arguments_list)
    {
        any result = GetAllProcessList();
        return result;
    }

    napi_value format_to_js_value(napi_env env, any result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data.has_value())
        {
            return result;
        }

        result = hmc_napi_create_value::String(env, any_cast<wstring>(result_any_data));
        return result;
    }
};


namespace fn_getAllProcessSnpList
{
    NEW_PROMISE_FUNCTION_DEFAULT_FUN$SP;

    any PromiseWorkFunc(vector<any> arguments_list)
    {
        wstring result = L"[";

        vector<HMC_PROCESSENTRY32W> ProcessSnapshot_list = GetProcessSnapshot();
        
        size_t leng = ProcessSnapshot_list.size();
        for (size_t i = 0; i < leng; i++)
        {
            auto data = ProcessSnapshot_list.at(i);
            wstring item = L"{";
            item.append(hmc_string_util::push_json_value(L"szExeFile", data.szExeFile, false, true));
            item.append(hmc_string_util::push_json_value(L"th32ProcessID", to_wstring(data.th32ProcessID), true, false));
            item.append(hmc_string_util::push_json_value(L"th32ParentProcessID", to_wstring(data.th32ParentProcessID), true, false));
            item.append(hmc_string_util::push_json_value(L"cntThreads", to_wstring(data.cntThreads), true, false));
            item.append(hmc_string_util::push_json_value(L"cntUsage", to_wstring(data.cntUsage), true, false));
            item.append(hmc_string_util::push_json_value(L"dwFlags", to_wstring(data.dwFlags), true, false));
            item.append(hmc_string_util::push_json_value(L"dwSize", to_wstring(data.dwSize), true, false));
            item.append(hmc_string_util::push_json_value(L"pcPriClassBase", to_wstring(data.pcPriClassBase), true, false));
            item.append(hmc_string_util::push_json_value(L"th32DefaultHeapID", to_wstring(data.th32DefaultHeapID), true, false));
            item.append(hmc_string_util::push_json_value(L"th32ModuleID", to_wstring(data.th32ModuleID), true, false));

            item.append(L"}");

            if (i < leng-1) {
                item.push_back(L',');
            }

            result.append(item);
        }

        result.append(L"]");
        return result;
    }

    napi_value format_to_js_value(napi_env env, any result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data.has_value())
        {
            return result;
        }

        result = hmc_napi_create_value::String(env, any_cast<wstring>(result_any_data));
        return result;
    }

   
}


/**
 * @brief ��ȡCPU������
 *
 * @return int
 */
int _hmc_getCPUCount()
{
    SYSTEM_INFO system_info;
    GetSystemInfo(&system_info);
    return static_cast<int>(system_info.dwNumberOfProcessors);
}

// ʱ���ʽת��
__int64 _hmc_FileTimeToInt64(const FILETIME& time)
{
    ULARGE_INTEGER tt;
    tt.LowPart = time.dwLowDateTime;
    tt.HighPart = time.dwHighDateTime;
    return (tt.QuadPart);
}

/**
 * @brief ��ȡָ������CPUʹ����
 *
 * @param ProcessID
 * @return double
 */
double getProcessCpuUsage(DWORD ProcessID)
{
    static int processor_count_ = -1;     // cpu������
    static __int64 last_system_time_ = 0; // ��һ�ε�ϵͳʱ��
    static __int64 last_time_ = 0;        // ��һ�ε�ʱ��

    FILETIME now;
    FILETIME creation_time;
    FILETIME exit_time;
    FILETIME kernel_time;
    FILETIME user_time;

    __int64 system_time;
    __int64 time;

    double cpu_usage = -1;

    if (processor_count_ == -1)
    {
        processor_count_ = _hmc_getCPUCount();
    }

    GetSystemTimeAsFileTime(&now);

    HANDLE hProcess = OpenProcess(
        PROCESS_QUERY_INFORMATION |
        PROCESS_VM_READ,
        FALSE, ProcessID);

    if (!hProcess)
    {
        return -1;
    }

    if (!GetProcessTimes(hProcess, &creation_time, &exit_time, &kernel_time, &user_time))
    {
        return -1;
    }

    system_time = (_hmc_FileTimeToInt64(kernel_time) + _hmc_FileTimeToInt64(user_time)) / processor_count_; // CPUʹ��ʱ��
    time = _hmc_FileTimeToInt64(now);                                                                       // ���ڵ�ʱ��

    last_system_time_ = system_time;
    last_time_ = time;

    CloseHandle(hProcess);

    Sleep(1000); // ˯��1s

    hProcess = OpenProcess(
        PROCESS_QUERY_INFORMATION |
        PROCESS_VM_READ,
        FALSE, ProcessID);

    if (!hProcess)
    {
        return -1;
    }

    if (!GetProcessTimes(hProcess, &creation_time, &exit_time, &kernel_time, &user_time))
    {
        return -1;
    }

    GetSystemTimeAsFileTime(&now);
    system_time = (_hmc_FileTimeToInt64(kernel_time) + _hmc_FileTimeToInt64(user_time)) / processor_count_; // CPUʹ��ʱ��
    time = _hmc_FileTimeToInt64(now);                                                                       // ���ڵ�ʱ��

    CloseHandle(hProcess);

    cpu_usage = ((static_cast<double>(system_time - last_system_time_)) / (static_cast<double>(time - last_time_))) * 100;
    return cpu_usage;
}


namespace fn_getProcessCpuUsage
{
    NEW_PROMISE_FUNCTION_DEFAULT_FUN$SP$ARG;

    void format_arguments_value(napi_env env, napi_callback_info info, std::vector<any>& ArgumentsList, hmc_NodeArgsValue args_value) {
        if (!args_value.eq(0, js_number, true)) {
            return;
        }
        ArgumentsList.push_back(args_value.getDword(0));
    }

    any PromiseWorkFunc(vector<any> arguments_list)
    {
        if (arguments_list.empty()|| !arguments_list.at(0).has_value() || arguments_list.at(0).type()!= typeid(DWORD) ) {
            return any();
        }
        return getProcessCpuUsage(any_cast<DWORD>(arguments_list.at(0)) );
    }

    napi_value format_to_js_value(napi_env env, any result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data.has_value())
        {
            return result;
        }

        result = hmc_napi_create_value::Number(env, any_cast<double>(result_any_data));
        return result;
    }
};


namespace fn_GetProcessIdFilePath
{
    NEW_PROMISE_FUNCTION_DEFAULT_FUN$SP$ARG;

    void format_arguments_value(napi_env env, napi_callback_info info, std::vector<any>& ArgumentsList, hmc_NodeArgsValue args_value) {
        if (!args_value.eq(0, js_number , true)) {
            return;
        }
        ArgumentsList.push_back(args_value.getDword(0));
        //ArgumentsList.push_back(args_value.getBool(1));
    }

    any PromiseWorkFunc(vector<any> arguments_list)
    {
        if (arguments_list.empty() || !arguments_list.at(0).has_value() || arguments_list.at(0).type() != typeid(DWORD)) {
            return any();
        }
        return GetProcessIdFilePathW( any_cast<DWORD>(arguments_list.at(0)), false );
    }

    napi_value format_to_js_value(napi_env env, any result_any_data)
    {
        napi_value result;
        napi_get_null(env, &result);

        if (!result_any_data.has_value())
        {
            return result;
        }

        result = hmc_napi_create_value::String(env, any_cast<wstring>(result_any_data));
        return result;
    }
};





static napi_value Init(napi_env env, napi_value exports)
{

    napi_property_descriptor BIND_NAPI_METHOD[] = {
        ___EXPORT_NAPI_REMOTE_FN____PROMISE_SESSION};
    napi_define_properties(env, exports, sizeof(BIND_NAPI_METHOD) / sizeof(BIND_NAPI_METHOD[0]), BIND_NAPI_METHOD);

    fn_getAllProcessList::exports(env,exports,"getAllProcessList");
    fn_getAllProcessList::exportsSync(env, exports, "getAllProcessListSync");

    fn_getAllProcessNtList::exports(env, exports, "getAllProcessListNt");
    fn_getAllProcessNtList::exportsSync(env, exports, "getAllProcessListNtSync");

    fn_getAllProcessSnpList::exports(env, exports, "getAllProcessListSnp");
    fn_getAllProcessSnpList::exportsSync(env, exports, "getAllProcessListSnpSync");

    fn_getProcessCpuUsage::exports(env, exports, "getProcessCpuUsage");
    fn_getProcessCpuUsage::exportsSync(env, exports, "getProcessCpuUsageSync");

    fn_GetProcessIdFilePath::exports(env, exports, "getProcessFilePath");
    fn_GetProcessIdFilePath::exportsSync(env, exports, "getProcessFilePathSync");

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
