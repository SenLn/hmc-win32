import path = require("path");
import os = require("os");
import fs = require("fs");
import https = require('https');
import dgram = require('dgram');
import { chcpList } from "./chcpList";
import { KeyboardcodeComparisonTable, KeyboardcodeEmenList, VK_VirtualKey, VK_code, VK_key, VK_keyCode, vkKey } from "./vkKey";
import child_process = require("child_process");
import net = require("net");
import { HMCC, captureBmp2, captureBmp2Sync, captureBmpToBuff, captureBmpToFile, closeWindow2, closeWindow2Sync, getThumbnailPng, native2, readElectronHandle, showContextMenu } from "./hmc2";
import beta = require('./hmc2');

const argvSplit: (str: string) => string[] = require("argv-split");
let $_thenConsole: HWND | null = null;

/**注册表根目录 */
const Hkey = {
    /**用作默认用户首选设置|也作为单个用户的首选设置 */
    HKEY_CURRENT_CONFIG: "HKEY_CURRENT_CONFIG" as "HKEY_CURRENT_CONFIG",
    /**用作默认用户首选设置|也作为单个用户的首选设置 */
    HKEY_USERS: "HKEY_USERS" as "HKEY_USERS",
    /**是与文档类型和 OLE\COM 相关的信息的支持键。这个键是 */
    HKEY_CLASSES_ROOT: "HKEY_CLASSES_ROOT" as "HKEY_CLASSES_ROOT",
    /**包含描述计算机及其配置的条目。其中包括关于处理器、系统主板、内存和已安装的软件和硬件的信息 */
    HKEY_LOCAL_MACHINE: "HKEY_LOCAL_MACHINE" as "HKEY_LOCAL_MACHINE",
    /**管理系统当前的用户信息 */
    HKEY_CURRENT_USER: "HKEY_CURRENT_USER" as "HKEY_CURRENT_USER",
};



/**
 * @zh-cn 静态调用 hmc.dll (注意如果您不知道这个是什么作用 请勿随意调用 参数错误有可能会导致进程崩溃)
 * @en-us Static call to hmc.dll (Note that if you don't know what this does, don't call it at random.  Parameter errors may cause the process to crash)
 */
const get_native: () => HMC.Native = (binPath?: string) => {
    function _require_bin(): HMC.Native | null {
        try {
            if (binPath) return require(binPath);
            if (process.arch.match(/^x32|ia32$/)) return require("./bin/HMC_x86.node");
            if (process.arch.match(/^x64$/)) return require("./bin/HMC_x64.node");
        } catch (X_X) {

        }
        return null;
    }
    let Native: HMC.Native = (process.platform == "win32" ? _require_bin() : null) || (() => {
        let HMCNotPlatform = "HMC::HMC current method only supports win32 platform";
        function fnBool(...args: any[]) { console.error(HMCNotPlatform); return false }
        function fnVoid(...args: any[]) { console.error(HMCNotPlatform); return undefined }
        function fnNull(...args: any[]) { console.error(HMCNotPlatform); return null }
        function fnNum(...args: any[]) { console.error(HMCNotPlatform); return 0 }
        function fnStrList(...args: any[]) { console.error(HMCNotPlatform); return [] as string[] }
        function fnStr(...args: any[]) { console.error(HMCNotPlatform); return '' }
        function fnAnyArr(...args: any[]) { console.error(HMCNotPlatform); return [] as any[] }
        function fnPromise(...args: any[]) { console.error(HMCNotPlatform); return Promise.reject("HMC::HMC current method only supports win32 platform") }
        function fnArrStr(...args: any[]) { console.error(HMCNotPlatform); return "[]" }

        return {
            v2:{},
            getRegistrBuffValue: fnNull,
            getRegistrValueStat: fnNull,
            removeRegistrValue: fnBool,
            removeRegistrFolder: fnBool,
            createRegistrFolder: fnBool,
            getRegistrFolderStat: fnNull,
            setRegistrValue: fnBool,
            getProcessStartTime: fnNull,
            __debug_AllocConsole: fnVoid,
            hasKeyExists: fnBool,
            hasUseKeyExists: fnBool,
            hasSysKeyExists: fnBool,
            escapeEnvVariable: fnStr,
            removeUserVariable: fnBool,
            removeSystemVariable: fnBool,
            getSystemVariable: fnStr,
            getUserVariable: fnStr,
            getVariableAnalysis: fnStr,
            putSystemVariable: fnBool,
            getClipboardHTML: fnNull,
            putUserVariable: fnBool,
            getVariableAll(...args: any[]) { return {} as HMC.VariableList },
            getRealGlobalVariable(...args: any[]) { return {} as HMC.VariableList },
            getUserKeyList: fnAnyArr,
            getClipboardInfo: () => { return { format: [], formatCount: 0, hwnd: 0, id: 0 } },
            getSystemKeyList: fnAnyArr,
            findAllWindow: fnAnyArr,
            _popen: fnStr,
            popen: fnStr,
            createMutex: fnBool,
            getSubProcessID: fnAnyArr,
            enumAllProcessPolling: fnVoid,
            clearEnumAllProcessList: fnVoid,
            isStartKeyboardHook: fnBool,
            clearEnumProcessHandle: fnVoid,
            getProcessThreadList: fnAnyArr,
            getKeyboardNextSession: fnAnyArr,
            unKeyboardHook: fnVoid,
            installKeyboardHook: fnVoid,
            MessageError: fnVoid,
            getRegistrValue: fnNull,
            getShortcutLink: () => {
                return { cwd: "", icon: "", iconIndex: 0, desc: "", args: "", showCmd: 0, hotkey: 0, path: "" }
            },
            MessageStop: fnBool,
            SetBlockInput: fnBool,
            SetSystemHOOK: fnBool,
            SetWindowInTaskbarVisible: fnBool,
            alert: fnBool,
            clearClipboard: fnBool,
            enumAllProcess: fnNum,
            closedHandle: fnVoid,
            confirm: fnBool,
            createDirSymlink: fnBool,
            createHardLink: fnBool,
            createSymlink: fnBool,
            desc: "HMC Connection System api",
            getAllWindows: fnAnyArr,
            getAllWindowsHandle: fnAnyArr,
            getBasicKeys: () => {
                console.error(HMCNotPlatform);
                return {
                    "alt": false,
                    "ctrl": false,
                    "shift": false,
                    "win": false,
                }
            },
            getClipboardFilePaths: fnArrStr,
            getClipboardText: fnStr,
            // getDetailsProcessList: fnAnyArr,
            getDeviceCaps: () => {
                console.error(HMCNotPlatform);
                return {
                    "height": 0,
                    "width": 0,
                }
            },
            getForegroundWindow: fnNum,
            getForegroundWindowProcessID: fnNull,
            getHandleProcessID: fnNull,
            getHidUsbList: fnAnyArr,
            getMainWindow: fnNull,
            getMetrics: () => { console.error(HMCNotPlatform); return { "left": 0, "top": 0, "x": 0, "y": 0 } },
            getMouseMovePoints: fnArrStr,
            getPointWindow: fnNull,
            getPointWindowMain: fnNum,
            getPointWindowName: fnStr,
            getPointWindowProcessId: fnNum,
            getProcessHandle: fnNull,
            getSystemIdleTime: fnNum,
            getSystemMenu: fnBool,
            getTrayList: fnAnyArr,
            getUsbDevsInfo: fnStrList,
            getWindowRect: () => {
                console.error(HMCNotPlatform);
                return { "bottom": 0, "height": 0, "width": 0, "left": 0, "top": 0, "right": 0, "x": 0, "y": 0 }
            },
            hasKeyActivate: fnBool,
            hasProcess: fnBool,
            hasWindowTop: fnBool,
            isAdmin: fnBool,
            isEnabled: fnBool,
            isHandle: fnBool,
            isHandleWindowVisible: fnBool,
            isProcess: fnBool,
            isSystemX64: fnBool,
            killProcess: fnBool,
            leftClick: fnBool,
            lookHandleCloseWindow: fnBool,
            lookHandleGetTitle: fnNull,
            lookHandleSetTitle: fnBool,
            setWindowIconForExtract: fnVoid,
            lookHandleShowWindow: fnBool,
            messageBox: fnNum as () => 1,
            mouse: fnBool,
            openApp: fnBool,
            openExternal: fnBool,
            openPath: fnBool,
            openURL: fnBool,
            platform: "win32",
            powerControl: fnVoid,
            rightClick: fnBool,
            setClipboardFilePaths: fnBool,
            setClipboardText: fnBool,
            setCursorPos: fnBool,
            setHandleTransparent: fnBool,
            setShortcutLink: fnBool,
            setWindowEnabled: fnBool,
            setWindowFocus: fnBool,
            setWindowMode: fnBool,
            setWindowTop: fnBool,
            showMonitors: fnBool,
            shutMonitors: fnBool,
            sleep: fnBool,
            system: fnNum,
            systemStartTime: fnNum,
            updateWindow: fnBool,
            version: "0.0.0",
            windowJitter: fnVoid,
            enumChildWindows: fnAnyArr,
            deleteFile: fnNum,
            getClipboardSequenceNumber: fnNum,
            enumClipboardFormats: fnAnyArr,
            getHidUsbIdList: fnAnyArr,
            getDeviceCapsAll: fnAnyArr,
            isInMonitorWindow: fnBool,
            isMouseMonitorWindow: fnBool,
            getCurrentMonitorRect: () => { console.error(HMCNotPlatform); return { "bottom": 0, "left": 0, "top": 0, "right": 0, } },
            getSystemMetricsLen: fnNum,
            getWindowStyle: fnNum,
            getWindowClassName: fnStr,
            formatVolumePath: fnStr,
            getVolumeList: fnAnyArr,
            enumProcessHandlePolling: fnVoid,
            enumProcessHandle: fnNum,
            getModulePathList: fnStrList,
            getColor() { return { r: 0, g: 0, b: 0, hex: "#000000" } as HMC.Color },
            sendKeyboard: fnBool,
            sendBasicKeys: fnBool,
            sendKeyT2C: fnVoid,
            sendKeyT2CSync: fnVoid,
            hasMutex: fnBool,
            getAllEnv() { return process.env as any },
            // getTCPPortProcessID: fnNull,
            getenv: fnStr,
            // getUDPPortProcessID: fnNull,
            putenv: fnVoid,
            findWindowEx: fnNull,
            findWindow: fnNull,
            // getProcessidFilePathAsync: fnPromise,
            _PromiseSession_get: fnNull,
            _PromiseSession_isClosed: fnBool,
            _PromiseSession_stop: fnVoid,
            _PromiseSession_max_id: fnNum,
            _PromiseSession_data_size: fnNum,
            _PromiseSession_set_sleep_time: fnNum,
            _PromiseSession_await: fnVoid,
            _PromiseSession_allTasks: fnAnyArr,
            _PromiseSession_completeTasks: fnAnyArr,
            _PromiseSession_ongoingTasks: fnAnyArr,
            _PromiseSession_get_sleep_time: fnNum,
            getAllProcessList: fnPromise,
            getAllProcessListSync: fnArrStr,
            getAllProcessListSnp: fnPromise,
            getAllProcessListSnpSync: fnArrStr,
            getAllProcessListNt: fnPromise,
            getAllProcessListNtSync: fnArrStr,
            getProcessCpuUsage: fnPromise,
            getProcessCpuUsageSync: fnNum,
            getProcessFilePath: fnPromise,
            getProcessFilePathSync: fnArrStr,
            existProcess: fnPromise,
            existProcessSync: fnBool,
            getCursorPos: fnArrStr,
            isStartHookMouse2: fnBool,
            unHookMouse2: fnVoid,
            installHookMouse2: fnVoid,
            getMouseNextSession2: fnArrStr,
            getLastInputTime: fnNum,
            hasLimitMouseRangeWorker: fnBool,
            setLimitMouseRange: fnBool,
            stopLimitMouseRangeWorker: fnBool,
            getProcessCommand: fnPromise,
            getProcessCommandSync: fnNull,
            getProcessCwd: fnPromise,
            getProcessCwdSync: fnStr,
        }
    })();
    return Native;
};
export const native: HMC.Native = get_native();

native.v2 = native2;

/**
 * 句柄 可以视为是一个数字也可以视为是一个功能 {0}
 * 继承了 Number 的构建类
 */
export class HWND extends Number {
    constructor(hWnd: number) {
        super(hWnd);
        this.HWND = hWnd;
    }
    /**句柄 */
    get handle() { return this.HWND };
    /**真实的句柄 */
    HWND: number;
    /**
     * 强制关闭窗口不发送被关闭的消息给窗口
     */
    closed() {
        if (!this.exists) return false;
        return native.closedHandle(this.HWND);
    }
    /**
     * 向窗口发送关闭的消息
     */
    close() {
        if (!this.exists) return false;
        return native.lookHandleCloseWindow(this.HWND);
    }

    /**
     * [异步 不支持并发] 关闭窗口
     * - 1 温柔的关闭 (正常关闭)
     * - 2 关闭 / 系统级(半强制)
     * - 3 关闭线程 (强制)
     */
    close2(grade?: 1 | 2 | 3) {
        if (!this.exists) return false;
        return native2?.closeWindow2 ? native2?.closeWindow2(this.HWND, 2) : Promise.resolve(false);
    }

    /**
     * [同步步 不支持并发] 关闭窗口
     * - 1 温柔的关闭 (正常关闭)
     * - 2 关闭 / 系统级(半强制)
     * - 3 关闭线程 (强制)
     */
    close2Sync(grade?: 1 | 2 | 3) {
        if (!this.exists) return false;
        return native2?.closeWindow2Sync ? native2?.closeWindow2Sync(this.HWND, 2) : false;
    }

    /*
     * 窗口位置
     */
    get rect(): HMC.Rect | null {
        if (!this.exists) return null;
        return native.getWindowRect(this.HWND);
    }
    /**
     * 窗口名称
     */
    get title(): string {
        return native.lookHandleGetTitle(this.HWND) || "";
    }
    /**
     * 设置窗口的标题
     * @param Title 标题
     * @returns
     */
    setTitle(Title: string) {
        if (typeof Title !== "string" || !this.exists) {
            return false;
        }
        return native.lookHandleSetTitle(this.HWND, Title);
    }
    /**句柄是否有效 */
    get exists() {
        if (!this.HWND) return false;
        return native.isHandle(this.HWND);
    }
    /**句柄是否有效 */
    get isHandle() {
        return this.exists;
    }
    /**
     * 当前句柄的pid
     */
    get pid() {
        if (!this.exists) return 0;
        return native.getHandleProcessID(this.HWND);
    }
    /**
     * 获取主窗口的pid
     */
    get MianPid(): HMC.ProcessID | null {
        if (!this.exists) return 0;
        return native.getHandleProcessID(this.MainHandle);
    }
    get MainHandle(): number {
        return native.getMainWindow(this.HWND) || 0;
    }
    get className() {
        return native.getWindowClassName(this.HWND);
    }
    get style() {
        return native.getWindowStyle(this.HWND);
    }
    /**
     * 判断窗口是否可见
     * @returns
     */
    isVisible() {
        if (!this.HWND) return false;
        return native.isHandleWindowVisible(this.HWND);
    }
    /**
     * 结束该进程
     * @returns
     */
    kill() {
        let processid = this.MianPid;
        if (!processid) return false;
        return native.killProcess(processid);
    }
    /**
     * 隐藏窗口
     * @returns
     */
    hide() {
        if (!this.HWND) return false;
        return native.lookHandleShowWindow(this.HWND, 0);
    }
    /**
     * 显示窗口
     * @returns
     */
    show() {
        if (!this.HWND) return false;

        return native.lookHandleShowWindow(this.HWND, 5);
    }
    /**
     * 窗口最小化
     * @returns
     */
    setMin() {
        if (!this.HWND) return false;

        return native.lookHandleShowWindow(this.HWND, 7);
    }
    /**
     * 窗口最大化
     * @returns
     */
    setMax() {
        if (!this.HWND) return false;

        return native.lookHandleShowWindow(this.HWND, 3);
    }
    /**
     * 恢复最近的状态
     * @returns
     */
    setRestore() {
        if (!this.HWND) return false;

        return native.lookHandleShowWindow(this.HWND, 9);
    }
    /**
     * 聚焦该窗口
     * @returns
     */
    setFocus() {
        if (!this.HWND) return false;

        return native.setWindowFocus(this.HWND);
    }
    /**
     * 禁用窗口
     * @param enabled
     * @returns
     */
    setEnabled(enabled: boolean) {
        if (!this.HWND) return false;

        return native.setWindowEnabled(this.HWND, enabled);
    }
    /**
     * 是否被禁用
     * @returns
     */
    isEnabled() {
        if (!this.HWND) return false;

        return native.isEnabled(this.HWND);
    }
    /**
     * 窗口抖动
     * @returns
     */
    setJitter() {
        if (!this.HWND) return false;
        return native.windowJitter(this.HWND);
    }
    /**
     * 判断窗口是否被顶设
     * @returns
     */
    isTop() {
        if (!this.HWND) return false;

        return native.hasWindowTop(this.HWND);
    }
    /**
     * 设置窗口顶设或者取消
     * @returns
     */
    setTopOrCancel() {
        if (!this.HWND) return false;

        return native.setWindowTop(this.HWND);
    }
    /**
     * 设置窗口不透明度
     * @param opacity 0-100 or 0.0 - 1.0
     */
    setOpacity(opacity: number) {
        if (typeof opacity !== "number" || opacity > 100 || isNaN(opacity))
            throw new Error(
                "fun <setOpacity> arg:<Opacity> is only allowed from 0.0 to 1.0 or  0 to 255"
            );
        if (opacity < 1) {
            return this.setTransparent(Math.trunc(255 * opacity));
        }
        opacity = (255 / 100) * opacity;
        if (!isNaN(opacity)) {
            return this.setTransparent(Math.trunc(255 * opacity));
        }
        return false;
    }
    /**
     * 设置窗口不透明度
     * @param opacity -1 - 255
     */
    setTransparent(opacity: number) {
        if (opacity < -1 || opacity > 255) {
            throw new Error(
                "fun <setTransparent> arg:<Opacity> is only allowed from -1 to 255"
            );
        }
        if (!this.HWND) return false;
        return native.setHandleTransparent(this.HWND, opacity as HMC.HandleTransparent);
    }
}

// 类型
export module HMC {
    // hmc的底层函数集
    export type G_HMC_NATIVE = {
        _PromiseSession_get: HMC.Native["_PromiseSession_get"],
        _PromiseSession_isClosed: HMC.Native["_PromiseSession_isClosed"],
        _PromiseSession_stop: HMC.Native["_PromiseSession_stop"],
        _PromiseSession_max_id: HMC.Native["_PromiseSession_max_id"],
        _PromiseSession_data_size: HMC.Native["_PromiseSession_data_size"],
        _PromiseSession_set_sleep_time: HMC.Native["_PromiseSession_set_sleep_time"],
        _PromiseSession_await: HMC.Native["_PromiseSession_await"],
        _PromiseSession_ongoingTasks: HMC.Native["_PromiseSession_ongoingTasks"],
        _PromiseSession_completeTasks: HMC.Native["_PromiseSession_completeTasks"],
        _PromiseSession_get_sleep_time: HMC.Native["_PromiseSession_get_sleep_time"],
        _PromiseSession_allTasks: HMC.Native["_PromiseSession_allTasks"],
    }

    export type MouseMovePoints = {
        // 坐标 x 左边到右边的距离(px)
        "x": number | null,
        // 坐标 y 顶边到底部的距离(px)
        "y": number | null,
        // 此任务的发生时间
        "time": number | null,
        // 预留数据
        "dwExtraInfo": number | null
    }

    export enum REG_TYPE {
        REG_NONE = 0,      // 没有类型
        REG_SZ = 1,        // 结尾的文本
        REG_EXPAND_SZ = 2, // 可扩展文本
        REG_BINARY = 3,                   // 二进制
        REG_DWORD = 4,                    // 32-bit number
        REG_DWORD_LITTLE_ENDIAN = 4,      // 32-bit number (same as REG_DWORD)
        REG_DWORD_BIG_ENDIAN = 5,         // 32-bit number
        REG_LINK = 6,                     // Symbolic Link (unicode)
        REG_MULTI_SZ = 7,                 // Multiple Unicode strings
        REG_RESOURCE_LIST = 8,            // Resource list in the resource map
        REG_FULL_RESOURCE_DESCRIPTOR = 9, // Resource list in the hardware description
        REG_RESOURCE_REQUIREMENTS_LIST = 10,
        REG_QWORD = 11,               // 64-bit number
        REG_QWORD_LITTLE_ENDIAN = 11, // 64-bit number (same as REG_QWORD)
    }

    export type EnumRegistrFolderItem = RegistrFolderInfo & {
        key: string[]; // 值键
        Folder: string[]; // 目录键
    };

    export type RegistrFolderInfo = {
        size: number;   // 值键 / 目录键 数量
        exists: boolean;      // 此键是否存在
        folderSize: number; // 此目录键总数量
        keySize: number;    // 此目录键总数量
        time: number | null;   // 时间戳(最后写入时间)
    };

    /**
     * （进程快照）PROCESSENTRY 结构体  它包含了进程的各种信息，如进程 ID、线程计数器、优先级等等
     */
    export type PROCESSENTRY = {
        /**结构体的大小，以字节为单位。 */
        dwSize: number;
        /**引用计数。 */
        cntUsage: number;
        /**进程 ID。 */
        th32ProcessID: number;
        /**默认堆 ID */
        th32DefaultHeapID: number;
        /**模块 ID */
        th32ModuleID: number;
        /**线程计数器。 */
        cntThreads: number;
        /** 父进程 ID。 */
        th32ParentProcessID: number;
        /**基本优先级。 */
        pcPriClassBase: number;
        /**标志位。 */
        dwFlags: number;
        /**进程名。 */
        szExeFile: string;
    };

    /**
     * 是一个结构体，它定义在 `tlhelp32.h` 头文件中。它描述了在系统执行快照时正在执行的线程列表中的条目
     */
    export type THREADENTRY32 = {
        /**线程使用计数 */
        cntUsage: number,
        /**保留，不再使用 */
        dwFlags: 0,
        /**结构体的大小，以字节为单位 */
        dwSize: number,
        /**创建线程的进程标识符 */
        th32OwnerProcessID: number,
        /**线程标识符，与 `CreateProcess` 函数返回的线程标识符兼容 */
        th32ThreadID: number,
        /**分配给线程的内核基优先级 */
        tpBasePri: number,
        /**线程优先级相对于基本优先级的增量 */
        tpDeltaPri: number
    }
    /**
     * 设置窗口坐标
     */
    export type RECT_CONFIG = {
        /**
         * (right) 从屏幕右边到所在位置得像素数
         */
        x?: number;
        /**
         * (top)从屏幕顶部边到所在位置得像素数
         */
        y?: number;
        /**
         * 宽度
         */
        width?: number;
        /**
         * 高度
         */
        height?: number;
        /**
         * (x)从屏幕左边到所在位置得像素数
         */
        right?: number;
        /**
         * (y)从屏幕顶部边到所在位置得像素数
         */
        top?: number;
    };

    /**
     * C++中的坐标
     */
    export type cPOINT = {
        // (left) 从屏幕左边到所在位置得像素数
        x: number;
        //  (top) 从屏幕顶部边到所在位置得像素数
        y: number;
    }

    // WebView2 信息
    export type WebView2Info = {
        // 版本号
        version: string,
        // 名称
        name: string,
        // 安装路径
        location: string,
    } | null;


    /**
     * C++ 中的 位置定义
     */
    export type cRECT = {
        // (x) 从屏幕左边到所在位置得像素数
        left: number;
        // (y) 从屏幕顶部边到所在位置得像素数
        top: number;
        // 距离右边的距离
        right: number;
        // 距离底部的距离
        bottom: number;
    }

    /**
     * C++中的位置定义
     */
    export interface cRect {
        // (left) 从屏幕左边到所在位置得像素数
        x: number;
        //  (top) 从屏幕顶部边到所在位置得像素数
        y: number;
        // 高度
        height: number;
        // 宽度
        width: number;
    }

    // 枚举进程id的内容 带执行文件路径
    export interface enumProcessContP {
        // 软件名称
        name: string;
        // 进程id
        pid: ProcessID;
        // 可执行文件路径
        path: string;
    }

    // 枚举进程id的内容
    export interface enumProcessCont {
        // 软件名称
        name: string;
        // 进程id
        pid: ProcessID;
    }

    // 鼠标所在位置
    export interface MousePosn {
        // (x) 从屏幕左边到所在位置得像素数
        left: number;
        // (y) 从屏幕顶部边到所在位置得像素数
        top: number;
        // (left) 从屏幕左边到所在位置得像素数
        x: number;
        //  (top) 从屏幕顶部边到所在位置得像素数
        y: number;
    };

    // 返回的进程id
    export type ProcessID = number;

    // win窗口允许的不透明度
    export type HandleTransparent = number;

    // 注册表根目录
    export type HKEY = keyof typeof Hkey;

    // 鼠标按钮变化
    export enum MouseKey {
        WM_MOUSEMOVE = 512,
        // 左键按下
        WM_LBUTTONDOWN = 0x0201,
        // 右键按下
        WM_RBUTTONDOWN = 0x0204,
        // 左键释放
        WM_LBUTTONUP = 0x0202,
        // 右键释放
        WM_RBUTTONUP = 0x0205,
        // 中键按下
        WM_MBUTTONDOWN = 0x0207,
        // 中键释放
        WM_MBUTTONUP = 0x0208,
        // 滚轮
        WM_MOUSEWHEEL = 522,
    }

    export type direction = "right" | "left" | "right-top" | "left-bottom" | "left-top" | "right-bottom" | "bottom" | "top" | "middle";

