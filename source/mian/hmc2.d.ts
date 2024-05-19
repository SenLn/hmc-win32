/// <reference types="node" />
import { HMC } from "./hmc";
import { HWND } from "./hmc";
export declare module HMCC {
    type CLIP_HTML_INFO = {
        data: string;
        EndFragment: number;
        EndHTML: number;
        is_valid: boolean;
        SourceURL: string;
        StartFragment: number;
        StartHTML: number;
        Version: number;
    };
}
interface CaptureBmp {
    (handle: number): Promise<Buffer | null>;
    (handle: number, path: string): Promise<boolean>;
    (x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<Buffer | null>;
    (path: string, x: number, y: number, nScopeWidth: number, nScopeHeight: number): Promise<boolean>;
    _PromiseTask?: Promise<any>;
}
interface CaptureBmpSync {
    (handle: number): Buffer | null;
    (handle: number, path: string): boolean;
    (x: number, y: number, nScopeWidth: number, nScopeHeight: number): Buffer | null;
    (path: string, x: number, y: number, nScopeWidth: number, nScopeHeight: number): boolean;
    _PromiseTask?: Promise<any>;
}
export type HMCC = {
    /**
     * 关闭窗口 同步
     * @param handle 句柄
     * @param grade 等级
     * - 1 关闭 / 非强制
     * - 2 关闭 / 系统级(半强制)
     * - 3 关闭线程 (强制)
     */
    closeWindow2?: (handle: number, grade: 1 | 2 | 3) => Promise<boolean>;
    /**
     * 关闭窗口 同步
     * @param handle 句柄
     * @param grade 等级
     * - 1 关闭 / 非强制
     * - 2 关闭 / 系统级(半强制)
     * - 3 关闭线程 (强制)
     */
    closeWindow2Sync?: (handle: number, grade: 1 | 2 | 3) => boolean;
    captureBmpToBuff?: (x: number, y: number, nScopeWidth: number, nScopeHeight: number) => null | Buffer;
    captureBmpToFile?: (path: string, x: number, y: number, nScopeWidth: number, nScopeHeight: number) => undefined;
    captureBmp2?: CaptureBmp;
    captureBmp2Sync?: CaptureBmpSync;
    getClipboardFilePaths?: () => string;
    setClipboardText?: (text: string, is_html?: boolean) => boolean;
    getClipboardText?: () => string | null;
    clearClipboard?: () => boolean;
    setClipboardFilePaths?: (paths: string | string[]) => boolean;
    getClipboardInfo?: () => {
        format: string;
        hwnd: number;
        id: number;
        formatCount: number;
    };
    enumClipboardFormats?: () => `{"type":${string},"type_name":${string}}...[]`;
    /**
     * 获取剪贴板中的html
     */
    getClipboardHTML?: () => HMCC.CLIP_HTML_INFO | null;
    /**
     * 获取托盘图标列表
     * ? win11 在22621.1000版本之后失效 具体原因查看https://github.com/kihlh/hmc-win32/issues/36
     */
    getTrayList?: () => string;
    /**
     * 删除文件到垃圾桶
     * @param trash_path 处理的路径
     * @param is_Recycle 可以回收
     * @param isShow 显示窗口
     */
    trashFile?: (trash_path: string, is_Recycle: boolean, isShow: boolean) => boolean;
    /**
     * 清空回收站
     * @param root_path 文件或者根目录
     * @param isShow 是否显示窗口
     */
    clearTrash?: (root_path: string, isShow: boolean) => boolean;
    /**
     *
     * @param filePath
     * @param newFilePath
     * @param isShowConfirm
     * @param isShow
     * @param isShowProgress
     * @param trash_ok
     * @returns
     */
    copyFile?: (filePath: string, newFilePath: string, isShowConfirm: boolean, isShow: boolean, isShowProgress: boolean, trash_ok: boolean) => boolean;
    /**
     *
     * @param filePath
     * @param newFilePath
     * @param isShowConfirm
     * @param isShow
     * @param isShowProgress
     * @param trash_ok
     * @returns
     */
    moveFile?: (filePath: string, newFilePath: string, isShowConfirm: boolean, isShow: boolean, isShowProgress: boolean, trash_ok: boolean) => boolean;
    getThumbnailPng?: (...args: unknown[]) => unknown;
    /**
     * 获取 软/硬 链接的指向内容
     * @param Linkath
     */
    getLinkTarget?: (Linkath: string) => string | string[] | null;
    /**
     * 设置文件夹的缩略图
     * @param folderPath 路径
     * @param iconPath 图标路径
     * @param iconIndex 图标索引 比如exe中的0
     * @returns
     */
    setFolderIcon?: (folderPath: string, iconPath: string, iconIndex?: number) => boolean;
    /**
     * 弹出右键菜单的接口
     * @param hwnd 调用窗口 / 允许为null
     * @param file 指定需要被显示菜单的文件/文件夹/文件列表/ 为空 "" 为驱动器
     * @param x 坐标 x+y=0的时候将会从鼠标所在的地方显示
     * @param y 坐标
     */
    showContextMenu?: (hwnd: number | null, file: string | string[], x: number, y: number) => boolean;
};
export declare const native2: HMCC;
declare class FunctionTaskQueue {
    queues: Map<(...args: any[]) => Promise<any>, any>;
    constructor();
    runTask<T>(fn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T>;
    next<T>(fn: (...args: any[]) => Promise<T>): Promise<void>;
}
export declare const asyncTaskQueue: FunctionTaskQueue;
/**
 * 关闭窗口 异步
 * - 1 温柔的关闭 (正常关闭)
 * - 2 关闭 / 系统级(半强制)
 * - 3 关闭线程 (强制)
 */
export declare function closeWindow2(handle: number | HWND, grade?: 1 | 2 | 3): Promise<boolean>;
/**
 * [同步 不支持并发] 关闭窗口
 * - 1 温柔的关闭 (正常关闭)
 * - 2 关闭 / 系统级(半强制)
 * - 3 关闭线程 (强制)
 */
export declare function closeWindow2Sync(handle: number | HWND, grade?: 1 | 2 | 3): boolean;
/**
 *  获取文件缩略图
 * @param source 文件
 * @param output 保存到
 * @param img_size 要求尺寸 建议为：
 * - 16
 * - 32
 * - 64
 * - 128
 * - 256
 */
export declare function getThumbnailPng(source: string, output: string, img_size: 16 | 64 | 128 | 256): boolean;
/**
 *  获取文件缩略图
 * @param source 文件
 * @param img_size 要求尺寸 建议为：
 * - 16
 * - 32
 * - 64
 * - 128
 * - 256
 */
export declare function getThumbnailPng(source: string, img_size: 16 | 64 | 128 | 256): Buffer | null;
export declare function getThumbnailPng(...args: unknown[]): unknown;
/**
 * 截图bmp到缓冲区
 * @param x 起点
 * @param y 起点
 * @param nScopeWidth 矩形宽
 * @param nScopeHeight 矩形高
 * @returns
 */
export declare function captureBmpToBuff(x?: number, y?: number, nScopeWidth?: number, nScopeHeight?: number): Buffer | null;
/**
 * 截图bmp到文件
 * @param x 起点
 * @param y 起点
 * @param nScopeWidth 矩形宽
 * @param nScopeHeight 矩形高
 * @returns
 */
export declare function captureBmpToFile(path: string, x?: number, y?: number, nScopeWidth?: number, nScopeHeight?: number): undefined;
/**
 * 弹出右键菜单的接口
 * @param hwnd 调用窗口 / 允许为null
 * @param file 指定需要被显示菜单的文件/文件夹/文件列表/ 为空 "" 为驱动器
 * @param x 坐标 x+y=0的时候将会从鼠标所在的地方显示
 * @param y 坐标
 */
export declare function showContextMenu(hwnd?: number | null, file?: string | string[], x?: number, y?: number): boolean;
/**
 * 将 electron 句柄内存缓冲区转换为标准 窗口数字句柄
 * @param handleBuffer 例如 Electron.BrowserWindow.getFocusedWindow().getNativeWindowHandle()
 * @returns
 */
export declare function readElectronHandle(handleBuffer: any): number;
/**
 * 获取剪贴板文件路径列表 以\0切割
 * @returns
 */
export declare function getClipboardFilePaths(): string[];
/**
 * 设置剪贴板本文或者html
 * @param text
 * @param is_html
 * @returns
 */
export declare function setClipboardText(text: string, is_html?: boolean): boolean;
/**
 * 获取剪贴板文本
 * @returns
 */
export declare function getClipboardText(): string | null;
/**
 * 清空剪贴板
 * @returns
 */
export declare function clearClipboard(): boolean;
/**
 * 设置文件路径列表
 * @param paths 支持以 \0 切割的路径或者单文件路径 或者数组
 */
export declare function setClipboardFilePaths(paths: string | string[]): boolean;
/**
 * 获取托盘图标列表
 * 1.4.6 起返回json文本
 * ? win11 在22621.1000版本之后失效 具体原因查看https://github.com/kihlh/hmc-win32/issues/36
 */
export declare function getTrayList(): Array<HMC.TRAY_ICON>;
/**
 * 设置文件夹的缩略图
 * @param folderPath 路径
 * @param iconPath 图标路径
 * @param iconIndex 图标索引 比如exe中的0
 * @returns
 */
export declare function setFolderIcon(folderPath: string, iconPath: string, iconIndex?: number): boolean;
export {};
