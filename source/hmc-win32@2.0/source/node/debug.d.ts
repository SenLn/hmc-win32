/// <reference types="node" />
export type Native = {
    /**
     * 获取软链接 硬连接 的内容
     * - 软连接 目标路径
     * - 硬链接 文本数组
     * @param Linkath
     */
    getLinkTarget(Linkath: string): string | string[] | null;
    /**
     * 复制文件/文件夹(调用的资源管理器)
     *
     * @param filePath 原来的文件路径
     * @param newFilePath 新的路径
     * @param isShow 是否显示窗口 [确认删除 并不影响选项4]
     * @param isShowProgress 是否显示进度
     */
    copyFile(filePath: string, newFilePath: string, isShowConfirm: boolean, isShow: boolean, isShowProgress: boolean): boolean;
    /**
     * 移动文件/文件夹(调用的资源管理器)
     *
     * @param filePath 原来的文件路径
     * @param newFilePath 新的路径
     * @param isShow 是否显示窗口 [确认删除 并不影响选项4]
     * @param isShowProgress 是否显示进度
     */
    moveFile(filePath: string, newFilePath: string, isShowConfirm: boolean, isShow: boolean, isShowProgress: boolean): boolean;
    /**
     * 将文件/文件夹  移除到系统回收站中
     * @param Path 处理的路径(\n结尾)
     * @param isRecycle 是否保留撤销权(回收站)
     * @param isShow 是否显示确认窗口
     * @returns 返回操作状态 请参考：
     * @link https://learn.microsoft.com/zh-CN/windows/win32/api/shellapi/nf-shellapi-shfileoperationa
     * @default 默认配置
     * * Recycle true
     * * isShow false
     */
    trashFile(file: string, isRecycle: boolean, isShow: boolean): boolean;
    /**
     * 清空回收站
     * @param RootPath 根目录 空文本为全清空
     * @param isShow 是否显示操作确认
     */
    clearTrash(RootPath: string, isShow: boolean): boolean;
    /**
     * 获取缩略图
     * @param source 源文件
     * @param size 名称
     */
    getThumbnailPng(source: string, size: number, toFile?: string): Buffer | null | boolean;
    /**
     * 创建一个快捷方式
     * @param LnkPath 快捷方式目标路径
     * @param FilePath 目标路径
     * @param work_dir 工作目录
     * @param desc 描述
     * @param args 启动的命令行
     * @param iShowCmd 显示方式
     * @param icon 图标路径
     * @param iconIndex 图标索引
     */
    setShortcutLink(LnkPath: string, FilePath: string, work_dir: string, desc: string, args: string, iShowCmd: number, icon: string, iconIndex: number): boolean;
    /**
     * 电源命令
     * @param command 命令
     */
    powerControl(command: POWER_CONTROL_COMMAND): void;
    /**
     * 创建 软链接/硬链接/目录链接/目录链接点
     * @param command 创建的命令
     * @param targetPath 目标路径
     * @param sourcePath 源路径
     */
    createFsLink(command: MAKE_LINK_PATH, targetPath: string, sourcePath: string): void;
};
declare enum MAKE_LINK_PATH {
    CREATE_DIR_SYMLINK = 166,
    CREATE_SYMLINK = 168,
    CREATE_HARD_LINK = 170,
    CREATE_SYMBOLIC_LINK = 172
}
declare enum POWER_CONTROL_COMMAND {
    EWX_SHUTDOWN = 1001,
    EWX_REBOOT = 1002,
    EWX_LOGOFF = 1003,
    HMC_LOCK_WORK_STATION = 1005,
    SC_MONITORPOWER_OFF = 1006,
    SC_MONITORPOWER_ON = 1007,
    HMC_BEEP = 6660
}
export {};