    // getsystemmetrics的可获取值 详见 https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getsystemmetrics
    export enum SYSTEM_METRICS_NINDEX {
        // 指定系统如何排列最小化窗口的标志。 有关详细信息，请参阅本主题中的“备注”部分。  
        SM_ARRANGE = 56,
        // 指定系统启动方式的 值：0 正常启动1 故障安全启动2 通过网络启动实现故障安全故障安全启动 (也称为 SafeBoot、安全模式或干净启动) 会绕过用户启动文件。  
        SM_CLEANBOOT = 67,
        // 桌面上的显示监视器数。 有关详细信息，请参阅本主题中的“备注”部分。  
        SM_CMONITORS = 80,
        // 鼠标上的按钮数;如果未安装鼠标，则为零。                       
        SM_CMOUSEBUTTONS = 43,
        // 反映笔记本电脑或平板模式的状态，0 表示板模式，否则为非零。 当此系统指标发生更改时，系统会通过 LPARAM 中带有“ConvertibleSlateMode” [的WM_SETTINGCHANGE](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-settingchange) 发送广播消息。 请注意，此系统指标不适用于台式电脑。 在这种情况下，请使用 [GetAutoRotationState](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-getautorotationstate)。  
        SM_CONVERTIBLESLATEMODE = 0x2003,
        // 窗口边框的宽度（以像素为单位）。 这等效于具有 3D 外观的窗口的 SM_CXEDGE 值。  
        SM_CXBORDER = 5,
        // 光标的标称宽度（以像素为单位）。                              
        SM_CXCURSOR = 13,
        // 此值与 SM_CXFIXEDFRAME 相同。                                 
        SM_CXDLGFRAME = 7,
        // 矩形围绕双击序列中第一次单击的位置的宽度（以像素为单位）。 第二次单击必须在由 SM_CXDOUBLECLK 和 SM_CYDOUBLECLK 定义的矩形内发生，系统才能将两次单击视为双击。 两次单击也必须在指定时间内发生。若要设置双击矩形的宽度，请使用SPI_SETDOUBLECLKWIDTH调用 [SystemParametersInfo](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa) 。  
        SM_CXDOUBLECLK = 36,
        // 鼠标指针在拖动操作开始之前可以移动的鼠标向下点任一侧的像素数。 这允许用户轻松单击并释放鼠标按钮，而不会无意中启动拖动操作。 如果此值为负值，则从鼠标向下点的左侧减去该值，并将其添加到其右侧。  
        SM_CXDRAG = 68,
        // 三维边框的宽度（以像素为单位）。 此指标是SM_CXBORDER的三维对应指标。  
        SM_CXEDGE = 45,
        // 窗口周围具有描述文字但不是相当大的（以像素为单位）的框架的粗细。 SM_CXFIXEDFRAME是水平边框的高度，SM_CYFIXEDFRAME是垂直边框的宽度。此值与 SM_CXDLGFRAME 相同。  
        SM_CXFIXEDFRAME = 7,
        // [DrawFocusRect](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-drawfocusrect) 绘制的焦点矩形的左边缘和右边缘的宽度。 此值以像素为单位。**Windows 2000：** 不支持此值。  
        SM_CXFOCUSBORDER = 83,
        // 此值与 SM_CXSIZEFRAME 相同。                                  
        SM_CXFRAME = 32,
        // 主显示器上全屏窗口的工作区宽度（以像素为单位）。 若要获取系统任务栏或应用程序桌面工具栏未遮挡的屏幕部分的坐标，请使用SPI_GETWORKAREA值调用 [SystemParametersInfo](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa) 函数。  
        SM_CXFULLSCREEN = 16,
        // 水平滚动条上箭头位图的宽度（以像素为单位）。                  
        SM_CXHSCROLL = 21,
        // 水平滚动条中拇指框的宽度（以像素为单位）。                    
        SM_CXHTHUMB = 10,
        // 图标的系统大宽度（以像素为单位）。 [LoadIcon](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-loadicona) 函数只能加载具有SM_CXICON和SM_CYICON指定尺寸的图标。 有关详细信息 [，请参阅图标大小](https://learn.microsoft.com/zh-cn/windows/win32/menurc/about-icons#icon-sizes) 。  
        SM_CXICON = 11,
        // 大图标视图中项的网格单元格的宽度（以像素为单位）。 每个项都适合在排列时按SM_CYICONSPACING SM_CXICONSPACING大小的矩形。 此值始终大于或等于 SM_CXICON。  
        SM_CXICONSPACING = 38,
        // 主显示监视器上最大化的顶级窗口的默认宽度（以像素为单位）。    
        SM_CXMAXIMIZED = 61,
        // 具有描述文字和大小调整边框（以像素为单位）的窗口的默认最大宽度。 此指标是指整个桌面。 用户无法将窗口框架拖动到大于这些尺寸的大小。 窗口可以通过处理 [WM_GETMINMAXINFO](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-getminmaxinfo) 消息来替代此值。  
        SM_CXMAXTRACK = 59,
        // 默认菜单的宽度检查标记位图（以像素为单位）。                  
        SM_CXMENUCHECK = 71,
        // 菜单栏按钮的宽度，例如在多个文档界面中使用的子窗口关闭按钮（以像素为单位）。  
        SM_CXMENUSIZE = 54,
        // 窗口的最小宽度（以像素为单位）。                              
        SM_CXMIN = 28,
        // 最小化窗口的宽度（以像素为单位）。                            
        SM_CXMINIMIZED = 57,
        // 最小化窗口的网格单元格的宽度（以像素为单位）。 每个最小化窗口在排列时适合此大小的矩形。 此值始终大于或等于 SM_CXMINIMIZED。  
        SM_CXMINSPACING = 47,
        // 窗口的最小跟踪宽度（以像素为单位）。 用户无法将窗口框架拖动到小于这些尺寸的大小。 窗口可以通过处理 [WM_GETMINMAXINFO](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-getminmaxinfo) 消息来替代此值。  
        SM_CXMINTRACK = 34,
        // 带字幕窗口的边框填充量（以像素为单位）。**Windows XP/2000：** 不支持此值。  
        SM_CXPADDEDBORDER = 92,
        // 主显示器的屏幕宽度（以像素为单位）。 这是通过调用 [GetDeviceCaps](https://learn.microsoft.com/zh-cn/windows/desktop/api/wingdi/nf-wingdi-getdevicecaps) 获取的相同值，如下所示： `GetDeviceCaps( hdcPrimaryMonitor, HORZRES)`。  
        SM_CXSCREEN = 0,
        // 窗口中按钮的宽度描述文字或标题栏（以像素为单位）。            
        SM_CXSIZE = 30,
        // 可调整大小的窗口周边的大小边框的粗细（以像素为单位）。 SM_CXSIZEFRAME是水平边框的宽度，SM_CYSIZEFRAME是垂直边框的高度。此值与 SM_CXFRAME 相同。  
        SM_CXSIZEFRAME = 32,
        // 图标的系统小宽度（以像素为单位）。 小图标通常显示在窗口标题和小图标视图中。 有关详细信息 [，请参阅图标大小](https://learn.microsoft.com/zh-cn/windows/win32/menurc/about-icons#icon-sizes) 。  
        SM_CXSMICON = 49,
        // 小描述文字按钮的宽度（以像素为单位）。                        
        SM_CXSMSIZE = 52,
        // 虚拟屏幕的宽度（以像素为单位）。 虚拟屏幕是所有显示监视器的边框。 SM_XVIRTUALSCREEN指标是虚拟屏幕左侧的坐标。  
        SM_CXVIRTUALSCREEN = 78,
        // 垂直滚动条的宽度（以像素为单位）。                            
        SM_CXVSCROLL = 2,
        // 窗口边框的高度（以像素为单位）。 这等效于具有 3D 外观的窗口的 SM_CYEDGE 值。  
        SM_CYBORDER = 6,
        // 描述文字区域的高度（以像素为单位）。                          
        SM_CYCAPTION = 4,
        // 光标的标称高度（以像素为单位）。                              
        SM_CYCURSOR = 14,
        // 此值与 SM_CYFIXEDFRAME 相同。                                 
        SM_CYDLGFRAME = 8,
        // 矩形围绕双击序列中第一次单击的位置的高度（以像素为单位）。 第二次单击必须在由 SM_CXDOUBLECLK 定义的矩形内发生，SM_CYDOUBLECLK系统会将两次单击视为双击。 两次单击也必须在指定时间内发生。若要设置双击矩形的高度，请使用SPI_SETDOUBLECLKHEIGHT调用 [SystemParametersInfo](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa) 。  
        SM_CYDOUBLECLK = 37,
        // 鼠标指针在拖动操作开始之前可以移动的鼠标向下点上方和下方的像素数。 这允许用户轻松单击并释放鼠标按钮，而不会无意中启动拖动操作。 如果此值为负值，则从鼠标向下点上方减去该值，并将其添加到其下方。  
        SM_CYDRAG = 69,
        // 三维边框的高度（以像素为单位）。 这是SM_CYBORDER的三维对应项。  
        SM_CYEDGE = 46,
        // 窗口周围具有描述文字但不是相当大的（以像素为单位）的框架的粗细。 SM_CXFIXEDFRAME是水平边框的高度，SM_CYFIXEDFRAME是垂直边框的宽度。此值与 SM_CYDLGFRAME 相同。  
        SM_CYFIXEDFRAME = 8,
        // [DrawFocusRect](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-drawfocusrect) 绘制的焦点矩形的上边缘和下边缘的高度。 此值以像素为单位。**Windows 2000：** 不支持此值。  
        SM_CYFOCUSBORDER = 84,
        // 此值与 SM_CYSIZEFRAME 相同。                                  
        SM_CYFRAME = 33,
        // 主显示器上全屏窗口的工作区高度（以像素为单位）。 若要获取系统任务栏或应用程序桌面工具栏未遮挡的屏幕部分的坐标，请使用 SPI_GETWORKAREA 值调用 [SystemParametersInfo](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa) 函数。  
        SM_CYFULLSCREEN = 17,
        // 水平滚动条的高度（以像素为单位）。                            
        SM_CYHSCROLL = 3,
        // 图标的系统高度（以像素为单位）。 [LoadIcon](https://learn.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-loadicona) 函数只能加载具有SM_CXICON和SM_CYICON指定尺寸的图标。 有关详细信息 [，请参阅图标大小](https://learn.microsoft.com/zh-cn/windows/win32/menurc/about-icons#icon-sizes) 。  
        SM_CYICON = 12,
        // 大图标视图中项的网格单元格的高度（以像素为单位）。 每个项都适合在排列时按SM_CYICONSPACING SM_CXICONSPACING大小的矩形。 此值始终大于或等于 SM_CYICON。  
        SM_CYICONSPACING = 39,
        // 对于系统的双字节字符集版本，这是屏幕底部的汉字窗口的高度（以像素为单位）。  
        SM_CYKANJIWINDOW = 18,
        // 主显示监视器上最大化的顶级窗口的默认高度（以像素为单位）。    
        SM_CYMAXIMIZED = 62,
        // 具有描述文字和大小调整边框的窗口的默认最大高度（以像素为单位）。 此指标是指整个桌面。 用户无法将窗口框架拖动到大于这些尺寸的大小。 窗口可以通过处理 [WM_GETMINMAXINFO](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-getminmaxinfo) 消息来替代此值。  
        SM_CYMAXTRACK = 60,
        // 单行菜单栏的高度（以像素为单位）。                            
        SM_CYMENU = 15,
        // 默认菜单的高度检查标记位图（以像素为单位）。                  
        SM_CYMENUCHECK = 72,
        // 菜单栏按钮（例如在多个文档界面中使用的子窗口关闭按钮）的高度（以像素为单位）。  
        SM_CYMENUSIZE = 55,
        // 窗口的最小高度（以像素为单位）。                              
        SM_CYMIN = 29,
        // 最小化窗口的高度（以像素为单位）。                            
        SM_CYMINIMIZED = 58,
        // 最小化窗口的网格单元格的高度（以像素为单位）。 每个最小化窗口在排列时适合此大小的矩形。 此值始终大于或等于 SM_CYMINIMIZED。  
        SM_CYMINSPACING = 48,
        // 窗口的最小跟踪高度（以像素为单位）。 用户无法将窗口框架拖动到小于这些尺寸的大小。 窗口可以通过处理 [WM_GETMINMAXINFO](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-getminmaxinfo) 消息来替代此值。  
        SM_CYMINTRACK = 35,
        // 主显示器的屏幕高度（以像素为单位）。 这是通过调用 [GetDeviceCaps](https://learn.microsoft.com/zh-cn/windows/desktop/api/wingdi/nf-wingdi-getdevicecaps) 获取的相同值，如下所示： `GetDeviceCaps( hdcPrimaryMonitor, VERTRES)`。  
        SM_CYSCREEN = 1,
        // 窗口中按钮的高度描述文字或标题栏（以像素为单位）。            
        SM_CYSIZE = 31,
        // 可调整大小的窗口周边的大小边框的粗细（以像素为单位）。 SM_CXSIZEFRAME是水平边框的宽度，SM_CYSIZEFRAME是垂直边框的高度。此值与 SM_CYFRAME 相同。  
        SM_CYSIZEFRAME = 33,
        // 小描述文字的高度（以像素为单位）。                            
        SM_CYSMCAPTION = 51,
        // 图标的系统小高度（以像素为单位）。 小图标通常显示在窗口标题和小图标视图中。 有关详细信息 [，请参阅图标大小](https://learn.microsoft.com/zh-cn/windows/win32/menurc/about-icons#icon-sizes) 。  
        SM_CYSMICON = 50,
        // 小描述文字按钮的高度（以像素为单位）。                        
        SM_CYSMSIZE = 53,
        // 虚拟屏幕的高度（以像素为单位）。 虚拟屏幕是所有显示监视器的边框。 SM_YVIRTUALSCREEN指标是虚拟屏幕顶部的坐标。  
        SM_CYVIRTUALSCREEN = 79,
        // 垂直滚动条上箭头位图的高度（以像素为单位）。                  
        SM_CYVSCROLL = 20,
        // 垂直滚动条中拇指框的高度（以像素为单位）。                    
        SM_CYVTHUMB = 9,
        // 如果User32.dll支持 DBCS，则为非零值;否则为 0。                
        SM_DBCSENABLED = 42,
        // 如果安装了User.exe的调试版本，则为非零;否则为 0。             
        SM_DEBUG = 22,
        // 如果当前操作系统是 Windows 7 或 Windows Server 2008 R2 并且平板电脑输入服务已启动，则为非零;否则为 0。 返回值是一个位掩码，用于指定设备支持的数字化器输入的类型。 有关详细信息，请参阅“备注”。**Windows Server 2008、Windows Vista 和 Windows XP/2000：** 不支持此值。  
        SM_DIGITIZER = 94,
        // 如果启用了输入法管理器/输入法编辑器功能，则为非零值;否则为 0。SM_IMMENABLED指示系统是否已准备好在 Unicode 应用程序上使用基于 Unicode 的 IME。 若要确保依赖于语言的 IME 正常工作，检查 SM_DBCSENABLED和系统 ANSI 代码页。 否则，ANSI 到 Unicode 的转换可能无法正确执行，或者某些组件（如字体或注册表设置）可能不存在。  
        SM_IMMENABLED = 82,
        // 如果系统中存在数字化器，则为非零值;否则为 0。SM_MAXIMUMTOUCHES返回系统中每个数字化器支持的最大接触数的聚合最大值。 如果系统只有单点触控数字化器，则返回值为 1。 如果系统具有多点触控数字化器，则返回值是硬件可以提供的同时触点数。**Windows Server 2008、Windows Vista 和 Windows XP/2000：** 不支持此值。  
        SM_MAXIMUMTOUCHES = 95,
        // 如果当前操作系统是 Windows XP，则为非零，Media Center Edition 为 0（如果不是）。  
        SM_MEDIACENTER = 87,
        // 如果下拉菜单与相应的菜单栏项右对齐，则为非零值;如果菜单左对齐，则为 0。  
        SM_MENUDROPALIGNMENT = 40,
        // 如果为希伯来语和阿拉伯语启用系统，则为非零值;否则为 0。       
        SM_MIDEASTENABLED = 74,
        // 如果安装了鼠标，则为非零值;否则为 0。 此值很少为零，因为支持虚拟鼠标，并且某些系统检测到端口的存在，而不是鼠标的存在。  
        SM_MOUSEPRESENT = 19,
        // 如果安装了水平滚轮的鼠标，则为非零值;否则为 0。              | 
        SM_MOUSEHORIZONTALWHEELPRESENT = 91,
        // 如果安装了具有垂直滚轮的鼠标，则为非零值;否则为 0。           
        SM_MOUSEWHEELPRESENT = 75,
        // 如果存在网络，则设置最小有效位;否则，将清除它。 其他位保留供将来使用。  
        SM_NETWORK = 63,
        // 如果安装了 Microsoft Windows for Pen 计算扩展，则为非零值;否则为零。  
        SM_PENWINDOWS = 41,
        // 此系统指标在终端服务环境中用于确定是否远程控制当前终端服务器会话。 如果远程控制当前会话，则其值为非零值;否则为 0。可以使用终端服务管理工具（如终端服务管理器 (tsadmin.msc) 和shadow.exe）来控制远程会话。 远程控制会话时，另一个用户可以查看该会话的内容，并可能与之交互。  
        SM_REMOTECONTROL = 0x2001,
        // 此系统指标用于终端服务环境。 如果调用进程与终端服务客户端会话相关联，则返回值为非零值。 如果调用进程与终端服务控制台会话相关联，则返回值为 0。 **Windows Server 2003 和 Windows XP：** 控制台会话不一定是物理控制台。 有关详细信息，请参阅 [WTSGetActiveConsoleSessionId](https://learn.microsoft.com/zh-cn/windows/desktop/api/winbase/nf-winbase-wtsgetactiveconsolesessionid)。  
        SM_REMOTESESSION = 0x1000,
        // 如果所有显示监视器具有相同的颜色格式，则为非零值，否则为 0。 两个显示器可以具有相同的位深度，但颜色格式不同。 例如，红色、绿色和蓝色像素可以使用不同位数进行编码，或者这些位可以位于像素颜色值的不同位置。  
        SM_SAMEDISPLAYFORMAT = 81,
        // 应忽略此系统指标;它始终返回 0。                               
        SM_SECURE = 44,
        // 系统为 Windows Server 2003 R2 时的内部版本号;否则为 0。       
        SM_SERVERR2 = 89,
        // 如果用户要求应用程序在仅以声音形式显示信息的情况下直观显示信息，则为非零值;否则为 0。  
        SM_SHOWSOUNDS = 70,
        // 如果当前会话正在关闭，则为非零;否则为 0。**Windows 2000：** 不支持此值。  
        SM_SHUTTINGDOWN = 0x2000,
        // 如果计算机具有低端 (慢) 处理器，则为非零值;否则为 0。         
        SM_SLOWMACHINE = 73,
        // 如果当前操作系统为 Windows 7 简易版 Edition、Windows Vista 入门版 或 Windows XP Starter Edition，则为非零;否则为 0。  
        SM_STARTER = 88,
        // 如果交换了鼠标左键和右键的含义，则为非零值;否则为 0。         
        SM_SWAPBUTTON = 23,
        // 反映停靠模式的状态，0 表示未停靠模式，否则为非零。 当此系统指标发生更改时，系统会通过 LPARAM 中带有“SystemDockMode” [的WM_SETTINGCHANGE](https://learn.microsoft.com/zh-cn/windows/desktop/winmsg/wm-settingchange) 发送广播消息。  
        SM_SYSTEMDOCKED = 0x2004,
        // 如果当前操作系统是 Windows XP 平板电脑版本，或者当前操作系统是 Windows Vista 或 Windows 7 并且平板电脑输入服务已启动，则为非零值;否则为 0。 SM_DIGITIZER设置指示运行 Windows 7 或 Windows Server 2008 R2 的设备支持的数字化器输入类型。 有关详细信息，请参阅“备注”。  
        SM_TABLETPC = 86,
        // 虚拟屏幕左侧的坐标。 虚拟屏幕是所有显示监视器的边框。 SM_CXVIRTUALSCREEN指标是虚拟屏幕的宽度。  
        SM_XVIRTUALSCREEN = 76,
        // 虚拟屏幕顶部的坐标。 虚拟屏幕是所有显示监视器的边框。 SM_CYVIRTUALSCREEN指标是虚拟屏幕的高度。  
        SM_YVIRTUALSCREEN = 77,
        // 从屏幕左下角开始。 默认位置。

        // --------------------------------

        // 从屏幕左下角开始。 默认位置。 [扩展值]
        ARW_BOTTOMLEFT = 0x000,
        // 从屏幕右下角开始。 等效于 ARW_STARTRIGHT。 [扩展值]
        ARW_BOTTOMRIGHT = 0x0001,
        // 从屏幕左上角开始。 等效于 ARW_STARTTOP。 [扩展值]
        ARW_TOPLEFT = 0x0002,
        // 从屏幕右上角开始。 等效于 ARW_STARTTOP |SRW_STARTRIGHT。 [扩展值]
        ARW_TOPRIGHT = 0x0003,

        // --------------------------------

        // 垂直排列，从上到下 [扩展值]
        ARW_DOWN = 0x0004,
        // 通过将最小化的窗口移出屏幕的可见区域来隐藏这些窗口 [扩展值]
        ARW_HIDE = 0x0008,
        // 从左到右水平排列。 [扩展值]
        ARW_LEFT = 0x0000,
        // 	从右到左水平排列 [扩展值]
        ARW_RIGHT = 0x0000,
        // 垂直排列，从下到上。 [扩展值]
        ARW_UP = 0x0004,

        // --------------------------------
        // 该设备具有集成的触摸数字化器 [扩展值]
        NID_INTEGRATED_TOUCH = 0x01,
        // 设备具有外部触摸数字化器 [扩展值]
        NID_EXTERNAL_TOUCH = 0x02,
        // 该设备具有集成的笔数字化器 [扩展值]
        NID_INTEGRATED_PEN = 0x04,
        // 设备具有外部笔数字化器 [扩展值]
        NID_EXTERNAL_PEN = 0x08,
        // 设备支持多个数字化器输入源 [扩展值]
        NID_MULTI_INPUT = 0x40,
        // 设备已准备好接收数字化器输入。 [扩展值]
        NID_READY = 0x80
    }
    // 鼠标按钮变化
    export enum MouseKeyName {
        UNKNOWN = "unknown",
        // 左键按下
        WM_LBUTTONDOWN = "left-button-down",
        // 右键按下
        WM_RBUTTONDOWN = "right-button-down",
        // 左键释放
        WM_LBUTTONUP = "left-button-up",
        // 右键释放
        WM_RBUTTONUP = "right-button-up",
        // 中键按下
        WM_MBUTTONDOWN = "mouse-button-down",
        // 中键释放
        WM_MBUTTONUP = "mouse-button-up",
        // 滚轮向上
        WM_MOUSEWHEEL = "mouse-wheel",
        // 鼠标移动
        WM_MOUSEMOVE = "move"
    }

    // 返回的数据无效
    export interface MouseNotEventData {
        // 无效id
        "id": null,
        // 无效时间
        "time": null
    };

    export interface MouseMoveEventData {
        // 鼠标 hook 的唯一id
        "id": number,
        // 事件发生的时间
        "time": number,
        // 按钮类型
        "button": MouseKey.WM_MOUSEMOVE,
        // (left) 从屏幕左边到所在位置得像素数
        "x": number,
        //  (top) 从屏幕顶部边到所在位置得像素数
        "y": number
    };

    export interface MouseMouseEventData {
        // 鼠标 hook 的唯一id
        "id": number,
        // 事件发生的时间
        "time": number,
        // 按钮类型
        "button": MouseKey.WM_LBUTTONDOWN | MouseKey.WM_LBUTTONUP | MouseKey.WM_MBUTTONDOWN | MouseKey.WM_MBUTTONUP | MouseKey.WM_MOUSEWHEEL | MouseKey.WM_RBUTTONDOWN | MouseKey.WM_RBUTTONUP,
        // 按钮是否是按下状态/ 滚轮是否向上
        "buttonDown": boolean,
        // 滚轮向量 如果是正值为向上 负值为向下
        "wheelDelta": number | null,
        // 按钮名称
        "name": "left-mouse-button" | "right-mouse-button" | "middle-mouse-button" | null
    };

    export type MouseEventDataAll = MouseMouseEventData | MouseMoveEventData | MouseNotEventData;
    export type MouseEventDataOK = MouseMouseEventData | MouseMoveEventData;

    // 传回的位置信息
    export interface Rect {
        /**
         * (x)从屏幕左边到所在位置得像素数
         */
        right?: number;
        /**
         * 底部到当前位置
         */
        bottom: number;
        /**
         * 左边到当前位置
         */
        left: number;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * (left) 从屏幕左边到所在位置得像素数
         */
        x: number;
        /**
         * (top) 从屏幕顶部边到所在位置得像素数
         */
        y: number;

        /**
         * (y) 从屏幕顶部边到所在位置得像素数
         */
        top: number;
    }
    export type VariableList = { [key: string]: string };

    // 托盘图标信息
    export interface TRAY_ICON {
        // 可执行文件路径
        path: string;
        // 停留时显示的文本
        info: string;
        // 句柄
        handle: number;
    }

    // 屏幕宽度高度信息
    export interface DeviceCaps { width: number; height: number; }

    // 鼠标历史坐标位置信息
    export interface MovePoint {
        // (left) 从屏幕左边到所在位置得像素数
        x: number;
        //  (top) 从屏幕顶部边到所在位置得像素数
        y: number;
        /**点击时候的时间 */
        time: number;
        /**附加信息 */
        dwExtraInfo: number;
    }

    // 键盘四大功能键的状态
    export type BASIC_KEYS = {
        // shift 被按下
        shift: boolean;
        // alt 被按下
        alt: boolean;
        // ctrl 被按下
        ctrl: boolean;
        // win 被按下
        win: boolean;
    }

    //枚举所有窗口返回的信息 
    export type GET_ALL_WINDOWS_INFO = {
        /**窗口类名**/
        className: string;
        /**句柄**/
        handle: number;
        /**窗口位置信息**/
        rect: {
            bottom: number;
            height: number;
            left: number;
            right: number;
            top: number;
            width: number;
            x: number;
            y: number;
        };
        /**窗口外观类**/
        style: number;
        /**窗口标题**/
        title: string;
    }

    // 快捷方式的信息
    export interface SHORTCUT_LINK {
        /** 工作环境文件夹**/
        cwd: string;
        /** 进程图标(例如来自1.dll)**/
        icon: string;
        /**图标索引位置 */
        iconIndex: number;
        /** 描述**/
        desc: string;
        /** 启动命令**/
        args: string;
        /** 启动属性**/
        showCmd: number;
        /** hotkey**/
        hotkey: number;
        /** 目标路径**/
        path: string;
    }

    // 自定义鼠标事件
    export type mouse_event =
    /**不支持的属性 请使用 setCursorPos 方法设置位置*/ 32768 |
    /**左键按下 */ 2 |
    /**左边的按钮是向上的 */ 4 |
    /**中间的按钮是向下的 */ 32 |
    /**中间的按钮是向上的 */ 64 |
    /**鼠标移动和按钮点击 */ 1 |
     /**鼠标右键按下 */ 8 |
      /**鼠标右键弹起 */ 16 |
       /**滚轮按钮被旋转 */ 2048 |
        /**按下了 X 按钮 */ 128 |
         /**X 按钮被释放 */ 256 |
          /**滚轮按钮倾斜*/ 4096 |
           /**不支持的属性 请使用 setCursorPos 方法设置位置*/ "MOUSEEVENTF_ABSOLUTE" |
            /**左键按下 */ "MOUSEEVENTF_LEFTDOWN" |
             /**左边的按钮是向上的 */ "MOUSEEVENTF_LEFTUP" |
              /**中间的按钮是向下的 */ "MOUSEEVENTF_MIDDLEDOWN" |
               /**中间的按钮是向上的 */ "MOUSEEVENTF_MIDDLEUP" |
                /**鼠标移动和按钮点击 */ "MOUSEEVENTF_MOVE" |
                 /**鼠标右键按下 */ "MOUSEEVENTF_RIGHTDOWN" |
                  /**鼠标右键弹起 */ "MOUSEEVENTF_RIGHTUP" |
                   /**滚轮按钮被旋转 */ "MOUSEEVENTF_WHEEL" |
                    /**按下了 X 按钮 */ "MOUSEEVENTF_XDOWN" |
                     /**X 按钮被释放 */ "MOUSEEVENTF_XUP" |
                      /**滚轮按钮倾斜*/ "MOUSEEVENTF_HWHEEL";

    // 消息框显示方式
    export type MB_UINT =  /**消息框包含三个按钮：终止、重试和忽略。 */ "MB_ABORTRETRYIGNORE" | /**消息框包含三个按钮：取消、重试、继续。使用此消息框类型而不是 MB_ABORTRETRYIGNORE。 */ "MB_CANCELTRYCONTINUE" | /**向消息框 添加帮助按钮。当用户单击帮助按钮或按 F1 时|系统会向所有者 发送WM_HELP消息。 */ "MB_HELP" | /**消息框包含一个按钮：确定。这是默认设置。 */ "MB_OK" | /**消息框包含两个按钮：确定和取消。 */ "MB_YESNOCANCEL" | /**消息框包含两个按钮：是和否。 */ "MB_YESNO" | /**消息框包含两个按钮：OK和Cancel。 */ "MB_OKCANCEL" | /**消息框包含两个按钮：OK和Cancel。 */ "MB_RETRYCANCEL" | /**消息框包含三个按钮：Yes、No和Cancel。 一个停止标志图标出现在消息框中。*/ "MB_ICONERROR" | /**一个停止标志图标出现在消息框中。 */ "MB_ICONSTOP" | /**问号图标出现在消息框中。不再推荐使用问号消息图标|因为它不能清楚地表示特定类型的消息|并且作为问题的消息措辞可能适用于任何消息类型。此外|用户可能会将消息符号问号与帮助信息混淆。因此|请勿在消息框中使用此问号消息符号。系统继续支持它的包含只是为了向后兼容。 */ "MB_ICONQUESTION" | /**一个由圆圈中的小写字母i组成的图标出现在消息框中。 */ "MB_ICONASTERISK" | "MB_ICONINFORMATION" | /**消息框中会出现一个感叹号图标。 */ "MB_ICONEXCLAMATION" | /** 消息框中会出现一个感叹号图标。 */ "MB_ICONWARNING" | /* 消息框成为前台窗口 **/ "MB_TOPMOST" | "MB_SETFOREGROUND" | "MB_RTLREADING" | "MB_RIGHT" | "MB_DEFAULT_DESKTOP_ONLY" | "MB_TASKMODAL" | "MB_SYSTEMMODAL" | "MB_APPLMODAL" | "MB_DEFBUTTON4" | "MB_DEFBUTTON3" | "MB_DEFBUTTON2" | "MB_ICONHAND" | "MB_DEFBUTTON1";

    // HID设备信息
    export type HID_USB_INFO = {
        /**类型**/
        type: "hid" | "keyboard" | "mouse";
        /**设备名称**/
        name: string;
        /**供应商 ID */
        dwVendorId: number;
        /**产品 ID */
        dwProductId: number;
        /**版本号 */
        dwVersionNumber: number;
        /**开发人员提供有关控制测量内容的信息 */
        usUsage: number;
        /**设备供应商对其设备的控制或者设备控制组的特定用途建议 */
        usUsagePage: number;
    };

    export type PROCESSENTRY_V2 = HMC.PROCESSENTRY & { name: string, pid: number, ppid: number };

    export interface PSYSTEM_PROCESS_INFORMATION {
        // 下一个结构体实例的偏移量，用于遍历多个结构体。
        NextEntryOffset: number;
        // 进程线程数量。
        NumberOfThreads: number;
        // 进程的镜像名称
        ImageName: string;
        // 进程的基本优先级。
        BasePriority: number;
        // 进程的唯一标识符。(pid)
        UniqueProcessId: number;
        // 进程的句柄数。
        HandleCount: number;
        // 进程所在的会话 ID。
        SessionId: number;
        // 进程的峰值虚拟内存大小。
        PeakVirtualSize: number;
        // 进程的虚拟内存大小。
        VirtualSize: number;
        // 进程的峰值工作集大小。
        PeakWorkingSetSize: number;
        // 进程的实际工作集大小。
        WorkingSetSize: number;
        // 分配给进程的分页池配额使用量。
        QuotaPagedPoolUsage: number;
        // 分配给进程的非分页池配额使用量。非分页池是内核提供的内存池，用于驻留在物理内存中，并且不会被换出到磁盘页面文件。该字段表示进程当前使用的非分页池内存大小。
        QuotaNonPagedPoolUsage: number;
        // 进程的页面文件使用量。页面文件是用于交换进程数据的虚拟内存扩展，当物理内存不足时，部分数据会被交换到页面文件中以释放内存。
        PagefileUsage: number;
        // 进程的峰值页面文件使用量。这是进程在其生命周期内达到的最高页面文件使用量。
        PeakPagefileUsage: number;
        // 进程的私有页计数。私有页是进程专用的虚拟内存页面，不被其他进程共享。
        PrivatePageCount: number;
    }

    export type Native = {
        v2:HMCC;
        // _SET_HMC_DEBUG(): boolean;
        /**版本号 */
        version: string;
        /**功能介绍 */
        desc: string;
        /**当前二进制适用系统平台 */
        platform: string;
        /**
         * 方法用于显示带有一条指定消息和一个 确认 按钮的警告框。
         * @param lpText 消息内容
         * @param lpCaption 标题
         */
        alert(lpText: string, lpCaption: string): boolean;
        /**
         * 方法用于显示带有一条指定消息和一个 确认 按钮的错误框 附带有❗ 感叹号。
         * @param lpText 消息内容
         * @param lpCaption 标题
         */
        MessageError(lpText: string, lpCaption: string): void;
        /**
         * 用默认浏览器打开这条url
         * @param URL
         */
        openURL(URL: string): boolean;
        /**
         * 方法用于显示带有一条指定消息和一个 确认 按钮的和❌（X）的消息框。
         * @param lpText 消息内容
         * @param lpCaption 标题
         */
        MessageStop(lpText: string, lpCaption: string): void;
        /**
         * 方法用于显示带有一条指定消息和一个 确认 取消 按钮的消息框。
         * @param lpText 消息内容
         * @param lpCaption 标题
         */
        confirm(lpText: string, lpCaption: string): boolean;
        /**
         * 用默认应用打开该 （文件/文件夹）
         * @param Path 文件路径
         */
        openPath(Path: string): boolean;
        /**
         * 在资源管理器中显示并选中该文件
         * @param Path 文件路径
         */
        openExternal(Path: string): boolean;
        /** 关闭该句柄窗口(可关闭托盘)(发送关闭消息)**/
        closedHandle: (Handle: number) => undefined;
        /** 设置窗口位置大小**/
        setWindowMode: (Handle: number, x: number | null | 0, y: number | null | 0, width: number | null | 0, height: number | null | 0) => boolean;
        /** 获取窗口位置大小
         *  - 高|宽|坐标大于一万以上都是不可见的
         * **/
        getWindowRect: (Handle: number) => Rect;
        /** 获取屏幕大小**/
        getDeviceCaps: () => DeviceCaps;
        /**
         * 判断句柄是否有效
         * @param Handle
         * @returns
         */
        isHandle: (Handle: number) => boolean;
        /** 获取鼠标所在窗口的句柄**/
        getPointWindow: () => number | null;
        /** 获取鼠标所在窗口的进程名**/
        getPointWindowName: () => string;
        /** 获取鼠标所在窗口的进程id**/
        getPointWindowProcessId: () => number;
        /**阻止键盘和鼠标输入事件到达应用程序。 */
        SetBlockInput: (Block: boolean) => boolean;
        /** 获取鼠标所在窗口的父窗口**/
        getPointWindowMain: () => number;
        /** 获取鼠标所在位置**/
        getMetrics: () => MousePosn
        /** 获取活动窗口的进程id**/
        getForegroundWindowProcessID: () => ProcessID | null;
        /** 获取句柄对应的进程id**/
        getHandleProcessID: (Handle: number) => ProcessID | null;
        /** 获取快捷方式的信息**/
        getShortcutLink: (LnkPath: string) => SHORTCUT_LINK;
        setShortcutLink(LnkPath: string, FilePath: string, work_dir: string, desc: string, args: string, iShowCmd: number, icon: string, iconIndex: number): boolean;
        setShortcutLink(LnkPath: string, FilePath: string, work_dir?: string, desc?: string, args?: string, iShowCmd?: number): boolean;
        setShortcutLink(LnkPath: string, FilePath: string): boolean;
        setShortcutLink(LnkPath: string, Shortcut: SHORTCUT_LINK): boolean;
        /**
         * 创建快捷方式
         * @param LnkPath 快捷方式位置
         * @param FilePath 关联的文件
         * @param work_dir 工作目录
         * @param desc 简介
         * @param args 启动命令
         * @param iShowCmd 显示方式
         * @param icon 使用的图标如dll,exe,icon
         * @param iconIndex 图标索引
         */
        setShortcutLink(LnkPath: unknown, FilePath: unknown, work_dir?: unknown, desc?: unknown, args?: unknown, iShowCmd?: unknown, icon?: unknown, iconIndex?: unknown): boolean;
        /**
         * 创建文件软链接
         * @param LinkPath 创建的位置
         * @param sourcePath 原文件链接
         */
        createSymlink(LinkPath: string, sourcePath: string): boolean;
        /**
         * 创建文件夹软链接
         * @param LinkPath 创建的位置
         * @param sourcePath 原文件链接
         */
        createDirSymlink(LinkPath: string, sourcePath: string): boolean;
        /**
         * 创建硬链接
         * @param LinkPath 创建的位置
         * @param sourcePath 原文件链接
         */
        createHardLink(LinkPath: string, sourcePath: string): boolean;
        /** 设置窗口不透明度 0-255**/
        setHandleTransparent(Handle: number, opacity: HandleTransparent): void;
        /**
         * 获取托盘图标列表
         * 1.4.6 起返回json文本
         */
        getTrayList(): TRAY_ICON[] | string;
        /** 判断当前是否为64位系统**/
        isSystemX64(): boolean;
        /** 同 C++/C 的system */
        system(str: string): number;
        /**系统启动到现在的时间(毫秒) */
        systemStartTime(): number;
        /** 获取进程对应的主进程/线程的窗口句柄**/
        getProcessHandle(ProcessID: ProcessID): number | null;
        /** 获取此句柄的标题**/
        lookHandleGetTitle(Handle: number): string | null;

        /** 设置此句柄的标题**/
        lookHandleSetTitle(Handle: number, title: string): boolean;
        /**
         * 通过句柄设置窗口显示状态  https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
         * @param Handle 窗口句柄
         * @param nCmdShow 操作内容
         *  - "SW_HIDE" ： 0 隐藏窗口并激活另一个窗口。
         *  - "SW_SHOWNORMAL" ： 1 激活并显示一个窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志
         *  - "SW_SHOWMINIMIZED" ：2 激活窗口并将其显示为最小化窗口
         *  - "SW_SHOWMAXIMIZED" | "SW_MAXIMIZE" ： 3 激活窗口并将其显示为最大化窗口
         *  - "SW_SHOWNOACTIVATE" ： 4 以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL|除了窗口没有被激活
         *  - "SW_SHOW" ：5  激活窗口并以其当前大小和位置显示它
         *  - "SW_MINIMIZE" ：6 最小化指定窗口并激活 Z 顺序中的下一个顶级窗口
         *  - "SW_SHOWMINNOACTIVE" ： 7 将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED|除了窗口没有被激活
         *  - "SW_SHOWNA" ： 8 以当前大小和位置显示窗口。这个值类似于SW_SHOW|除了窗口没有被激活
         *  - "SW_RESTORE" ： 9 激活并显示窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志
         *  - "SW_SHOWDEFAULT" ： 10 据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。
         *  - "SW_FORCEMINIMIZE" ： 11 最小化一个窗口|即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志
         * @returns
         */
        lookHandleShowWindow: (Handle: number, SetShowType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11) => boolean;
        /** 判断此句柄是否是正在活动中的窗口**/
        isHandleWindowVisible: (Handle: number) => boolean;
        /** 关闭此句柄对应的窗口**/
        lookHandleCloseWindow: (Handle: number) => boolean;
        /**
         * 消息窗口(调用 win-api)
         * @param lpText 消息内容
         * @param lpCaption 标题
         * @param UINT_String 显示窗口类型 https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-messageboxa
         * @returns int
         * - 3 中止按钮被选中
         * - 2 取消
         * - 11 继续
         * - 5 识别
         * - 7 否
         * - 1 确定
         * - 6 是
         * - 10 重试
         * - 4 重试
         */
        messageBox(lpText: string, lpCaption: string, UINT_String?: MB_UINT): 3 | 2 | 11 | 5 | 7 | 1 | 4 | 10 | 6;
        /** 设置系统右键菜单 **/
        getSystemMenu: (Handle: number, boolean: boolean) => void;
        /** 关闭显示器**/
        shutMonitors: () => void;
        /** 恢复显示器**/
        showMonitors: () => void;
        /** 获取活动窗口句柄**/
        getForegroundWindow: () => number;
        /**
        * 电源控制
        * - 1001 关机
        * - 1002 重启
        * - 1003 注销
        * - 1005 锁定
        */
        powerControl: (Set: 1001 | 1002 | 1003 | 1005) => void;
        /**
         * 打开程序
         * @param AppPath 程序路径
         * @param Command 启动命令
         * @param cwd 工作文件夹
         * @param hide 是否隐藏
         * @param UAC 是否以管理员方式启动
         */
        openApp(AppPath: string, Command: string, cwd: string, hide: boolean, UAC: boolean): boolean;
        /** 是否拥有管理员权限**/
        isAdmin: () => boolean;
        /** 同步阻塞(进程)**/
        sleep: (awaitTime: number) => void;
        /** 系统空闲时间**/
        getSystemIdleTime: () => number;
        /** 结束该pid进程**/
        killProcess: (ProcessID: ProcessID) => boolean;
        /** 清空剪贴版**/
        clearClipboard(): boolean;
        /**
         * 设置剪贴板文本 或html
         * @param EditText 文本或者html
         * @param is_html 当此参数为true 文本将被写入为html
         * @param html_url 如果是html可以传入一个来源的链接
         * @returns 
         */
        setClipboardText: (EditText: string, is_html?: boolean, html_url?: string) => void;
        /** 获取剪贴板文本**/
        getClipboardText: () => string;

        /** 获取鼠标之前64个位置**/
        getMouseMovePoints: () => string;
        /**
         * 获取所有窗口的句柄
         */
        getAllWindowsHandle(isWindows?: boolean): number[];
        /**
         * 获取所有窗口的信息
         * @deprecated 已被移除 已使用js获取所有句柄模拟
         **/
        getAllWindows: () => GET_ALL_WINDOWS_INFO[];
        /**获取四大按钮是否按下**/
        getBasicKeys: () => BASIC_KEYS;
        /**获取该句柄下的父窗口**/
        getMainWindow: (Handle: number) => number | null;
        /**设置窗口顶设 */
        setWindowTop(HWND: number): boolean;
        /**判断窗口是否被顶设 */
        hasWindowTop(HWND: number): boolean;
        /**窗口抖动 */
        windowJitter(Handle: number): void;
        /** 刷新该窗口**/
        updateWindow(HWND: number): boolean;
        /**设置窗口焦点**/
        setWindowFocus(HWND: number): boolean;
        /** 设置窗口是否支持响应事件(鼠标键盘点击)**/
        setWindowEnabled(HWND: number, Enabled: boolean): boolean;
        /** 判断窗口是否禁用响应事件(鼠标键盘点击)**/
        isEnabled(HWND: number): boolean;
        /** 右键点击**/
        rightClick(ms?: number): void;
        /** 左键点击**/
        leftClick(ms?: number): void;
        /**设置鼠标位置**/
        setCursorPos(x: number, y: number): boolean;
        /**自定义鼠标事件 https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-mouse_event **/
        mouse(mouse_event: mouse_event, ms?: number): void;
        /**判断该按键是否被按下  https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getkeystate **/
        hasKeyActivate(KeysEvent: number): boolean;
        /**设置该窗口图标在状态栏可见性 (注意：XP 下激活窗口了会失效(但是有没有一种可能 xp运行不了node和electron))*/
        SetWindowInTaskbarVisible(Handle: number, Visible: boolean): boolean;
        /**禁用/启用系统键盘鼠标钩子
          * @param HOOK 是否启用系统键盘鼠标钩子
          !注意该功能很危险 主要用于自动化防止误操作 用户锁屏  禁止用于非法用途
          *手动解锁方式 Ctrl+Alt+Del   => esc
          !请注意 你需要确保你的解锁代码  运行没有任何错误或者有定时解锁
          否则有可能导致用户无法正常使用
          **/
        SetSystemHOOK(HOOK: boolean): boolean;
        /**获取所有HidUsb设备（仅限HID设备）**/
        getHidUsbList(): HID_USB_INFO[];
        /**
        * 向剪贴板写入文件路径
        * @param FilePaths 路径列表
        */
        setClipboardFilePaths(FilePaths: string | string[]): void
        /**
         * 获取剪贴板中的文件路径
         */
        getClipboardFilePaths(): string
        /**
         * 获取所有usb驱动器(不包含HUD)
         */
        getUsbDevsInfo(): string[]
        /**枚举子窗口 */
        enumChildWindows(Handle: number): number[]
        /**
         * 将文件/文件夹  移除到系统回收站中
         * @param Path 处理的路径(\n结尾)
         * @param Recycle 是否保留撤销权(回收站)
         * @param isShow 是否显示确认窗口
         * @returns 返回操作状态 请参考：
         * @link https://learn.microsoft.com/zh-CN/windows/win32/api/shellapi/nf-shellapi-shfileoperationa
         * @default 默认配置
         * * Recycle true
         * * isShow false
         */
        deleteFile(Path: string, Recycle?: boolean, isShow?: boolean): number
        /**
         * 获取当前剪贴板内容的id(如果被重新写入了该id会变动)
         */
        getClipboardInfo(): ClipboardInfo;
        /**
         * 枚举剪贴板中的内容格式
         */
        enumClipboardFormats(): { type_name: string, type: number }[];
        // 获取剪贴板中的html
        getClipboardHTML(): ClipboardHTMLInfo | null;
        /**
         * 获取所有HID设备的id
         */
        getHidUsbIdList(): string[];
        /**
         * 获取所有屏幕
         */
        getDeviceCapsAll(): cRECT[];
        /**
         * 判断句柄的窗口是否在所有窗口的范围中(无论他是否被其他窗口挡住)
         * @param Handle 
         */
        isInMonitorWindow(Handle: number): boolean;
        /**
         * 判断句柄的窗口是否在鼠标所在的窗口
         * @param Handle 
         */
        isMouseMonitorWindow(Handle: number): boolean;
        /**
         * 获取鼠标所在的屏幕信息
         */
        getCurrentMonitorRect(): cRECT;
        /**
         * 当前电脑存在几个屏幕
         */
        getSystemMetricsLen(): number;
        /**
         * 获取窗口类关联代码
         */
        getWindowStyle(Handle: number): number;
        /**
         * 检索指定窗口所属的类的名称
         * @param Handle 
         */
        getWindowClassName(Handle: number): string;
        /**
         * 移除鼠标挂钩
         */
        // unHookMouse(): void;
        /**
         * 移除键盘挂钩
         */
        unKeyboardHook(): void;
        /**
         * 启动键盘动作挂钩
         */
        installKeyboardHook(): void;
        /**
         * 获取已经记录了的低级鼠标动作数据 出于性能优化使用了(文本数组)
         */
        getKeyboardNextSession(): `${number}|${0 | 1}`[] | undefined
        /**
         * 键盘挂钩是否已经启用
         */
        isStartKeyboardHook(): boolean;
        /**
         * 格式化 驱动器路径  ('\\Device\\HarddiskVolume2' => "D:\\")
         * @param VolumePath 
         */
        formatVolumePath(VolumePath: string): string;
        /**
         * 获取当前文件系统的驱动器名称及路径
         */
        getVolumeList(): Volume[];
        /**
         * 内联 轮询枚举的进程句柄
         * @param enumID 枚举id 由enumProcessHandle 提供
         */
        enumProcessHandlePolling(enumID: number): void | ProcessHandle[];
        /**
         * 内联 枚举进程的所有句柄 并返回一个枚举id
         * @param ProcessID 
         */
        enumProcessHandle(ProcessID: number): number;
        /**
         * 查询进程加载的模块
         * @param ProcessID 
         */
        getModulePathList(ProcessID: number): string[];
        /**
         * 内联 清空句柄存储  不需要暴露
         */
        clearEnumProcessHandle(): void;
        /**
         * 枚举进程的线程id
         * @param ProcessID 进程id
         * @param returnDetail 是否返回 THREADENTRY32 为`false`或者为空则返回线程id
         */
        getProcessThreadList(ProcessID: number, returnDetail?: false): number[];
        /**
         * 
         * @param ProcessID 进程id
         * @param returnDetail 为`true` 则返回THREADENTRY32 
         */
        getProcessThreadList(ProcessID: number, returnDetail: true): HMC.THREADENTRY32[];
        /**
         * 枚举进程的线程id
         * @param ProcessID 进程id
         */
        getProcessThreadList(ProcessID: number): number[];
        /**
         * 内联 清空句柄存储  不需要暴露
         */
        clearEnumAllProcessList(): void;
        /**
       * 内联 启动枚举进程快照 与句柄
       */
        enumAllProcess(): number;
        /**
         * 内联 枚举进程快照结果查询
         * @param enumID 枚举id
         */
        enumAllProcessPolling(enumID: number): Array<HMC.PROCESSENTRY | void> | void;
        /**
         * 获取子进程id
         * @param ProcessID 
         */
        getSubProcessID(ProcessID: number): number[];
        /**
         * 通过可执行文件或者带有图标的文件设置窗口图标
         * @param handle 句柄
         * @param Extract 可执行文件/Dll/文件
         * @param index 图标位置索引 例如文件显示的图标默认是0
         */
        setWindowIconForExtract(handle: number, Extract: string, index: number): void;
        /**
         * 创建管道并执行命令
         * @param cmd 命令
         */
        popen(cmd: string): string;
        /**
        * 创建管道并执行命令
        * @param cmd 命令
        */
        _popen(cmd: string): string;
        /**
         * 获取屏幕上指定坐标的颜色
         * @param x 左边开始的坐标
         * @param y 从上面开始的坐标
         */
        getColor(x: number, y: number): Color;
        // /**
        //  * 截屏指定的宽高坐标 并将其存储写入为文件 
        //  * @param FilePath 文件路径
        //  * @param x 从左边的哪里开始 为空为0
        //  * @param y 从顶部的哪里开始 为空为0
        //  * @param width 宽度
        //  * @param height 高度
        //  */
        // captureBmpToFile(FilePath: string, x: number | null | 0, y: number | null | 0, width: number | null | 0, height: number | null | 0): void;
        /**
         * 响应标准快捷键
         */
        sendBasicKeys(ctrlKey: boolean, shiftKey: boolean, altKey: boolean, winKey: boolean, KeyCode: number): boolean;
        /**
         * 发送键盘事件
         * @param keyCode 键值码 
         * @param keyDown 是否按下
         */
        sendKeyboard(keyCode: number, keyDown?: boolean): boolean;
        /**
         * 响应T2C脚本 仅支持键盘事件 异步
         * @param T2C 脚本
         */
        sendKeyT2C(T2C: string): void;
        /**
        * 响应T2C脚本 仅支持键盘事件 同步
        * @param T2C 脚本
        */
        sendKeyT2CSync(T2C: string): void;
        /**
         * 创建一个互斥体 (如果当前进程还在 互斥体就不会消失) 返回的是互斥体是否成功创建
         */
        createMutex(MutexName: string): boolean;
        /**
        * 检查一个互斥体 如果互斥体存在
        */
        hasMutex(MutexName: string): boolean;
        /**
         * 添加环境变量
         * @param key 
         * @param data 
         */
        putenv(key: string, data: string): void;
        /**
         * 获取指定的变量环境
         * @param key 
         */
        getenv(key: string): string;
        /**
         * 获取变量环境
         */
        getAllEnv(): { [key: string]: string };
        /**
         * 通过标题或类名搜索所有窗口句柄
         * @param className 类名
         * @param titleName 标题
         * @param isWindow 是否要求为窗口(忽略子组件) 默认 true
         * @param isCaseSensitive 忽略区分大小写 默认 true
         */
        findAllWindow(className: string | null, titleName: string | null, isWindow: boolean | null, isCaseSensitive: boolean | null): number[];
        /**
         * 通过标题或类名搜索窗口句柄
         * @param className 类名
         * @param titleName 标题
         */
        findWindow(className?: string | null, titleName?: string | null): number | null;
        /**
         * 搜索窗口或子窗口
         * @param hWndParent 父窗口
         * @param hWndChildAfter 下級窗口 
         * @param className 类名
         * @param titleName 标题
         */
        findWindowEx(hWndParent: number | null, hWndChildAfter: number | null, className: string | null, titleName: string | null): number | null;
        /**
         * 获取指定进程的从启动到现在的时间 单位ms
         * @param ProcessID 
         */
        getProcessStartTime(ProcessID: number): number | null;
        /**
         * 内部debug开关
         */
        __debug_AllocConsole(): void;
        /**
         * 判断变量中是否存在指定值
         * - 用户
         * - 系统
         * @param key 
         */
        hasKeyExists(key: string): boolean;
        /**
         * 判断用户变量中是否存在指定值
         * - 用户
         * @param key 
         */
        hasUseKeyExists(key: string): boolean;
        /**
         * 判断系统变量中是否存在指定值
         * - 系统
         * @param key 
         */
        hasSysKeyExists(key: string): boolean;
        /**
         * 通过当前的变量对变量内容进行解析
         * - 实时的
         * - HMC_x64.escapeEnvVariable("%AppData%\\hmc-win32")   log  ->  'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
         * @param input 
         */
        escapeEnvVariable(input: string): string;

        /**
         * 删除一个用户变量
         * - 仅用户
         * @param key 
         */
        removeUserVariable(key: string): boolean;

        /**
        * 删除一个变量
        *  - 用户
        *  - 系统用户
        * @param key 
        */
        removeUserVariable(key: string): boolean;

        /**
         * 删除一个用户变量
         * - 仅用户
         * @param key 
         */
        removeSystemVariable(key: string): boolean;

        /**
         * 获取一个在系统变量中的值
         * @param key 
         * @param transMean 是否自动转义
         * - true %AppData%\\hmc-win32  -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
         * - false %AppData%\\hmc-win32 -> '%AppData%\\hmc-win32'
         * @default true
         */
        getSystemVariable(key: string, transMean?: boolean): string;

        /**
        * 获取一个在用户变量中的值
        * @param key 
        * @param transMean 是否自动转义
        * - true %AppData%\\hmc-win32  -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
        * - false %AppData%\\hmc-win32 -> '%AppData%\\hmc-win32'
        * @default true
        */
        getUserVariable(key: string, transMean?: boolean): string;

        /**
         *获取指定键值 按照默认优先级
         * ?- 用户变量和系统变量同时有非数组键  -> 用户变量
         * ?- 用户变量和系统变量同时为数组键    -> 用户变量数组
         * ?- 用户变量为数组键 系统变量为文本键  -> 用户文本键 排除系统
         * ?- 系统变量为文本键 用户变量为数组    -> 用户变量数组 排除系统
         * ?- 系统变量存在 用户变量为空文本      -> 排除此变量
         * ?- PATH                          -> 合并数组
         * @param key 键
         * @param key 
         */
        getVariableAnalysis(key: string): string;

        /**
         * 添加一个系统变量 （请注意 win进程获取的优先级: 进程变量 -> 用户变量 -> *系统变量）
         * @param key 键
         * @param value 值
         * @param append 是否添加到尾部 而不是替换
         * - false  "ddd" -> "ddd"
         * - true "ddd" -> "oid...;ddd"
         * @default false
         * @param transMean 是个自动转义的值
         * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
         * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
         * @default false
         */
        putSystemVariable(key: string, value?: string, append?: boolean, transMean?: boolean): boolean;

        /**
         * 添加一个用户变量 （请注意 win进程获取的优先级: 进程变量 -> *用户变量 -> 系统变量）
         * @param key 键
         * @param value 值
         * @param append 是否添加到尾部 而不是替换
         * - false  "ddd" -> "ddd"
         * - true "ddd" -> "oid...;ddd"
         * @default false
         * @param transMean 是个自动转义的值
         * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
         * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
         * @default false
         */
        putUserVariable(key: string, value?: string, append?: boolean, transMean?: boolean): boolean;

        /**
         * 获取所有的值 从环境读取 (进程环境)
         */
        getVariableAll(): HMC.VariableList;

        /**
         * 从注册表读取现在的真实环境变量 但不更新到进程环境
         * - 请注意这里 不会添加 进程的变量
         * @param key 
         */
        getRealGlobalVariable(): HMC.VariableList;
        /**
         * 获取用户变量的键列表
         */
        getUserKeyList(): string[];
        /**
         * 获取系统变量的键列表
         */
        getSystemKeyList(): string[];
        // getProcessidFilePathAsync(ProcessID: number): Promise<string>;
        _PromiseSession_get(SessionID: number, size?: number): undefined | null | any[];
        /**
         * 判断指定的  [Session Promise] 是否已经结束
         * @param SessionID id
         */
        _PromiseSession_isClosed(SessionID: number): boolean;
        /**
         * 停止一个  [Session Promise] 事件
         * @param SessionID id
         */
        _PromiseSession_stop(SessionID: number): void;
        /**
         * 获取当前  Session ID 已经到哪里了
         */
        _PromiseSession_max_id(): number;
        /**
         * 获取指定的id存在了多少个数据
         * @param SessionID id
         */
        _PromiseSession_data_size(SessionID: number): number;
        /**
         * 设置每次获取 Session Promise 的毫秒数
         * @param sleep_time 毫秒
         * @default 5 ms
         */
        _PromiseSession_set_sleep_time(sleep_time: number): number;
        /**
         * 将  [Session Promise] 转为同步
         * @param SessionID id
         */
        _PromiseSession_await(SessionID: number): void;
        /**
         * 所有任务
         */
        _PromiseSession_allTasks(): number[];
        /**
         * 已经完成的任务
         */
        _PromiseSession_completeTasks(): number[];
        /**
         * 进行中的任务
         */
        _PromiseSession_ongoingTasks(): number[];
        /**
         * 当前的sleep ms 
         */
        _PromiseSession_get_sleep_time(): number;

        /**
         * 获取进程列表（枚举法）
         * - 枚举是最快的 最安全的 不会出现遗漏
         * @module 异步  
         * @time  fn() 9.691ms     fn(true)61.681ms
         * @param is_execPath 需要解析可执行文件路径 (获取延时50ms左右)
         * @returns 
         */
        getAllProcessList: (is_execPath?: boolean) => Promise<string> | number;
        /**
         * 获取进程列表（枚举法）
         * - 枚举是最快的 最安全的 不会出现遗漏
         * @module 同步 
         * @time  fn() 11.147ms     fn(true)44.633ms
         * @param is_execPath 需要解析可执行文件路径 (获取延时50ms左右)
         * @returns 
         */
        getAllProcessListSync: (is_execPath?: boolean) => string;
        /**
         * 获取进程列表 (快照法)  
         * - (一般用来枚举进程树)
         * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
         * @module 异步 
         * @time 66.428ms
         * @returns 
         */
        getAllProcessListSnp: () => Promise<string> | number;
        /**
         * 获取进程列表 (快照法)  
         * - (一般用来枚举进程树)
         * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
         * @module 同步 
         * @time 66.428ms
         * @returns 
         */
        getAllProcessListSnpSync: () => string;
        /**
         * 获取进程列表 (内核法)
         * - (可以获取内核软件和系统服务的名称)
         * - 请注意 内核法有可能被杀毒软件拦截
         * - 有概率第一次获取时失败
         * @module 异步  
         * @time 30.542ms
         * @returns 
         */
        getAllProcessListNt: () => Promise<string> | number;
        /**
         * 获取进程列表 (内核法)
         * - (可以获取内核软件和系统服务的名称)
         * - 请注意 内核法有可能被杀毒软件拦截
         * - 有概率第一次获取时失败
         * @module 同步 
         * @time 30.542ms
         * @returns 
         */
        getAllProcessListNtSync: () => string;
        /**
         * 获取指定进程的cpu百分比 (10% -> 10.02515102152)
         * @module 异步  
         * @time 1000ms+
         * @param pid 
         */
        getProcessCpuUsage(pid: number): Promise<number>;
        /**
         * 获取指定进程的cpu百分比 (10% -> 10.02515102152)
         * @module 同步 
         * ! 请注意此函数会阻塞进程最少1000ms 因为运算cpu占比需要一秒内进行两次对比
         * @param pid 进程id
         */
        getProcessCpuUsageSync(pid: number): number;
        /**
         * 获取指定进程的文件路径
         * @module 异步 
         * @param pid 进程id
         */
        getProcessFilePath(pid: number): Promise<string | null>;
        /**
         * @module 同步 
         * @param pid 进程id
         */
        getProcessFilePathSync(pid: number): string | null;
        /**
         * 判断当前进程是否存在
         * @module 异步 
         * @param pid 
         */
        existProcess(pid: number): null | number | Promise<boolean | null>;
        /**
        * 判断当前进程是否存在
        * @module 同步 
        * @param pid 
        */
        existProcessSync(pid: number): boolean | null;
        getCursorPos(): string;
        isStartHookMouse2(): boolean;
        unHookMouse2(): void;
        installHookMouse2(): void;
        getMouseNextSession2(): string;
        getLastInputTime(): number;
        /**
         * 是否 正在调用着 限制鼠标可移动范围的线程
         */
        hasLimitMouseRangeWorker(): boolean;
        /**
         * 限制鼠标光标可移动范围 (异步)
         * @description 可以调用stopLimitMouseRangeWorker提前结束 
         * ?最高不允许超过30000ms (30秒) 最低不允许低于31ms 
         * ?范围为正方形 如果没有设置right与bottom的值则将限制为1x1的正方形 (不可动)
         * @param ms 本次限制的时间
         * @param x 限制左边初始化点的位置
         * @param y 限制顶部初始化点的位置
         * @param right 允许的范围(左边到右边部)
         * @param bottom 允许光标移动的范围(顶到底部)
         */
        setLimitMouseRange(ms: number, x: number, y: number, right: number, bottom: number): boolean;
        /**
         * 提前结束限制鼠标可移动范围 一旦调用则立即解锁 返回的布尔是解锁线程是否成功 
         */
        stopLimitMouseRangeWorker(): boolean;
        /**
         * 获取指定进程得出命令行 
         * @description 由于跨进程权限问题 不保证获取得到
         * ?此功能在win8及以下系统 需要读取进程内存
         * @module 异步async
         * @param pid 进程id
         */
        getProcessCommand(pid: number): Promise<string | null>;
        /**
         * 获取指定进程得出命令行
         * @description 由于跨进程权限问题 不保证获取得到
         * ?此功能在win8及以下系统 需要读取进程内存
         * @module 同步Sync
         * @param pid 
         */
        getProcessCommandSync(pid: number): string | null;
        /**
         * 获取指定进程的工作目录
         * @description 由于跨进程权限问题 不保证获取得到
         * !此功能需要读取进程内存
         * @module 异步async
         * @param pid 
         */
        getProcessCwd(pid: number): Promise<string>;
        /**
         * 获取指定进程的工作目录
         * @description 由于跨进程权限问题 不保证获取得到
         * !此功能需要读取进程内存
         * @module 同步Sync
         * @param pid 
         */
        getProcessCwdSync(pid: number): string;
        /**
         * 获取注册表值
         */
        getRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null): REG_VALUE | null;
        /**
         * 设置注册表值 （提供了初级和低级操作）
         * @param Hive 根目录
         * @param folderPath 目录路径
         * @param keyName 值键
         * @param data 数据体
         * - null 设置空值
         * - string 约 2^31 - 1 个字符 (2GB) 但是不建议存储过大数据 会出问题
         * - number DWORD 标准范围约为 0(0x0) 到 4294967295(0xffffffff) (即 2^32 - 1)
         * - bigint QWORD 标准范围约为  0n(0x0) 到 18446744073709551615n (0xffffffffffffffff)（即 2^64 - 1）
         * - boolean 布尔 以DWORD状态存储 范围 0-1
         * - Buffer 二进制  1024KB 以内
         * - Date 时间戳 以浮点二进制存储
         * - string[] 文本数组 REG_MULTI_SZ格式 允许存储空文本但是不建议 (因为非标准) 但是数组末尾的元素是空文本会被清空
         * @param type 类型
         * - true 文本时将转义到转义类型
         * - HMC.REG_TYPE 强制转义 仅限二进制类型
         */
        setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null, data: null | number | bigint | boolean | Buffer | Date | string | string[], type: undefined | boolean | HMC.REG_TYPE): boolean;
        /**
         * 创建目录
         * @param Hive 
         * @param folderPath 
         */
        createRegistrFolder(Hive: HMC.HKEY, folderPath: string): boolean;
        /**
         * 获取目录信息
         * @param Hive 
         * @param folderPath 
         */
        getRegistrFolderStat(Hive: HMC.HKEY, folderPath: string, is_enum?: boolean): string | null;
        /**
         * 删除目录
         * @param Hive 
         * @param folderPath 
         * @param keyName 
         * @param tree 
         */
        removeRegistrFolder(Hive: HMC.HKEY, folderPath: string, keyName: string | null, tree: boolean): boolean;
        /**
         * 删除值
         * @param Hive 
         * @param folderPath 
         * @param keyName 
         */
        removeRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null): boolean;
        /**
         * 获取值信息
         * @param Hive 
         * @param folderPath 
         * @param keyName 
         */
        getRegistrValueStat(Hive: HMC.HKEY, folderPath: string, keyName: string | null): string | null;
        /**
         * 获取二进制值
         * @param Hive 
         * @param folderPath 
         * @param keyName 
         */
        getRegistrBuffValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null): Buffer | null;

    }

    export type ProcessHandle = {
        // 句柄 
        handle: number;
        // 名称(数据)
        name: string;
        // 类型
        type: "ALPC Port" | "Event" | "Timer" | "Mutant" | "Key" | "Section" | "File" | "Thread" | string;
    };

    export type Volume = {
        // 真实的文件路径  例如： 'D:\\' 
        path: string;
        // 名称：驱动路径 例如： \\\\?\\Volume{f0b00a00-0000-0000-0000-000000000000}\\ 
        name: string;
        // 驱动器  例如：'\\Device\\HarddiskVolume2'
        device: string;
    };

    /**取色 颜色返回值 */
    export type Color = {
        r: number;
        g: number;
        b: number;
        // #000000 16进制色码
        hex: string;
    };

    export type RegistrFolderStat = {
        // 目录键列表
        folder?: string[];
        // 值键列表
        key?: string[];
        // 此内容是否存在
        exists: boolean;
        // 大小
        size: number;
        // 目录键数量
        folderSize: number;
        // 该目录下有多少个值键
        keySize: number;
        // 该目录上次写入的时间戳 毫秒
        time: number;
    };

    export type RegistrValueStat = {
        // 此值的类型
        type: REG_TYPE;
        // 内容大小
        size: number;
        // 此内容是否存在
        exists: boolean;
    };

    /**
     * 标准快捷键的输入表
     */
    export type BasicCout = {
        /**组合中含有ctrl */
        ctrl?: any,
        /**组合中含有shift */
        shift?: any,
        /**组合中含有alt */
        alt?: any,
        /**组合中含有win */
        win?: any,
        /**键码/按键名 */
        key?: number | string,
        /**键码/按键名 */
        code?: number | string
    };

    type chcpList = {
        37: "IBM037",
        437: "IBM437",
        500: "IBM500",
        708: "ASMO-708",
        720: "DOS-720",
        737: "ibm737",
        775: "ibm775",
        850: "ibm850",
        852: "ibm852",
        855: "IBM855",
        857: "ibm857",
        858: "IBM00858",
        860: "IBM860",
        861: "ibm861",
        862: "DOS-862",
        863: "IBM863",
        864: "IBM864",
        865: "IBM865",
        866: "cp866",
        869: "ibm869",
        870: "IBM870",
        874: "windows-874",
        875: "cp875",
        932: "shift_jis",
        936: "gb2312",
        949: "ks_c_5601-1987",
        950: "big5",
        1026: "IBM1026",
        1047: "IBM01047",
        1140: "IBM01140",
        1141: "IBM01141",
        1142: "IBM01142",
        1143: "IBM01143",
        1144: "IBM01144",
        1145: "IBM01145",
        1146: "IBM01146",
        1147: "IBM01147",
        1148: "IBM01148",
        1149: "IBM01149",
        1200: "utf-16",
        1201: "unicodeFFFE",
        1250: "windows-1250",
        1251: "windows-1251",
        1252: "windows-1252",
        1253: "windows-1253",
        1254: "windows-1254",
        1255: "windows-1255",
        1256: "windows-1256",
        1257: "windows-1257",
        1258: "windows-1258",
        1361: "Johab",
        10000: "macintosh",
        10001: "x-mac-japanese",
        10002: "x-mac-chinesetrad",
        10003: "x-mac-korean",
        10004: "x-mac-arabic",
        10005: "x-mac-hebrew",
        10006: "x-mac-greek",
        10007: "x-mac-cyrillic",
        10008: "x-mac-chinesesimp",
        10010: "x-mac-romanian",
        10017: "x-mac-ukrainian",
        10021: "x-mac-thai",
        10029: "x-mac-ce",
        10079: "x-mac-icelandic",
        10081: "x-mac-turkish",
        10082: "x-mac-croatian",
        12000: "utf-32",
        12001: "utf-32BE",
        20000: "x-Chinese_CNS",
        20001: "x-cp20001",
        20002: "x_Chinese-Eten",
        20003: "x-cp20003",
        20004: "x-cp20004",
        20005: "x-cp20005",
        20105: "x-IA5",
        20106: "x-IA5-German",
        20107: "x-IA5-Swedish",
        20108: "x-IA5-Norwegian",
        20127: "us-ascii",
        20261: "x-cp20261",
        20269: "x-cp20269",
        20273: "IBM273",
        20277: "IBM277",
        20278: "IBM278",
        20280: "IBM280",
        20284: "IBM284",
        20285: "IBM285",
        20290: "IBM290",
        20297: "IBM297",
        20420: "IBM420",
        20423: "IBM423",
        20424: "IBM424",
        20833: "x-EBCDIC-KoreanExtended",
        20838: "IBM-Thai",
        20866: "koi8-r",
        20871: "IBM871",
        20880: "IBM880",
        20905: "IBM905",
        20924: "IBM00924",
        20932: "EUC-JP",
        20936: "x-cp20936",
        20949: "x-cp20949",
        21025: "cp1025",
        21866: "koi8-u",
        28591: "iso-8859-1",
        28592: "iso-8859-2",
        28593: "iso-8859-3",
        28594: "iso-8859-4",
        28595: "iso-8859-5",
        28596: "iso-8859-6",
        28597: "iso-8859-7",
        28598: "iso-8859-8",
        28599: "iso-8859-9",
        28603: "iso-8859-13",
        28605: "iso-8859-15",
        29001: "x-Europa",
        38598: "iso-8859-8-i",
        50220: "iso-2022-jp",
        50221: "csISO2022JP",
        50222: "iso-2022-jp",
        50225: "iso-2022-kr",
        50227: "x-cp50227",
        51932: "euc-jp",
        51936: "EUC-CN",
        51949: "euc-kr",
        52936: "hz-gb-2312",
        54936: "GB18030",
        57002: "x-iscii-de",
        57003: "x-iscii-be",
        57004: "x-iscii-ta",
        57005: "x-iscii-te",
        57006: "x-iscii-as",
        57007: "x-iscii-or",
        57008: "x-iscii-ka",
        57009: "x-iscii-ma",
        57010: "x-iscii-gu",
        57011: "x-iscii-pa",
        65000: "utf-7",
        65001: "utf-8"
    };

    export type SystemDecoderKey = keyof chcpList;

    export type VarValueReBackData = {
        // 被更新的键名称
        key: string,
        // 之前的变量
        oid_value: string | undefined | null,
        // 新的变量内容
        new_vaule: string | undefined | null,
        /**
         * 更新类型
         * - update 直接替换新的变量内容
         * - remove 直接删除变量
         * - append 添加了新的变量(变量组)
         * - reduce 删除了新的变量(变量组)
         */
        update_type: "update" | "remove" | "append" | "reduce"
        // 更新类型为 reduce/ append  时候会有此属性
        value?: string | undefined | null,
    };

    export interface REG_SZ_VALUE {
        type: 1;
        typeName: "REG_SZ";
        data: string;
    }

    export interface REG_EXPAND_SZ_VALUE {
        type: REG_TYPE.REG_EXPAND_SZ;
        typeName: "REG_EXPAND_SZ";
        data: string;
        dataExpand: string;
    }

    export interface REG_DWORD_VALUE {
        type: REG_TYPE.REG_DWORD | REG_TYPE.REG_DWORD_BIG_ENDIAN | REG_TYPE.REG_DWORD_LITTLE_ENDIAN;
        typeName: "REG_DWORD" | "REG_DWORD_BIG_ENDIAN" | "REG_DWORD_LITTLE_ENDIAN";
        data: number;
    }

    export interface REG_QWORD_VALUE {
        type: REG_TYPE.REG_QWORD | REG_TYPE.REG_QWORD_LITTLE_ENDIAN;
        typeName: "REG_QWORD" | "REG_QWORD_LITTLE_ENDIAN";
        data: bigint;
    }

    export interface REG_BINARY_VALUE {
        type: REG_TYPE.REG_BINARY;
        typeName: "REG_BINARY";
        data: Buffer;
    }

    export interface REG_MULTI_SZ_VALUE {
        type: REG_TYPE.REG_MULTI_SZ;
        typeName: "REG_MULTI_SZ";
        data: string[];
    }

    export interface REG_ANY_VALUE {
        type: REG_TYPE.REG_FULL_RESOURCE_DESCRIPTOR | REG_TYPE.REG_LINK | REG_TYPE.REG_NONE | REG_TYPE.REG_RESOURCE_LIST | REG_TYPE.REG_RESOURCE_REQUIREMENTS_LIST;
        typeName: "REG_FULL_RESOURCE_DESCRIPTOR" | "REG_LINK" | "REG_NONE" | "REG_RESOURCE_LIST" | "REG_RESOURCE_REQUIREMENTS_LIST";
        data: Buffer;
    }

    export type REG_VALUE = REG_SZ_VALUE | REG_EXPAND_SZ_VALUE | REG_DWORD_VALUE | REG_QWORD_VALUE | REG_BINARY_VALUE | REG_MULTI_SZ_VALUE | REG_ANY_VALUE;



    export type ClipboardInfo = {
        // 枚举剪贴板中的格式
        format: number[],
        // 剪贴板中的格式数量
        formatCount: number,
        // 写入剪贴板软件的句柄
        hwnd: number,
        // 本次剪贴板内容的唯一id
        id: number
    };

    export type ClipboardHTMLInfo = {
        // html文本 原始文本(win 的存储格式)
        data: string;
        // body体(核心数据) 结束位置
        EndFragment: number;
        // html body(document) 结束位置
        EndHTML: number;
        // 本次数据格式是否有效
        is_valid: boolean;
        // 链接
        SourceURL: string;
        // body体(核心数据) 开始位置
        StartFragment: number;
        // html body(document) 开始位置
        StartHTML: number;
        // 此格式是winapi的什么格式
        Version: number;
        // 获取html(document)
        get document(): string | null;
        // 获取html(body 内容体)
        get body(): string | null;
    }
    export type PromiseSessionDataType = undefined | null | any;

    export type SystemDecoder = chcpList[SystemDecoderKey]
}

export const ref = {
    /**
    * 将内容格式化为文本路径
    * @param Str
    * @returns
    */
    path(Str: any) {
        return path.resolve(String(Str || "")).replace(/([\0\n\r]+)?$/, '\0');
    },
    /**
     * 格式化为bool
     * @param bool
     * @returns
     */
    bool(bool: any) {
        return bool ? true : false;
    },
    /**
     * 将内容格式化为文本
     * @param Str
     * @returns
     */
    string(Str: any) {
        return String(Str || "");
    },
    /**
     * 格式化数字为int(强制)
     * @param Num
     * @returns
     */
    int(Num: any): number {
        if (!Num) return 0;
        if (typeof Num == "object" && Num instanceof Number) {
            Num = Num?.valueOf();
        }
        // 取整
        Num = Math.trunc(Num + 0);
        if (typeof Num == "number" && !isNaN(Num)) return Num;
        // true == 1
        if (Num && typeof Num == "boolean") Num = 1;
        // false = 0;
        if (!Num && typeof Num == "boolean") Num = 0;
        if (Num >= Infinity) {
            Num = 999999999999999;
        }
        if (Num <= -Infinity) {
            Num = -999999999999999;
        }
        return Num;
    },
    /**
     * 文本数组
     * @param array 
     * @returns 
     */
    stringArray(array: Set<any> | Array<any>) {
        let dataList: string[] = [];
        if (Array.isArray(array)) {
            for (let index = 0; index < array.length; index++) {
                const cout = array[index];
                dataList.push(this.string(cout));
            }
        }
        if (array instanceof Set) {
            for (const cout of array) {
                dataList.push(this.string(cout));
            }
        }
        return dataList;
    },
    /**
     * 文本数组
     * @param array 
     * @returns 
     */
    intArray(array: Set<any> | Array<any>) {
        let dataList: number[] = [];
        if (Array.isArray(array)) {
            for (let index = 0; index < array.length; index++) {
                const cout = array[index];
                dataList.push(this.int(cout));
            }
        }
        if (array instanceof Set) {
            for (const cout of array) {
                dataList.push(this.int(cout));
            }
        }
        return dataList;
    },
    /**
     * 格式化命令行内容
     */
    formatCmd(cmd: string): string[] {
        return argvSplit(this.string(cmd));
    },
    /**
     * 将命令行内容组转为cmd文本
     * @param argv 
     */
    formatArgv(...argv: Array<any>[] | any[]): string {
        let argvs: string[] = [];
        let argvsResult: string[] = [];

        // 获取
        for (let index = 0; index < argv.length; index++) {
            const cout = argv[index];
            if (Array.isArray(cout)) {
                for (let cout_index = 0; cout_index < cout.length; cout_index++) {
                    const cout2 = cout[cout_index];
                    argvs.push(this.string(cout2));
                }
                continue;
            }
            argvs.push(this.string(cout));
        }

        // 处理
        for (let index = 0; index < argvs.length; index++) {
            let cout = argvs[index];
            if (!cout) continue;
            if (cout.match(/['"]/)) {
                cout = cout.replace(/(\\)?["']/g, "\\$0");
            }
            if (cout.match(" ")) {
                cout = `"${cout}"`;
            }
            if (cout.match(/[\n\r]/)) {
                cout = cout.replace(/(\n|\r|\r\n)/g, "$0^");
            }
            argvsResult.push(cout);
        }
        return argvsResult.join(" ");
    },
    /**注册表根目录 */

    HKEY: Hkey,
    /**
     * 拼合buff片段
     * @param buffList 
     * @returns 
     */
    concatBuff(buffList: Buffer[]): Buffer {
        let buffSize = 0;
        for (let index = 0; index < buffList.length; index++) {
            const buff = buffList[index];
            buffSize = buffSize + buff.byteLength;
        }
        let ResponseData = Buffer.concat([...buffList], buffSize);
        return ResponseData;
    },
    /**
     * 键盘值格式化为键值
     * @param key 键值/键
     * @returns 
     */
    vkKey: vkKey
};

/**
 * 获取窗口的标题
 * @returns
 */
function getDefaultTitele(): string {
    try {
        return globalThis.document.title;
    } catch (error) {
        return (
            native.lookHandleGetTitle(native.getProcessHandle(process.pid) || 0) ||
            getProcessName2Sync(process.pid) ||
            process.title
        );
    }

}

export class PromiseSession {
    private data_list: Array<undefined | null | any>;
    private SessionID: number;
    /**
     * 将 PromiseSession 转为 Promise
     * @param format 数据格式化的函数
     * @returns 
     */
    public to_Promise<T>(format: (value: Array<undefined | null | any>) => T): Promise<T> {
        const this_ = this;
        return new Promise(function (resolve, reject) {
            try {
                setInterval(() => {
                    const temp = native._PromiseSession_get(this_.SessionID, 50);
                    for (let index = 0; index < (temp || []).length; index++) {
                        const element = (temp || [])[index];
                        this_.data_list.push(element);
                    }
                    if (!temp && native._PromiseSession_isClosed(this_.SessionID)) {
                        resolve(format(this_.data_list));
                    }
                }, 25);

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * PromiseSession 转为 callBack 
     * @param format 格式化的函数 如果没有callback 此函数将被作为callBack使用
     * @param callback 回调函数 接收的第一个参数将会是 format格式化过得内容
     * @param everyCallback 是否每次回调 当此选项为false 将只会在PromiseSession接收完成时候回调
     */
    public to_callback<T>(format: (value: Array<undefined | null | any>) => T, callback?: (value: T) => any, everyCallback?: boolean) {
        try {
            const this_ = this;
            setInterval(() => {
                const temp = native._PromiseSession_get(this_.SessionID, 50);
                for (let index = 0; index < (temp || []).length; index++) {
                    const element = (temp || [])[index];
                    this_.data_list.push(element);
                    if (!everyCallback) {
                        if (callback) {
                            callback(format(element));
                        } else {
                            format(element);
                        }
                    }
                }

                if (!temp && native._PromiseSession_isClosed(this_.SessionID)) {
                    if (everyCallback) {
                        if (callback) {
                            callback(format(this_.data_list));
                        } else {
                            format(this_.data_list);
                        }
                    }
                }
            }, 25);

        } catch (error) {

        }
    }

    /**
     * 异步改同步
     */
    public await() {
        native._PromiseSession_await(this.SessionID);
        return native._PromiseSession_get(this.SessionID, 999999999);
    }

    /**
     * 提前结束
     */
    public stop() {
        native._PromiseSession_stop(this.SessionID);
    }
    /**
     * 初始化一个将 hmc_PromiseSession 转为js 异步的方法
     * hmc_PromiseSession 是一个支持并发异步的调用封装库
     * 用于解决napi无法连续创建同事件的异步空间 以及napi的异步及其难写的问题
     * @param SessionID 
     */
    constructor(SessionID: number) {
        this.SessionID = SessionID;
        this.data_list = [];
    }
}

// 初始化一个v2 接口的sp对象 并且将其转为callback或者Promise (js标准)
export function PromiseSP<T>(SessionID: number | Promise<any>, format: ((value: Array<undefined | null | any>) => T), Callback: undefined | ((error: null | Error, ...args: any[]) => any)): void;
export function PromiseSP<T>(SessionID: number | Promise<any>, format: ((value: Array<undefined | null | any>) => T)): Promise<T>;
export function PromiseSP<T>(SessionID: number | Promise<any>, format: unknown, Callback?: unknown) {

    const new_format: ((value: Array<undefined | null | any>) => T) = ((typeof format != "function") ? function (a: T[]) { return a?.[0] || null } as (a: T) => T : format) as ((value: Array<undefined | null | any>) => T);

    let result: Promise<T>;
    try {

        // 是sp回调栈
        if (typeof SessionID == "number") {

            // 是回调函数
            if (typeof Callback == "function") {
                (new PromiseSession(SessionID)).to_callback(new_format, function (...data: any[]) {
                    Callback(null, ...data)
                });
                return void 0;
            }
            // 是异步承诺体
            result = (new PromiseSession(SessionID)).to_Promise(new_format);
            return result;
        }

        // 是回调函数
        if (typeof Callback == "function") {
            SessionID.then(data => {
                Callback(null, new_format(data));
            }).catch(err => Callback(err, null));
            return void 0;
        } else {
            // 是异步承诺
            return SessionID.then(new_format);
        }

    } catch (error: any) {
        if (typeof Callback == "function") {
            Callback(Error(error + ""), null);
        } else {
            return Promise.reject(Error(error + ""));
        }
    }
}

/**
 * 直达路径解析
 * @param Path 全路径(直达路径)
 * @param atkey 是否将最后一个值解释为键
 * @returns
 */
export function analysisDirectPath(Path: string, atkey?: boolean): string[] {
    let directPath = [];
    directPath.push(...Path.split(new RegExp(Object.keys(Hkey).join("|"))));
    if (directPath.length < 2) {
        return [];
    }
    directPath[1] = directPath[1].replace(/[\\\/]+/g, "\\");
    if (atkey) {
        let paths = directPath[1].split(/[\\]/g);
        if (paths.length) {
            let popData = paths.pop();
            popData && directPath.push(popData);
            directPath.unshift(...paths);
        }
    }
    return directPath;
}

/**
 * 获取系统shell默认编码
 * @returns 
 */
export function systemChcp() {
    let result = { code: 437 as HMC.SystemDecoderKey, chcp: chcpList[437] as HMC.SystemDecoder };
    return new Promise<{
        chcp: HMC.SystemDecoder,
        code: HMC.SystemDecoderKey
    }>(resolve => {
        child_process.execFile("chcp", function (err, data) {
            if (!data || err) return resolve(result);
            let sy_Chcp = data.match(/^.+?(\d+)[\r\n]+$/)
            if (sy_Chcp && chcpList[Number(sy_Chcp[1])]) {
                result.chcp = chcpList[Number(sy_Chcp[1])];
                result.code = Number(sy_Chcp[1]) as HMC.SystemDecoderKey;
                resolve(result);
            }
            resolve(result);
        });
    });
}

/**
 * 设置窗口位置大小
 * @param Handle 句柄
 * @param x (right) 从屏幕右边到所在位置得像素数
 * @param y (top) 从屏幕顶部边到所在位置得像素数
 * @param width 窗口宽度
 * @param height 窗口高度
 * @time 0.0068359375 ms
 * @returns 布尔
 */
export function setWindowMode(HWND: HWND | number, x: number | null | 0 | HMC.RECT_CONFIG, y?: number | null | 0, width?: number | null | 0, height?: number | null | 0): boolean {
    if (!ref.int(HWND)) return false;
    if (x && typeof x == "object") {
        let SetWindowRect = x;
        SetWindowRect.y = SetWindowRect.top
            ? SetWindowRect.top
            : SetWindowRect.y || 0;
        SetWindowRect.x = SetWindowRect.right
            ? SetWindowRect.right
            : SetWindowRect.x || 0;
        if (SetWindowRect.x) x = SetWindowRect.x;
        if (SetWindowRect.y) y = SetWindowRect.y;
        if (SetWindowRect.width) width = SetWindowRect.width;
        if (SetWindowRect.height) height = SetWindowRect.height;
    }

    if (!width) width = 0;
    if (!height) height = 0;
    return native.setWindowMode(
        ref.int(HWND),
        x == null ? null : ref.int(x),
        y == null ? null : ref.int(y),
        ref.int(width),
        ref.int(height)
    );
}

/**
 * 判断输入的注册表路径是否合法
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 */
function has_reg_args(HKEY: HMC.HKEY, Path: string, funName: string) {
    let hasHKEY = new RegExp(`^${Object.keys(Hkey).join("|")}$`).exec(HKEY);
    if (!hasHKEY || !Path) {
        throw new Error(`
        <fun> ${funName}  
        argument size 2 or 3
        HKEY : ${Object.keys(Hkey)}
        Path : string
        key ?: string  or "" or undefined
        `);
    }
}

/**
 * 判断注册表中是否有该键值
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.06591796875 ms
 * @returns
 */
export function hasRegistrKey(HKEY: HMC.HKEY, Path: string, key: string): boolean {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "hasRegistrKey");
    return native.getRegistrValueStat(
        HKEY,
        ref.string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key)
    ) ? true : false;
}

/**
  * 设置键值对内容(64位数字)
  * @param HKEY 根路径
  * @param Path 路径
  * @param key 键
  * @param Qword (64位数字)
  * @returns 
  */
export function setRegistrQword(HKEY: HMC.HKEY, Path: string, key: string, Qword: bigint | number): boolean {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "hasRegistrKey");
    if (!Qword) Qword = BigInt(0);
    return native.setRegistrValue(HKEY, ref.string(Path), ref.string(key), BigInt(Qword), undefined);
}

/**
 * 设置键值对内容(32位数字)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @param Qword (32位数字)
 * @returns 
 */
export function setRegistrDword(HKEY: HMC.HKEY, Path: string, key: string, Dword: number): boolean {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "hasRegistrKey");
    return native.setRegistrValue(HKEY, ref.string(Path), ref.string(key), ref.int(Dword), undefined);
}

/**
 * 获取内容(64位数字)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.06787109375 ms
 * @returns
 */
export function getRegistrQword(HKEY: HMC.HKEY, Path: string, key: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "getRegistrQword");
    const data = native.getRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key || "")
    )?.data;

    if (typeof data == "number") return BigInt(ref.int(data));
    if (typeof data == "bigint") return data;
    return 0;
}

/**
 * 获取内容(64位数字)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.06787109375 ms
 * @returns
 */
export function getRegistrDword(HKEY: HMC.HKEY, Path: string, key: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "getRegistrDword");
    const data = native.getRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key || "")
    )?.data;

    if (typeof data == "number") return ref.int(data);
    if (typeof data == "bigint") return ref.int(data);
    return 0;
}

/**
 * 获取内容(二进制 Buffer)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.06787109375 ms
 * @returns
 */
export function getRegistrBuffValue(HKEY: HMC.HKEY, Path: string, key: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "getRegistrBuffValue");
    return native.getRegistrBuffValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key)
    );
}

/**
 * 枚举键值
 * @param HKEY 根路径
 * @param Path 路径
 * @time 0.06689453125 ms
 * @returns
 */
export function enumRegistrKey(HKEY: HMC.HKEY, Path: string) {
    has_reg_args(HKEY, Path, "enumRegistrKey");
    let enumKeyList: Set<string> = new Set();
    let NatenumKey = JSON.parse(native.getRegistrFolderStat(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"), true
    ) || "{}") as HMC.RegistrFolderStat;
    const key_list = [...NatenumKey.folder || [], ...NatenumKey.key || []];

    for (let index = 0; index < key_list.length; index++) {
        const key = key_list[index];
        enumKeyList.add(key)
    }
    return [...enumKeyList];
}

/**
 * 将当前的路径的注册表值转表
 * @param HKEY
 * @param Path
 */
export function listRegistrPath(HKEY: HMC.HKEY, Path: string) {
    let enumRegistrKeys = enumRegistrKey(HKEY, Path);
    enumRegistrKeys.unshift("");
    let data: { "": string | Buffer;[key: string]: string | Buffer } = {
        "": "",
    };
    for (let i = 0; i < enumRegistrKeys.length; i++) {
        data[enumRegistrKeys[i]] = getStringRegKey(
            HKEY,
            Path,
            enumRegistrKeys[i]
        );
    }
    return data;
}

/**
 * 判断该键值是否存在子项
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 */
export function isRegistrTreeKey(HKEY: HMC.HKEY, Path: string, key?: string) {
    return !!enumRegistrKey(HKEY, Path + (!key ? "" : "\\" + key)).length
}

/**
 * 获取内容(文本)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.108ms
 * @returns
 */
export function getStringRegKey(HKEY: HMC.HKEY, Path: string, key?: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "getStringRegKey");
    const data = native.getRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key)
    );

    return Buffer.isBuffer(data?.data) || typeof data?.data == "number" || typeof data?.data == "string" ? String(data?.data) : "";
}

export function getClipboardHTML() {
    const data = native.getClipboardHTML();
    if (data) {
        const html_item: HMC.ClipboardHTMLInfo = {
            Version: Number(data.data.match(/Version:([\.0-9]+)/)?.[0] || 0),
            data: data.data,
            EndFragment: data.EndFragment,
            EndHTML: data.EndHTML,
            is_valid: data.is_valid,
            SourceURL: data.SourceURL,
            StartFragment: data.StartFragment,
            StartHTML: data.StartHTML,
            get document() {
                if (!this.data && !this.StartHTML) return null;
                return this.data.substring(this.StartHTML, this.EndHTML) || null
            },
            get body() {
                if (!this.data && !this.StartFragment) return null;

                return this.data.substring(this.StartFragment, this.EndFragment) || null
            }
        }

        return html_item;
    }

    return data;
}

/**
 * 获取内容(数字)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.10888671875 ms
 * @returns
 */
export function getNumberRegKey(HKEY: HMC.HKEY, Path: string, key?: string): number {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "getNumberRegKey");
    const data = native.getRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key || "")
    )?.data;

    if (typeof data == "number" || typeof data == "bigint") return Number(data);
    return ref.int(0);
}

/**
 * 删除键 (文件夹)
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @time 0.076904296875 ms
 * @returns
 */
export function removeStringRegKey(HKEY: HMC.HKEY, Path: string, key?: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "removeStringRegKey");
    return native.removeRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key)
    );
}

/**
 * 删除该目录下的所有内容（树遍历）
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @returns 
 */
export function removeStringRegKeyWalk(HKEY: HMC.HKEY, Path: string, key?: string) {
    if (!key) {
        let paths = ref
            .string(Path)
            .split(/[\\\/]/g);
        key = paths.pop();
        if (!key) throw new Error("Invalid key because it is empty");
        Path = paths.join("\\");
    }
    has_reg_args(HKEY, Path, "removeStringRegKeyWalk");
    return native.removeRegistrFolder(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]+/g)
            .join("\\"),
        ref.string(key), true
    );
}

/**
* 删除该目录下的所有内容（树遍历）
* @param HKEY 根路径
* @param Path 路径
* @param key 键
* @returns 
*/
export function removeStringTree(HKEY: HMC.HKEY, Path: string, key: string) {
    return removeStringRegKeyWalk(HKEY, Path, key);
}

/**
 * 删除该键值
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @returns 
 */
export function removeStringRegValue(HKEY: HMC.HKEY, Path: string, key?: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "removeStringRegValue");
    return native.removeRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]/g)
            .join("\\"),
        ref.string(key)
    );
}

/**
 * 设置键值对
 * @param HKEY 根路径
 * @param Path 路径
 * @param key 键
 * @param Value 数据
 * @time 2.02392578125 ms
 * @returns
 */
export function setRegistrKey(HKEY: HMC.HKEY, Path: string, key: string, Value: string) {
    if (!key) key = "";
    has_reg_args(HKEY, Path, "setRegistrKey");
    return native.setRegistrValue(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]/g)
            .join("\\"),
        ref.string(key),
        ref.string(Value), undefined
    );
}

/**
 * 创建新的路径
 * @param HKEY 根路径
 * @param Path 路径
 * @time 2.02392578125 ms
 * @returns
 */
export function createPathRegistr(HKEY: HMC.HKEY, Path: string) {
    has_reg_args(HKEY, Path, "createPathRegistr");
    return native.createRegistrFolder(
        HKEY,
        ref
            .string(Path)
            .split(/[\\\/]/g)
            .join("\\")
    );
}

/**
  * 同 C++/C 的system
  * @returns 程序退出代码
  */
export function system(str: string) {
    return native.system(ref.string(str));
}

/**
 * 空闲的随机端口号
 * @returns 
 */
export function freePort(): Promise<number> {
    return new Promise((resolve, reject) => {
        let sock = net.createServer(function () { });
        sock.listen(0, () => {
            // @ts-expect-error
            resolve(Number(sock?.address()?.port as string));
            sock.close();
        });
    });
}
/**
 * 获取剪贴板中的文件列表
 * @returns 
 */
export function getClipboardFilePaths(): string[];
export function getClipboardFilePaths(at: number): string | undefined;
/**
 * 获取剪贴板中的文件列表
 * @returns 
 */
export function getClipboardFilePaths(at?: number): unknown {
    let paths = native.getClipboardFilePaths().split("\x00");
    // [1,2,3,<"">]
    const temp = paths.pop();
    if (temp) {
        paths.push(temp);
    }

    if (typeof at === 'number') {

        // 80 -> [1, 2, 3, 4, 5] ? not 80
        if (at >= paths.length) {
            return undefined;
        }

        // -1 -> [1,2,3,4,<5>]
        if (at < 0) {
            return paths[paths.length + at];
        }
        // 0 -> [<1>,2,3,4,5]
        return paths[at];
    }
    return paths
}

/**
 * 向剪贴板写入文件列表
 * @param FilePaths 
 */
export function setClipboardFilePaths(FilePaths: string[]) {
    let temp_filePaths: string[] = [];

    for (let index = 0; index < FilePaths.length; index++) {
        const FilePath = FilePaths[index];
        temp_filePaths.push(ref.string(FilePath));
    }

    return native.setClipboardFilePaths(temp_filePaths);
}

/**
 * 获取所有usb驱动器(不包含HUD)
 * @returns 
 */
export function getUsbDevsInfo() {
    return native.getUsbDevsInfo();
}

/**
 * 枚举句柄的子窗口
 * @param Handle 句柄
 * @returns 
 */
export function enumChildWindows(Handle: number | HWND) {
    return native.enumChildWindows(ref.int(Handle));
}

/**
 * 隐藏当前控制台窗口(node)
 */
export function hideConsole() {
    if (!$_thenConsole) {
        $_thenConsole = getProcessHandle(process.pid);
    }
    if (!$_thenConsole) return false;
    return $_thenConsole?.hide() || false;
}

/**
 * 显示当前控制台窗口(node)
 */
export function showConsole() {
    if (!$_thenConsole) {
        $_thenConsole = getProcessHandle(process.pid);
    }
    if (!$_thenConsole) return false;
    return $_thenConsole?.show() || false;
}

/**
 * 获取当前控制台窗口的句柄(node)
 * @returns 
 */
export function getConsoleHandle() {
    if (!$_thenConsole) {
        $_thenConsole = getProcessHandle(process.pid);
    }
    return $_thenConsole;
}

/**
 * 获取注册表值的信息
 * @param Hive 根
 * @param folderPath 目录
 * @param keyName 名称 
 * @returns 
 */
export function getRegistrValueStat(Hive: HMC.HKEY, folderPath: string, keyName: string | null): HMC.RegistrValueStat | null {
    const data = native.getRegistrValueStat(ref.string(Hive) as HMC.HKEY, ref.string(folderPath), ref.string(keyName || ""));
    return data ? JSON.parse(data) : null;
}


export function getRegistrFolderStat(Hive: HMC.HKEY, folderPath: string, enumKey: true): (HMC.RegistrFolderStat & { key: string[], folder: string[] }) | null;
export function getRegistrFolderStat(Hive: HMC.HKEY, folderPath: string): HMC.RegistrFolderStat | null;

/**
 * 获取注册表值的信息
 * @param Hive 根
 * @param folderPath 目录
 * @param keyName 名称 
 * @returns 
 */
export function getRegistrFolderStat(Hive: HMC.HKEY, folderPath: unknown, enumKey?: unknown): unknown {
    const data = native.getRegistrFolderStat(ref.string(Hive) as HMC.HKEY, ref.string(folderPath), enumKey ? true : false);
    return data ? JSON.parse(data) : null;
}


/**
 * 获取注册表值 全部格式
 * @param Hive 
 * @param folderPath 
 * @param keyName 
 * @returns 
 */
export function getRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null) {
    return native.getRegistrValue(ref.string(Hive) as HMC.HKEY, ref.string(folderPath), ref.string(keyName || ""));
}

/**
* 将文件/文件夹  移除到系统回收站中
* @param Path 处理的路径(\n结尾)
* @param Recycle 是否保留撤销权(回收站)
* @param isShow 是否显示确认窗口
* @returns 返回操作状态 请参考：
* @link https://learn.microsoft.com/zh-CN/windows/win32/api/shellapi/nf-shellapi-shfileoperationa
* @default 默认配置
* * Recycle true
* * isShow false
*/
export function deleteFile(Path: string, Recycle?: boolean, isShow?: boolean) {
    return native.deleteFile(ref.path(Path),
        typeof Recycle == "boolean" ? ref.bool(Recycle) : true,
        typeof isShow == "boolean" ? ref.bool(isShow) : false,
    )
}

/**
* 将文件/文件夹  移除到系统回收站中
* @param Path 处理的路径(\n结尾)
* @param Recycle 是否保留撤销权(回收站)
* @param isShow 是否显示确认窗口
* @returns 返回操作状态 请参考：
* @link https://learn.microsoft.com/zh-CN/windows/win32/api/shellapi/nf-shellapi-shfileoperationa
* @default 默认配置
* * Recycle true
* * isShow false
*/
export const trash = deleteFile;

/**
 * 获取当前剪贴板内容的id(如果被重新写入了该id会变动)
 * @returns 
 */
export function getClipboardSequenceNumber(): number {
    return native.getClipboardInfo().id
}

/**
 * 获取当前剪贴板内容的信息
 * @returns 
 */
export function getClipboardInfo() {
    const data = native.getClipboardInfo();
    data.format = typeof data.format == "string" ? JSON.parse(data.format) : data.format;
    return data;
}


/**
 * 设置注册表值 
 * @param Hive 根目录
 * @param folderPath 目录路径
 * @param keyName 值键
 * @param data 数据体
 * @param is_expand 是否让其可以被自动转义 例如 %temp%/123 -> c:.../temp/123
 */
export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null, data: string, is_expand?: boolean): boolean;
/**
 * 设置注册表值
 * @param Hive 根目录
 * @param folderPath 目录路径
 * @param keyName 值键
 * @param data 数据体
 * @param to_type 转义类型 详见 HMC.REG_TYPE https://learn.microsoft.com/zh-cn/windows/win32/sysinfo/registry-value-types
 */
export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null, data: Buffer, to_type?: HMC.REG_TYPE): boolean;

/**
 * 设置注册表值
 * @param Hive 根目录
 * @param folderPath 目录路径
 * @param keyName 值键
 */
export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null): boolean;

/**
 * 设置注册表值 文本数组
 * - REG_MULTI_SZ格式 
 * ? 允许存储空文本但是不建议 (因为非标准) 但是数组末尾的元素是空文本会被清空
 * @param Hive 根目录
 * @param folderPath 目录路径
 * @param keyName 值键
 */
export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string, data: string[]): boolean;

/**
 * 设置注册表值
 * @param Hive 根目录
 * @param folderPath 目录路径
 * @param keyName 值键
 * @param data 数据体
 * - number DWORD 标准范围约为 0(0x0) 到 4294967295(0xffffffff) (即 2^32 - 1)
 * - bigint QWORD 标准范围约为  0n(0x0) 到 18446744073709551615n (0xffffffffffffffff)（即 2^64 - 1）
 * - boolean 布尔 以DWORD状态存储 范围 0-1
 * - Buffer 二进制  1024KB 以内
 * - Date 时间戳 以浮点二进制存储
 */
export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: string | null, data: number | bigint | boolean | Date): boolean;

export function setRegistrValue(Hive: HMC.HKEY, folderPath: string, keyName: unknown, data: unknown = null, type: unknown = undefined): boolean {
    const hive_value = ref.string(Hive || "HKEY_CURRENT_USER") as HMC.HKEY;
    // 虽然不符合规范 都是根目录下是允许写数据的
    const folder_path = ref.string(folderPath || "").replace(/[\\\/]+/g, "\\");
    const key_name = ref.string(keyName || "");
    let data_output: string | number | bigint | boolean | Buffer | Date | null | string[] = data as Buffer;
    let types: HMC.REG_TYPE | undefined | boolean = undefined;
    let is_type_valid: boolean = false;

    // !这里有个判断文件夹的逻辑 因为设置值不会创建目录

    // 处理转义
    if (Buffer.isBuffer(data_output)) {
        if (typeof type == "number") {
            types = type as HMC.REG_TYPE;
        }
    } else
        if (typeof data_output == "string") {
            if (typeof type == "boolean" || type == 2) {
                types = type ? true : false;
            }
        }

    // 判断值有效
    if (
        typeof data_output == "boolean" ||
        typeof data_output == "string" ||
        typeof data_output == "number" ||
        typeof data_output == "bigint" ||
        data_output instanceof Date ||
        data_output === null ||
        Array.isArray(data_output) ||
        Buffer.isBuffer(data_output)
    ) {
        is_type_valid = true;
    } else return is_type_valid;

    // 提前强转 虽然c++也会强转
    if (typeof data_output == "boolean") {
        data_output = data_output ? 1 : 0;
    }

    // 万恶的NAN
    if (typeof data_output == "number" && isNaN(data_output)) {
        data_output = null;
    }

    // 超过0xffffffff 强制到0xffffffff
    if (typeof data_output == "number" && data_output > 0xffffffff) {
        data_output = 0xffffffff;
    }

    if (data_output && !Buffer.isBuffer(data_output) && Array.isArray(data_output)) {
        data_output = ref.stringArray(data_output);
    }

    // 处理 负数 浮点 的逻辑

    return native.setRegistrValue(hive_value, folder_path, key_name, data_output, types);
}


/**
 * 当剪贴板内容变更后发生回调
 * @param CallBack 回调函数
 * @param nextAwaitMs 每次判断内容变化用时 默认 `150` ms
 * @returns 
 */
export function watchClipboard(CallBack: () => void, nextAwaitMs?: number) {
    let NextAwaitMs = nextAwaitMs || 150;
    let Next = true;
    let oidClipboardSequenceNumber = getClipboardSequenceNumber();
    (async function () {
        while (Next) {
            await Sleep(NextAwaitMs);
            let clipboardSequenceNumber = getClipboardSequenceNumber();
            if (oidClipboardSequenceNumber !== clipboardSequenceNumber) {
                if (CallBack) CallBack();
            }
            oidClipboardSequenceNumber = clipboardSequenceNumber;
        }
    })();
    return {
        /**
         * 取消继续监听
         */
        unwatcher() {
            Next = false;
        },
        /**
         * 每次判断内容变化用时 默认 `150` ms
         * @param nextAwaitMs 
         */
        setNextAwaitMs(nextAwaitMs: number) {
            NextAwaitMs = ref.int(nextAwaitMs) || 150;
        }
    }
}

/**
  * 当驱动器添加或者移除后发生回调
  * @param CallBack 回调函数
  * @param nextAwaitMs 每次判断内容变化用时 默认 `800` ms
  * @param watchType 监听的设备类型 默认 `["HUB","drive"]`
  * @returns 
  */
export function watchUSB(CallBack: (env: "add" | "remove" | "start", id: string) => void, nextAwaitMs?: number, watchType?: "hub" | "drive" | Array<"hub" | "drive">) {
    let NextAwaitMs = nextAwaitMs || 800;
    let Next = true;
    let OID_ID_LIST: Set<string> = new Set();
    let start = true;
    if (typeof watchType == "string") watchType = [watchType];
    (async function () {
        while (Next) {
            await Sleep(NextAwaitMs);
            let GET_ID_List = new Set(watchType ? [
                ...(watchType.includes("hub") ? native.getHidUsbIdList() : []),
                ...(watchType.includes("drive") ? native.getUsbDevsInfo() : []),
            ] : [...native.getHidUsbIdList(), ...native.getUsbDevsInfo()]);
            if (start) {
                for (const NEW_ID of GET_ID_List) {
                    OID_ID_LIST.add(NEW_ID);
                    CallBack && CallBack("start", NEW_ID);
                }
                start = false;
            }
            let GET_ID_List_NEW = [...GET_ID_List];

            for (const OID_ID of OID_ID_LIST) {
                if (!GET_ID_List.has(OID_ID)) {
                    CallBack && CallBack("remove", OID_ID);
                }
            }

            for (const NEW_ID of GET_ID_List) {
                if (!OID_ID_LIST.has(NEW_ID)) {
                    CallBack && CallBack("add", NEW_ID);
                }
            }

            OID_ID_LIST.clear();
            for (let index = 0; index < GET_ID_List_NEW.length; index++) {
                const GET_ID = GET_ID_List_NEW[index];
                OID_ID_LIST.add(GET_ID);
            }
        }
    })();
    return {
        get idList() {
            return OID_ID_LIST
        },
        /**
         * 取消继续监听
         */
        unwatcher() {
            Next = false;
        },
        /**
         * 每次判断内容变化用时 默认 `800` ms
         * @param nextAwaitMs 
         */
        setNextAwaitMs(nextAwaitMs: number) {
            NextAwaitMs = ref.int(nextAwaitMs) || 800;
        }
    }
}

/**
 * 获取所有屏幕
 * @returns 
 */
export function getDeviceCapsAll(): HMC.cRECT[] {
    return native.getDeviceCapsAll();
}

/**
 * 判断句柄的窗口是否在所有窗口的范围中(无论他是否被其他窗口挡住)
 * @param Handle 
 */
export function isInMonitorWindow(Handle: number | HWND): boolean {
    return native.isInMonitorWindow(ref.int(Handle));
}

/**
 * 判断句柄的窗口是否在鼠标所在的窗口
 * @param Handle 
 */
export function isMouseMonitorWindow(Handle: number): boolean {
    return native.isMouseMonitorWindow(ref.int(Handle));
}

/**
 * 获取鼠标所在的屏幕信息
 */
export function getCurrentMonitorRect(): HMC.cRECT {
    return native.getCurrentMonitorRect();
}

/**
 * 当前电脑存在几个屏幕
 */
export function getSystemMetricsLen(): number {
    return native.getSystemMetricsLen();
}

/**
 * 方法用于显示带有一条指定消息和一个 确认 按钮的警告框
 * @param Message 消息
 * @param Title 标题
 * @time any ms
 * @returns
 */
export function alert(Message: string, Title?: string) {
    return native.alert(
        Message,
        typeof Title != "string" ? getDefaultTitele() : Title
    );
}

/**
 * 方法用于显示带有一条指定消息和 确认 和取消  的按钮的消息框
 * @param Message 消息
 * @param Title 标题
 * @time any ms
 * @returns
 */
export function confirm(Message: string, Title?: string) {
    return native.confirm(
        Message,
        typeof Title != "string" ? getDefaultTitele() : Title
    );
}

/**
 * 方法用于显示带有一条指定消息和一个 确认 按钮的和❌（X）的消息框。
 * @param Message 消息
 * @param Title 标题
 * @time any ms
 * @returns
 */
export function MessageStop(Message: string, Title?: string) {
    return native.MessageStop(
        Message,
        typeof Title != "string" ? getDefaultTitele() : Title
    );
}

/**
 * 方法用于显示带有一条指定消息和一个 确认 按钮的错误框 附带有❗ 感叹号。
 * @param Message 消息
 * @param Title 标题
 * @time any ms
 * @returns
 */
export function MessageError(Message: string, Title?: string) {
    return native.MessageError(
        Message,
        typeof Title != "string" ? getDefaultTitele() : Title
    );
}

/**
 * 获取所有窗口句柄并返回一个快速操作的句柄类 可以快速操作窗口
 * @time 0.657958984375 ms 
 * @example ```javascript
 * const getAllWindows = hmc.getAllWindowsHandle();
 * console.log({
 * title:getAllWindows[0].title,
 * handle : getAllWindows[0]+0,
 * rect:getAllWindows[0].rect,
 * })
//  log=>
//  {
//   "title": "Program Manager",
//   "handle": 65826,
//   "rect": {
//       "top": 0,
//       "bottom": 1080,
//       "left": 0,
//       "right": 1920,
//       "y": 0,
//       "x": 0,
//       "width": 1920,
//       "height": 1080
//   }
//  }
 *  ```
 * @returns 
 */
export function getAllWindowsHandle(isWindows: boolean) {
    let data = [];
    let AllWindowsHandle = native.getAllWindowsHandle(isWindows || false);
    for (let index = 0; index < AllWindowsHandle.length; index++) {
        const element = AllWindowsHandle[index];
        // const mydata = {
        //   _Handle:null as null | HWND ,
        //   Handle:element,
        //   get handle(){
        //     if(!mydata._Handle) mydata._Handle=new HWND(mydata.Handle);
        //     return mydata._Handle
        //   }
        // }
        // data.push(mydata);
        data.push(new HWND(element));
    }
    return data;
}

/**
 * 进程监听 当该进程被关闭的时候执行回调
 * @param ProcessID 进程id
 * @param callback 回调函数
 * @param awaitMs 每次执行的延迟事件
 * @default awaitMs 500
 * @example ```javascript
 * hmc_win32.processWatchdog(4836,()=>console.log("进程已经退出。。。"));
 * hmc_win32.sleep(2836);
 * hmc_win32.killProcess(4836);
 * ```
 * @returns 包含一个quit函数(结束监听)的异步或对象
 */
export function processWatchdog(ProcessID: number, callback?: (() => void) | number, awaitMs?: number) {
    let quit = false;
    if (!callback) {
        let Prom: Promise<void> & { quit: () => void } = new Promise(
            async (resolve, reject) => {
                while (true) {
                    if (quit) break;
                    await Sleep(awaitMs || 500);
                    if (!hasProcess(ref.int(ProcessID))) {
                        resolve(void 0);
                        break;
                    }
                }
            }
        ) as Promise<void> & { quit: () => void };
        Prom.quit = function () {
            quit = true;
        };
        return Prom;
    }
    (async () => {
        while (true) {
            await Sleep(awaitMs || 500);
            if (!hasProcess(ref.int(ProcessID))) {
                typeof callback == "function" && callback();
                break;
            }
        }
    })();
    return {
        quit: function () {
            quit = true;
        },
    };
}

/**
 * 监听鼠标所在的窗口的句柄
 * @param callback 回调函数
 * @param awaitMs 每次延迟的事件 
 * @default awaitMs 350
 * @example ```javascript
 * let WatchPoint = hmc_win32.WatchWindowPoint(function(newPoint,oidPoint,HWND){
  console.log(newPoint,oidPoint,HWND,HWND.title)
  // quit 结束
  WatchPoint.quit();
  });
 * ```
 * @returns 一个可以控制结束和延迟事件的对象
 */
export function WatchWindowPoint(callback: (newPoint: number, oidPoint: number, HWND: HWND) => void, awaitMs?: number) {
    let quit = false;
    let oidPoint = native.getPointWindow() || 0;
    (async () => {
        if (typeof callback !== "function") return;
        while (true) {
            if (quit) return;
            let newPoint = native.getPointWindow() || 0;
            if (newPoint)
                if (newPoint != oidPoint) {
                    if (callback) {
                        callback(
                            ref.int(newPoint),
                            ref.int(oidPoint) || 0,
                            new HWND(ref.int(newPoint))
                        );
                        oidPoint = newPoint;
                    }
                }
            await Sleep(awaitMs || 350);
        }
    })();
    return {
        /**结束监听 */
        quit: function () {
            quit = true;
        },
        /**设置每次延迟事件 */
        setAwaitMs(ms: number) {
            awaitMs = ms;
        },
    };
}

/**
* 监听焦点窗口变化并返回句柄
* @param callback 回调函数
* @param awaitMs 每次延迟的事件 
* @default awaitMs 350
* @example ```javascript
* let WatchForeg = hmc_win32.WatchWindowForeground(function(newForeg,oidForeg,HWND){
  console.log(newForeg,oidForeg,HWND,HWND.title)
  // quit 结束
  WatchForeg.quit();
  });
 * ```
* @returns 一个可以控制结束和延迟事件的对象
*/
export function WatchWindowForeground(callback: (newForeg: number, oidForeg: number, HWND: HWND) => void, awaitMs?: number) {
    let quit = false;
    let oidForeg = getForegroundWindow();
    (async () => {
        if (typeof callback !== "function") return;
        while (true) {
            if (quit) return;
            let newForeg = getForegroundWindow();
            if (newForeg)
                if (ref.int(newForeg) != ref.int(oidForeg)) {
                    if (callback) {
                        callback(
                            ref.int(newForeg),
                            ref.int(oidForeg) || 0,
                            new HWND(ref.int(newForeg))
                        );
                        oidForeg = newForeg;
                    }
                }
            await Sleep(awaitMs || 350);
        }
    })();
    return {
        /**结束监听 */
        quit: function () {
            quit = true;
        },
        /**设置每次延迟事件 */
        setAwaitMs(ms: number) {
            awaitMs = ms;
        },
    };
}

/**
 * 打开一个程序
 * @param AppPath 程序路径
 * @param Command 命令行
 * @param cwd 工作路径
 * @param hide 隐藏窗口
 * @param UAC 提升到管理员权限
 * @default
 * - Command ""
 * - cwd AppPath DirPath
 * - hide false
 * - UAC false
 * @returns
 */
export function openApp(AppPath: string, Command?: string | string[], cwd?: string, hide?: boolean, UAC?: boolean) {
    return native.openApp(
        ref.string(AppPath),
        ref.string(
            Array.isArray(Command) ? ref.formatArgv(Command) : Command
        ) || "",
        ref.string(cwd || path.parse(AppPath || "").dir || process.cwd()),
        ref.bool(hide || false),
        ref.bool(UAC || false)
    );
}

/**
 * 获取该名称 /正则匹配的进程列表
 * @param Name 
 * @returns 
 */
export function getProcessNameList(...Name: Array<string | RegExp>) {
    let resultList: { pid: number; name: string }[] = [];
    let ProcessList = getAllProcessListSnp2Sync();
    for (let index = 0; index < ProcessList.length; index++) {
        const Process = ProcessList[index];
        const { pid, name } = Process;
        for (let NextNameIndex = 0; NextNameIndex < Name.length; NextNameIndex++) {
            const NextName = Name[NextNameIndex];
            if (typeof NextName === "string") {
                if (Process.name == NextName) {
                    resultList.push({ pid, name });
                }
            }
            if (NextName instanceof RegExp && NextName.test(name)) {
                resultList.push({ pid, name });
            }
        }
    }
    return resultList;
}

/**
* 获取该名称 /正则匹配的进程列表 带执行文件路径 慢20ms
* @param Name 
* @returns 
*/
export function getDetailsProcessNameList(...Name: Array<string | RegExp>) {
    let resultList: { pid: number; name: string, path: string }[] = [];
    let ProcessList = getAllProcessList2Sync(true);
    for (let index = 0; index < ProcessList.length; index++) {
        const Process = ProcessList[index];
        const { pid, name, path } = Process;
        for (let NextNameIndex = 0; NextNameIndex < Name.length; NextNameIndex++) {
            const NextName = Name[NextNameIndex];
            if (typeof NextName === "string") {
                if (Process.name == NextName) {
                    resultList.push({ pid, name, path });
                }
            }
            if (NextName instanceof RegExp && NextName.test(name)) {
                resultList.push({ pid, name, path });
            }
        }
    }
    return resultList;
}

/**
 * 结束该名称的进程
 * @param Name
 */
export function killProcessName(...Name: Array<string | RegExp>) {
    let resultList: { pid: number; kill: boolean; name: string }[] = [];
    let ProcessList = getProcessList();
    for (let index = 0; index < ProcessList.length; index++) {
        const Process = ProcessList[index];
        const { pid, name } = Process;
        for (
            let NextNameIndex = 0;
            NextNameIndex < Name.length;
            NextNameIndex++
        ) {
            const NextName = Name[NextNameIndex];
            if (typeof NextName === "string") {
                if (Process.name == NextName) {
                    killProcess(Process.pid);
                    resultList.push({
                        pid,
                        name,
                        get kill() {
                            return hasProcess(pid);
                        },
                    });
                }
            }
            if (NextName instanceof RegExp && NextName.test(name)) {
                killProcess(Process.pid);
                resultList.push({
                    pid,
                    name,
                    get kill() {
                        return hasProcess(pid);
                    },
                });
            }
        }
    }
    return resultList;
}

/**
 * 获取当前的焦点窗口
 * @returns 一个可以操作的伪数字类
 */
export function getForegroundWindow() {
    let Handle = native.getForegroundWindow();
    return Handle ? new HWND(Handle) : null;
}

/**
 * 获取句柄的主窗口
 * @returns 一个可以操作的伪数字类
 */
export function getMainWindow(Handle: number | HWND) {
    let Handles = native.getMainWindow(ref.int(Handle));
    return Handles ? new HWND(Handles) : null;
}

/**
 * 获取鼠标所在的窗口
 * @returns 一个可以操作的伪数字类
 */
export function getPointWindow() {
    let Handle = native.getPointWindow();
    return Handle ? new HWND(Handle) : null;
}

/**
 * 获取鼠标所在的窗口的主窗口
 * @returns 一个可以操作的伪数字类
 */
export function getPointWindowMain() {
    let Handle = native.getPointWindowMain();
    return Handle ? new HWND(Handle) : null;
}

/**
 * 获取进程的句柄
 * @param ProcessID
 * @returns
 */
export function getProcessHandle(ProcessID: number) {
    let Handles = native.getProcessHandle(ref.int(ProcessID));
    return Handles ? new HWND(Handles) : null;
}

/**
 * 阻止键盘和鼠标输入事件到达应用程序。
 */
export function SetBlockInput(Block: boolean) {
    return native.SetBlockInput(ref.bool(Block));
}

/**
 * 设置该窗口图标在状态栏可见性 (注意：XP 下激活窗口了会失效(但是有没有一种可能 xp运行不了node和electron))
 * @param Handle 句柄
 * @param Visible 可见性
 * @returns
 */
export function SetWindowInTaskbarVisible(Handle: number | HWND, Visible: boolean) {
    return native.SetWindowInTaskbarVisible(
        ref.int(Handle),
        ref.bool(Visible)
    );
}

/**
 * 获取句柄对应的进程id
 * @param Handle 句柄
 * @returns
 */
export function getHandleProcessID(Handle: number | HWND) {
    return native.getHandleProcessID(ref.int(Handle));
}

/** 获取窗口位置大小
 *  - 高|宽|坐标大于一万以上都是不可见的
 * **/
export function getWindowRect(Handle: number | HWND) {
    return native.getWindowRect(ref.int(Handle));
}

/**
 * 判断窗口是否禁用响应事件(鼠标键盘点击)
 * @param Handle
 * @returns
 */
export function isEnabled(Handle: number | HWND) {
    return native.isEnabled(ref.int(Handle));
}

/**
 * 判断句柄是否有效
 * @param Handle
 * @returns
 */
export function isHandle(Handle: number | HWND) {
    return native.isHandle(ref.int(Handle));
}

/**
 * 判断此句柄是否是正在活动中的窗口
 * @param Handle
 * @returns
 */
export function isHandleWindowVisible(Handle: number | HWND) {
    return native.isHandleWindowVisible(ref.int(Handle));
}

/**
 * 关闭此句柄对应的窗口
 * @param Handle
 * @returns
 */
export function lookHandleCloseWindow(Handle: number | HWND) {
    return native.lookHandleCloseWindow(ref.int(Handle));
}

/**
 * 获取此句柄的标题
 * @param Handle
 * @returns
 */
export function lookHandleGetTitle(Handle: number | HWND) {
    return native.lookHandleGetTitle(ref.int(Handle));
}

/**
 * 设置此句柄的标题
 * @param Handle
 * @param title
 * @returns
 */
export function lookHandleSetTitle(Handle: number | HWND, title: string) {
    return native.lookHandleSetTitle(
        ref.int(Handle),
        ref.string(title)
    );
}

/**
 * 通过句柄设置窗口显示状态  https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 * @param Handle 窗口句柄
 * @param nCmdShow 操作内容
 *  - "SW_HIDE" ： 0 隐藏窗口并激活另一个窗口。
 *  - "SW_SHOWNORMAL" ： 1 激活并显示一个窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志
 *  - "SW_SHOWMINIMIZED" ：2 激活窗口并将其显示为最小化窗口
 *  - "SW_SHOWMAXIMIZED" | "SW_MAXIMIZE" ： 3 激活窗口并将其显示为最大化窗口
 *  - "SW_SHOWNOACTIVATE" ： 4 以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL|除了窗口没有被激活
 *  - "SW_SHOW" ：5  激活窗口并以其当前大小和位置显示它
 *  - "SW_MINIMIZE" ：6 最小化指定窗口并激活 Z 顺序中的下一个顶级窗口
 *  - "SW_SHOWMINNOACTIVE" ： 7 将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED|除了窗口没有被激活
 *  - "SW_SHOWNA" ： 8 以当前大小和位置显示窗口。这个值类似于SW_SHOW|除了窗口没有被激活
 *  - "SW_RESTORE" ： 9 激活并显示窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志
 *  - "SW_SHOWDEFAULT" ： 10 据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。
 *  - "SW_FORCEMINIMIZE" ： 11 最小化一个窗口|即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志
 * @returns
 */
export const setShowWindow = lookHandleShowWindow;

/**
 * 关闭此句柄对应的窗口
 * @param Handle
 * @returns
 */
export const setCloseWindow = lookHandleCloseWindow;

/**
 * 获取此句柄的标题
 * @param Handle
 * @returns
 */
export const getWindowTitle = lookHandleGetTitle;

/**
 * 设置此句柄的标题
 * @param Handle
 * @param title
 * @returns
 */
export const setWindowTitle = lookHandleSetTitle;

/**
 * 通过句柄设置窗口显示状态  https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 * @param Handle 窗口句柄
 * @param nCmdShow 操作内容
 *  - "SW_HIDE" ： 0 隐藏窗口并激活另一个窗口。
 *  - "SW_SHOWNORMAL" ： 1 激活并显示一个窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志
 *  - "SW_SHOWMINIMIZED" ：2 激活窗口并将其显示为最小化窗口
 *  - "SW_SHOWMAXIMIZED" | "SW_MAXIMIZE" ： 3 激活窗口并将其显示为最大化窗口
 *  - "SW_SHOWNOACTIVATE" ： 4 以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL|除了窗口没有被激活
 *  - "SW_SHOW" ：5  激活窗口并以其当前大小和位置显示它
 *  - "SW_MINIMIZE" ：6 最小化指定窗口并激活 Z 顺序中的下一个顶级窗口
 *  - "SW_SHOWMINNOACTIVE" ： 7 将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED|除了窗口没有被激活
 *  - "SW_SHOWNA" ： 8 以当前大小和位置显示窗口。这个值类似于SW_SHOW|除了窗口没有被激活
 *  - "SW_RESTORE" ： 9 激活并显示窗口。如果窗口被最小化或最大化|系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志
 *  - "SW_SHOWDEFAULT" ： 10 据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。
 *  - "SW_FORCEMINIMIZE" ： 11 最小化一个窗口|即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志
 * @returns
 */
export function lookHandleShowWindow(Handle: number | HWND, SetShowType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11) {
    return native.lookHandleShowWindow(
        ref.int(Handle),
        ref.int(
            typeof SetShowType == "number" ? ref.int(SetShowType) : 5
        ) as 0
    );
}

/**
 * 设置窗口不透明度 0-255
 * @param Handle
 * @param Transparent 0-255
 * @returns
 */
export function setHandleTransparent(Handle: number | HWND, Transparent: number) {
    return native.setHandleTransparent(
        ref.int(Handle),
        ref.int(Transparent || 255)
    );
}

/**
 * 设置窗口是否支持响应事件(鼠标键盘点击)
 * @param Handle
 * @param Enabled
 * @returns
 */
export function setWindowEnabled(Handle: number | HWND, Enabled: boolean) {
    return native.setWindowEnabled(
        ref.int(Handle),
        ref.bool(Enabled)
    );
}

/**
 * 设置窗口焦点
 * @param Handle
 * @returns
 */
export function setWindowFocus(Handle: number | HWND) {
    return native.setWindowFocus(ref.int(Handle));
}

/**
 * 设置窗口顶设
 * @param Handle
 * @returns
 */
export function setWindowTop(Handle: number | HWND) {
    return native.setWindowTop(ref.int(Handle));
}

/**
 * 刷新该窗口
 * @param Handle
 * @returns
 */
export function updateWindow(Handle: number | HWND) {
    return native.updateWindow(ref.int(Handle));
}

/**
 * 窗口抖动
 * @param Handle
 * @returns
 */
export function windowJitter(Handle: number | HWND) {
    return native.windowJitter(ref.int(Handle));
}

/**
 * 判断窗口是否被顶设
 * @param Handle
 * @returns
 */
export function hasWindowTop(Handle: number | HWND) {
    return native.hasWindowTop(ref.int(Handle));
}

/**
 * 关闭该句柄窗口(可关闭托盘)(发送关闭消息)
 */
export function closedHandle(Handle: number | HWND) {
    return native.closedHandle(ref.int(Handle));
}

/**
 * 获取所有HidUsb设备（仅限HID设备)
 * @returns HidUsb设备数组
 */
export function getHidUsbList() {
    return native.getHidUsbList();
}

/**
 * 获取鼠标所在位置
 * @returns 鼠标所在位置
 */
export function getMetrics() {
    return native.getMetrics();
}

/**
 * 获取鼠标之前64个位置
 * @returns 之前64个位置
 */
export function getMouseMovePoints(): Array<HMC.MouseMovePoints> {
    return JSON.parse(native.getMouseMovePoints());
}

/**
 * 获取屏幕大小
 */
export function getDeviceCaps() {
    return native.getDeviceCaps();
}

/**禁用/启用系统键盘鼠标钩子
  * @param HOOK 是否启用系统键盘鼠标钩子
  !注意该功能很危险 主要用于自动化防止误操作 用户锁屏  禁止用于非法用途
  *手动解锁方式 Ctrl+Alt+Del   => esc
  !请注意 你需要确保你的解锁代码  运行没有任何错误或者有定时解锁
  否则有可能导致用户无法正常使用
  **/
export function SetSystemHOOK(HOOK: boolean) {
    return native.SetSystemHOOK(ref.bool(HOOK));
}

/**
 * 获取四大按钮(`alt`  `ctrl`  `win`  `shift` )是否按下
 * @returns
 */
export function getBasicKeys() {
    return native.getBasicKeys();
}

/**
 * 获取剪贴板文本
 * @returns 剪贴板文本
 */
export function getClipboardText() {
    return native.getClipboardText();
}

/**
 * 设置剪贴板文本
 * @param text 文本
 * @returns
 */
export function setClipboardText(text: string) {
    return native.setClipboardText(ref.string(text));
}

/**
 * 清空剪贴版
 * @returns 处理结果
 */
export function clearClipboard() {
    return native.clearClipboard();
}

/** 获取详细进程列表（慢20ms）**/
export function getDetailsProcessList() {
    return getAllProcessList2Sync(true);
}

/** 获取进程列表**/
export function getProcessList() {
    return getAllProcessList2Sync();
}

/**获取活动窗口的进程id */
export function getForegroundWindowProcessID() {
    return native.getForegroundWindowProcessID();
}

/**获取鼠标所在窗口的进程名 */
export function getPointWindowName() {
    return native.getPointWindowName();
}

/**获取鼠标所在窗口的进程id */
export function getPointWindowProcessId() {
    return native.getPointWindowProcessId();
}

/**
 * 获取进程名
 * @param ProcessID 进程id
 * @returns
 */
export function getProcessName(ProcessID: number) {
    return getProcessName2Sync(ref.int(ProcessID));
}

/**
 * 获取进程可执行文件位置
 * @param ProcessName 进程名
 * @returns 进程id
 */
export function getProcessidFilePath(ProcessID: number) {
    return getProcessFilePath2Sync(ref.int(ProcessID));
}

/**
 * 获取快捷方式的信息
 * @param LnkPath 快捷方式路径
 * @returns
 */
export function getShortcutLink(LnkPath: string) {
    return native.getShortcutLink(ref.string(LnkPath));
}

/**系统空闲时间 */
export function getSystemIdleTime() {
    return native.getSystemIdleTime();
}

/**
 * 设置系统右键菜单 例如win自带的系统菜单就很丑还不能禁用  使用这个禁用
 * @param Handle 句柄
 * @param boolean 是否禁用
 * @returns
 */
export function getSystemMenu(Handle: number | HWND, boolean: boolean) {
    return native.getSystemMenu(ref.int(Handle), ref.bool(boolean));
}

/**获取托盘图标列表 */
export function getTrayList(): HMC.TRAY_ICON[] {
    const result = native.getTrayList();

    if (typeof result == "string") {
        return JSON.parse(result);
    }

    return result;
}

/**判断该按键是否被按下  https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getkeystate **/
export function hasKeyActivate(KeysEvent: number) {
    return native.hasKeyActivate(ref.int(KeysEvent));
}

/**
 * 判断进程id 是否存在
 * @param ProcessID 进程id
 * @returns
 */
export function hasProcess(...ProcessMatch: Array<number | string | Array<number | string>>): boolean {
    // 只有一个参数 而且是数字 直接打开句柄 不枚举
    if (ProcessMatch.length == 1) {
        return native.existProcessSync(ref.int(ProcessMatch[0])) || false;
    }
    let _ProcessMatch: Array<number | string> = [];
    let isString = false;
    // 多个参数 压入缓冲数组
    for (let index = 0; index < ProcessMatch.length; index++) {
        const ProcessID = ProcessMatch[index];
        if (Array.isArray(ProcessID)) {
            for (let index = 0; index < ProcessID.length; index++) {
                if (typeof ProcessID[index] == "string") isString = true;
                _ProcessMatch.push(ProcessID[index]);
            }
        }
        if (typeof ProcessID == "string") {
            isString = true;
            _ProcessMatch.push(ProcessID);
        }
        if (typeof ProcessID == "number") _ProcessMatch.push(ProcessID);
    }
    // 开始处理  如果全是数字 就不枚举进程列表 因为直接打开句柄更快
    let ProcessList = isString ? getProcessList() : [];
    for (let index = 0; index < _ProcessMatch.length; index++) {
        if (!isString) {
            if (native.existProcessSync(ref.int(_ProcessMatch[index]))) return true;
        }
        for (let index = 0; index < ProcessList.length; index++) {
            const elp = ProcessList[index];
            if (elp.name === _ProcessMatch[index] || elp.pid === _ProcessMatch[index]) return true;
        }
    }
    return false;
}

/**
 * 当前程序是否拥有管理员权限
 * @returns
 */
export function isAdmin() {
    return native.isAdmin();
}

/**
 * 判断进程id 是否存在
 * @param ProcessID 进程id
 * @returns
 */
export function isProcess(ProcessID: number) {
    return native.existProcessSync(ref.int(ProcessID)) || false;
}

/**判断当前系统是否是64位 */
export function isSystemX64() {
    return native.isSystemX64();
}

/**
 * 结束该进程
 * @param ProcessID 
 * @returns 
 */
export function killProcess(ProcessID: number): boolean;
export function killProcess(ProcessID: string | RegExp): {
    pid: number;
    kill: boolean;
    name: string;
}[];
export function killProcess(ProcessID: number | string | RegExp) {
    if (typeof ProcessID == "string" || typeof ProcessID == "object") {
        return killProcessName(ProcessID)
    }
    return native.killProcess(ref.int(ProcessID));
}

/**
 * 左键点击
 * @param ms 延迟
 * @returns 
 */
export function leftClick(ms?: number) {
    return native.leftClick(ms);
}

/**
 * 消息窗口(调用 win-api)
 * @param message 消息内容
 * @param title 标题
 * @param UINT_String 显示窗口类型 https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-messageboxa
 * @description 衍生api(已预设): `confirm`  `alert` `MessageError` `MessageStop`
 * @returns 
 */
export function messageBox(message: string, title: string, MB_UINT: HMC.MB_UINT) {
    return native.messageBox(ref.string(message), ref.string(title), ref.string(MB_UINT) as HMC.MB_UINT);
}

/**自定义鼠标事件 https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-mouse_event **/
export function mouse(mouse_event: HMC.mouse_event, ms?: number) {
    if (typeof mouse_event == "number") {
        mouse_event = ref.int(mouse_event) as 1;
    } else {
        mouse_event = ref.string(mouse_event) as 'MOUSEEVENTF_RIGHTDOWN';
    }
    return native.mouse.apply(undefined, ms ? [mouse_event] : [mouse_event, ms]);
}

/**
 * 在资源管理器中显示并选中该文件
 * @param Path 路径
 * @returns 
 */
export function openExternal(Path: string) {
    return native.openExternal(Path);
}

/**
 * 用默认应用打开该 （文件/文件夹）
 * @param Path 文件路径
 * @returns 
 */
export function openPath(Path: string) {
    return native.openPath(Path);
}

/**
 * 用默认浏览器打开这条url
 * @param URL url
 * @returns 
 */
export function openURL(URL: string) {
    return native.openURL(ref.string(URL));
}

/**
 * 电源控制
 */
export const powerControl = (() => {
    function _PowerControl(Set:
        /**关机 */
        1001 |
        /**重启 */
        1002 |
        /**注销 */
        1003 |
        /**锁定 */
        1005) {
        native.powerControl(Set)
    }
    /**关机 */
    _PowerControl[1001] = () => { native.powerControl(1001) }
    /**重启 */
    _PowerControl[1002] = () => { native.powerControl(1002) }
    /**注销 */
    _PowerControl[1003] = () => { native.powerControl(1003) }
    /**锁定 */
    _PowerControl[1005] = () => { native.powerControl(1005) }
    /**关机 */
    _PowerControl.shutDown = () => { native.powerControl(1001) }
    /**重启 */
    _PowerControl.restart = () => { native.powerControl(1002) }
    /**注销 */
    _PowerControl.cancellation = () => { native.powerControl(1003) }
    /**锁定 */
    _PowerControl.lock = () => { native.powerControl(1005) }

    return _PowerControl;
})();

/**
 * 右键点击
 * @param ms 延迟
 * @returns 
 */
export function rightClick(ms?: number) {
    return native.rightClick(ms);
}

/**
 * 设置鼠标位置
 * @param x 左边开始的像素数坐标
 * @param y 上方到下方的像素数坐标
 * @param Must 尝试必须到达此坐标 (每 MustTime /5 ms 检测一次坐标是否到达 如果未到达则重试)
 * @param MustTime 锁定键盘到达此坐标的有效时间 ms
 * @returns 
 */
export function setCursorPos(x: number, y: number): boolean;
export function setCursorPos(x: number, y: number, Must: true, MustTime?: number): Promise<boolean>
export function setCursorPos(x: number, y: number, Must?: boolean, MustTime = 500) {
    if (Must) {
        return new Promise(async function (resolve, _reject) {
            if (MustTime < 5) {
                return resolve(native.setCursorPos(ref.int(x), ref.int(y)));
            }

            native.setCursorPos(ref.int(x), ref.int(y));

            let cursor_LastInputTime = getLastInputTime();

            const must_len = MustTime > 6000 ? 20 : MustTime > 4000 ? 8 : MustTime > 3000 ? 6 : 4;

            for (let index = 0; index < must_len; index++) {
                await Sleep(ref.int(500));

                const the_LastInputTime = getLastInputTime();

                if (the_LastInputTime != cursor_LastInputTime) {
                    native.setCursorPos(ref.int(x), ref.int(y));
                    cursor_LastInputTime = the_LastInputTime;
                }

            }

            const the_LastInputTime = getLastInputTime();

            await Sleep(500);

            if (the_LastInputTime == cursor_LastInputTime) {
                return resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    return native.setCursorPos(ref.int(x), ref.int(y));
}

/**
 * 创建快捷方式
 * @param LnkPath 快捷方式位置
 * @param FilePath 关联的文件
 * @param work_dir 工作目录
 * @param desc 简介
 * @param args 启动命令
 * @param iShowCmd 显示方式
 * @param icon 使用的图标如dll,exe,icon
 * @param iconIndex 图标索引
 */
export function setShortcutLink(LnkPath: string, FilePath: string, work_dir: string, desc: string, args: string | string[], iShowCmd: number, icon: string, iconIndex: number): boolean;
export function setShortcutLink(LnkPath: string, FilePath: string, work_dir?: string, desc?: string, args?: string | string[], iShowCmd?: number): boolean;
export function setShortcutLink(LnkPath: string, FilePath: string): boolean;
export function setShortcutLink(LnkPath: string, Shortcut: HMC.SHORTCUT_LINK): boolean;
export function setShortcutLink(...args: unknown[]): boolean {
    if (args.length < 2) throw new Error("not LnkPath and FilePath arguments");

    if (typeof args[1] == "object") {
        const shortcutData = (args[1] || {}) as HMC.SHORTCUT_LINK;
        args[1] = shortcutData.path || "";
        args[2] = shortcutData.cwd || "";
        args[3] = shortcutData.desc || "";
        args[4] = shortcutData.args || "";
        args[5] = shortcutData.showCmd || 1;
        args[6] = shortcutData.icon || "";
        args[7] = shortcutData.iconIndex || 0;
    }

    // LnkPath
    args[0] = ref.string(args[0] || "");
    // FilePath
    args[1] = ref.string(args[1] || "");
    // work_dir
    args[2] = ref.string(args[2] || "");
    // desc
    args[3] = ref.string(args[3] || "");
    // args
    if (Array.isArray(args[4])) {
        args[4] = ref.formatArgv(args[4]);
    }
    args[4] = ref.string(args[4] || "");
    // iShowCmd
    if (args.length > 5) {
        args[5] = ref.int(args[5] || 0);
    }
    // icon
    if (args.length > 6) {
        args[6] = ref.string(args[6] || "");
    }
    // iconIndex
    if (args.length > 7) {
        args[7] = ref.int(args[7] || 0);
    }
    return native.setShortcutLink(...args as [string, string, string]);
}

/**
 * 创建文件软链接
 * @param LinkPath 创建的位置
 * @param sourcePath 原文件链接
 * @returns 
 */
export function createSymlink(LinkPath: string, sourcePath: string) {
    return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath))
}

/**
 * 创建文件夹软链接
 * @param LinkPath 创建的位置
 * @param sourcePath 原文件链接
 * @returns 
 */
export function createDirSymlink(LinkPath: string, sourcePath: string) {
    return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath))
}

/**
 * 创建文件硬链接
 * @param LinkPath 创建的位置
 * @param sourcePath 原文件链接
 * @returns 
 */
export function createHardLink(LinkPath: string, sourcePath: string) {
    return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath))
}

/**打开显示器 */
export function showMonitors(show?: boolean) {
    if (typeof show == "boolean") {
        return show ? native.showMonitors() : native.shutMonitors()
    }
    return native.showMonitors();
}

/**关闭显示器 */
export function shutMonitors(show?: boolean) {
    if (typeof show == "boolean") {
        return show ? native.showMonitors() : native.shutMonitors()
    }
    return native.shutMonitors();
}

/**
 * `Sync` 同步阻塞(进程)
 * @param awaitTime
 * @returns
 */
export function sleep(awaitTime: number) {
    return native.sleep(ref.int(awaitTime));
}

/**
 * `async` 异步阻塞(进程)
 * @param awaitTime
 * @returns
 */
export async function Sleep(awaitTime: number, Sync?: boolean) {
    if (Sync) {
        return sleep(ref.int(awaitTime));
    }
    return new Promise((resolve) =>
        setTimeout(resolve, ref.int(awaitTime))
    );
}

/**
 * 系统启动到现在的时间(毫秒)
 * @returns
 */
export function systemStartTime() {
    return native.systemStartTime();
}

/**
* 获取所有窗口的信息
**/
export function getAllWindows(isWindows: boolean, initialize: boolean) {
    class WINDOWS_INFO {
        handle: number;
        constructor(handle: number) {
            this.handle = handle;
        }
        _rect?: HMC.Rect
        get rect() {
            if (!this._rect) this._rect = native.getWindowRect(this.handle);
            return this._rect;
        }
        _className?: string
        get className() {
            if (typeof this._className == "undefined") this._className = native.getWindowClassName(this.handle);
            return this._className;
        }
        _style?: number
        get style() {
            if (typeof this._style == "undefined") this._style = native.getWindowStyle(this.handle);
            return this._style;
        }
        _title?: string | null;
        get title() {
            if (typeof this._title == "undefined") this._title = native.lookHandleGetTitle(this.handle);
            return this._title;
        }
    }

    let AllWindowsHandle = native.getAllWindowsHandle(isWindows === false ? false : true);
    let AllWindows: HMC.GET_ALL_WINDOWS_INFO[] = [];
    for (let index = 0; index < AllWindowsHandle.length; index++) {
        const handle = AllWindowsHandle[index];
        const WINDOWS_INFO_ITEM: HMC.GET_ALL_WINDOWS_INFO = (new WINDOWS_INFO(handle)) as HMC.GET_ALL_WINDOWS_INFO;
        if (initialize) {
            AllWindows.push({
                handle: WINDOWS_INFO_ITEM.handle,
                className: WINDOWS_INFO_ITEM.className,
                rect: WINDOWS_INFO_ITEM.rect,
                style: WINDOWS_INFO_ITEM.style,
                title: WINDOWS_INFO_ITEM.title
            });
        } else {
            AllWindows.push(WINDOWS_INFO_ITEM);
        }

    }
    return AllWindows;
}

/**
 * 检索指定窗口所属的类的名称
 * @param Handle 句柄
 * @returns 
 */
export function getWindowClassName(Handle: number | HWND) {
    return native.getWindowClassName(ref.int(Handle));
}

/**
 * 获取窗口类关联代码
 * @param Handle 句柄
 * @returns 
 */
export function getWindowStyle(Handle: number | HWND) {
    return native.getWindowStyle(ref.int(Handle));
}

/**
 * 获取WebView2Info 的信息
 * @param Has 
 */
function GetWebView2Info(Has: true): boolean;
function GetWebView2Info(Has?: false): HMC.WebView2Info
function GetWebView2Info(Has?: boolean): boolean | HMC.WebView2Info {
    const INFO: HMC.WebView2Info = {
        version: "",
        name: "",
        location: "",
    };
    const { HKEY_LOCAL_MACHINE, HKEY_CURRENT_USER } = Hkey;
    let WebView2IDKEY = "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";

    //  https://learn.microsoft.com/zh-cn/microsoft-edge/webview2/concepts/distribution#detect-if-a-suitable-webview2-runtime-is-already-installed

    // 64bit Windows
    let Path_64bit_LOCAL: ForEachKey = [HKEY_LOCAL_MACHINE, "SOFTWARE\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients"];
    let Path_64bit_USER: ForEachKey = [HKEY_CURRENT_USER, "SOFTWARE\\Microsoft\\EdgeUpdate\\Clients"];

    // 32bit Windows
    let Path_32bit_LOCAL: ForEachKey = [HKEY_LOCAL_MACHINE, "SOFTWARE\\Microsoft\\EdgeUpdate\\Clients"];
    let Path_32bit_USER: ForEachKey = [HKEY_CURRENT_USER, "Software\\Microsoft\\EdgeUpdate\\Clients"];

    type ForEachKey = [HMC.HKEY, string];
    let ForEachKey: Array<ForEachKey> = [Path_64bit_LOCAL, Path_64bit_USER, Path_32bit_LOCAL, Path_32bit_USER];

    for (let index = 0; index < ForEachKey.length; index++) {
        const KEY_PATH = ForEachKey[index];
        if (registr.hasRegistrKey(...KEY_PATH, WebView2IDKEY)) {
            if (Has) return true;
        }
        const [Hkey, Path] = KEY_PATH;
        INFO.location = registr.getStringRegKey(Hkey, Path.concat("\\", WebView2IDKEY), "location");
        INFO.name = registr.getStringRegKey(Hkey, Path.concat("\\", WebView2IDKEY), "name");
        INFO.version = registr.getStringRegKey(Hkey, Path.concat("\\", WebView2IDKEY), "pv");

        break;
    }

    return INFO;
}

/**
 * 获取WebView2的信息
 * @returns 
 */
export function getWebView2Info() {
    return GetWebView2Info();
}

/**
 * 下载并安装WebView2 
 */
export async function WebView2OnlineInstall() {
    const webView2URL = "https://go.microsoft.com/fwlink/p/?LinkId=2124703";
    const webView2Path = path.join("MicrosoftEdgeWebview2Setup.exe");
    const webView2InstallCommand = ["/silent", "/install"];
    return new Promise<void>((resolve, reject) => {
        const buffList: Buffer[] = [];
        https.get(webView2URL, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Install  WebView2 failure statusCode: ${res.statusCode || 404}`));
                return;
            }

            res.on("data", (data) => {
                buffList.push(data);
            });

            res.once("error", (err) => {
                reject(err);
            });

            res.on('end', () => {
                const buff = ref.concatBuff(buffList);
                buffList.length = 0;
                fs.promises.writeFile(webView2Path, buff).then(() => {
                    const spawn = child_process.spawn(webView2Path, webView2InstallCommand, { "windowsHide": true, });
                    spawn.on("error", function () {
                        reject(new Error(`Install  WebView2 failure Installation process creation failed`));
                        spawn.kill();
                    });
                    spawn.once("exit", function () {
                        resolve(undefined);
                    });
                }).catch(err => {
                    reject(new Error(`Install  WebView2 failure Update file cannot be written`));
                });
            });

        });
    });
}

/**
 * 当前系统是否安装了 WebView2
 * @returns 
 */
export function hasWebView2() {
    return GetWebView2Info(true);
}
/**
 * 判断TCP(服务)端口号正在使用/系统占用
 * @param port TCP端口
 * @returns 
 */
export function hasPortTCP(port: number): Promise<boolean>;
export function hasPortTCP(port: number, callBack: (hasPort: boolean) => unknown): void;
/**
 * 判断TCP(服务)端口号正在使用/系统占用
 * @param port TCP端口
 * @returns 
 */
export function hasPortTCP(port: number, callBack?: (hasPort: boolean) => unknown): unknown {
    let resolve: ((hasPort: boolean) => unknown) | null = null;
    let prom;
    let sock = net.createServer(function () { });
    sock.listen(port);
    if (typeof callBack == 'function') {
        resolve = callBack;
    } else {
        prom = new Promise((Prom_resolve) => {
            resolve = Prom_resolve;
        });
    }
    sock.on("error", function (err) {
        resolve && resolve(true);
        sock.close();
    });
    sock.on("listening", function () {
        resolve && resolve(false);
        sock.close();
    });
    if (typeof callBack !== 'function') {
        return prom;
    }
}
export const _KeyboardcodeEmenList = KeyboardcodeEmenList;
export const _KeyboardcodeComparisonTable = KeyboardcodeComparisonTable;

/**
 * 判断UDP端口号正在使用/系统占用
 * @param port TCP端口
 * @returns 
 */
export function hasPortUDP(port: number): Promise<boolean>;
export function hasPortUDP(port: number, callBack: (hasPort: boolean) => unknown): void;
/**
 * 判断UDP端口号正在使用/系统占用
 * @param port TCP端口
 * @returns 
 */
export function hasPortUDP(port: number, callBack?: (hasPort: boolean) => unknown): unknown {
    let resolve: ((hasPort: boolean) => unknown) | null = null;
    let prom;
    let udp4 = dgram.createSocket('udp4');
    udp4.bind(port);
    if (typeof callBack == 'function') {
        resolve = callBack;
    } else {
        prom = new Promise((Prom_resolve) => {
            resolve = Prom_resolve;
        });
    }
    udp4.on("error", function (err) {
        resolve && resolve(true);
        udp4.close();
    });
    udp4.on("listening", function () {
        resolve && resolve(false);
        udp4.close();
    });
    if (typeof callBack !== 'function') {
        return prom;
    }
}

/**
 * 格式化 驱动器路径 ('\Device\HarddiskVolume2' => "D:\")
 */
export function formatVolumePath(VolumePath: string) {
    if (VolumePath && VolumePath?.match(/^\\/)) {
        for (let Volume of hmc.getVolumeList()) {
            if (VolumePath.indexOf(Volume.device) == 0) {
                return VolumePath.replace(Volume.device, Volume.path).replace(/[\\/]+/, "\\");
            }
        }
    } else return VolumePath;
}

/**
 * 获取当前文件系统的驱动器名称及路径
 * @returns 
 */
export function getVolumeList() {
    return native.getVolumeList()
}

/**
 * 枚举进程id 的加载的模块路径
 * @param ProcessID 
 * @returns 
 */
export function getModulePathList(ProcessID: number) {
    return native.getModulePathList(ref.int(ProcessID));
}

/**
 * 枚举进程id的句柄
 * @param ProcessID 被枚举的进程id
 * @returns 
 */
export function enumProcessHandle(ProcessID: number): Promise<HMC.ProcessHandle[]>;

/**
 * 枚举进程id的句柄
 * @param ProcessID 被枚举的进程id
 * @param CallBack 枚举时候的回调
 * @returns 
 */
export function enumProcessHandle(ProcessID: number, CallBack: (PHandle: HMC.ProcessHandle) => void): void

/**
 * 枚举进程id的句柄
 * @param ProcessID 被枚举的进程id
 * @param CallBack 枚举时候的回调
 * @returns 
 */
export function enumProcessHandle(ProcessID: number, CallBack?: (PHandle: HMC.ProcessHandle) => void) {
    let enumID = native.enumProcessHandle(ref.int(ProcessID));
    let next = true;
    let enumProcessHandleList: HMC.ProcessHandle[] = [];
    if (typeof enumID != "number") throw new Error("No enumerated id to query unknown error");
    if (typeof CallBack == "function") {
        ; (async () => {
            while (next) {
                await Sleep(50);
                let data = native.enumProcessHandlePolling(enumID);
                if (data) {
                    for (let index = 0; index < data.length; index++) {
                        const enumProcessHandle = data[index];
                        if (!enumProcessHandle) continue;
                        if (enumProcessHandle.type == 'hmc::endl::') {
                            return;
                        }
                        CallBack(enumProcessHandle);
                    }
                }
            }
        })();
        return;
    }
    return new Promise(async (resolve, reject) => {
        while (next) {
            await Sleep(50);
            let data = native.enumProcessHandlePolling(enumID);
            if (data) {
                for (let index = 0; index < data.length; index++) {
                    const enumProcessHandle = data[index];
                    if (!enumProcessHandle) continue;
                    if (enumProcessHandle.type == 'hmc::endl::') {
                        return resolve(enumProcessHandleList);
                    }
                    enumProcessHandleList.push(enumProcessHandle);
                }
            }
        }
        resolve(enumProcessHandleList);
    });

}
/**
* 枚举进程的线程id
* @param ProcessID 进程id
* @param returnDetail 是否返回 THREADENTRY32 为`false`或者为空则返回线程id
*/
export function getProcessThreadList(ProcessID: number, returnDetail?: false): number[];
/**
 * 
 * @param ProcessID 进程id
 * @param returnDetail 为`true` 则返回THREADENTRY32 
 */
export function getProcessThreadList(ProcessID: number, returnDetail: true): HMC.THREADENTRY32[];
/**
 * 枚举进程的线程id
 * @param ProcessID 进程id
 */
export function getProcessThreadList(ProcessID: number): number[];

/**
 * 枚举子线程id
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessThreadList(ProcessID: unknown, returnDetail?: unknown): unknown {
    const _returnDetail = returnDetail ? true : false;
    if (_returnDetail) return native.getProcessThreadList(ref.int(ProcessID), true) || [];
    return native.getProcessThreadList(ref.int(ProcessID),) || [];
}

/**
 * 获取所有该进程下的 子进程id
 * @param ProcessID 进程id
 * @returns 
 */
export function getSubProcessID(ProcessID: number) {
    return native.getSubProcessID(ref.int(ProcessID)) || [];
}

/**
 * 获取进程id的主进程
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessParentProcessID(ProcessID: number, is_SessionCache: boolean = true): number | null {
    return getProcessParentProcessMatch2Sync(ProcessID, is_SessionCache)?.th32ParentProcessID || null;
}

/**
 * 枚举所有进程id的句柄
 * @param ProcessID 被枚举的进程id
 * @param CallBack 枚举时候的回调
 * @returns 
 */
export function enumAllProcessHandle(CallBack?: (PHandle: HMC.PROCESSENTRY) => void) {
    let enumID = native.enumAllProcess();
    let next = true;
    let PROCESSENTRYLIST: HMC.PROCESSENTRY[] = [];
    if (typeof enumID != "number") throw new Error("No enumerated id to query unknown error");
    if (typeof CallBack == "function") {
        ; (async () => {
            while (next) {
                await Sleep(15);
                let data = native.enumAllProcessPolling(enumID);
                if (data) {
                    for (let index = 0; index < data.length; index++) {
                        const PROCESSENTRY = data[index];
                        if (!PROCESSENTRY) continue;
                        if (PROCESSENTRY.szExeFile == 'HMC::endl::') {
                            return;
                        }
                        CallBack(PROCESSENTRY);
                    }
                }
            }
        })();
        return;
    }
    return new Promise(async (resolve, reject) => {
        while (next) {
            await Sleep(50);
            let data = native.enumAllProcessPolling(enumID);
            if (data) {
                for (let index = 0; index < data.length; index++) {
                    const PROCESSENTRY = data[index];
                    if (!PROCESSENTRY) continue;
                    if (PROCESSENTRY.szExeFile == 'HMC::endl::') {
                        return resolve(PROCESSENTRYLIST);
                    }
                    PROCESSENTRYLIST.push(PROCESSENTRY);
                }
            }
        }
        resolve(PROCESSENTRYLIST);
    });

}


/**
 * 获取鼠标所在坐标
 * @returns 
 */
export function getCursorPos(): null | { x: number, y: number } {
    const data = native.getCursorPos();
    if (data.includes("null")) return null;
    return JSON.parse(data);
}


// hmc.node 的版本号
export const version = native.version;

// hmc的用途
export const desc = native.desc;

// 当前hmc.node 的适用平台
export const platform = native.platform;


//  所有窗口操作方法的归类合集 (拥有统一化名称) 
export const Window = {
    isInMonitor: isInMonitorWindow,
    isMouseMonitor: isMouseMonitorWindow,
    HWND: HWND,
    setMode: setWindowMode,
    getAllWindows: getAllWindows,
    getAllHandle: getAllWindowsHandle,
    watchPoint: WatchWindowPoint,
    watchtFocus: WatchWindowForeground,
    getFocus: getForegroundWindow,
    getMain: getMainWindow,
    getPoint: getPointWindow,
    getProcessHandle: getProcessHandle,
    getPointMain: getPointWindowMain,
    setTaskbarVisible: SetWindowInTaskbarVisible,
    getProcessID: getHandleProcessID,
    getRect: getWindowRect,
    isEnabled: isEnabled,
    isHandle: isHandle,
    hasHandle: isHandle,
    isVisible: isHandleWindowVisible,
    close: lookHandleCloseWindow,
    getTitle: lookHandleGetTitle,
    setTitle: lookHandleSetTitle,
    setShowWindow: lookHandleShowWindow,
    setTransparent: setHandleTransparent,
    setEnabled: setWindowEnabled,
    setFocus: setWindowFocus,
    setTop: setWindowTop,
    update: updateWindow,
    jitter: windowJitter,
    hasTop: hasWindowTop,
    closed: closedHandle,
    getFocusProcessID: getForegroundWindowProcessID,
    getPointName: getPointWindowName,
    getPointProcessId: getPointWindowProcessId,
    enumChild: enumChildWindows,
    console: {
        hide: hideConsole,
        show: showConsole,
        get: getConsoleHandle,
        blockInput: SetBlockInput,
    },
    getStyle: getWindowStyle,
    getClassName: getWindowClassName
}

//所有监听函数的合集 (拥有统一化名称)  
export const Watch = {
    clipboard: watchClipboard,
    usb: watchUSB,
    windowFocus: WatchWindowForeground,
    windowPoint: WatchWindowPoint,
    process: processWatchdog
}

// 剪贴板工具集  (拥有统一化名称)
export const Clipboard = {
    clear: clearClipboard,
    readText: getClipboardText,
    readFilePaths: getClipboardFilePaths,
    writeText: setClipboardText,
    writeFilePaths: setClipboardFilePaths,
    sequence: getClipboardSequenceNumber,
    watch: watchClipboard,
}


class MousePoint {
    /**从右到左的像素数 */
    x: number;
    /**从上到下的像素数 */
    y: number;
    /**是否被按下 */
    isDown: boolean;
    // 当前鼠标按键的事件
    mouseKeyCode: HMC.MouseKey;
    // 当前鼠标按键的事件 名称
    event: HMC.MouseKeyName;
    private _MouseNextSession: null | HMC.MouseEventDataOK = null;

    constructor(str: `${number}|${number}|${HMC.MouseKey}` | HMC.MouseEventDataAll) {
        if (typeof str == "string") {

            const data = str.split("|");
            this.x = Number(data[0]);
            this.y = Number(data[1]);
            this.mouseKeyCode = Number(data[2]) as HMC.MouseKey;
            this.event = HMC.MouseKeyName.UNKNOWN;

            this.isDown = ((key = this.mouseKeyCode) => {

                switch (key) {
                    case HMC.MouseKey.WM_LBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_LBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_RBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_RBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_MBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_MBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_LBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_LBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_RBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_RBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_MBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_MBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_MOUSEWHEEL:
                        this.event = HMC.MouseKeyName.WM_MOUSEWHEEL;
                        break;

                    case HMC.MouseKey.WM_MOUSEMOVE:
                        this.event = HMC.MouseKeyName.WM_MOUSEMOVE;
                        break;
                }

                switch (key) {
                    case HMC.MouseKey.WM_LBUTTONDOWN:
                    case HMC.MouseKey.WM_RBUTTONDOWN:
                    case HMC.MouseKey.WM_MBUTTONDOWN:
                        return true;
                }

                return false;
            })();
        } else {
            if (str.id)
                this._MouseNextSession = str;

            if (!str.id) {
                this.x = 0;
                this.y = 0;
                this.mouseKeyCode = HMC.MouseKey.WM_MOUSEMOVE
                this.isDown = false;
                this.event = HMC.MouseKeyName.UNKNOWN;
            } else {

                this.x = str.button == 512 ? str.x : 0;
                this.y = str.button == 512 ? str.y : 0;

                this.mouseKeyCode = str.button;

                switch (str.button) {
                    case HMC.MouseKey.WM_LBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_LBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_RBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_RBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_MBUTTONDOWN:
                        this.event = HMC.MouseKeyName.WM_MBUTTONDOWN;
                        break;
                    case HMC.MouseKey.WM_LBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_LBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_RBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_RBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_MBUTTONUP:
                        this.event = HMC.MouseKeyName.WM_MBUTTONUP;
                        break;
                    case HMC.MouseKey.WM_MOUSEWHEEL:
                        this.event = HMC.MouseKeyName.WM_MOUSEWHEEL;
                        break;

                    case HMC.MouseKey.WM_MOUSEMOVE:
                        this.event = HMC.MouseKeyName.WM_MOUSEMOVE;
                        break;
                }

                this.isDown = str.id && str.button != 512 && str.buttonDown || false;
            }

        }

    }

    /**
     * 鼠标左键按下
     */
    get isLeft() {
        return Auto.hasKeyActivate(0x01);
    }
    /**
     * 鼠标右键被按下
     */
    get isRight() {
        return Auto.hasKeyActivate(0x02);
    }
    /**
     * 鼠标中键被按下
     */
    get isMiddle() {
        return Auto.hasKeyActivate(0x04);
    }

    // /**
    //  * 计算出鼠标移动的角度
    //  * @returns 
    //  */
    // direction () : HMC.direction {
    //     let emit_name: HMC.direction = "middle";
    //     const {x, y} = this._MouseNextSession?.button ==512?this._MouseNextSession:{x:0,y:0};

    //     let [x2, y2] = [0, 0];

    //     // 在之前5个记录中查找出最后一次的坐标
    //     for (const iterator of mouseHook._history_list.slice(-5,-1)) {
    //         if(iterator.button == 512){
    //             x2 = iterator.x;
    //             y2 = iterator.y;
    //         }
    //     }

    //     if(x2==x&&y==y2)return "middle";

    //     if(x2+y2 == 0||x+y == 0)return "middle";

    //     if(!mouseHook._screen_Information)mouseHook._screen_Information = getDeviceCaps();

    //     // 计算 x, y 方向上的差值
    //     const diffX = x2 - x;
    //     const diffY = y2 - y;

    //     let direction:HMC.direction|"" = '' ;
    //     // 可忽略偏移量 宽
    //     const diffX_offset = (mouseHook._screen_Information.width /100 * mouseHook._direction_percentage) ;
    //     // 可忽略偏移量 高
    //     const diffY_offset = (mouseHook._screen_Information.height /100 * mouseHook._direction_percentage) ;

    //     // 可忽略偏移量
    //     if((Math.abs(x2-x)>diffX_offset && Math.abs(y2-y)>diffY_offset) )return "middle";


    //     // 计算可忽略偏移量
    //     if (diffX > 0) {
    //         direction += 'right';
    //     } else if (diffX < 0) {
    //         direction += 'left';
    //     }

    //     if(direction){
    //         direction += '-';
    //     }

    //     if (diffY > 0 ) {
    //         direction += 'bottom';
    //     } else if (diffY < 0) {
    //         direction += 'top';
    //     }

    //     direction = direction.replace(/--+|-$|^-/g,"") as HMC.direction;
    //     return direction||emit_name;
    // }

    /**
     * 在此坐标模拟进行单击
     * @param awitMs 
     */
    async click(awitMs?: number) {
        awitMs = awitMs || 150;
        Auto.setCursorPos(this.x, this.y);
        Auto.mouse("MOUSEEVENTF_LEFTDOWN");
        await Sleep(awitMs);
        return Auto.mouse("MOUSEEVENTF_LEFTUP");
    }
    /**
     * 模拟右键在此坐标按下和释放鼠标中键
     * @param awitMs 
     */
    async middle(awitMs?: number) {
        awitMs = awitMs || 150;
        Auto.setCursorPos(this.x, this.y);
        Auto.mouse(0x0020);
        await Sleep(awitMs);
        return Auto.mouse("MOUSEEVENTF_MIDDLEUP");
    }
    /**
     * 在此坐标按下模拟右键点击
     * @param awitMs 
     */
    async rClick(awitMs?: number) {
        awitMs = awitMs || 150;
        Auto.setCursorPos(this.x, this.y);
        Auto.mouse("MOUSEEVENTF_RIGHTDOWN");
        await Sleep(awitMs);
        return Auto.mouse("MOUSEEVENTF_RIGHTUP");
    }
    /**
     * 双击
     * @param doubleAwitMs 双击间隔 
     * @param clickAwitMs 模拟点击时间间隔
     */
    doubleClick(doubleAwitMs?: number, clickAwitMs?: number) {
        doubleAwitMs = doubleAwitMs || 150;
        clickAwitMs = clickAwitMs || 150;
        this.click(clickAwitMs).then(() => {
            Sleep(doubleAwitMs || 150)
                .then(() => {
                    this.click(clickAwitMs);
                });
        });
    }
    /**
     * 移动鼠标位置
     * @param x 
     * @param y 
     */
    moveMouse(x: number, y: number) {
        Auto.setCursorPos(x, y);
    }
}


class Keyboard {
    /**
     * 是否按下了shift
     */
    get shiftKey() {
        return Auto.hasKeyActivate(0x10) || Auto.hasKeyActivate(0xA1) || Auto.hasKeyActivate(0xA0);
    }
    /***
     * 是否按下了alt
     */
    get altKey() {
        return Auto.hasKeyActivate(0x12) || Auto.hasKeyActivate(0xA4) || Auto.hasKeyActivate(0xA5);
    }
    /***
     * 是否按下了ctrl
     */
    get ctrlKey() {
        return Auto.hasKeyActivate(0x11);
    }
    /***
     * 是否按下了win
     */
    get winKey() {
        return Auto.hasKeyActivate(0x5B) || Auto.hasKeyActivate(0x5C);
    }
    vKey: VK_VirtualKey;
    key: VK_key;
    code: VK_code;
    /**
     * 键值代码
     */
    keyCode: VK_keyCode;
    constructor(str: `${number}|${0 | 1}`) {
        const data = str.split("|");
        this.vKey = Number(data[0]);
        this.__isDown = Number(data[1]) ? true : false;
        let KeyboardcodeEmen = KeyboardcodeEmenList.get(this.vKey);
        if (!KeyboardcodeEmen) {
            KeyboardcodeEmen = ["unknown", null, this.vKey, 0];
            // throw new Error("key Value Data That Does Not Exist !");
        }
        const [VK_key, VK_code, VK_keyCode, VK_VirtualKey, VK_Nickname] = KeyboardcodeEmen;
        this.keyCode = VK_keyCode;
        this.key = VK_key;
        this.code = VK_code || VK_key;
    }
    /**
     * 是否被按下
     */
    private __isDown: boolean;
    /**是否被按下 */
    get isDown() {
        return this.__isDown || hasKeyActivate(this.vKey);
    }
}

let SetIohook = false;

class Iohook_Mouse {
    private _onlistenerCountList = {
        close: [] as Function[],
        data: [] as Function[],
        mouse: [] as Function[],
        start: [] as Function[],
        move: [] as Function[],
        button: [] as Function[],
        wheel: [] as Function[],
        drag: [] as Function[],
    };
    private _oncelistenerCountList = {
        close: [] as Function[],
        data: [] as Function[],
        mouse: [] as Function[],
        start: [] as Function[],
        move: [] as Function[],
        button: [] as Function[],
        wheel: [] as Function[],
        drag: [] as Function[],
    };
    // 这里会存储之前的64个历史记录
    _history_list: Array<HMC.MouseEventDataOK> = [];
    // 记录主屏幕信息 从而计算出直线的偏移参数
    _screen_Information: null | HMC.DeviceCaps = null;

    private _Close = false;
    // 计算直线的忽略参百分比
    _direction_percentage = 8;
    private _next_Sleep = 50;

    constructor() {
    }

    /**
     * 获取之前的0-64个记录 
     */
    get history(): Array<HMC.MouseEventDataOK> {
        const result = [...this._history_list];
        return result;
    }

    once(eventName: "start" | "close", listener: () => void): this;
    once(eventName: "mouse", listener: (MousePoint: MousePoint, MouseNextSession: HMC.MouseEventDataAll) => void): this;
    once(listener: (MousePoint: MousePoint) => void): this;
    once(eventName: "button", listener: (event: HMC.MouseKeyName, MousePoint: MousePoint) => void): this;
    once(eventName: "wheel", listener: (MousePoint: MousePoint) => void): this;
    once(eventName: "move", listener: (x: number, y: number, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;
    // once(eventName: "drag", listener: (x: number, y: number, direction: HMC.direction, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;

    once(eventName: unknown, listener?: unknown) {
        if (typeof eventName === "function") {
            listener = eventName;
            eventName = "mouse"
        }
        if (typeof listener !== "function") return mouseHook;
        mouseHook._oncelistenerCountList[eventName as "data"].push(listener);
        return mouseHook;
    };
    on(listener: (MousePoint: MousePoint) => void): this;
    on(eventName: "start" | "close", listener: () => void): this;
    on(eventName: "mouse", listener: (MousePoint: MousePoint, MouseNextSession: HMC.MouseEventDataAll) => void): this;
    on(eventName: "button", listener: (event: HMC.MouseKeyName, MousePoint: MousePoint) => void): this;
    on(eventName: "wheel", listener: (MousePoint: MousePoint) => void): this;
    on(eventName: "move", listener: (x: number, y: number, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;
    // on(eventName: "drag", listener: (x: number, y: number, direction: HMC.direction, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;

    on(eventName: unknown, listener?: unknown) {
        if (typeof eventName === "function") {
            listener = eventName;
            eventName = "mouse"
        }
        if (typeof listener !== "function") return mouseHook;
        mouseHook._onlistenerCountList[eventName as "data"].push(listener);
        return mouseHook;
    };

    /**
     * 设置于hmc 对接的刷新延迟毫秒数 数字越小读取越快但是性能消耗将会增加
     * @param Sleep 要求 10ms - 5000ms
     * @default 50ms
     * @returns 
     */
    setRefreshRate(Sleep = 50) {
        Sleep = Number(Sleep);

        if (isNaN(Sleep)) return false;

        // 小于10会导致访问过快照成性能消耗过大
        if (Sleep < 10) {
            return false;
        }
        // 太慢了会导致内存过大 如果内存超出了缓冲区预开辟内存大小将会变成动态开辟内存 影响单次键鼠响应的速度
        if (Sleep > 5000) {
            return false;
        }

        this._next_Sleep = Sleep;
        return true;
    }
    /**
     * 开始
     * @returns 
     */
    start() {
        SetIohook = true;
        let start = native.isStartHookMouse2();
        if (start) throw new Error("the Task Has Started.");
        native.installHookMouse2();
        mouseHook._Close = false;

        mouseHook.emit("start");

        let emit_getMouseNextSession = () => {
            if (mouseHook._Close) { return };
            let getMouseNextSession: string | Array<HMC.MouseEventDataAll> = native.getMouseNextSession2();

            getMouseNextSession = JSON.parse(getMouseNextSession) as Array<HMC.MouseEventDataAll>;

            if (getMouseNextSession)
                for (let index = 0; index < getMouseNextSession.length; index++) {
                    const MouseNextSession: HMC.MouseEventDataAll = getMouseNextSession[index];
                    if (!MouseNextSession.id) continue;

                    if (this._history_list.length > 60) {
                        // 移除前面五个
                        this._history_list.splice(0, 5);
                    }
                    this._history_list.push(MouseNextSession);

                    const mousePoint = new MousePoint(MouseNextSession);
                    mouseHook.emit("mouse", mousePoint, MouseNextSession);

                    // 响应按钮
                    if ([
                        HMC.MouseKey.WM_LBUTTONDOWN,
                        HMC.MouseKey.WM_LBUTTONUP,
                        HMC.MouseKey.WM_MBUTTONDOWN,
                        HMC.MouseKey.WM_MBUTTONUP,
                        HMC.MouseKey.WM_RBUTTONDOWN,
                        HMC.MouseKey.WM_RBUTTONUP
                    ].includes(mousePoint.mouseKeyCode)) {
                        mouseHook.emit("button", mousePoint.event, mousePoint);
                    }

                    // 响应 滚轮
                    if ([HMC.MouseKey.WM_MOUSEWHEEL].includes(mousePoint.mouseKeyCode)) {
                        mouseHook.emit("wheel", mousePoint);
                    }

                    if (MouseNextSession.id && MouseNextSession.button == HMC.MouseKey.WM_MOUSEMOVE) {
                        mouseHook.emit("move", MouseNextSession.x, MouseNextSession.y, mousePoint, MouseNextSession);

                        // 计算拖拽的偏移量
                        // if ((mouseHook._oncelistenerCountList.drag.length||mouseHook._onlistenerCountList.drag.length)&&Auto.hasKeyActivate(0x01)) {

                        // mouseHook.emit("drag", MouseNextSession.x, MouseNextSession.y, mousePoint.direction(), mousePoint, MouseNextSession);
                        // }
                    }

                }

        }

        (async () => {
            while (true) {
                if (mouseHook._Close) return;
                await Sleep(this._next_Sleep);
                emit_getMouseNextSession();
            }
        })();
    }
    /**
     * 结束
     */
    close() {
        native.unHookMouse2();

        mouseHook.emit("close");
        mouseHook._Close = true;
        mouseHook._history_list.length = 0;
        mouseHook._oncelistenerCountList.close.length = 0;
        mouseHook._oncelistenerCountList.data.length = 0;
        mouseHook._oncelistenerCountList.mouse.length = 0;
        mouseHook._oncelistenerCountList.move.length = 0;
        mouseHook._oncelistenerCountList.start.length = 0;
        mouseHook._oncelistenerCountList.button.length = 0;
        mouseHook._oncelistenerCountList.wheel.length = 0;
        mouseHook._oncelistenerCountList.drag.length = 0;


        mouseHook._onlistenerCountList.close.length = 0;
        mouseHook._onlistenerCountList.data.length = 0;
        mouseHook._onlistenerCountList.mouse.length = 0;
        mouseHook._onlistenerCountList.move.length = 0;
        mouseHook._onlistenerCountList.start.length = 0;
        mouseHook._onlistenerCountList.button.length = 0;
        mouseHook._onlistenerCountList.wheel.length = 0;
        mouseHook._onlistenerCountList.data.length = 0;
    }

    // 结束
    stop() {
        return this.close();
    }
    emit(eventName: "start" | "close"): boolean;
    emit(eventName: "move", x: number, y: number, MousePoint: MousePoint, data: HMC.MouseMoveEventData): boolean;
    emit(eventName: "button", event: HMC.MouseKeyName, MousePoint: MousePoint): boolean;
    emit(eventName: "wheel", MousePoint: MousePoint): boolean;
    emit(eventName: "mouse", MousePoint: MousePoint, MouseNextSession: HMC.MouseEventDataOK): boolean;
    emit(eventName: "drag", x: number, y: number, direction: HMC.direction, MousePoint: MousePoint, data: HMC.MouseMoveEventData): boolean;
    emit(eventName: unknown, ...data: unknown[]) {
        const emitFunList = mouseHook._onlistenerCountList[eventName as "data"];
        const onceEmitFunList = mouseHook._oncelistenerCountList[eventName as "data"];
        for (let index = 0; index < emitFunList.length; index++) {
            const emitFun = emitFunList[index];
            emitFun.apply(mouseHook, data);
        };
        for (let index = 0; index < onceEmitFunList.length; index++) {
            const emitFun = onceEmitFunList[index];
            emitFun.apply(mouseHook, data);
        };
        onceEmitFunList.length = 0;
        return emitFunList.length ? true : false;
    }
    /**
     * 关闭监听
     * @param eventName 
     * @param data 
     * @returns 
     */
    off(eventName: "start" | "drag" | "close" | "mouse" | "move" | "data" | "button" | "wheel", treatmentMode: "on" | "once" | Function, data?: Function) {
        switch (treatmentMode) {
            case "on": {
                if (data) {
                    const listenerCountList = mouseHook._onlistenerCountList[eventName];
                    if (listenerCountList.indexOf(data)) {
                        return mouseHook._onlistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
                    }
                } else {
                    mouseHook._onlistenerCountList[eventName].length = 0;
                    return !mouseHook._onlistenerCountList[eventName].length
                }
                break;
            }
            case "once": {
                if (data) {
                    const listenerCountList = mouseHook._oncelistenerCountList[eventName];
                    if (listenerCountList.indexOf(data)) {
                        return mouseHook._oncelistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
                    }
                } else {
                    mouseHook._oncelistenerCountList[eventName].length = 0;
                    return !mouseHook._oncelistenerCountList[eventName].length
                }
                break;
            }
        }
        return false;
    }
}

/**
 * 鼠标左键被按下
 * @returns 
 */
export function hasMouseLeftActivate() {
    return Auto.hasKeyActivate(0x01);
}

/**
 * 鼠标右键被按下
 */
export function hasMouseRightActivate() {
    return Auto.hasKeyActivate(0x02);
}

/**
 * 鼠标中键被按下
 */
export function hasMouseMiddleActivate() {
    return Auto.hasKeyActivate(0x04);
}


/**
 * 判断鼠标三按钮是否被按下
 * @returns 
 */
export function hasMouseBtnActivate() {
    return {
        "left": Auto.hasKeyActivate(0x01),
        "right": Auto.hasKeyActivate(0x02),
        "middle": Auto.hasKeyActivate(0x04)
    }
}

/**
 * 设置一个低级鼠标变化监听
 * @example ```javascript
 * // 添加处理函数
   hmc.Auto.mouseHook.on("move",function(x,y,env){
    console.log(x,y,env);
    });
   // log => 50 ,  350  , {...env}

   // 添加处理函数
   hmc.Auto.mouseHook.on("mouse",function(env){
    console.log(env);
   });
   // log => {...env}

   // 启动
   hmc.Auto.mouseHook.start();

   // off
   hmc.Sleep(5000).then(hmc.Auto.mouseHook.close);

```
 */
export const mouseHook = new Iohook_Mouse();

/**
 * 通过可执行文件或者带有图标的文件设置窗口图标
 * @param handle 句柄
 * @param Extract 可执行文件/Dll/文件
 * @param index 图标位置索引 例如文件显示的图标默认是0
 */
export function setWindowIconForExtract(handle: number, Extract: string, index: number): void {
    if (!Extract) throw new Error("Extract Path not defined");
    return native.setWindowIconForExtract(ref.int(handle), ref.string(Extract), index ? ref.int(index) : 0)
};
// /**
//  * 执行t2c 脚本 (异步)
//  * - 第一位是事件名称 例如 点击：click 按键A：A 按键Ctrl：ctrl 鼠标移动：60,50 
//  * - 第二位是按下或者松开 NULL为按下立刻松开
//  * - 第三位是延迟时间ms 为0立刻执行
//  * -----------------------
//  * - 单击键盘事件T2C语法： click|NULL|500  事件名称|NULL=单击|延迟时间
//  * 
//  * @example ```javascript
//  * hmc.sendKeyT2C(
//  * `
//  * 50,72|NULL|500
//  * ctrl|true|50
//  * A|NULL|0
//  * ctrl|false|50
//  * `
//  * )
//  * ```
//  * @param t2cStr 
//  */
// export function sendKeyT2C(...t2cStr: string[]) {

// }
// /**
//  * 执行t2c 脚本 (同步)
//  * - 第一位是事件名称 例如 点击：click 按键A：A 按键Ctrl：ctrl 鼠标移动：60,50 
//  * - 第二位是按下或者松开 NULL为按下立刻松开
//  * - 第三位是延迟时间ms 为0立刻执行
//  * -----------------------
//  * - 单击键盘事件T2C语法： click|NULL|500  事件名称|NULL=单击|延迟时间
//  * 
//  * @example ```javascript
//  * hmc.sendKeyT2C(
//  * `
//  * 50,72|NULL|500
//  * ctrl|true|50
//  * A|NULL|0
//  * ctrl|false|50
//  * `
//  * )
//  * ```
//  * @param t2cStr 
//  */
// export function sendKeyT2CSync(...t2cStr: string[]) {

// }
// /**
//     * 截屏指定的宽高坐标 并将其存储写入为文件 
//     * @param FilePath 文件路径
//     * @param x 从左边的哪里开始 为空为0
//     * @param y 从顶部的哪里开始 为空为0
//     * @param width 宽度
//     * @param height 高度
//     */
// export function captureBmpToFile(FilePath: string, x: number | null, y: number | null, width: number | null, height: number | null) {
// native.captureBmpToFile(ref.string(FilePath), ref.int(x || 0), ref.int(y || 0), ref.int(width || 0), ref.int(height || 0))
// }
// 
/**
 * 发送键盘事件
 * @param keyCode 键值
 * @param keyDown 是否按下
 * 
 */
export function sendKeyboard(keyCode: number | string, keyDown: boolean | null) {
    let vk = vkKey(keyCode);
    if (!vk) throw new Error("The currently entered keyboard key name/key value does not exist");
    if (keyDown === null) {
        native.sendKeyboard(vk);

    } else
        native.sendKeyboard(vk, ref.bool(keyDown));
};

/**
 * 发送键盘事件序列
 * @example ```javascript
 * hmc.sendKey(
 * // 数组序列 
 * ['ctrl',50] , // 50毫秒以后执行ctrl 点击事件(按下立刻放开)
 * ['ctrl',null] , // 执行ctrl 点击事件(按下立刻放开)
 * ['ctrl',true,50] , // 50毫秒以后按下ctrl不放开
 * ['ctrl',fasle,50] , // 50毫秒以后将ctrl放开
 * 
 *  // 对象序列
 * {key:"ctrl",} // ctrl键 点击事件(按下立刻放开)
 * {key:"ctrl",ms:50} // 50毫秒以后执行ctrl 点击事件(按下立刻放开)
 * {key:"ctrl",down:false,ms:50} // 50毫秒以后将ctrl放开
 * )
 * ```
 */
export function sendKeyboardSequence(...keys: Array<{ key: number | string, down?: boolean, ms?: number } | [number | string, boolean | number | null, number]>) {
    (async () => {
        for (let index = 0; index < keys.length; index++) {
            const of_key = keys[index];
            if (Array.isArray(of_key)) {
                if (of_key?.[2]) {
                    let ms = ref.int(of_key?.[2]);
                    await Sleep(ms);
                }
                if (of_key.length < 2) continue;
                sendKeyboard(of_key[0], typeof of_key?.[1] == "boolean" ? of_key?.[1] : null);
            }
            else if (typeof of_key == "object") {
                let keys = Object.keys(of_key);
                if (!keys.includes("key")) continue;
                if (keys.includes("ms")) {
                    let ms = ref.int(of_key.ms);
                    await Sleep(ms);
                }
                sendKeyboard(of_key.key, typeof of_key.down == "undefined" ? null : of_key.down);
            }
        }

    })();

};
/**
 * 获取屏幕指定区域的颜色
 * @param x 左边开始的坐标
 * @param y 从上面开始的坐标
 * @returns 
 */
export function getColor(x: number, y: number) {
    return native.getColor(ref.int(x), ref.int(y));
}
/**
 * 执行标准快捷键
 * @param basicCout 四大按键的包含表
 * @param KeyCode 执行的键码(如果表中有可以忽略) 
 * @example ```javascript
 * // ctrl + shift +A 
 * hmc.sendBasicKeys({"ctrl","shift",key:"A"});
 * hmc.sendBasicKeys({"ctrl","shift"},"A");
 * 
 * ```
 */
export function sendBasicKeys(basicCout: HMC.BasicCout, KeyCode?: number | string): void;
/**
 * 执行标准快捷键
 * @param basicKeysStr 快捷键内容
 * @example ```javascript
 * // ctrl + shift +A 
 * hmc.sendBasicKeys("ctrl+shift+A");
 * 
 */
export function sendBasicKeys(basicKeysStr: string): void;
/**
 * 执行标准快捷键(标准化输入)
 * @param ctrlKey 组合中含有ctrl
 * @param shiftKey 组合中含有shift
 * @param altKey 组合中含有alt
 * @param winKey 组合中含有win
 * @param KeyCode 键盘隐射值
 */
export function sendBasicKeys(ctrlKey: boolean, shiftKey: boolean, altKey: boolean, winKey: boolean, KeyCode: number | string): void;

/**
 * 执行标准快捷键
 * @param ctrlKey 组合中含有ctrl
 * @param shiftKey 组合中含有shift
 * @param altKey 组合中含有alt
 * @param winKey 组合中含有win
 * @param KeyCode 键盘隐射值
 * @returns 
 */
export function sendBasicKeys(ctrlKey: unknown, shiftKey?: unknown, altKey?: unknown, winKey?: unknown, KeyCode?: unknown): void {
    let _ctrlKey = false, _shiftKey = false, _altKey = false, _winKey = false;
    let _KeyCode: number | null = null;

    // hmc.sendBasicKeys({"ctrl","shift",key:"A"});   or   hmc.sendBasicKeys({"ctrl","shift"},"A");
    if (ctrlKey && typeof ctrlKey == "object") {
        let keys = Object.keys(ctrlKey);
        if (!keys.includes("key") && !keys.includes("code") && !vkKey(shiftKey)) {
            throw new Error("The current function requires other keys, not only (ctrl, shift, ait, win)");
        }
        _ctrlKey = keys.includes("ctrl") ? true : false;
        _shiftKey = keys.includes("shift") ? true : false;
        _altKey = keys.includes("alt") ? true : false;
        _winKey = keys.includes("win") ? true : false;
        // @ts-expect-error
        _KeyCode = vkKey(ctrlKey?.key || ctrlKey?.code || shiftKey || 0);
    }
    // hmc.sendBasicKeys("ctrl+shift+A");
    else
        if (typeof ctrlKey == "string") {
            _ctrlKey = ctrlKey.includes("ctrl") ? true : false;
            _shiftKey = ctrlKey.includes("shift") ? true : false;
            _altKey = ctrlKey.includes("alt") ? true : false;
            _winKey = ctrlKey.includes("win") ? true : false;
            _KeyCode = vkKey(ctrlKey.replace(/[+]|ctrl|shift|alt|win/g, ''));
        }
        else {
            _ctrlKey = ctrlKey ? true : false;
            _shiftKey = shiftKey ? true : false;
            _altKey = altKey ? true : false;
            _winKey = winKey ? true : false;
            _KeyCode = vkKey(KeyCode);
        }
    if ((_ctrlKey || _shiftKey || _altKey || _winKey) && _KeyCode !== null) {
        native.sendBasicKeys(ref.bool(_ctrlKey), ref.bool(_shiftKey), ref.bool(_altKey), ref.bool(_winKey), ref.int(_KeyCode));
    } else {
        throw new Error("The current function can only execute standard shortcuts and cannot enter a key value alone or without a regular keystroke")
    }
}


/**
 * 获取指定进程的工作目录
 * @time 5.449ms
 * @description 由于跨进程权限问题 不保证获取得到
 * !此功能需要读取进程内存
 * @module 异步async
 * @param pid 
 */
export function getProcessCwd2(pid: number): Promise<string | null> {
    return PromiseSP(native.getProcessCwd(ref.int(pid)), (data) => {
        if (typeof data === 'string') return data;
        return data?.[0] ? String(data?.[0]) : null;
    });
}

/**
 * 获取指定进程的工作目录
 * @time 0.435ms
 * @description 由于跨进程权限问题 不保证获取得到
 * !此功能需要读取进程内存
 * @module 同步Sync
 * @param pid 
 */
export function getProcessCwd2Sync(pid: number): string | null {
    return native.getProcessCwdSync(ref.int(pid));
}

/**
 * 获取指定进程得出命令行 
 * @time 1.095ms
 * @description 由于跨进程权限问题 不保证获取得到
 * ?此功能在win8及以下系统 需要读取进程内存
 * @module 异步async
 * @param pid 进程id
 */
export function getProcessCommand2(pid: number): Promise<string> {
    return PromiseSP(native.getProcessCommand(ref.int(pid)), (data) => {
        if (typeof data === 'string') return data;

        return String(data?.[0] || "");
    });
}

/**
 * 获取指定进程得出命令行
 * @time 0.386ms
 * @description 由于跨进程权限问题 不保证获取得到
 * ?此功能在win8及以下系统 需要读取进程内存
 * @module 同步Sync
 * @param pid 
 */
export function getProcessCommand2Sync(pid: number): string | null {
    return native.getProcessCommandSync(ref.int(pid));
}


/**
 * 限制鼠标光标可移动范围 (异步)
 * @description 可以调用 stop 提前结束 
 * ?最高不允许超过30000ms (30秒) 最低不允许低于31ms 
 * ?范围为正方形 如果没有设置right与bottom的值则将限制为1x1的正方形 (不可动)
 * @param ms 本次限制的时间
 * @param x 限制左边初始化点的位置
 * @param y 限制顶部初始化点的位置
 * @param right 允许的范围(左边到右边部)
 * @param bottom 允许光标移动的范围(顶到底部)
 */
export function setLimitMouseRange(ms: number, x: number, y: number, right: number = 1, bottom: number = 1) {

    ms = Math.abs(ref.int(ms));
    x = Math.abs(ref.int(x));
    y = Math.abs(ref.int(y));
    right = Math.abs(ref.int(right)) || 1;
    bottom = Math.abs(ref.int(bottom)) || 1;

    if (ms > 30 * 1000 || ms < 30) {
        throw new Error("The range is only allowed from 31 milliseconds to 30 seconds (31ms-30000).")
    }

    native.setLimitMouseRange(ms, x, y, right, bottom);


    const res = {
        ms, x, y, right, bottom,
        closed: (() => {
            setTimeout(() => {
                // 这一步看着很多余实际上确实多余
                // !请注意此地方不能取消
                /*请注意此地方不能取消 不然node提前结束将会导致无法解锁 避免进程提前退出导致无法结束 */
                // 12-27 不执行已经不影响解锁 已经启用意外退出自动解锁
                res.closed = native.hasLimitMouseRangeWorker();
            }, ms + 80);
            return false;
        })() as boolean,
        /**
         * 停止本次
         * @returns 
         */
        close() {
            return native.stopLimitMouseRangeWorker();
        },
        // 停止本次
        stop() {
            return this.close();
        },
        /**
         * 是否正在执行中
         * @returns 
         */
        has() {
            return !native.hasLimitMouseRangeWorker();
        }

    }

    return res;
}

class Iohook_Keyboard {
    private _onlistenerCountList = {
        close: [] as Function[],
        data: [] as Function[],
        start: [] as Function[],
        change: [] as Function[],
    };
    private _oncelistenerCountList = {
        close: [] as Function[],
        data: [] as Function[],
        start: [] as Function[],
        change: [] as Function[],
    };
    private _Close = false;
    private _next_Sleep = 50;
    constructor() {

    }
    once(eventName: "start" | "close", listener: () => void): this;
    once(eventName: "data", listener: (data: (`${number}|0` | `${number}|1`)[]) => void): this;
    once(eventName: "change", listener: (KeyboardPoint: Keyboard) => void): this;
    once(listener: (KeyboardPoint: Keyboard) => void): this;
    once(eventName: unknown, listener?: unknown) {
        if (typeof eventName === "function") {
            listener = eventName;
            eventName = "change"
        }
        if (typeof listener !== "function") return keyboardHook;
        keyboardHook._oncelistenerCountList[eventName as "data"].push(listener);
        return keyboardHook;
    };
    on(eventName: "start" | "close", listener: () => void): this;
    on(eventName: "data", listener: (data: (`${number}|0` | `${number}|1`)[]) => void): this;
    on(eventName: "change", listener: (KeyboardPoint: Keyboard) => void): this;
    on(listener: (KeyboardPoint: Keyboard) => void): this;
    on(eventName: unknown, listener?: unknown) {
        if (typeof eventName === "function") {
            listener = eventName;
            eventName = "change"
        }
        if (typeof listener !== "function") return keyboardHook;
        keyboardHook._onlistenerCountList[eventName as "data"].push(listener);
        return keyboardHook;
    };
    /**
     * 设置于hmc 对接的刷新延迟毫秒数 数字越小读取越快但是性能消耗将会增加
     * @param Sleep 要求 10ms - 10,000
     * @default 50ms
     * @returns 
     */
    setRefreshRate(Sleep = 50) {
        Sleep = Number(Sleep);

        if (isNaN(Sleep)) return false;

        // 小于10会导致访问过快照成性能消耗过大
        if (Sleep < 10) {
            return false;
        }
        // 太慢了会导致内存过大 如果内存超出了缓冲区预开辟内存大小将会变成动态开辟内存 影响单次键鼠响应的速度
        if (Sleep > 10000) {
            return false;
        }

        this._next_Sleep = Sleep;
        return true;
    }
    /**
     * 开始
     * @returns 
     */
    start() {
        SetIohook = true;
        let start = native.isStartKeyboardHook();
        if (start) throw new Error("the Task Has Started.");
        native.installKeyboardHook();
        if (native.isStartKeyboardHook()) {
            keyboardHook._Close = false;
        }
        keyboardHook.emit("start");
        let emit_getKeyboardNextSession = () => {
            let getKeyboardNextSession = native.getKeyboardNextSession();
            if (getKeyboardNextSession?.length) keyboardHook.emit("data", getKeyboardNextSession);
            if (getKeyboardNextSession)
                for (let index = 0; index < getKeyboardNextSession.length; index++) {
                    const KeyboardNextSession = getKeyboardNextSession[index];
                    const KeyboardPoint = new Keyboard(KeyboardNextSession);
                    keyboardHook.emit("change", KeyboardPoint);
                }

        }
        (async () => {
            while (true) {
                if (keyboardHook._Close) return;
                await Sleep(this._next_Sleep);
                emit_getKeyboardNextSession();
            }
        })();
        return start;
    }
    /**
     * 结束
     */
    close() {
        native.unKeyboardHook();

        keyboardHook.emit("close");
        keyboardHook._Close = true;

        keyboardHook._oncelistenerCountList.close.length = 0;
        keyboardHook._oncelistenerCountList.data.length = 0;
        keyboardHook._oncelistenerCountList.change.length = 0;
        keyboardHook._oncelistenerCountList.start.length = 0;

        keyboardHook._onlistenerCountList.close.length = 0;
        keyboardHook._onlistenerCountList.data.length = 0;
        keyboardHook._onlistenerCountList.change.length = 0;
        keyboardHook._onlistenerCountList.start.length = 0;
    }
    emit(eventName: "data", data: (`${number}|0` | `${number}|1`)[]): boolean;
    emit(eventName: "start" | "close"): boolean;
    emit(eventName: "change", KeyboardPoint: Keyboard): boolean;
    emit(eventName: unknown, ...data: unknown[]) {
        const emitFunList = keyboardHook._onlistenerCountList[eventName as "data"];
        const onceEmitFunList = keyboardHook._oncelistenerCountList[eventName as "data"];
        for (let index = 0; index < emitFunList.length; index++) {
            const emitFun = emitFunList[index];
            emitFun.apply(keyboardHook, data);
        };
        for (let index = 0; index < onceEmitFunList.length; index++) {
            const emitFun = onceEmitFunList[index];
            emitFun.apply(keyboardHook, data);
        };
        onceEmitFunList.length = 0;
        return emitFunList.length ? true : false;
    }
    /**
     * 关闭监听
     * @param eventName 
     * @param data 
     * @returns 
     */
    off(eventName: "start" | "close" | "change" | "data", treatmentMode: "on" | "once" | Function, data?: Function) {
        switch (treatmentMode) {
            case "on": {
                if (data) {
                    const listenerCountList = keyboardHook._onlistenerCountList[eventName];
                    if (listenerCountList.indexOf(data)) {
                        return keyboardHook._onlistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
                    }
                } else {
                    keyboardHook._onlistenerCountList[eventName].length = 0;
                    return !keyboardHook._onlistenerCountList[eventName].length
                }
                break;
            }
            case "once": {
                if (data) {
                    const listenerCountList = keyboardHook._oncelistenerCountList[eventName];
                    if (listenerCountList.indexOf(data)) {
                        return keyboardHook._oncelistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
                    }
                } else {
                    keyboardHook._oncelistenerCountList[eventName].length = 0;
                    return !keyboardHook._oncelistenerCountList[eventName].length
                }
                break;
            }
        }
        return false;
    }
}
/**
 * 设置一个键盘低级变化监听
 * @example ```javascript 
  // 添加处理函数
  hmc.Auto.keyboardHook.on("change",function(env){
     console.log(env.key,env.isDown,env);
  });
  // log => ctrl , true {...env}

  // 启动
  hmc.Auto.keyboardHook.start();

  // off
  hmc.Sleep(5000).then(hmc.Auto.keyboardHook.close);

 *  ```
 * 
 */
export const keyboardHook = new Iohook_Keyboard();

// 获取当前输入设备的最后执行时间
export function getLastInputTime() {
    return native.getLastInputTime();
}

// 自动化工具集   (拥有统一化名称) 
export const Auto = {
    setLimitMouseRange,
    hasMouseLeftActivate,
    hasMouseRightActivate,
    hasMouseMiddleActivate,
    hasMouseBtnActivate,
    sendKeyboard,
    sendKeyboardSequence,
    getColor,
    sendBasicKeys,
    setWindowEnabled,
    setCursorPos,
    mouse,
    rightClick,
    leftClick,
    getBasicKeys,
    getMouseMovePoints,
    powerControl,
    SetBlockInput,
    SetSystemHOOK,
    hasKeyActivate,
    mouseHook,
    keyboardHook,
    getCursorPos,
    getLastInputTime
}

// USB 控制的归档   (拥有统一化名称)
export const Usb = {
    getHub: getHidUsbList,
    getDevsInfo: getUsbDevsInfo,
    watch: watchUSB,
}

// 实用工具集   (拥有统一化名称)
export const Shell = {
    trash: deleteFile,
    openApp: openApp,
    getShortcutLink: getShortcutLink,
    setShortcutLink: setShortcutLink,
    freePort: freePort,
    createSymlink: createSymlink,
    createDirSymlink: createDirSymlink,
    createHardLink: createHardLink,
}

//进程操作合集   (拥有统一化名称)
export const Process = {
    watch: processWatchdog,
    kill: killProcess,
    killMatch: killProcessName,
    getList: getProcessList,
    getHandle: getProcessHandle,
    getName: getProcessName,
    getPath: getProcessidFilePath,
    getFocus: getForegroundWindowProcessID,
    has: hasProcess,
    match: getProcessNameList,
    matchDetails: getDetailsProcessNameList,
    getDetailsList: getDetailsProcessList,
    parentID: getProcessParentProcessID,
    mianPID: getProcessParentProcessID,
    subPID: getSubProcessID,
    threadList: getProcessThreadList
}

//注册表编辑合集   (拥有统一化名称)
export const registr = {
    /**
     * 直达路径解析
     * @param Path 全路径(直达路径)
     * @param atkey 是否将最后一个值解释为键
     * @returns
     */
    analysisDirectPath,
    /**
     * 判断注册表中是否有该键值
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.06591796875 ms
     * @returns
     */
    has: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return hasRegistrKey(HKEY, Path, key);
    },
    /**
     * 获取内容(文本)
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.108ms
     * @returns
     */
    get: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return getStringRegKey(HKEY, Path, key);
    },
    /**
     * 设置键值对
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @param Value 数据
     * @time 2.02392578125 ms
     * @returns
     */

    set: (HKEY: HMC.HKEY, Path: string, key: string, value: string) => {
        return setRegistrKey(HKEY, Path, key, value);
    },
    /**
     * 删除数据
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.076904296875 ms
     * @returns
     */

    remove: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return removeStringRegKey(HKEY, Path, key);
    },
    /**
     * 枚举键值
     * @param HKEY 根路径
     * @param Path 路径
     * @time 0.06689453125 ms
     * @returns
     */

    keys: (HKEY: HMC.HKEY, Path: string) => {
        return enumRegistrKey(HKEY, Path);
    },
    /**
     * 将当前的路径的注册表值转表
     * @param HKEY
     * @param Path
     */

    list: (HKEY: HMC.HKEY, Path: string) => {
        return listRegistrPath(HKEY, Path);
    },
    /**
     * 创建新的路径
     * @param HKEY 根路径
     * @param Path 路径
     * @time 2.02392578125 ms
     * @returns
     */

    create: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return createPathRegistr(HKEY, Path);
    },
    /**
     * 判断注册表中是否有该键值
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.06591796875 ms
     * @returns
     */
    get hasRegistrKey() {
        return this.has;
    },
    /**
     * 将当前的路径的注册表值转表
     * @param HKEY
     * @param Path
     */

    get listRegistrPath() {
        return this.list;
    },
    /**
     * 枚举键值
     * @param HKEY 根路径
     * @param Path 路径
     * @time 0.06689453125 ms
     * @returns
     */
    get enumRegistrKey() {
        return this.keys;
    },
    /**
     * 删除数据
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.076904296875 ms
     * @returns
     */

    get removeStringRegKey() {
        return this.remove;
    },
    /**
     * 设置键值对
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @param Value 数据
     * @time 2.02392578125 ms
     * @returns
     */

    get setRegistrKey() {
        return this.set;
    },
    /**
     * 获取内容(文本)
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.108ms
     * @returns
     */
    get getStringRegKey() {
        return this.get;
    },
    /**
     * 获取内容(数字)
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.10888671875 ms
     * @returns
     */

    getNumberRegKey: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return getNumberRegKey(HKEY, Path, key);
    },
    /**
     * 创建新的路径
     * @param HKEY 根路径
     * @param Path 路径
     * @time 2.02392578125 ms
     * @returns
     */

    get createPathRegistr() {
        return this.create;
    },
    /**
     * 获取内容(二进制 Buffer)
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @time 0.06787109375 ms
     * @returns
     */

    getRegistrBuffValue: (HKEY: HMC.HKEY, Path: string, key: string) => {
        return getRegistrBuffValue(HKEY, Path, key);
    },
    /**
     * 打开一个注册表路径并返回一些实用方法
     * @param HKEY 根路径
     * @param Path 路径
     * @param key 键
     * @returns
     */

    get openRegKey() {
        return open;
    },
    getRegistrQword,
    getRegistrDword,
    setRegistrQword,
    setRegistrDword,
    removeStringRegValue,
    removeStringRegKeyWalk,
    removeStringTree,
    isRegistrTreeKey,
};
/**
* 创建管道并执行命令
* @param cmd 命令
*/
export function _popen(cmd: string) {
    return native.popen(ref.string(cmd));
}
/**
 * 判断互斥体文本是否存在
 * @param MutexName 互斥体文本
 * @returns 
 */
export function hasMutex(MutexName: string) {
    return native.hasMutex(ref.string(MutexName));
}
/**
 * 创建互斥体文本并返回结果 
 * ?(无法移除 除非当前进程退出 互斥体具有唯一性) 
 * ? 可以用于判断进程是否重复启动
 * @param MutexName 互斥体文本
 * @returns 
 */
export function createMutex(MutexName: string) {
    return native.createMutex(ref.string(MutexName));
}

/**
* 创建管道并执行命令
* @param cmd 命令
*/
export function popen(cmd: string) {
    return native.popen(ref.string(cmd));
}

/**
 * 获取当前进程的环境变量
 * @returns 
 */
export function getAllEnv() {
    return native.getAllEnv();
}

/**
 * 获取指定key的环境变量
 * @param key 
 * @returns 
 */
export function getenv(key: string) {
    return native.getenv(ref.string(key));
}

/**
 * 获取指定UDP端口的pid
 * @deprecated 此api已经废弃 请使用 net-win32 模块代替
 * @param Port 
 * @returns 
 */
export function getUDPPortProcessID(Port: number) {
    throw new Error("此api对hmc的架构存在安全威胁，已经废弃，请使用 'net-win32' 模块代替\nThis API poses a security threat to the HMC architecture and has been deprecated. Please use the 'net-win32' module instead.");
    return null
}

/**
 * 添加环境变量(不写入系统)
 * @param key 
 * @param data 
 * @returns 
 */
export function putenv(key: string, data: string | string[]) {
    return native.putenv(ref.string(key), ref.string(Array.isArray(data) ? data.join(";") : data));
}

/**
 * 获取指定TCP端口的pid
 * @deprecated 此api已经废弃 请使用 net-win32 模块代替
 * @param Port 
 * @returns 
 */
export function getTCPPortProcessID(Port: number) {
    throw new Error("此api对hmc的架构存在安全威胁，已经废弃，请使用 'net-win32' 模块代替\nThis API poses a security threat to the HMC architecture and has been deprecated. Please use the 'net-win32' module instead.");
    return null
}

// /**
//  * 通过标题或类名搜索所有窗口句柄
//  * @param className 类名
//  * @param titleName 标题
//  * @param isWindow 是否要求为窗口(忽略子组件) 默认 true
//  * @param isCaseSensitive 忽略区分大小写 默认 true
//  */
// export function findAllWindow(className: string | null, titleName?: string | null, isWindow?: boolean | null, isCaseSensitive?: boolean | null): number[]{
//     return native.findAllWindow(
//         typeof className == "string" ? ref.string(className):null, 
//         typeof titleName == "string" ? ref.string(titleName) : null, 
//         typeof isWindow == "boolean" ? isWindow:null, 
//         typeof isCaseSensitive == "boolean" ? isCaseSensitive : null,
//         );
// }

/**
 * 通过标题或类名搜索窗口句柄
 * @param className 类名
 * @param titleName 标题
 */
export function findWindow(className?: string | null, titleName?: string | null): number | null {
    return native.findWindow(
        typeof className == "string" ? ref.string(className) : null,
        typeof titleName == "string" ? ref.string(titleName) : null,
    );
}

/**
 * 搜索窗口或子窗口
 * @param hWndParent 父窗口
 * @param hWndChildAfter 下級窗口 
 * @param className 类名
 * @param titleName 标题
 */
export function findWindowEx(hWndParent: number | null | HWND, hWndChildAfter: number | null | HWND, className: string | null, titleName: string | null): number | null {
    return native.findWindowEx(
        !!hWndParent ? ref.int(className) : null,
        !!hWndChildAfter ? ref.int(titleName) : null,
        typeof className == "string" ? ref.string(className) : null,
        typeof titleName == "string" ? ref.string(titleName) : null,
    );
}

/**
 * 按照名称搜索进程
 * @param ProcessName 
 * @returns 
 */
export function findProcess(ProcessName: string | RegExp | number, isMacthFile = false): HMC.enumProcessCont[] {
    let result = [];
    let ProcessList: Array<HMC.enumProcessContP | HMC.enumProcessCont> = isMacthFile ? getDetailsProcessList() : getProcessList();
    for (let index = 0; index < ProcessList.length; index++) {
        const Process = ProcessList[index];
        if (typeof ProcessName == "string") {
            // @ts-expect-error
            if (Process.name.includes(ProcessName) || Process?.path?.includes(ProcessName)) {
                result.push(Process);

            }
        }
        else if (typeof ProcessName == "number") {
            if (Process.pid == ProcessName) {
                result.push(Process);
            }
        }
        else {
            // @ts-expect-error
            if (Process.name.match(ProcessName) || (typeof Process?.path == "string") ? Process.path.match(ProcessName) : false) {
                result.push(Process);
            }
        }

    }

    return result;
}

/**
 * 获取指定进程的从启动到现在的时间 单位ms
 * @param ProcessID 
 */
export function getProcessStartTime(ProcessID: number) {
    return native.getProcessStartTime(ref.int(ProcessID));
}

/**
 * 判断变量中是否存在指定值
 * - 用户
 * - 系统
 * @param key 
 */
export function hasKeyExists(key: string) {
    return native.hasKeyExists(ref.string(key));
}

/**
 * 判断用户变量中是否存在指定值
 * - 用户
 * @param key 
 */
export function hasUseKeyExists(key: string) {
    return native.hasUseKeyExists(ref.string(key));
}

/**
 * 判断系统变量中是否存在指定值
 * - 系统
 * @param key 
 */
export function hasSysKeyExists(key: string) {
    return native.hasSysKeyExists(ref.string(key));
}

/**
 * 通过当前的变量对变量内容进行解析
 * - 实时的
 * - HMC_x64.escapeEnvVariable("%AppData%\\hmc-win32")   log  ->  'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * @param input 
 */
export function escapeEnvVariable(input: string) {
    return native.escapeEnvVariable(ref.string(input));
}

/**
 * 删除一个用户变量
 * - 仅用户
 * @param key 
 */
export function removeUserVariable(key: string) {
    return native.removeUserVariable(ref.string(key));
}

/**
* 删除一个变量
*  - 用户
*  - 系统用户
* @param key 
*/
export function removeVariable(key: string) {
    return native.removeSystemVariable(ref.string(key)) && native.removeUserVariable(ref.string(key));
}

/**
 * 删除一个用户变量
 * - 仅用户
 * @param key 
 */
export function removeSystemVariable(key: string) {
    return native.removeSystemVariable(ref.string(key));
}

/**
 * 获取一个在系统变量中的值
 * @param key 
 * @param transMean 是否自动转义
 * - true %AppData%\\hmc-win32  -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * - false %AppData%\\hmc-win32 -> '%AppData%\\hmc-win32'
 * @default true
 */
export function getSystemVariable(key: string, transMean?: boolean) {
    return native.getSystemVariable(ref.string(key), ref.bool(typeof transMean == "undefined" ? true : transMean));
}

/**
* 获取一个在用户变量中的值
* @param key 
* @param transMean 是否自动转义
* - true %AppData%\\hmc-win32  -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
* - false %AppData%\\hmc-win32 -> '%AppData%\\hmc-win32'
* @default true
*/
export function getUserVariable(key: string, transMean?: boolean) {
    return native.getUserVariable(ref.string(key), ref.bool(typeof transMean == "undefined" ? true : transMean));
}

/**
 *获取指定键值 按照默认优先级
 * ?- 用户变量和系统变量同时有非数组键  -> 用户变量
 * ?- 用户变量和系统变量同时为数组键    -> 用户变量数组
 * ?- 用户变量为数组键 系统变量为文本键  -> 用户文本键 排除系统
 * ?- 系统变量为文本键 用户变量为数组    -> 用户变量数组 排除系统
 * ?- 系统变量存在 用户变量为空文本      -> 排除此变量
 * ?- PATH                          -> 合并数组
 * @param key 键
 * @param key 
 */
export function getVariableAnalysis(key: string) {
    return native.getVariableAnalysis(ref.string(key));
}

/**
 * 添加一个系统变量 （请注意 win进程获取的优先级: 进程变量 -> 用户变量 -> *系统变量）
 * @param key 键
 * @param value 值
 * @param append 是否添加到尾部 而不是替换
 * - false  "ddd" -> "ddd"
 * - true "ddd" -> "oid...;ddd"
 * @default false
 * @param transMean 是个自动转义的值
 * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
 * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * @default false
 */
export function putSystemVariable(key: string, value?: string, append?: boolean, transMean?: boolean) {
    return native.putSystemVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}

/**
 * 添加一个用户变量 （请注意 win进程获取的优先级: 进程变量 -> *用户变量 -> 系统变量）
 * @param key 键
 * @param value 值
 * @param append 是否添加到尾部 而不是替换
 * - false  "ddd" -> "ddd"
 * - true "ddd" -> "oid...;ddd"
 * @default false
 * @param transMean 是个自动转义的值
 * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
 * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * @default false
 */
export function setUserVariable(key: string, value?: string, append?: boolean, transMean?: boolean) {
    return native.putUserVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}

/**
 * 添加一个系统变量 （请注意 win进程获取的优先级: 进程变量 -> 用户变量 -> *系统变量）
 * @param key 键
 * @param value 值
 * @param append 是否添加到尾部 而不是替换
 * - false  "ddd" -> "ddd"
 * - true "ddd" -> "oid...;ddd"
 * @default false
 * @param transMean 是个自动转义的值
 * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
 * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * @default false
 */
export function setSystemVariable(key: string, value?: string, append?: boolean, transMean?: boolean) {
    return native.putSystemVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}

/**
 * 添加一个用户变量 （请注意 win进程获取的优先级: 进程变量 -> *用户变量 -> 系统变量）
 * @param key 键
 * @param value 值
 * @param append 是否添加到尾部 而不是替换
 * - false  "ddd" -> "ddd"
 * - true "ddd" -> "oid...;ddd"
 * @default false
 * @param transMean 是个自动转义的值
 * - false "%AppData%\\hmc-win32" -> "%AppData%\\hmc-win32"
 * - true "%AppData%\\hmc-win32" -> 'C:\\Users\\...\\AppData\\Roaming\\hmc-win32'
 * @default false
 */
export function putUserVariable(key: string, value?: string, append?: boolean, transMean?: boolean) {
    return native.putUserVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}

/**
 * 获取所有的值 从环境读取 (进程环境)
 */
export function getVariableAll() {
    return native.getVariableAll();
}

/**
 * 从注册表读取现在的真实环境变量 但不更新到进程环境
 * - 请注意这里 不会添加 进程的变量
 * @param key 
 */
export function getRealGlobalVariableList() {
    let RealGlobalVariableList = JSON.parse(JSON.stringify(native.getRealGlobalVariable())) as HMC.VariableList;
    for (const key in RealGlobalVariableList) {
        if (key.match(/path/img)) {
            delete RealGlobalVariableList[key];
        }
    }

    RealGlobalVariableList.Path = getVariableAnalysis("Path");
    return RealGlobalVariableList;
}

/**
 * 获取用户变量的键列表
 */
export function getUserKeyList() {
    return native.getUserKeyList();
}

/**
 * 获取系统变量的键列表
 */
export function getSystemKeyList() {
    return native.getSystemKeyList();
}

/**
 * 
 * 从注册表中读取 变量并且写入到当前进程变量
 * @param remove 删除 已经消失的环境 到当前进程
 * @param update_add update 新的变量到当前进程
 * @param append 新的变量先尝试追加或者移除变量单值 而不是直接全部替换
 *  - 如果 update_add and remove  为false 此选项将被忽略
 *  - 如果 update_add and remove 同时为true 此选项将解析为全部替换
 * @param filter 过滤条件 (匹配则忽略)
 * - key name (不区分大小写) 
 * - filter 一个返回布尔值的函数  (key: 键(大写), new_value: string | null | undefined, oid_value: string | null | undefined) => boolean
 * - key[] 数组 (不区分大小写) 
 * - RegExp 正则 (key区分大小写(原始值))
* @returns 
 */
export function updateThis(remove?: boolean, update_add?: boolean, append?: boolean,

    filter?: ((key: string, new_value: string | null | undefined, oid_value: string | null | undefined) => boolean) | string | string[] | RegExp

): HMC.VarValueReBackData[] {
    let result: HMC.VarValueReBackData[] = [];

    const realGlobalVariable = native.getRealGlobalVariable();

    for (const key in realGlobalVariable) {
        const element = realGlobalVariable[key];
        const p_value = process.env[key];
        // 判断过滤条件
        if (filter) {
            if (typeof filter === 'string') {
                if (key.toUpperCase() != filter.toUpperCase()) {
                    continue;
                }
            } else if (typeof filter === "function") {

                if (filter(key.toUpperCase(), element, p_value)) {
                    continue;
                }
            } else if (Array.isArray(filter)) {

                for (let index = 0; index < filter.length; index++) {
                    const element = filter[index];
                    if (key.toUpperCase() != element.toUpperCase()) {
                        continue;
                    }
                }
            } else {
                if (key.match(filter)) {
                    continue;
                }
            }

        }
        // 都存在
        if (p_value && element) {

            // 有不一样的地方 
            if (p_value != element) {

                // 直接替换
                if ((update_add && !append && !remove) || (append && remove)) {
                    process.env[key] = element;
                    result.push({
                        key: key,
                        oid_value: p_value,
                        new_vaule: element,
                        update_type: "update"
                    });
                    continue;
                }

                // 差分计算 添加
                if (update_add && append) {
                    let new_vaule = new Set();

                    // 处理原有的
                    for (const iterator of p_value.split(";")) {
                        new_vaule.add(iterator);
                    }

                    // 处理新的
                    for (const iterator of element.split(";")) {
                        if (!new_vaule.has(iterator)) {
                            new_vaule.add(iterator);
                            result.push({
                                key: key,
                                oid_value: p_value,
                                new_vaule: element,
                                update_type: "append",
                                value: iterator
                            });
                        }
                    }

                    process.env[key] = [...new_vaule].join(";");
                    continue;
                }

                // 差分计算 删除
                if (update_add && remove) {
                    let new_vaule = new Set();

                    // 处理原有的
                    for (const iterator of element.split(";")) {
                        new_vaule.add(iterator);
                    }

                    // 处理新的
                    for (const iterator of p_value.split(";")) {
                        if (!new_vaule.has(iterator)) {
                            new_vaule.delete(iterator);
                            result.push({
                                key: key,
                                oid_value: p_value,
                                new_vaule: element,
                                update_type: "reduce",
                                value: iterator
                            });
                        } else {
                            new_vaule.add(iterator);
                        }
                    }

                    process.env[key] = [...new_vaule].join(";");
                    continue;
                }

            }

        }

        // 新增
        if (!p_value && element) {
            if (update_add || append) {
                process.env[key] = element;
                result.push({
                    key: key,
                    oid_value: p_value,
                    new_vaule: element,
                    update_type: "update"
                });
            }
        }

        // 删除
        if (p_value && !element) {
            if (remove) {
                process.env[key] = element;
                result.push({
                    key: key,
                    oid_value: p_value,
                    new_vaule: element,
                    update_type: "remove"
                });
            }
        }
    }

    return result;

}


export const getWindowProcess = getHandleProcessID;
export const getProcessWindow = getProcessHandle;
export const isWindowVisible = isHandleWindowVisible;
export const closeWindow = lookHandleCloseWindow;
export const setWindowShake = windowJitter;
export const isWindowTop = hasWindowTop;
export const getProcessFilePath = getProcessidFilePath;


/**
   * 获取进程列表 (快照法)  
   * - (一般用来枚举进程树)
   * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
   * @module 异步 
   * @time 66.428ms
   * @returns 
   */
export function getAllProcessListSnp2(callback: (data_list: Array<HMC.PROCESSENTRY_V2>, err: null | Error) => void): void;
export function getAllProcessListSnp2(): Promise<Array<HMC.PROCESSENTRY_V2>>;
export function getAllProcessListSnp2(callback?: unknown) {
    const data = native.getAllProcessListSnp();
    let result: Promise<Array<HMC.PROCESSENTRY_V2>>;

    if (typeof data == "number") {
        result = (new PromiseSession(data)).to_Promise((data) => {
            return !data ? [] : (JSON.parse(data[0]) as any[]).map(result => {
                result.pid = result.UniqueProcessId;
                result.name = result.ImageName;
                return result;
            })
        });
    } else {
        result = data.then((data) => {
            return !data ? [] : (JSON.parse(data) as any[]).map(result => {
                result.pid = result.th32ProcessID;
                result.name = result.szExeFile;
                result.ppid = result.th32ParentProcessID;
                return result;
            })
        });
    }

    if (typeof callback === 'function') {
        result.then((data) => callback(data, null)).catch((err) => { callback([], err) });
        return void 0;
    } else return result;
}

const getAllProcessListSnpSessionBuffList: Array<HMC.PROCESSENTRY_V2> = [];

/**
   * 获取进程列表 (快照法)   带有一个临时缓冲 在1.2秒内提供高速读取
   * - (一般用来枚举进程树)
   * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
   * @module 异步 
   * @time 66.428ms
   * @returns 
   */
export function getAllProcessListSnpSession2(callback: (data_list: Array<HMC.PROCESSENTRY_V2>, err: null | Error) => void): void;
export function getAllProcessListSnpSession2(): Promise<Array<HMC.PROCESSENTRY_V2>>;
export function getAllProcessListSnpSession2(callback?: unknown) {
    return callback ? void 0 : (new Promise<Array<HMC.PROCESSENTRY_V2>>(async (resolve, reject) => {
        if (getAllProcessListSnpSessionBuffList.length) {
            return typeof callback == "function" ? callback(getAllProcessListSnpSessionBuffList, null) : resolve(getAllProcessListSnpSessionBuffList);
        }

        for (const iterator of (await getAllProcessListSnp2().catch((err) => {
            if (typeof callback == "function") {
                callback([], err);
            } else reject(err);

        })) || []) {
            getAllProcessListSnpSessionBuffList.push(iterator);
        }

        typeof callback == "function" ? callback(getAllProcessListSnpSessionBuffList, null) : resolve(getAllProcessListSnpSessionBuffList);

        setTimeout(() => {
            getAllProcessListSnpSessionBuffList.length = 0;
        }, 1200);

    }));

}

/**
   * 获取进程列表 (快照法)   带有一个临时缓冲 在1.2秒内提供高速读取
   * - (一般用来枚举进程树)
   * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
   * @module 异步 
   * @time 66.428ms
   * @returns 
   */
export function getAllProcessListSnpSession2Sync(): Array<HMC.PROCESSENTRY_V2> {

    if (getAllProcessListSnpSessionBuffList.length) {
        return getAllProcessListSnpSessionBuffList;
    }

    for (const iterator of getAllProcessListSnp2Sync() || []) {
        getAllProcessListSnpSessionBuffList.push(iterator);
    }


    setTimeout(() => {
        getAllProcessListSnpSessionBuffList.length = 0;
    }, 1200);

    return getAllProcessListSnpSessionBuffList;
}
/**
 * 获取进程列表 (内核法)
 * - (可以获取内核软件和系统服务的名称)
 * - 请注意 内核法有可能被杀毒软件拦截
 * - 有概率第一次获取时失败
 * @module 异步  
 * @time 30.542ms
 * @returns 
 */
export function getAllProcessListNt2(callback: (data_list: Array<HMC.PSYSTEM_PROCESS_INFORMATION & { name: string, pid: number }> | null, err: null | Error) => void): void;
export function getAllProcessListNt2(): Promise<Array<HMC.PSYSTEM_PROCESS_INFORMATION & { name: string, pid: number }>>;
export function getAllProcessListNt2(callback?: unknown) {
    const data = native.getAllProcessListNt();
    let result: Promise<Array<HMC.PSYSTEM_PROCESS_INFORMATION & { name: string, pid: number }>>;

    if (typeof data == "number") {
        result = (new PromiseSession(data)).to_Promise((data) => {
            return (JSON.parse(data[0]) as any[]).map(result => {
                result.pid = result.UniqueProcessId;
                result.name = result.ImageName;
                return result;
            })
        });
    } else {
        result = data.then((data) => {
            return (JSON.parse(data) as any[]).map(result => {
                result.pid = result.UniqueProcessId;
                result.name = result.ImageName;
                return result;
            })
        });
    }

    if (typeof callback === 'function') {
        result.then((data) => callback(data, null)).catch((err) => { callback(null, err) });
        return void 0;
    } else return result;

}

/**
 * 获取进程列表（枚举法）
 * - 枚举是最快的 最安全的 不会出现遗漏
 * @module 异步  
 * @time  fn() 9.691ms     fn(true)61.681ms
 * @param is_execPath 需要解析可执行文件路径 (获取延时50ms左右)
 * @returns 
 */
export function getAllProcessList2(callback: ((data_list: Array<{ pid: number }> | null, err: null | Error) => void)): void;
export function getAllProcessList2(callback: ((data_list: Array<{ pid: number, name: string, path: string }> | null, err: null | Error) => void), is_execPath: true): void;
export function getAllProcessList2(is_execPath: true): Promise<Array<{ pid: number, name: string, path: string }>>;
export function getAllProcessList2(): Promise<Array<{ pid: number }>>;
export function getAllProcessList2(callback?: unknown, is_execPath?: unknown) {

    if (typeof callback == "boolean") {
        is_execPath = callback;
        callback = void 0;
    }

    const data = is_execPath ? native.getAllProcessList(true) : native.getAllProcessList();
    let result: Promise<any[]>;


    if (typeof data == "number") {
        result = (new PromiseSession(data)).to_Promise((data) => {
            let data_list = JSON.parse(data[0]);
            const v_list: HMC.Volume[] = [];// native.getVolumeList(); 
            for (let index = 0; index < data_list.length; index++) {
                const element: { pid: number, name: string, path: string } = data_list[index];
                // \\Device\\HarddiskVolume1\1.exe

                if (element?.path?.match(/^[\\\/][\\\/]?Device[\\\/][\\\/]?HarddiskVolume/)) {
                    if (!v_list.length) {
                        v_list.push(...native.getVolumeList());
                        for (let index = 0; index < v_list.length; index++) {
                            const Volume = v_list[index];
                            element.path = element?.path?.replace(Volume.device, Volume.path) || ""
                            element.path = element?.path?.replace(Volume.name, Volume.path) || ""
                        }
                    }
                }
            }
            return data_list;
        });
    } else {
        result = data.then((data) => (JSON.parse(data) as any[]));
    }

    if (typeof callback === 'function') {
        const to_callback = callback;

        result.then((data) => to_callback(data, null)).catch((err) => { to_callback(null, err) });
        return void 0;

    } else return result;
}

/**
 * 获取进程列表（枚举法）
 * - 枚举是最快的 最安全的 不会出现遗漏
 * @module 同步 
 * @time  fn() 11.147ms     fn(true)44.633ms
 * @param is_execPath 需要解析可执行文件路径 (获取延时50ms左右)
 * @returns 
 */
export function getAllProcessList2Sync(is_execPath?: true): Array<{ pid: number, name: string, path: string }>;
export function getAllProcessList2Sync(): Array<{ pid: number }>;
export function getAllProcessList2Sync(is_execPath?: unknown) {
    const v_list: HMC.Volume[] = [];// native.getVolumeList(); 
    return JSON.parse(is_execPath ? native.getAllProcessListSync(true) : native.getAllProcessListSync())?.map((item: { pid: number, name: string, path: string }) => {

        // \\Device\\HarddiskVolume1\1.exe
        if (item?.path?.match(/^[\\\/][\\\/]?Device[\\\/][\\\/]?HarddiskVolume/)) {
            if (!v_list.length) {
                v_list.push(...native.getVolumeList());
                for (let index = 0; index < v_list.length; index++) {
                    const Volume = v_list[index];
                    item.path = item?.path?.replace(Volume.device, Volume.path) || ""
                }
            }
        }

        return item;
    });
}


/**
 * 获取进程列表 (内核法)
 * - (可以获取内核软件和系统服务的名称)
 * - 请注意 内核法有可能被杀毒软件拦截
 * - 有概率第一次获取时失败
 * @module 同步 
 * @time 30.542ms
 * @returns 
 */
export function getAllProcessListNt2Sync(): Array<HMC.PSYSTEM_PROCESS_INFORMATION & { name: string, pid: number }> {
    const data_list = JSON.parse(native.getAllProcessListNtSync()) as Array<HMC.PSYSTEM_PROCESS_INFORMATION & { name: string, pid: number }>;
    for (let index = 0; index < data_list.length; index++) {
        const data = data_list[index];
        data.pid = data.UniqueProcessId;
        data.name = data.ImageName;
    }
    return data_list;
}

/**
 * 获取进程列表 (快照法)  
 * - (一般用来枚举进程树)
 * - ?请注意 如果可执行文件是32位而系统是64位将获取不到64位进程的信息
 * @module 同步 
 * @time 66.428ms
 * @returns 
 */
export function getAllProcessListSnp2Sync(): Array<HMC.PROCESSENTRY_V2>;
export function getAllProcessListSnp2Sync() {
    const data_list = JSON.parse(native.getAllProcessListSnpSync());
    for (let index = 0; index < data_list.length; index++) {
        const data = data_list[index];
        data.ppid = data.th32ParentProcessID;
        data.pid = data.th32ProcessID;
        data.name = data.szExeFile;
    }
    return data_list;
}



/**
 * 获取匹配进程的 父进程信息
 * @param Process 需要被搜索的子进程 名称/pid/正则名称
 * @param is_SessionCache 是否启用缓冲区以提高检索速度 （缓冲区有效时间1.2秒）
 * @returns 
 */
export function getProcessParentProcessMatch2(Process: string | RegExp, is_SessionCache?: boolean): Promise<Array<HMC.PROCESSENTRY_V2>>;
export function getProcessParentProcessMatch2(Process: number, is_SessionCache?: boolean): Promise<HMC.PROCESSENTRY_V2>;
export function getProcessParentProcessMatch2(Process: unknown, is_SessionCache = true): unknown {
    return new Promise((resolve, reject) => {
        const fun = (is_SessionCache ? getAllProcessListSnpSession2 : getAllProcessListSnp2);
        const data_list: Array<HMC.PROCESSENTRY_V2> = [];
        fun().then(process_list => {
            for (let index = 0; index < process_list.length; index++) {
                const for_process_item = process_list[index];

                if (typeof Process == "number" && for_process_item.th32ProcessID == Process) {
                    return resolve(for_process_item);
                }

                if (typeof Process == "string" && for_process_item.szExeFile == "string") {
                    data_list.push(for_process_item);
                }

                if (Process instanceof RegExp && for_process_item.szExeFile.match(Process)) {
                    data_list.push(for_process_item);
                }

            }

            return is_SessionCache ? resolve(null) : resolve(data_list);

        }).catch(reject);
    });
}


/**
 * 获取匹配进程的 父进程信息
 * @param Process 需要被搜索的子进程 名称/pid/正则名称
 * @param is_SessionCache 是否启用缓冲区以提高检索速度 （缓冲区有效时间1.2秒）
 * @returns 
 */
export function getProcessParentProcessMatch2Sync(Process: string | RegExp, is_SessionCache?: boolean): Array<HMC.PROCESSENTRY_V2>;
export function getProcessParentProcessMatch2Sync(Process: number, is_SessionCache?: boolean): HMC.PROCESSENTRY_V2 | null;
export function getProcessParentProcessMatch2Sync(Process: unknown, is_SessionCache = true): unknown {

    const data_list: Array<HMC.PROCESSENTRY_V2> = [];
    const process_list = is_SessionCache ? getAllProcessListSnp2Sync() : getAllProcessListSnpSession2Sync();
    for (let index = 0; index < process_list.length; index++) {
        const for_process_item = process_list[index];

        if (typeof Process == "number" && for_process_item.th32ProcessID == Process) {
            return for_process_item;
        }

        if (typeof Process == "string" && for_process_item.szExeFile == "string") {
            data_list.push(for_process_item);
        }

        if (Process instanceof RegExp && for_process_item.szExeFile.match(Process)) {
            data_list.push(for_process_item);
        }

    }

    return data_list;
}

function get_sy_ProcessFilePathSync(error_name: string | null, ProcessID: number) {

    // 最高权限的win内核
    if (ProcessID == 0 || ProcessID == 4) {
        return ProcessID == 0 ? "[System Process]" : "C:\\Windows\\System32\\ntoskrnl.exe";
    }

    if (!error_name) return null;

    // 处理Volume路径
    if (error_name.indexOf("\\\\?\\Volume") == 0 || error_name.indexOf("\\Device\\") == 0) {
        const volumeList = hmc.getVolumeList();
        for (let index = 0; index < volumeList.length; index++) {
            const volume = volumeList[index];

            if (error_name.indexOf(volume.name)) {
                error_name = error_name?.replace(volume.name, volume.path + "\\");
                error_name = error_name?.replace(/[\\\/]+]/g, path.sep);
            }

            if (error_name.indexOf(volume.device)) {
                error_name = error_name?.replace(volume.device, volume.path + "\\");
                error_name = error_name?.replace(/[\\\/]+]/g, path.sep);
            }
        }
    }

    // 不是最高权限的应用  ->  != error:::[5,5]
    if (!error_name?.match(/error:::.+?5.+?5/)) {
        return error_name?.includes("error:::") ? null : error_name || null;
    }

    const name = getProcessNameSnp2Sync(ProcessID) || getProcessNameNt2Sync(ProcessID) || getProcessNameNt2Sync(ProcessID);
    if (!name || name.match(/error:::/)) {
        return null;
    }

    const sy_path = path.resolve("C:\\Windows\\System32", name);

    if (fs.existsSync(sy_path)) {
        return sy_path;
    }

    return name;
}


async function get_sy_ProcessFilePath(error_name: string | null, ProcessID: number): Promise<string | null> {
    return new Promise(async function (resolve, _reject) {

        // 最高权限的win内核
        if (ProcessID == 0 || ProcessID == 4) {
            return resolve(ProcessID == 0 ? "[System Process]" : "C:\\Windows\\System32\\ntoskrnl.exe");
        }
        if (!error_name) return resolve(null);


        // 处理Volume路径
        if (error_name.indexOf("\\\\?\\Volume") == 0 || error_name.indexOf("\\Device\\") == 0) {
            const volumeList = hmc.getVolumeList();
            for (let index = 0; index < volumeList.length; index++) {
                const volume = volumeList[index];

                if (error_name.indexOf(volume.name)) {
                    error_name = error_name?.replace(volume.name, volume.path + "\\");
                    error_name = error_name?.replace(/[\\\/]+]/g, path.sep);
                }

                if (error_name.indexOf(volume.device)) {
                    error_name = error_name?.replace(volume.device, volume.path + "\\");
                    error_name = error_name?.replace(/[\\\/]+]/g, path.sep);
                }
            }
        }

        // 不是最高权限的应用  ->  != error:::[5,5]
        if (!error_name?.match(/error:::.+?5.+?5/)) {
            return resolve(error_name?.includes("error:::") ? null : error_name || null);
        }

        const not_fun = () => { };

        const name = await getProcessNameSnp2(ProcessID)?.catch(not_fun) || await getProcessNameNt2(ProcessID)?.catch(not_fun) || await getProcessNameNt2(ProcessID)?.catch(not_fun);

        if (!name || name?.match(/error:::/)) {
            return resolve(null);
        }

        const sy_path = path.resolve("C:\\Windows\\System32", name);

        if (fs.existsSync(sy_path)) {
            return resolve(sy_path);
        }

        return resolve(name);

    });
}


/**
 * 获取指定进程的可执行文件路径 合集(穷尽法)
 * @param ProcessID 进程id
 * @param callback 回调函数 如果没有则返回一个 Promise
 * @returns 
 */
export function getProcessFilePath2(ProcessID: number, callback: (path: string | null, err: null | Error) => void): void;
export function getProcessFilePath2(ProcessID: number): Promise<string | null>;
export function getProcessFilePath2(ProcessID: unknown, callback?: unknown) {

    const data = native.getProcessFilePath(ref.int(ProcessID));
    let result: Promise<string | null>;

    if (typeof data == "number") {
        result = (new PromiseSession(data)).to_Promise((data) => {
            return data[0];
        }).then(async data => {
            return (await get_sy_ProcessFilePath(data, ref.int(ProcessID)).catch((err) => { })) || null;
        });
    } else {
        result = data.then(async (data) => await get_sy_ProcessFilePath(data, ref.int(ProcessID)));
    }

    if (typeof callback === 'function') {
        result.then((data) => callback(data, null)).catch((err) => { callback(null, err) });
        return void 0;
    } else return result;

}

/**
 * 获取指定进程的可执行文件路径 合集(穷尽法)
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessFilePath2Sync(ProcessID: number) {
    const data = native.getProcessFilePathSync(ref.int(ProcessID));
    return get_sy_ProcessFilePathSync(data, ref.int(ProcessID));;
}





/**
 * 获取指定进程的可执行文件路径
 * @param ProcessID 进程id
 * @param callback 回调函数 如果没有则返回一个 Promise
 * @returns 
 */
export function existProcess2(ProcessID: number, callback: (exist: boolean, err: null | Error) => void): void;
export function existProcess2(ProcessID: number): Promise<boolean>;
export function existProcess2(ProcessID: number, callback?: unknown) {
    const data = native.existProcess(ref.int(ProcessID));
    let result: Promise<boolean>;

    if (typeof data == "number") {
        result = (new PromiseSession(data)).to_Promise((data) => {
            return (data[0] || false);
        });
    } else {
        if (!data) {

            if (typeof callback === 'function') {
                callback(false, new Error("failed To Create Asynchronous Function"));
                return void 0;
            } else {
                return Promise.resolve(false);
            }
        }

        result = data.then((data) => (data || false)) as Promise<boolean>;
    }

    if (typeof callback === 'function') {
        result.then((data) => callback(data, null)).catch((err) => { callback(null, err) });
        return void 0;
    } else return result;

}

/**
 * 获取指定进程的可执行文件路径
 * @param ProcessID 进程id
 * @returns 
 */
export function existProcess2Sync(ProcessID: number) {
    const data = native.existProcessSync(ref.int(ProcessID));
    return data || false;
}

/**
 * 获取一个带有exe path 的进程列表
 * @returns 
 */
export function getDetailsProcessList2() {
    return getAllProcessList2Sync(true);
}

/**
 * 获取进程名称 (快照法)
 * @param ProcessID 进程id
 * @param is_SessionCache  是否使用缓存提高速度
 * @returns 
 */
export function getProcessNameSnp2Sync(ProcessID: number, is_SessionCache?: boolean) {
    const data_list = is_SessionCache ? getAllProcessListSnpSession2Sync() : getAllProcessListSnp2Sync();
    for (let index = 0; index < data_list.length; index++) {
        const element = data_list[index];
        if (element.pid == ProcessID) {
            return element.szExeFile;
        }
    }
    return null;
}



/**
 * 获取进程名称 (快照法)
 * @param ProcessID 进程id
 * @param is_SessionCache  是否使用缓存提高速度
 * @returns 
 */
export function getProcessNameSnp2(ProcessID: number, is_SessionCache?: boolean): Promise<null | string> {
    return new Promise(async (resolve, reject) => {

        const data_list = await (is_SessionCache ? getAllProcessListSnpSession2().catch(reject) : getAllProcessListSnp2().catch(reject)) || [];
        for (let index = 0; index < data_list.length; index++) {
            const element = data_list[index];
            if (element.pid == ProcessID) {
                resolve(element.szExeFile);
                return;
            }
        }
        resolve(null);
    });
}



/**
 * 获取进程名称 (快照法)
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessNameNt2Sync(ProcessID: number) {
    const data_list = getAllProcessListNt2Sync();
    for (let index = 0; index < data_list.length; index++) {
        const element = data_list[index];
        if (element.pid == ProcessID) {
            return element.ImageName;
        }
    }
    return null;
}



/**
 * 获取进程名称 (快照法)
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessNameNt2(ProcessID: number): Promise<null | string> {
    return new Promise(async (resolve, reject) => {
        const data_list = await getAllProcessListNt2();
        for (let index = 0; index < data_list.length; index++) {
            const element = data_list[index];
            if (element.pid == ProcessID) {
                resolve(element.ImageName);
                return;
            }
        }
        resolve(null);
    });
}



/**
 * 获取进程名称 合集(穷尽法)
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessName2(ProcessID: number): Promise<null | string> {
    return new Promise(async (resolve, reject) => {

        //句柄法
        let FilePath = await getProcessFilePath2(ProcessID)?.catch(reject);
        if (FilePath) return resolve(FilePath.split(/[\\\/]+/).pop() || null);

        // 快照法
        FilePath = await getProcessNameSnp2(ProcessID, false)?.catch(reject);
        if (FilePath) return resolve(FilePath || null);

        //内核法
        FilePath = await getProcessNameNt2(ProcessID)?.catch(reject);
        if (FilePath) return resolve(FilePath || null);

        // nt可能需要获取两次
        FilePath = await getProcessNameNt2(ProcessID)?.catch(reject);
        if (FilePath) return resolve(FilePath || null);

        return resolve(null);
    });
}



/**
 * 获取进程名称 合集(穷尽法)
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessName2Sync(ProcessID: number): null | string {
    let FilePath = getProcessFilePath2Sync(ProcessID);
    if (FilePath) return (FilePath.split(/[\\\/]+/).pop() || null);

    // 快照法
    FilePath = getProcessNameSnp2Sync(ProcessID, false);
    if (FilePath) return FilePath;

    //内核法
    FilePath = getProcessNameNt2Sync(ProcessID);
    if (FilePath) return FilePath;

    // nt可能需要获取两次
    FilePath = getProcessNameNt2Sync(ProcessID);
    if (FilePath) return FilePath;

    return null;
}


/**
 * 按照名称搜索进程
 * @param ProcessName 
 * @returns 
 */
export async function findProcess2(ProcessName: string | RegExp | number): Promise<{ pid: number, name: string | null, path: string | null }[]> {
    return new Promise(async (resolve, reject) => {
        let result: any = [];
        const isMacthFile = ProcessName && (typeof ProcessName != "number");
        let ProcessList = await (isMacthFile ? getAllProcessList2(true) : getAllProcessList2()).catch(reject) || [];

        for (let index = 0; index < ProcessList.length; index++) {
            const Process = ProcessList[index];
            if (typeof ProcessName == "string") {
                // @ts-expect-error
                if (Process?.name?.includes(ProcessName) || Process?.path?.includes(ProcessName)) {
                    result.push(Process);

                }
            }
            else if (typeof ProcessName == "number") {
                if (Process.pid == ProcessName) {
                    let path = await getProcessFilePath2(ProcessName).catch(reject);
                    // @ts-expect-error
                    Process.path = path || null;
                    // @ts-expect-error
                    Process.name = path?.split(/[\\\/]+/).at(-1) || null;
                    result.push(Process);
                }
            }
            else {
                // @ts-expect-error
                if (Process?.name?.match(ProcessName) || (typeof Process?.path == "string") ? Process?.path?.match(ProcessName) : false) {
                    result.push(Process);
                }
            }
        }

        resolve(result);

    });
}


/**
 * 按照名称搜索进程
 * @param ProcessName 
 * @returns 
 */
export function findProcess2Sync(ProcessName: string | RegExp | number): Array<{ pid: number, name: string, path: string }> {
    let result: any = [];
    const isMacthFile = ProcessName && (typeof ProcessName != "number");

    let ProcessList = (isMacthFile ? getAllProcessList2Sync(true) : getAllProcessList2Sync()) || [];

    for (let index = 0; index < ProcessList.length; index++) {
        const Process = ProcessList[index];
        if (typeof ProcessName == "string") {
            if (Process?.name?.includes(ProcessName) || Process?.path?.includes(ProcessName)) {
                result.push(Process);
            }
        }
        else if (typeof ProcessName == "number") {
            if (Process.pid == ProcessName) {
                let path = getProcessFilePath2Sync(ProcessName);
                // @ts-expect-error
                Process.path = path || null;
                // @ts-expect-error
                Process.name = path?.split(/[\\\/]+/).at(-1) || null;
                result.push(Process);
            }
        }
        else {
            if (Process?.name?.match(ProcessName) || (typeof Process?.path == "string") ? Process?.path?.match(ProcessName) : false) {
                result.push(Process);
            }
        }
    }
    return result;
}


// HMC @ 2.0 versions
export {
    closeWindow2,
    closeWindow2Sync,
    getThumbnailPng,
    captureBmpToBuff,
    captureBmpToFile,
    showContextMenu,
    readElectronHandle,
    native2,
    beta,
    captureBmp2,
    captureBmp2Sync,
    // getClipboardFilePaths,
    // setClipboardText,
    // getClipboardText,
    // clearClipboard,
    // setClipboardFilePaths,
};

export const Environment = {
    hasKeyExists,
    hasUseKeyExists,
    hasSysKeyExists,
    escapeEnvVariable,
    removeUserVariable,
    removeVariable,
    removeSystemVariable,
    getSystemVariable,
    getUserVariable,
    getVariableAnalysis,
    putSystemVariable,
    putUserVariable,
    getVariableAll,
    getRealGlobalVariableList,
    getUserKeyList,
    getSystemKeyList,
    updateThis,
    setUserVariable,
    setSystemVariable
};

export const Registr = registr;

export const hmc = {
    // HMC @ 2.0 versions
    closeWindow2,
    closeWindow2Sync,
    getThumbnailPng,
    captureBmpToBuff,
    captureBmpToFile,
    showContextMenu,
    readElectronHandle,

    // getClipboardFilePaths,
    // setClipboardText,
    // getClipboardText,
    // clearClipboard,
    // setClipboardFilePaths,
    // -----------------------
    getLastInputTime,
    getCursorPos,
    Auto,
    Clipboard,
    Environment,
    HWND,
    MessageError,
    MessageStop,
    Process,
    PromiseSession,
    Registr,
    SetBlockInput,
    SetSystemHOOK,
    SetWindowInTaskbarVisible,
    Shell,
    Sleep,
    Usb,
    Watch,
    WatchWindowForeground,
    WatchWindowPoint,
    WebView2OnlineInstall,
    Window,
    _KeyboardcodeComparisonTable,
    _KeyboardcodeEmenList,
    _popen,
    alert,
    analysisDirectPath,
    // captureBmpToFile,
    clearClipboard,
    closeWindow,
    closedHandle,
    confirm,
    createDirSymlink,
    createHardLink,
    createMutex,
    createPathRegistr,
    createSymlink,
    deleteFile,
    desc,
    enumAllProcessHandle,
    enumChildWindows,
    enumProcessHandle,
    enumRegistrKey,
    escapeEnvVariable,
    findProcess,
    findProcess2,
    findProcess2Sync,
    findWindow,
    findWindowEx,
    formatVolumePath,
    freePort,
    getAllEnv,
    getAllProcessList2,
    getAllProcessList2Sync,
    getAllProcessListNt2,
    getAllProcessListNt2Sync,
    getAllProcessListSnp2,
    getAllProcessListSnp2Sync,
    getAllProcessListSnpSession2,
    getAllProcessListSnpSession2Sync,
    getAllWindows,
    getAllWindowsHandle,
    getBasicKeys,
    getClipboardFilePaths,
    getClipboardSequenceNumber,
    getClipboardText,
    getColor,
    getConsoleHandle,
    getCurrentMonitorRect,
    getDetailsProcessList,
    getDetailsProcessList2,
    getDetailsProcessNameList,
    getDeviceCaps,
    getDeviceCapsAll,
    getForegroundWindow,
    getForegroundWindowProcessID,
    getHandleProcessID,
    getHidUsbList,
    getMainWindow,
    getMetrics,
    getModulePathList,
    getMouseMovePoints,
    getNumberRegKey,
    getPointWindow,
    getPointWindowMain,
    getPointWindowName,
    getPointWindowProcessId,
    getProcessFilePath,
    getProcessFilePath2,
    getProcessFilePath2Sync,
    getProcessHandle,
    getProcessList,
    getProcessName,
    getProcessName2,
    getProcessName2Sync,
    getProcessNameList,
    getProcessNameNt2,
    getProcessNameNt2Sync,
    getProcessNameSnp2,
    getProcessNameSnp2Sync,
    getProcessParentProcessID,
    getProcessParentProcessMatch2,
    getProcessParentProcessMatch2Sync,
    getProcessStartTime,
    getProcessThreadList,
    getProcessWindow,
    getProcessidFilePath,
    getRealGlobalVariableList,
    getRegistrBuffValue,
    getRegistrDword,
    getRegistrQword,
    getShortcutLink,
    getStringRegKey,
    getSubProcessID,
    getSystemIdleTime,
    getSystemKeyList,
    getSystemMenu,
    getSystemMetricsLen,
    getSystemVariable,
    getTCPPortProcessID,
    getTrayList,
    getUDPPortProcessID,
    getUsbDevsInfo,
    getUserKeyList,
    getUserVariable,
    getVariableAll,
    getVariableAnalysis,
    getVolumeList,
    getWebView2Info,
    getWindowClassName,
    getWindowProcess,
    getWindowRect,
    getWindowStyle,
    getWindowTitle,
    getenv,
    hasKeyActivate,
    hasKeyExists,
    hasMutex,
    hasPortTCP,
    hasPortUDP,
    hasProcess,
    hasRegistrKey,
    hasSysKeyExists,
    hasUseKeyExists,
    hasWebView2,
    hasWindowTop,
    hideConsole,
    isAdmin,
    isEnabled,
    isHandle,
    isHandleWindowVisible,
    isInMonitorWindow,
    isMouseMonitorWindow,
    isProcess,
    isRegistrTreeKey,
    isSystemX64,
    isWindowTop,
    isWindowVisible,
    keyboardHook,
    killProcess,
    killProcessName,
    leftClick,
    listRegistrPath,
    lookHandleCloseWindow,
    lookHandleGetTitle,
    lookHandleSetTitle,
    lookHandleShowWindow,
    messageBox,
    mouse,
    mouseHook,
    native,
    openApp,
    openExternal,
    openPath,
    openURL,
    platform,
    popen,
    powerControl,
    processWatchdog,
    putSystemVariable,
    putUserVariable,
    putenv,
    ref,
    registr,
    removeStringRegKey,
    removeStringRegKeyWalk,
    removeStringRegValue,
    removeStringTree,
    removeSystemVariable,
    removeUserVariable,
    removeVariable,
    rightClick,
    sendBasicKeys,
    sendKeyboard,
    sendKeyboardSequence,
    setClipboardFilePaths,
    setClipboardText,
    setCloseWindow,
    setCursorPos,
    setHandleTransparent,
    setRegistrDword,
    setRegistrKey,
    setRegistrQword,
    setShortcutLink,
    setShowWindow,
    setSystemVariable,
    setUserVariable,
    setWindowEnabled,
    setWindowFocus,
    setWindowIconForExtract,
    setWindowMode,
    setWindowShake,
    setWindowTitle,
    setWindowTop,
    showConsole,
    showMonitors,
    shutMonitors,
    sleep,
    system,
    systemChcp,
    systemStartTime,
    trash,
    updateThis,
    updateWindow,
    version,
    watchClipboard,
    watchUSB,
    windowJitter,
    hasMouseLeftActivate,
    hasMouseRightActivate,
    hasMouseMiddleActivate,
    hasMouseBtnActivate,
    setLimitMouseRange,
    getProcessCwd2Sync,
    getProcessCwd2,
    getProcessCommand2,
    getProcessCommand2Sync,
}

export default hmc;

process.on('exit', function () {
    if (SetIohook) {
        native.unHookMouse2();
        native.unKeyboardHook();
        native.clearEnumAllProcessList();
        native.clearEnumProcessHandle();
    }
});
