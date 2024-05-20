"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// source/mian/chcpList.ts
var chcpList;
var init_chcpList = __esm({
  "source/mian/chcpList.ts"() {
    "use strict";
    chcpList = {
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
      1e4: "macintosh",
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
      12e3: "utf-32",
      12001: "utf-32BE",
      2e4: "x-Chinese_CNS",
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
      65e3: "utf-7",
      65001: "utf-8"
    };
  }
});

// source/mian/vkKey.ts
function installKeyboardcodeComparisonTable() {
  KeyboardcodeEmenList.forEach(function(value, key) {
    if (value.length == 5) {
      if (value[4])
        for (let index = 0; index < value[4].length; index++) {
          const of_value = value[4][index];
          KeyboardcodeComparisonTable.set(of_value.toUpperCase(), key);
        }
    }
    if (typeof value[0] == "string") {
      KeyboardcodeComparisonTable.set(value[0].toUpperCase(), key);
    }
    if (typeof value[1] == "string") {
      KeyboardcodeComparisonTable.set(value[1].toUpperCase(), key);
    }
  });
}
function vkKey(key) {
  if (typeof key == "number")
    return key;
  if (typeof key == "string") {
    key = key.toUpperCase();
    if (!KeyboardcodeComparisonTable.size)
      installKeyboardcodeComparisonTable();
    if (KeyboardcodeComparisonTable == null ? void 0 : KeyboardcodeComparisonTable.has(key)) {
      return KeyboardcodeComparisonTable.get(key) || null;
    }
  }
  return null;
}
var KeyboardcodeComparisonTable, KeyboardVKcodeEmenList, KeyboardcodeEmenList;
var init_vkKey = __esm({
  "source/mian/vkKey.ts"() {
    "use strict";
    KeyboardcodeComparisonTable = /* @__PURE__ */ new Map();
    KeyboardVKcodeEmenList = [
      // key ,code , keyCode , VirtualKey
      ["0", "Digit0", 48, 48],
      ["1", "Digit1", 49, 49],
      ["2", "Digit2", 50, 50],
      ["3", "Digit3", 51, 51],
      ["4", "Digit4", 52, 52],
      ["5", "Digit5", 53, 53],
      ["6", "Digit6", 54, 54],
      ["7", "Digit7", 55, 55],
      ["8", "Digit8", 56, 56],
      ["9", "Digit9", 57, 57],
      ["A", "KeyA", 65, 65],
      ["B", "KeyB", 66, 66],
      ["C", "KeyC", 67, 67],
      ["D", "KeyD", 68, 68],
      ["E", "KeyE", 69, 69],
      ["F", "KeyF", 70, 70],
      ["G", "KeyG", 71, 71],
      ["H", "KeyH", 72, 72],
      ["I", "KeyI", 73, 73],
      ["J", "KeyJ", 74, 74],
      ["K", "KeyK", 75, 75],
      ["L", "KeyL", 76, 76],
      ["M", "KeyM", 77, 77],
      ["N", "KeyN", 78, 78],
      ["O", "KeyO", 79, 79],
      ["P", "KeyP", 80, 80],
      ["Q", "KeyQ", 81, 81],
      ["R", "KeyR", 82, 82],
      ["S", "KeyS", 83, 83],
      ["T", "KeyT", 84, 84],
      ["U", "KeyU", 85, 85],
      ["V", "KeyV", 86, 86],
      ["W", "KeyW", 87, 87],
      ["X", "KeyX", 88, 88],
      ["Y", "KeyY", 89, 89],
      ["Z", "KeyZ", 90, 90],
      ["0", "Numpad0", 96, 96],
      ["1", "Numpad1", 97, 97],
      ["2", "Numpad2", 98, 98],
      ["3", "Numpad3", 99, 99],
      ["4", "Numpad4", 100, 100],
      ["5", "Numpad5", 101, 101],
      ["6", "Numpad6", 102, 102],
      ["7", "Numpad7", 103, 103],
      ["8", "Numpad8", 104, 104],
      ["9", "Numpad9", 105, 105],
      ["Alt", "Alt", 18, 18],
      ["Alt", "AltLeft", 164, 164],
      ["Alt", "AltRight", 165, 165],
      ["CapsLock", "CapsLock", 20, 20],
      ["Control", "Control", 17, 17, ["ctrl"]],
      ["Control", "ControlLeft", 162, 162, ["ctrl"]],
      ["Control", "ControlRight", 163, 163, ["ctrl"]],
      ["Win", "MetaLeft", 91, 91],
      ["Win", "MetaRight", 92, 92],
      ["NumLock", "NumLock", 144, 144],
      ["ScrollLock", null, 145, 145],
      ["Shift", "Shift", 16, 16],
      ["Shift", "ShiftLeft", 160, 160],
      ["Shift", "ShiftRight", 161, 161],
      ["Enter", "Enter", 13, 13, ["\r\n", "\r", "\n"]],
      ["Tab", "Tab", 9, 9],
      ["Space", "Space", 32, 32],
      ["ArrowDown", null, 40, 40],
      ["ArrowLeft", null, 37, 37],
      ["ArrowRight", null, 39, 39],
      ["ArrowUp", null, 38, 38],
      ["End", "End", 35, 35],
      ["Home", "Home", 36, 36],
      ["PageDown", null, 34, 34],
      ["PageUp", null, 33, 33],
      ["Backspace", null, 8, 8],
      ["Clear", null, 12, 12],
      ["Clear", null, 254, 254],
      ["CrSel", null, 247, 247],
      ["Delete", null, 46, 46],
      ["EraseEof", null, 249, 249],
      ["ExSel", null, 248, 248],
      ["Insert", null, 45, 45],
      ["Accept", null, 30, 30],
      ["ContextMenu", null, 93, 93],
      ["Escape", null, 27, 27, ["esc"]],
      ["Execute", null, 43, 43],
      ["Finish", null, 241, 241],
      ["Help", null, 47, 47],
      ["Pause", null, 19, 19],
      ["Play", null, 250, 250],
      ["Select", null, 41, 41],
      ["PrintScreen", null, 44, 44],
      ["Standby", null, 95, 95],
      ["Alphanumeric", null, 240, 240],
      ["Convert", null, 28, 28],
      ["FinalMode", null, 24, 24],
      ["ModeChange", null, 31, 31],
      ["NonConvert", null, 29, 29],
      ["Process", null, 229, 229],
      ["HangulMode", null, 21, 21],
      ["HanjaMode", null, 25, 25],
      ["JunjaMode", null, 23, 23],
      ["Hankaku", null, 243, 243],
      ["Hiragana", null, 242, 242],
      ["KanaMode", null, 246, 246],
      ["Romaji", null, 245, 245],
      ["Zenkaku", null, 244, 244],
      ["F1", null, 112, 112],
      ["F2", null, 113, 113],
      ["F3", null, 114, 114],
      ["F4", null, 115, 115],
      ["F5", null, 116, 116],
      ["F6", null, 117, 117],
      ["F7", null, 118, 118],
      ["F8", null, 119, 119],
      ["F9", null, 120, 120],
      ["F10", null, 121, 121],
      ["F11", null, 122, 122],
      ["F12", null, 123, 123],
      ["F13", null, 124, 124],
      ["F14", null, 125, 125],
      ["F15", null, 126, 126],
      ["F16", null, 127, 127],
      ["F17", null, 128, 128],
      ["F18", null, 129, 129],
      ["F19", null, 130, 130],
      ["F20", null, 131, 131],
      ["MediaPlayPause", null, 179, 179],
      ["MediaStop", null, 178, 178],
      ["MediaTrackNext", null, 176, 176],
      ["MediaTrackPrevious", null, 177, 177],
      ["AudioVolumeDown", null, 174, 174],
      ["AudioVolumeMute", null, 173, 173],
      ["AudioVolumeUp", null, 175, 175],
      ["ZoomToggle", null, 251, 251],
      ["LaunchMail", null, 180, 180],
      ["LaunchMediaPlayer", null, 181, 181],
      ["LaunchApplication1", null, 182, 182],
      ["LaunchApplication2", null, 183, 183],
      ["BrowserBack", null, 166, 166],
      ["BrowserFavorites", null, 171, 171],
      ["BrowserForward", null, 167, 167],
      ["BrowserHome", null, 172, 172],
      ["BrowserRefresh", null, 168, 168],
      ["BrowserSearch", null, 170, 170],
      ["BrowserStop", null, 169, 169],
      [".", "NumpadDecimal", 110, 110],
      ["*", "NumpadMultiply", 106, 106],
      ["+", "NumpadAdd", 107, 107],
      ["/", "NumpadDivide", 111, 111],
      ["-", "NumpadSubtract", 109, 109],
      ["Separator", null, 108, 108, [" "]],
      [";", "Semicolon", 186, 186],
      ["+", "Equal", 187, 187],
      [",", "Comma", 188, 188],
      ["-", "Minus", 189, 189],
      [".", "Period", 190, 190],
      ["/", "Slash", 191, 191],
      ["`", "Backquote", 192, 192],
      ["[", "BracketLeft", 219, 219],
      ["\\", "Backslash", 220, 220],
      ["]", "BracketRight", 221, 221],
      ["'", "Quote", 222, 222],
      ["Enter", "NumpadEnter", 224, 224]
    ];
    KeyboardcodeEmenList = (() => {
      let data = /* @__PURE__ */ new Map();
      for (let index = 0; index < KeyboardVKcodeEmenList.length; index++) {
        const [VK_key2, VK_code2, VK_keyCode2, VK_VirtualKey2, VK_Nickname] = KeyboardVKcodeEmenList[index];
        data.set(VK_VirtualKey2, KeyboardVKcodeEmenList[index]);
      }
      return data;
    })();
  }
});

// source/mian/hmc2.ts
var hmc2_exports = {};
__export(hmc2_exports, {
  HMCC: () => HMCC,
  asyncTaskQueue: () => asyncTaskQueue,
  captureBmp2: () => captureBmp2,
  captureBmp2Sync: () => captureBmp2Sync,
  captureBmpToBuff: () => captureBmpToBuff,
  captureBmpToFile: () => captureBmpToFile,
  clearClipboard: () => clearClipboard,
  closeWindow2: () => closeWindow2,
  closeWindow2Sync: () => closeWindow2Sync,
  getClipboardFilePaths: () => getClipboardFilePaths,
  getClipboardText: () => getClipboardText,
  getThumbnailPng: () => getThumbnailPng,
  getTrayList: () => getTrayList,
  native2: () => native2,
  readElectronHandle: () => readElectronHandle,
  setClipboardFilePaths: () => setClipboardFilePaths,
  setClipboardText: () => setClipboardText,
  setFolderIcon: () => setFolderIcon,
  showContextMenu: () => showContextMenu
});
async function closeWindow2(handle, grade) {
  if (!(native2 == null ? void 0 : native2.closeWindow2)) {
    return Promise.resolve(false);
  }
  return asyncTaskQueue.runTask(native2.closeWindow2, handle, grade);
}
function closeWindow2Sync(handle, grade) {
  return (native2 == null ? void 0 : native2.closeWindow2Sync) ? native2 == null ? void 0 : native2.closeWindow2Sync(ref.int(handle), grade || 1) : false;
}
function getThumbnailPng(...args) {
  if (!args.length || typeof args[0] != "string")
    return null;
  if (args.length == 3 && typeof args[1] != "string")
    return false;
  if (args.length <= 2) {
    return native2.getThumbnailPng ? native2.getThumbnailPng(ref.string(args[0]), ref.int(args[1] || 256)) : null;
  }
  if (args.length == 3) {
    return native2.getThumbnailPng ? native2.getThumbnailPng(ref.string(args[0]), ref.string(args[1]), ref.int(args[2] || 256)) : false;
  }
  return null;
}
function captureBmpToBuff(x, y, nScopeWidth, nScopeHeight) {
  return (native2 == null ? void 0 : native2.captureBmpToBuff) ? native2 == null ? void 0 : native2.captureBmpToBuff(ref.int(x || 0), ref.int(y || 0), ref.int(nScopeWidth || 0), ref.int(nScopeHeight || 0)) : null;
}
function captureBmpToFile(path2, x, y, nScopeWidth, nScopeHeight) {
  return (native2 == null ? void 0 : native2.captureBmpToFile) ? native2 == null ? void 0 : native2.captureBmpToFile(ref.string(path2), ref.int(x || 0), ref.int(y || 0), ref.int(nScopeWidth || 0), ref.int(nScopeHeight || 0)) : void 0;
}
function showContextMenu(hwnd, file, x, y) {
  return (native2 == null ? void 0 : native2.showContextMenu) ? native2 == null ? void 0 : native2.showContextMenu(
    ref.int(hwnd || 0),
    Array.isArray(file) ? file : ref.string(file),
    ref.int(x || 0),
    ref.int(y || 0)
  ) : false;
}
function readElectronHandle(handleBuffer) {
  let num = 0;
  if (typeof BigInt != "undefined") {
    let handleBigInt = handleBuffer.readBigUInt64LE();
    return Number(handleBigInt);
  } else {
    if (process.platform == "win32") {
      num = handleBuffer.readUInt32LE();
    } else if (process.platform == "darwin") {
      num = handleBuffer.readUInt32LE(0) + 2 * 32 * handleBuffer.readUInt32LE(4);
    } else {
      num = handleBuffer.readUInt32LE(0) + 2 * 32 * handleBuffer.readUInt32LE(4);
    }
    return num;
  }
  return num;
}
function getClipboardFilePaths() {
  const result = [];
  if (!native2.getClipboardFilePaths)
    return result;
  const temp = native2.getClipboardFilePaths().split("\0");
  if (temp.length && temp.at(-1) == "")
    temp.pop();
  return temp;
}
function setClipboardText(text, is_html) {
  if (!native2.setClipboardText)
    return false;
  return native2.setClipboardText(ref.string(text), is_html || false);
}
function getClipboardText() {
  if (!native2.getClipboardText)
    return null;
  return native2.getClipboardText();
}
function clearClipboard() {
  if (!native2.clearClipboard)
    return false;
  return native2.clearClipboard();
}
function setClipboardFilePaths(paths) {
  if (!native2.setClipboardFilePaths)
    return false;
  return native2.setClipboardFilePaths(Array.isArray(paths) ? ref.stringArray(paths) : ref.string(paths));
}
function getTrayList() {
  if (!native2.getTrayList)
    return [];
  return JSON.parse(native2.getTrayList());
}
function setFolderIcon(folderPath, iconPath, iconIndex) {
  if (!native2.setFolderIcon)
    return false;
  return native2.setFolderIcon(ref.string(folderPath), ref.string(iconPath), ref.int(iconIndex || 0));
}
async function captureBmp2(...args) {
  if (!native2.captureBmp2)
    return Promise.resolve(null);
  if (!args.length) {
    return native2.captureBmp2();
  }
  if (args.length == 1) {
    if (typeof args[0] == "number" || typeof args[0] == "object") {
      return native2.captureBmp2(ref.int(args[0]));
    }
    return native2.captureBmp2(ref.string(args[0]));
  }
  if (args.length == 2) {
    return native2.captureBmp2(ref.int(args[0]), ref.string(args[1]));
  }
  if (args.length == 4) {
    return native2.captureBmp2(ref.int(args[0]), ref.int(args[1]), ref.int(args[2]), ref.int(args[3]));
  }
  if (args.length == 5) {
    return native2.captureBmp2(ref.string(args[0]), ref.int(args[1]), ref.int(args[2]), ref.int(args[3]), ref.int(args[4]));
  }
  return Promise.resolve(null);
}
function captureBmp2Sync(...args) {
  if (!native2.captureBmp2Sync)
    return null;
  if (!args.length) {
    return native2.captureBmp2Sync();
  }
  if (args.length == 1) {
    if (typeof args[0] == "number" || typeof args[0] == "object") {
      return native2.captureBmp2Sync(ref.int(args[0]));
    }
    return native2.captureBmp2Sync(ref.string(args[0]));
  }
  if (args.length == 2) {
    return native2.captureBmp2Sync(ref.int(args[0]), ref.string(args[1]));
  }
  if (args.length == 4) {
    return native2.captureBmp2Sync(ref.int(args[0]), ref.int(args[1]), ref.int(args[2]), ref.int(args[3]));
  }
  if (args.length == 5) {
    return native2.captureBmp2Sync(ref.string(args[0]), ref.int(args[1]), ref.int(args[2]), ref.int(args[3]), ref.int(args[4]));
  }
  return null;
}
var HMCC, get_native, native2, AsyncFunctionTaskQueue, asyncTaskQueue;
var init_hmc2 = __esm({
  "source/mian/hmc2.ts"() {
    "use strict";
    init_hmc();
    ((HMCC3) => {
      let FS_MK_LINK_TARGET_TYPE;
      ((FS_MK_LINK_TARGET_TYPE2) => {
        FS_MK_LINK_TARGET_TYPE2[FS_MK_LINK_TARGET_TYPE2["CREATE_DIR_SYMLINK"] = 166] = "CREATE_DIR_SYMLINK";
        FS_MK_LINK_TARGET_TYPE2[FS_MK_LINK_TARGET_TYPE2["CREATE_SYMLINK"] = 168] = "CREATE_SYMLINK";
        FS_MK_LINK_TARGET_TYPE2[FS_MK_LINK_TARGET_TYPE2["CREATE_HARD_LINK"] = 170] = "CREATE_HARD_LINK";
        FS_MK_LINK_TARGET_TYPE2[FS_MK_LINK_TARGET_TYPE2["CREATE_SYMBOLIC_LINK"] = 172] = "CREATE_SYMBOLIC_LINK";
      })(FS_MK_LINK_TARGET_TYPE = HMCC3.FS_MK_LINK_TARGET_TYPE || (HMCC3.FS_MK_LINK_TARGET_TYPE = {}));
    })(HMCC || (HMCC = {}));
    get_native = (binPath) => {
      function _require_bin() {
        try {
          if (binPath)
            return require(binPath);
          if (process.arch.match(/^x32|ia32$/))
            return require("./bin/HMC@Beta_x86.node");
          if (process.arch.match(/^x64$/))
            return require("./bin/HMC@Beta_x64.node");
        } catch (O_O) {
        }
        return null;
      }
      let Native = (process.platform == "win32" ? _require_bin() : null) || {};
      return Native;
    };
    native2 = get_native();
    AsyncFunctionTaskQueue = class {
      constructor() {
        this.queues = /* @__PURE__ */ new Map();
      }
      async runTask(fn, ...args) {
        if (!this.queues.has(fn)) {
          this.queues.set(fn, {
            queue: [],
            executing: false
          });
        }
        const queueObj = this.queues.get(fn);
        return new Promise((resolve, reject) => {
          queueObj.queue.push({ args, resolve, reject });
          this.next(fn);
        });
      }
      async next(fn) {
        const queueObj = this.queues.get(fn);
        if (queueObj.executing || queueObj.queue.length === 0) {
          return;
        }
        const { args, resolve, reject } = queueObj.queue.shift();
        queueObj.executing = true;
        try {
          const result = await fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          queueObj.executing = false;
          this.next(fn);
        }
      }
    };
    asyncTaskQueue = new AsyncFunctionTaskQueue();
  }
});

// ../node_modules/argv-split/split.js
var require_split = __commonJS({
  "../node_modules/argv-split/split.js"(exports, module2) {
    "use strict";
    var _CHARS;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    module2.exports = split;
    var MATRIX = {
      // object is more readable than multi-dim array.
      0: [a, suq, a, a, a, EOF],
      1: [eaue, aue, eaue, aue, aue, ue],
      2: [e, a, duq, a, a, EOF],
      3: [eaue, aue, aue, aue, eaue, ue],
      4: [e, sq, dq, a, tp, EOF]
    };
    var escaped = false;
    var single_quoted = false;
    var double_quoted = false;
    var ended = false;
    var FLAGS = {
      2: 0,
      5: 1,
      4: 2,
      1: 3,
      0: 4
    };
    function y() {
      var sum = 0;
      if (escaped) {
        sum++;
      }
      if (single_quoted) {
        sum += 2;
      }
      if (double_quoted) {
        sum += 4;
      }
      return FLAGS[sum];
    }
    var BACK_SLASH = "\\";
    var SINGLE_QUOTE = "'";
    var DOUBLE_QUOTE = '"';
    var WHITE_SPACE = " ";
    var CARRIAGE_RETURN = "\n";
    function x() {
      return c in CHARS ? CHARS[c] : CHARS.NORMAL;
    }
    var CHARS = (_CHARS = {}, _defineProperty(_CHARS, BACK_SLASH, 0), _defineProperty(_CHARS, SINGLE_QUOTE, 1), _defineProperty(_CHARS, DOUBLE_QUOTE, 2), _defineProperty(_CHARS, "NORMAL", 3), _defineProperty(_CHARS, WHITE_SPACE, 4), _defineProperty(_CHARS, CARRIAGE_RETURN, 5), _CHARS);
    var c = "";
    var stash = "";
    var ret = [];
    function reset() {
      escaped = false;
      single_quoted = false;
      double_quoted = false;
      ended = false;
      c = "";
      stash = "";
      ret.length = 0;
    }
    function a() {
      stash += c;
    }
    function sq() {
      single_quoted = true;
    }
    function suq() {
      single_quoted = false;
    }
    function dq() {
      double_quoted = true;
    }
    function duq() {
      double_quoted = false;
    }
    function e() {
      escaped = true;
    }
    function ue() {
      escaped = false;
    }
    function aue() {
      stash += BACK_SLASH + c;
      escaped = false;
    }
    function eaue() {
      stash += c;
      escaped = false;
    }
    function tp() {
      if (stash) {
        ret.push(stash);
        stash = "";
      }
    }
    function EOF() {
      ended = true;
    }
    function split(str) {
      if (typeof str !== "string") {
        type_error("Str must be a string. Received " + str, "NON_STRING");
      }
      reset();
      var length = str.length;
      var i = -1;
      while (++i < length) {
        c = str[i];
        MATRIX[y()][x()]();
        if (ended) {
          break;
        }
      }
      if (single_quoted) {
        error("unmatched single quote", "UNMATCHED_SINGLE");
      }
      if (double_quoted) {
        error("unmatched double quote", "UNMATCHED_DOUBLE");
      }
      if (escaped) {
        error("unexpected end with \\", "ESCAPED_EOF");
      }
      tp();
      return ret;
    }
    function error(message, code) {
      var err = new Error(message);
      err.code = code;
      throw err;
    }
    function type_error(message, code) {
      var err = new TypeError(message);
      err.code = code;
      throw err;
    }
  }
});

// source/mian/hmc.ts
var hmc_exports = {};
__export(hmc_exports, {
  Auto: () => Auto,
  Clipboard: () => Clipboard,
  Environment: () => Environment,
  HMC: () => HMC,
  HWND: () => HWND2,
  MessageError: () => MessageError,
  MessageStop: () => MessageStop,
  Process: () => Process,
  PromiseSP: () => PromiseSP,
  PromiseSession: () => PromiseSession,
  Registr: () => Registr,
  SetBlockInput: () => SetBlockInput,
  SetSystemHOOK: () => SetSystemHOOK,
  SetWindowInTaskbarVisible: () => SetWindowInTaskbarVisible,
  Shell: () => Shell,
  Sleep: () => Sleep,
  Usb: () => Usb,
  Watch: () => Watch,
  WatchWindowForeground: () => WatchWindowForeground,
  WatchWindowPoint: () => WatchWindowPoint,
  WebView2OnlineInstall: () => WebView2OnlineInstall,
  Window: () => Window,
  _KeyboardcodeComparisonTable: () => _KeyboardcodeComparisonTable,
  _KeyboardcodeEmenList: () => _KeyboardcodeEmenList,
  _popen: () => _popen,
  alert: () => alert,
  analysisDirectPath: () => analysisDirectPath,
  beta: () => beta,
  captureBmp2: () => captureBmp2,
  captureBmp2Sync: () => captureBmp2Sync,
  captureBmpToBuff: () => captureBmpToBuff,
  captureBmpToFile: () => captureBmpToFile,
  clearClipboard: () => clearClipboard2,
  closeWindow: () => closeWindow,
  closeWindow2: () => closeWindow2,
  closeWindow2Sync: () => closeWindow2Sync,
  closedHandle: () => closedHandle,
  confirm: () => confirm,
  createDirSymlink: () => createDirSymlink,
  createHardLink: () => createHardLink,
  createMutex: () => createMutex,
  createPathRegistr: () => createPathRegistr,
  createSymlink: () => createSymlink,
  default: () => hmc_default,
  deleteFile: () => deleteFile,
  desc: () => desc,
  enumAllProcessHandle: () => enumAllProcessHandle,
  enumChildWindows: () => enumChildWindows,
  enumProcessHandle: () => enumProcessHandle,
  enumRegistrKey: () => enumRegistrKey,
  escapeEnvVariable: () => escapeEnvVariable,
  existProcess2: () => existProcess2,
  existProcess2Sync: () => existProcess2Sync,
  findProcess: () => findProcess,
  findProcess2: () => findProcess2,
  findProcess2Sync: () => findProcess2Sync,
  findWindow: () => findWindow,
  findWindowEx: () => findWindowEx,
  formatVolumePath: () => formatVolumePath,
  freePort: () => freePort,
  getAllEnv: () => getAllEnv,
  getAllProcessList2: () => getAllProcessList2,
  getAllProcessList2Sync: () => getAllProcessList2Sync,
  getAllProcessListNt2: () => getAllProcessListNt2,
  getAllProcessListNt2Sync: () => getAllProcessListNt2Sync,
  getAllProcessListSnp2: () => getAllProcessListSnp2,
  getAllProcessListSnp2Sync: () => getAllProcessListSnp2Sync,
  getAllProcessListSnpSession2: () => getAllProcessListSnpSession2,
  getAllProcessListSnpSession2Sync: () => getAllProcessListSnpSession2Sync,
  getAllWindows: () => getAllWindows,
  getAllWindowsHandle: () => getAllWindowsHandle,
  getBasicKeys: () => getBasicKeys,
  getClipboardFilePaths: () => getClipboardFilePaths2,
  getClipboardHTML: () => getClipboardHTML,
  getClipboardInfo: () => getClipboardInfo,
  getClipboardSequenceNumber: () => getClipboardSequenceNumber,
  getClipboardText: () => getClipboardText2,
  getColor: () => getColor,
  getConsoleHandle: () => getConsoleHandle,
  getCurrentMonitorRect: () => getCurrentMonitorRect,
  getCursorPos: () => getCursorPos,
  getDetailsProcessList: () => getDetailsProcessList,
  getDetailsProcessList2: () => getDetailsProcessList2,
  getDetailsProcessNameList: () => getDetailsProcessNameList,
  getDeviceCaps: () => getDeviceCaps,
  getDeviceCapsAll: () => getDeviceCapsAll,
  getForegroundWindow: () => getForegroundWindow,
  getForegroundWindowProcessID: () => getForegroundWindowProcessID,
  getHandleProcessID: () => getHandleProcessID,
  getHidUsbList: () => getHidUsbList,
  getLastInputTime: () => getLastInputTime,
  getMainWindow: () => getMainWindow,
  getMetrics: () => getMetrics,
  getModulePathList: () => getModulePathList,
  getMouseMovePoints: () => getMouseMovePoints,
  getNumberRegKey: () => getNumberRegKey,
  getPointWindow: () => getPointWindow,
  getPointWindowMain: () => getPointWindowMain,
  getPointWindowName: () => getPointWindowName,
  getPointWindowProcessId: () => getPointWindowProcessId,
  getProcessCommand2: () => getProcessCommand2,
  getProcessCommand2Sync: () => getProcessCommand2Sync,
  getProcessCwd2: () => getProcessCwd2,
  getProcessCwd2Sync: () => getProcessCwd2Sync,
  getProcessFilePath: () => getProcessFilePath,
  getProcessFilePath2: () => getProcessFilePath2,
  getProcessFilePath2Sync: () => getProcessFilePath2Sync,
  getProcessHandle: () => getProcessHandle,
  getProcessList: () => getProcessList,
  getProcessName: () => getProcessName,
  getProcessName2: () => getProcessName2,
  getProcessName2Sync: () => getProcessName2Sync,
  getProcessNameList: () => getProcessNameList,
  getProcessNameNt2: () => getProcessNameNt2,
  getProcessNameNt2Sync: () => getProcessNameNt2Sync,
  getProcessNameSnp2: () => getProcessNameSnp2,
  getProcessNameSnp2Sync: () => getProcessNameSnp2Sync,
  getProcessParentProcessID: () => getProcessParentProcessID,
  getProcessParentProcessMatch2: () => getProcessParentProcessMatch2,
  getProcessParentProcessMatch2Sync: () => getProcessParentProcessMatch2Sync,
  getProcessStartTime: () => getProcessStartTime,
  getProcessThreadList: () => getProcessThreadList,
  getProcessWindow: () => getProcessWindow,
  getProcessidFilePath: () => getProcessidFilePath,
  getRealGlobalVariableList: () => getRealGlobalVariableList,
  getRegistrBuffValue: () => getRegistrBuffValue,
  getRegistrDword: () => getRegistrDword,
  getRegistrFolderStat: () => getRegistrFolderStat,
  getRegistrQword: () => getRegistrQword,
  getRegistrValue: () => getRegistrValue,
  getRegistrValueStat: () => getRegistrValueStat,
  getShortcutLink: () => getShortcutLink,
  getStringRegKey: () => getStringRegKey,
  getSubProcessID: () => getSubProcessID,
  getSystemIdleTime: () => getSystemIdleTime,
  getSystemKeyList: () => getSystemKeyList,
  getSystemMenu: () => getSystemMenu,
  getSystemMetricsLen: () => getSystemMetricsLen,
  getSystemVariable: () => getSystemVariable,
  getTCPPortProcessID: () => getTCPPortProcessID,
  getThumbnailPng: () => getThumbnailPng,
  getTrayList: () => getTrayList2,
  getUDPPortProcessID: () => getUDPPortProcessID,
  getUsbDevsInfo: () => getUsbDevsInfo,
  getUserKeyList: () => getUserKeyList,
  getUserVariable: () => getUserVariable,
  getVariableAll: () => getVariableAll,
  getVariableAnalysis: () => getVariableAnalysis,
  getVolumeList: () => getVolumeList,
  getWebView2Info: () => getWebView2Info,
  getWindowClassName: () => getWindowClassName,
  getWindowProcess: () => getWindowProcess,
  getWindowRect: () => getWindowRect,
  getWindowStyle: () => getWindowStyle,
  getWindowTitle: () => getWindowTitle,
  getenv: () => getenv,
  hasKeyActivate: () => hasKeyActivate,
  hasKeyExists: () => hasKeyExists,
  hasMouseBtnActivate: () => hasMouseBtnActivate,
  hasMouseLeftActivate: () => hasMouseLeftActivate,
  hasMouseMiddleActivate: () => hasMouseMiddleActivate,
  hasMouseRightActivate: () => hasMouseRightActivate,
  hasMutex: () => hasMutex,
  hasPortTCP: () => hasPortTCP,
  hasPortUDP: () => hasPortUDP,
  hasProcess: () => hasProcess,
  hasRegistrKey: () => hasRegistrKey,
  hasSysKeyExists: () => hasSysKeyExists,
  hasUseKeyExists: () => hasUseKeyExists,
  hasWebView2: () => hasWebView2,
  hasWindowTop: () => hasWindowTop,
  hideConsole: () => hideConsole,
  hmc: () => hmc,
  isAdmin: () => isAdmin,
  isEnabled: () => isEnabled,
  isHandle: () => isHandle,
  isHandleWindowVisible: () => isHandleWindowVisible,
  isInMonitorWindow: () => isInMonitorWindow,
  isMouseMonitorWindow: () => isMouseMonitorWindow,
  isProcess: () => isProcess,
  isRegistrTreeKey: () => isRegistrTreeKey,
  isSystemX64: () => isSystemX64,
  isWindowTop: () => isWindowTop,
  isWindowVisible: () => isWindowVisible,
  keyboardHook: () => keyboardHook,
  killProcess: () => killProcess,
  killProcessName: () => killProcessName,
  leftClick: () => leftClick,
  listRegistrPath: () => listRegistrPath,
  lookHandleCloseWindow: () => lookHandleCloseWindow,
  lookHandleGetTitle: () => lookHandleGetTitle,
  lookHandleSetTitle: () => lookHandleSetTitle,
  lookHandleShowWindow: () => lookHandleShowWindow,
  messageBox: () => messageBox,
  mouse: () => mouse,
  mouseHook: () => mouseHook,
  native: () => native,
  native2: () => native2,
  openApp: () => openApp,
  openExternal: () => openExternal,
  openPath: () => openPath,
  openURL: () => openURL,
  platform: () => platform,
  popen: () => popen,
  powerControl: () => powerControl,
  processWatchdog: () => processWatchdog,
  putSystemVariable: () => putSystemVariable,
  putUserVariable: () => putUserVariable,
  putenv: () => putenv,
  readElectronHandle: () => readElectronHandle,
  ref: () => ref,
  registr: () => registr,
  removeStringRegKey: () => removeStringRegKey,
  removeStringRegKeyWalk: () => removeStringRegKeyWalk,
  removeStringRegValue: () => removeStringRegValue,
  removeStringTree: () => removeStringTree,
  removeSystemVariable: () => removeSystemVariable,
  removeUserVariable: () => removeUserVariable,
  removeVariable: () => removeVariable,
  rightClick: () => rightClick,
  sendBasicKeys: () => sendBasicKeys,
  sendKeyboard: () => sendKeyboard,
  sendKeyboardSequence: () => sendKeyboardSequence,
  setClipboardFilePaths: () => setClipboardFilePaths2,
  setClipboardText: () => setClipboardText2,
  setCloseWindow: () => setCloseWindow,
  setCursorPos: () => setCursorPos,
  setHandleTransparent: () => setHandleTransparent,
  setLimitMouseRange: () => setLimitMouseRange,
  setRegistrDword: () => setRegistrDword,
  setRegistrKey: () => setRegistrKey,
  setRegistrQword: () => setRegistrQword,
  setRegistrValue: () => setRegistrValue,
  setShortcutLink: () => setShortcutLink,
  setShowWindow: () => setShowWindow,
  setSystemVariable: () => setSystemVariable,
  setUserVariable: () => setUserVariable,
  setWindowEnabled: () => setWindowEnabled,
  setWindowFocus: () => setWindowFocus,
  setWindowIconForExtract: () => setWindowIconForExtract,
  setWindowMode: () => setWindowMode,
  setWindowShake: () => setWindowShake,
  setWindowTitle: () => setWindowTitle,
  setWindowTop: () => setWindowTop,
  showConsole: () => showConsole,
  showContextMenu: () => showContextMenu,
  showMonitors: () => showMonitors,
  shutMonitors: () => shutMonitors,
  sleep: () => sleep,
  system: () => system,
  systemChcp: () => systemChcp,
  systemStartTime: () => systemStartTime,
  trash: () => trash,
  updateThis: () => updateThis,
  updateWindow: () => updateWindow,
  version: () => version,
  watchClipboard: () => watchClipboard,
  watchUSB: () => watchUSB,
  windowJitter: () => windowJitter
});
module.exports = __toCommonJS(hmc_exports);
function getDefaultTitele() {
  try {
    return globalThis.document.title;
  } catch (error) {
    return native.lookHandleGetTitle(native.getProcessHandle(process.pid) || 0) || getProcessName2Sync(process.pid) || process.title;
  }
}
function PromiseSP(SessionID, format, Callback) {
  const new_format = typeof format != "function" ? function(a) {
    return (a == null ? void 0 : a[0]) || null;
  } : format;
  let result;
  try {
    if (typeof SessionID == "number") {
      if (typeof Callback == "function") {
        new PromiseSession(SessionID).to_callback(new_format, function(...data) {
          Callback(null, ...data);
        });
        return void 0;
      }
      result = new PromiseSession(SessionID).to_Promise(new_format);
      return result;
    }
    if (typeof Callback == "function") {
      SessionID.then((data) => {
        Callback(null, new_format(data));
      }).catch((err) => Callback(err, null));
      return void 0;
    } else {
      return SessionID.then(new_format);
    }
  } catch (error) {
    if (typeof Callback == "function") {
      Callback(Error(error + ""), null);
    } else {
      return Promise.reject(Error(error + ""));
    }
  }
}
function analysisDirectPath(Path, atkey) {
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
function systemChcp() {
  let result = { code: 437, chcp: chcpList[437] };
  return new Promise((resolve) => {
    child_process.execFile("chcp", function(err, data) {
      if (!data || err)
        return resolve(result);
      let sy_Chcp = data.match(/^.+?(\d+)[\r\n]+$/);
      if (sy_Chcp && chcpList[Number(sy_Chcp[1])]) {
        result.chcp = chcpList[Number(sy_Chcp[1])];
        result.code = Number(sy_Chcp[1]);
        resolve(result);
      }
      resolve(result);
    });
  });
}
function setWindowMode(HWND3, x, y, width, height) {
  if (!ref.int(HWND3))
    return false;
  if (x && typeof x == "object") {
    let SetWindowRect = x;
    SetWindowRect.y = SetWindowRect.top ? SetWindowRect.top : SetWindowRect.y || 0;
    SetWindowRect.x = SetWindowRect.right ? SetWindowRect.right : SetWindowRect.x || 0;
    if (SetWindowRect.x)
      x = SetWindowRect.x;
    if (SetWindowRect.y)
      y = SetWindowRect.y;
    if (SetWindowRect.width)
      width = SetWindowRect.width;
    if (SetWindowRect.height)
      height = SetWindowRect.height;
  }
  if (!width)
    width = 0;
  if (!height)
    height = 0;
  return native.setWindowMode(
    ref.int(HWND3),
    x == null ? null : ref.int(x),
    y == null ? null : ref.int(y),
    ref.int(width),
    ref.int(height)
  );
}
function has_reg_args(HKEY, Path, funName) {
  let hasHKEY = new RegExp("^".concat(Object.keys(Hkey).join("|"), "$")).exec(HKEY);
  if (!hasHKEY || !Path) {
    throw new Error("\n        <fun> ".concat(funName, "  \n        argument size 2 or 3\n        HKEY : ").concat(Object.keys(Hkey), '\n        Path : string\n        key ?: string  or "" or undefined\n        '));
  }
}
function hasRegistrKey(HKEY, Path, key) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "hasRegistrKey");
  return native.getRegistrValueStat(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key)
  ) ? true : false;
}
function setRegistrQword(HKEY, Path, key, Qword) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "hasRegistrKey");
  if (!Qword)
    Qword = BigInt(0);
  return native.setRegistrValue(HKEY, ref.string(Path), ref.string(key), BigInt(Qword), void 0);
}
function setRegistrDword(HKEY, Path, key, Dword) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "hasRegistrKey");
  return native.setRegistrValue(HKEY, ref.string(Path), ref.string(key), ref.int(Dword), void 0);
}
function getRegistrQword(HKEY, Path, key) {
  var _a;
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "getRegistrQword");
  const data = (_a = native.getRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key || "")
  )) == null ? void 0 : _a.data;
  if (typeof data == "number")
    return BigInt(ref.int(data));
  if (typeof data == "bigint")
    return data;
  return 0;
}
function getRegistrDword(HKEY, Path, key) {
  var _a;
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "getRegistrDword");
  const data = (_a = native.getRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key || "")
  )) == null ? void 0 : _a.data;
  if (typeof data == "number")
    return ref.int(data);
  if (typeof data == "bigint")
    return ref.int(data);
  return 0;
}
function getRegistrBuffValue(HKEY, Path, key) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "getRegistrBuffValue");
  return native.getRegistrBuffValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key)
  );
}
function enumRegistrKey(HKEY, Path) {
  has_reg_args(HKEY, Path, "enumRegistrKey");
  let enumKeyList = /* @__PURE__ */ new Set();
  let NatenumKey = JSON.parse(native.getRegistrFolderStat(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    true
  ) || "{}");
  const key_list = [...NatenumKey.folder || [], ...NatenumKey.key || []];
  for (let index = 0; index < key_list.length; index++) {
    const key = key_list[index];
    enumKeyList.add(key);
  }
  return [...enumKeyList];
}
function listRegistrPath(HKEY, Path) {
  let enumRegistrKeys = enumRegistrKey(HKEY, Path);
  enumRegistrKeys.unshift("");
  let data = {
    "": ""
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
function isRegistrTreeKey(HKEY, Path, key) {
  return !!enumRegistrKey(HKEY, Path + (!key ? "" : "\\" + key)).length;
}
function getStringRegKey(HKEY, Path, key) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "getStringRegKey");
  const data = native.getRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key)
  );
  return Buffer.isBuffer(data == null ? void 0 : data.data) || typeof (data == null ? void 0 : data.data) == "number" || typeof (data == null ? void 0 : data.data) == "string" ? String(data == null ? void 0 : data.data) : "";
}
function getClipboardHTML() {
  var _a;
  const data = native.getClipboardHTML();
  if (data) {
    const html_item = {
      Version: Number(((_a = data.data.match(/Version:([\.0-9]+)/)) == null ? void 0 : _a[0]) || 0),
      data: data.data,
      EndFragment: data.EndFragment,
      EndHTML: data.EndHTML,
      is_valid: data.is_valid,
      SourceURL: data.SourceURL,
      StartFragment: data.StartFragment,
      StartHTML: data.StartHTML,
      get document() {
        if (!this.data && !this.StartHTML)
          return null;
        return this.data.substring(this.StartHTML, this.EndHTML) || null;
      },
      get body() {
        if (!this.data && !this.StartFragment)
          return null;
        return this.data.substring(this.StartFragment, this.EndFragment) || null;
      }
    };
    return html_item;
  }
  return data;
}
function getNumberRegKey(HKEY, Path, key) {
  var _a;
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "getNumberRegKey");
  const data = (_a = native.getRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key || "")
  )) == null ? void 0 : _a.data;
  if (typeof data == "number" || typeof data == "bigint")
    return Number(data);
  return ref.int(0);
}
function removeStringRegKey(HKEY, Path, key) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "removeStringRegKey");
  return native.removeRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key)
  );
}
function removeStringRegKeyWalk(HKEY, Path, key) {
  if (!key) {
    let paths = ref.string(Path).split(/[\\\/]/g);
    key = paths.pop();
    if (!key)
      throw new Error("Invalid key because it is empty");
    Path = paths.join("\\");
  }
  has_reg_args(HKEY, Path, "removeStringRegKeyWalk");
  return native.removeRegistrFolder(
    HKEY,
    ref.string(Path).split(/[\\\/]+/g).join("\\"),
    ref.string(key),
    true
  );
}
function removeStringTree(HKEY, Path, key) {
  return removeStringRegKeyWalk(HKEY, Path, key);
}
function removeStringRegValue(HKEY, Path, key) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "removeStringRegValue");
  return native.removeRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]/g).join("\\"),
    ref.string(key)
  );
}
function setRegistrKey(HKEY, Path, key, Value) {
  if (!key)
    key = "";
  has_reg_args(HKEY, Path, "setRegistrKey");
  return native.setRegistrValue(
    HKEY,
    ref.string(Path).split(/[\\\/]/g).join("\\"),
    ref.string(key),
    ref.string(Value),
    void 0
  );
}
function createPathRegistr(HKEY, Path) {
  has_reg_args(HKEY, Path, "createPathRegistr");
  return native.createRegistrFolder(
    HKEY,
    ref.string(Path).split(/[\\\/]/g).join("\\")
  );
}
function system(str) {
  return native.system(ref.string(str));
}
function freePort() {
  return new Promise((resolve, reject) => {
    let sock = net.createServer(function() {
    });
    sock.listen(0, () => {
      var _a;
      resolve(Number((_a = sock == null ? void 0 : sock.address()) == null ? void 0 : _a.port));
      sock.close();
    });
  });
}
function getClipboardFilePaths2(at) {
  let paths = native.getClipboardFilePaths().split("\0");
  const temp = paths.pop();
  if (temp) {
    paths.push(temp);
  }
  if (typeof at === "number") {
    if (at >= paths.length) {
      return void 0;
    }
    if (at < 0) {
      return paths[paths.length + at];
    }
    return paths[at];
  }
  return paths;
}
function setClipboardFilePaths2(FilePaths) {
  let temp_filePaths = [];
  for (let index = 0; index < FilePaths.length; index++) {
    const FilePath = FilePaths[index];
    temp_filePaths.push(ref.string(FilePath));
  }
  return native.setClipboardFilePaths(temp_filePaths);
}
function getUsbDevsInfo() {
  return native.getUsbDevsInfo();
}
function enumChildWindows(Handle) {
  return native.enumChildWindows(ref.int(Handle));
}
function hideConsole() {
  if (!$_thenConsole) {
    $_thenConsole = getProcessHandle(process.pid);
  }
  if (!$_thenConsole)
    return false;
  return ($_thenConsole == null ? void 0 : $_thenConsole.hide()) || false;
}
function showConsole() {
  if (!$_thenConsole) {
    $_thenConsole = getProcessHandle(process.pid);
  }
  if (!$_thenConsole)
    return false;
  return ($_thenConsole == null ? void 0 : $_thenConsole.show()) || false;
}
function getConsoleHandle() {
  if (!$_thenConsole) {
    $_thenConsole = getProcessHandle(process.pid);
  }
  return $_thenConsole;
}
function getRegistrValueStat(Hive, folderPath, keyName) {
  const data = native.getRegistrValueStat(ref.string(Hive), ref.string(folderPath), ref.string(keyName || ""));
  return data ? JSON.parse(data) : null;
}
function getRegistrFolderStat(Hive, folderPath, enumKey) {
  const data = native.getRegistrFolderStat(ref.string(Hive), ref.string(folderPath), enumKey ? true : false);
  return data ? JSON.parse(data) : null;
}
function getRegistrValue(Hive, folderPath, keyName) {
  return native.getRegistrValue(ref.string(Hive), ref.string(folderPath), ref.string(keyName || ""));
}
function deleteFile(Path, Recycle, isShow) {
  return native.deleteFile(
    ref.path(Path),
    typeof Recycle == "boolean" ? ref.bool(Recycle) : true,
    typeof isShow == "boolean" ? ref.bool(isShow) : false
  );
}
function getClipboardSequenceNumber() {
  return native.getClipboardInfo().id;
}
function getClipboardInfo() {
  const data = native.getClipboardInfo();
  data.format = typeof data.format == "string" ? JSON.parse(data.format) : data.format;
  return data;
}
function setRegistrValue(Hive, folderPath, keyName, data = null, type = void 0) {
  const hive_value = ref.string(Hive || "HKEY_CURRENT_USER");
  const folder_path = ref.string(folderPath || "").replace(/[\\\/]+/g, "\\");
  const key_name = ref.string(keyName || "");
  let data_output = data;
  let types = void 0;
  let is_type_valid = false;
  if (Buffer.isBuffer(data_output)) {
    if (typeof type == "number") {
      types = type;
    }
  } else if (typeof data_output == "string") {
    if (typeof type == "boolean" || type == 2) {
      types = type ? true : false;
    }
  }
  if (typeof data_output == "boolean" || typeof data_output == "string" || typeof data_output == "number" || typeof data_output == "bigint" || data_output instanceof Date || data_output === null || Array.isArray(data_output) || Buffer.isBuffer(data_output)) {
    is_type_valid = true;
  } else
    return is_type_valid;
  if (typeof data_output == "boolean") {
    data_output = data_output ? 1 : 0;
  }
  if (typeof data_output == "number" && isNaN(data_output)) {
    data_output = null;
  }
  if (typeof data_output == "number" && data_output > 4294967295) {
    data_output = 4294967295;
  }
  if (data_output && !Buffer.isBuffer(data_output) && Array.isArray(data_output)) {
    data_output = ref.stringArray(data_output);
  }
  return native.setRegistrValue(hive_value, folder_path, key_name, data_output, types);
}
function watchClipboard(CallBack, nextAwaitMs) {
  let NextAwaitMs = nextAwaitMs || 150;
  let Next = true;
  let oidClipboardSequenceNumber = getClipboardSequenceNumber();
  (async function() {
    while (Next) {
      await Sleep(NextAwaitMs);
      let clipboardSequenceNumber = getClipboardSequenceNumber();
      if (oidClipboardSequenceNumber !== clipboardSequenceNumber) {
        if (CallBack)
          CallBack();
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
    setNextAwaitMs(nextAwaitMs2) {
      NextAwaitMs = ref.int(nextAwaitMs2) || 150;
    }
  };
}
function watchUSB(CallBack, nextAwaitMs, watchType) {
  let NextAwaitMs = nextAwaitMs || 800;
  let Next = true;
  let OID_ID_LIST = /* @__PURE__ */ new Set();
  let start = true;
  if (typeof watchType == "string")
    watchType = [watchType];
  (async function() {
    while (Next) {
      await Sleep(NextAwaitMs);
      let GET_ID_List = new Set(watchType ? [
        ...watchType.includes("hub") ? native.getHidUsbIdList() : [],
        ...watchType.includes("drive") ? native.getUsbDevsInfo() : []
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
      return OID_ID_LIST;
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
    setNextAwaitMs(nextAwaitMs2) {
      NextAwaitMs = ref.int(nextAwaitMs2) || 800;
    }
  };
}
function getDeviceCapsAll() {
  return native.getDeviceCapsAll();
}
function isInMonitorWindow(Handle) {
  return native.isInMonitorWindow(ref.int(Handle));
}
function isMouseMonitorWindow(Handle) {
  return native.isMouseMonitorWindow(ref.int(Handle));
}
function getCurrentMonitorRect() {
  return native.getCurrentMonitorRect();
}
function getSystemMetricsLen() {
  return native.getSystemMetricsLen();
}
function alert(Message, Title) {
  return native.alert(
    Message,
    typeof Title != "string" ? getDefaultTitele() : Title
  );
}
function confirm(Message, Title) {
  return native.confirm(
    Message,
    typeof Title != "string" ? getDefaultTitele() : Title
  );
}
function MessageStop(Message, Title) {
  return native.MessageStop(
    Message,
    typeof Title != "string" ? getDefaultTitele() : Title
  );
}
function MessageError(Message, Title) {
  return native.MessageError(
    Message,
    typeof Title != "string" ? getDefaultTitele() : Title
  );
}
function getAllWindowsHandle(isWindows) {
  let data = [];
  let AllWindowsHandle = native.getAllWindowsHandle(isWindows || false);
  for (let index = 0; index < AllWindowsHandle.length; index++) {
    const element = AllWindowsHandle[index];
    data.push(new HWND2(element));
  }
  return data;
}
function processWatchdog(ProcessID, callback, awaitMs) {
  let quit = false;
  if (!callback) {
    let Prom = new Promise(
      async (resolve, reject) => {
        while (true) {
          if (quit)
            break;
          await Sleep(awaitMs || 500);
          if (!hasProcess(ref.int(ProcessID))) {
            resolve(void 0);
            break;
          }
        }
      }
    );
    Prom.quit = function() {
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
    quit: function() {
      quit = true;
    }
  };
}
function WatchWindowPoint(callback, awaitMs) {
  let quit = false;
  let oidPoint = native.getPointWindow() || 0;
  (async () => {
    if (typeof callback !== "function")
      return;
    while (true) {
      if (quit)
        return;
      let newPoint = native.getPointWindow() || 0;
      if (newPoint) {
        if (newPoint != oidPoint) {
          if (callback) {
            callback(
              ref.int(newPoint),
              ref.int(oidPoint) || 0,
              new HWND2(ref.int(newPoint))
            );
            oidPoint = newPoint;
          }
        }
      }
      await Sleep(awaitMs || 350);
    }
  })();
  return {
    /**结束监听 */
    quit: function() {
      quit = true;
    },
    /**设置每次延迟事件 */
    setAwaitMs(ms) {
      awaitMs = ms;
    }
  };
}
function WatchWindowForeground(callback, awaitMs) {
  let quit = false;
  let oidForeg = getForegroundWindow();
  (async () => {
    if (typeof callback !== "function")
      return;
    while (true) {
      if (quit)
        return;
      let newForeg = getForegroundWindow();
      if (newForeg) {
        if (ref.int(newForeg) != ref.int(oidForeg)) {
          if (callback) {
            callback(
              ref.int(newForeg),
              ref.int(oidForeg) || 0,
              new HWND2(ref.int(newForeg))
            );
            oidForeg = newForeg;
          }
        }
      }
      await Sleep(awaitMs || 350);
    }
  })();
  return {
    /**结束监听 */
    quit: function() {
      quit = true;
    },
    /**设置每次延迟事件 */
    setAwaitMs(ms) {
      awaitMs = ms;
    }
  };
}
function openApp(AppPath, Command, cwd, hide, UAC) {
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
function getProcessNameList(...Name) {
  let resultList = [];
  let ProcessList = getAllProcessListSnp2Sync();
  for (let index = 0; index < ProcessList.length; index++) {
    const Process2 = ProcessList[index];
    const { pid, name } = Process2;
    for (let NextNameIndex = 0; NextNameIndex < Name.length; NextNameIndex++) {
      const NextName = Name[NextNameIndex];
      if (typeof NextName === "string") {
        if (Process2.name == NextName) {
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
function getDetailsProcessNameList(...Name) {
  let resultList = [];
  let ProcessList = getAllProcessList2Sync(true);
  for (let index = 0; index < ProcessList.length; index++) {
    const Process2 = ProcessList[index];
    const { pid, name, path: path2 } = Process2;
    for (let NextNameIndex = 0; NextNameIndex < Name.length; NextNameIndex++) {
      const NextName = Name[NextNameIndex];
      if (typeof NextName === "string") {
        if (Process2.name == NextName) {
          resultList.push({ pid, name, path: path2 });
        }
      }
      if (NextName instanceof RegExp && NextName.test(name)) {
        resultList.push({ pid, name, path: path2 });
      }
    }
  }
  return resultList;
}
function killProcessName(...Name) {
  let resultList = [];
  let ProcessList = getProcessList();
  for (let index = 0; index < ProcessList.length; index++) {
    const Process2 = ProcessList[index];
    const { pid, name } = Process2;
    for (let NextNameIndex = 0; NextNameIndex < Name.length; NextNameIndex++) {
      const NextName = Name[NextNameIndex];
      if (typeof NextName === "string") {
        if (Process2.name == NextName) {
          killProcess(Process2.pid);
          resultList.push({
            pid,
            name,
            get kill() {
              return hasProcess(pid);
            }
          });
        }
      }
      if (NextName instanceof RegExp && NextName.test(name)) {
        killProcess(Process2.pid);
        resultList.push({
          pid,
          name,
          get kill() {
            return hasProcess(pid);
          }
        });
      }
    }
  }
  return resultList;
}
function getForegroundWindow() {
  let Handle = native.getForegroundWindow();
  return Handle ? new HWND2(Handle) : null;
}
function getMainWindow(Handle) {
  let Handles = native.getMainWindow(ref.int(Handle));
  return Handles ? new HWND2(Handles) : null;
}
function getPointWindow() {
  let Handle = native.getPointWindow();
  return Handle ? new HWND2(Handle) : null;
}
function getPointWindowMain() {
  let Handle = native.getPointWindowMain();
  return Handle ? new HWND2(Handle) : null;
}
function getProcessHandle(ProcessID) {
  let Handles = native.getProcessHandle(ref.int(ProcessID));
  return Handles ? new HWND2(Handles) : null;
}
function SetBlockInput(Block) {
  return native.SetBlockInput(ref.bool(Block));
}
function SetWindowInTaskbarVisible(Handle, Visible) {
  return native.SetWindowInTaskbarVisible(
    ref.int(Handle),
    ref.bool(Visible)
  );
}
function getHandleProcessID(Handle) {
  return native.getHandleProcessID(ref.int(Handle));
}
function getWindowRect(Handle) {
  return native.getWindowRect(ref.int(Handle));
}
function isEnabled(Handle) {
  return native.isEnabled(ref.int(Handle));
}
function isHandle(Handle) {
  return native.isHandle(ref.int(Handle));
}
function isHandleWindowVisible(Handle) {
  return native.isHandleWindowVisible(ref.int(Handle));
}
function lookHandleCloseWindow(Handle) {
  return native.lookHandleCloseWindow(ref.int(Handle));
}
function lookHandleGetTitle(Handle) {
  return native.lookHandleGetTitle(ref.int(Handle));
}
function lookHandleSetTitle(Handle, title) {
  return native.lookHandleSetTitle(
    ref.int(Handle),
    ref.string(title)
  );
}
function lookHandleShowWindow(Handle, SetShowType) {
  return native.lookHandleShowWindow(
    ref.int(Handle),
    ref.int(
      typeof SetShowType == "number" ? ref.int(SetShowType) : 5
    )
  );
}
function setHandleTransparent(Handle, Transparent) {
  return native.setHandleTransparent(
    ref.int(Handle),
    ref.int(Transparent || 255)
  );
}
function setWindowEnabled(Handle, Enabled) {
  return native.setWindowEnabled(
    ref.int(Handle),
    ref.bool(Enabled)
  );
}
function setWindowFocus(Handle) {
  return native.setWindowFocus(ref.int(Handle));
}
function setWindowTop(Handle) {
  return native.setWindowTop(ref.int(Handle));
}
function updateWindow(Handle) {
  return native.updateWindow(ref.int(Handle));
}
function windowJitter(Handle) {
  return native.windowJitter(ref.int(Handle));
}
function hasWindowTop(Handle) {
  return native.hasWindowTop(ref.int(Handle));
}
function closedHandle(Handle) {
  return native.closedHandle(ref.int(Handle));
}
function getHidUsbList() {
  return native.getHidUsbList();
}
function getMetrics() {
  return native.getMetrics();
}
function getMouseMovePoints() {
  return JSON.parse(native.getMouseMovePoints());
}
function getDeviceCaps() {
  return native.getDeviceCaps();
}
function SetSystemHOOK(HOOK) {
  return native.SetSystemHOOK(ref.bool(HOOK));
}
function getBasicKeys() {
  return native.getBasicKeys();
}
function getClipboardText2() {
  return native.getClipboardText();
}
function setClipboardText2(text) {
  return native.setClipboardText(ref.string(text));
}
function clearClipboard2() {
  return native.clearClipboard();
}
function getDetailsProcessList() {
  return getAllProcessList2Sync(true);
}
function getProcessList() {
  return getAllProcessList2Sync();
}
function getForegroundWindowProcessID() {
  return native.getForegroundWindowProcessID();
}
function getPointWindowName() {
  return native.getPointWindowName();
}
function getPointWindowProcessId() {
  return native.getPointWindowProcessId();
}
function getProcessName(ProcessID) {
  return getProcessName2Sync(ref.int(ProcessID));
}
function getProcessidFilePath(ProcessID) {
  return getProcessFilePath2Sync(ref.int(ProcessID));
}
function getShortcutLink(LnkPath) {
  return native.getShortcutLink(ref.string(LnkPath));
}
function getSystemIdleTime() {
  return native.getSystemIdleTime();
}
function getSystemMenu(Handle, boolean) {
  return native.getSystemMenu(ref.int(Handle), ref.bool(boolean));
}
function getTrayList2() {
  const result = native.getTrayList();
  if (typeof result == "string") {
    return JSON.parse(result);
  }
  return result;
}
function hasKeyActivate(KeysEvent) {
  return native.hasKeyActivate(ref.int(KeysEvent));
}
function hasProcess(...ProcessMatch) {
  if (ProcessMatch.length == 1) {
    return native.existProcessSync(ref.int(ProcessMatch[0])) || false;
  }
  let _ProcessMatch = [];
  let isString = false;
  for (let index = 0; index < ProcessMatch.length; index++) {
    const ProcessID = ProcessMatch[index];
    if (Array.isArray(ProcessID)) {
      for (let index2 = 0; index2 < ProcessID.length; index2++) {
        if (typeof ProcessID[index2] == "string")
          isString = true;
        _ProcessMatch.push(ProcessID[index2]);
      }
    }
    if (typeof ProcessID == "string") {
      isString = true;
      _ProcessMatch.push(ProcessID);
    }
    if (typeof ProcessID == "number")
      _ProcessMatch.push(ProcessID);
  }
  let ProcessList = isString ? getProcessList() : [];
  for (let index = 0; index < _ProcessMatch.length; index++) {
    if (!isString) {
      if (native.existProcessSync(ref.int(_ProcessMatch[index])))
        return true;
    }
    for (let index2 = 0; index2 < ProcessList.length; index2++) {
      const elp = ProcessList[index2];
      if (elp.name === _ProcessMatch[index2] || elp.pid === _ProcessMatch[index2])
        return true;
    }
  }
  return false;
}
function isAdmin() {
  return native.isAdmin();
}
function isProcess(ProcessID) {
  return native.existProcessSync(ref.int(ProcessID)) || false;
}
function isSystemX64() {
  return native.isSystemX64();
}
function killProcess(ProcessID) {
  if (typeof ProcessID == "string" || typeof ProcessID == "object") {
    return killProcessName(ProcessID);
  }
  return native.killProcess(ref.int(ProcessID));
}
function leftClick(ms) {
  return native.leftClick(ms);
}
function messageBox(message, title, MB_UINT) {
  return native.messageBox(ref.string(message), ref.string(title), ref.string(MB_UINT));
}
function mouse(mouse_event, ms) {
  if (typeof mouse_event == "number") {
    mouse_event = ref.int(mouse_event);
  } else {
    mouse_event = ref.string(mouse_event);
  }
  return native.mouse.apply(void 0, ms ? [mouse_event] : [mouse_event, ms]);
}
function openExternal(Path) {
  return native.openExternal(Path);
}
function openPath(Path) {
  return native.openPath(Path);
}
function openURL(URL) {
  return native.openURL(ref.string(URL));
}
function rightClick(ms) {
  return native.rightClick(ms);
}
function setCursorPos(x, y, Must, MustTime = 500) {
  if (Must) {
    return new Promise(async function(resolve, _reject) {
      if (MustTime < 5) {
        return resolve(native.setCursorPos(ref.int(x), ref.int(y)));
      }
      native.setCursorPos(ref.int(x), ref.int(y));
      let cursor_LastInputTime = getLastInputTime();
      const must_len = MustTime > 6e3 ? 20 : MustTime > 4e3 ? 8 : MustTime > 3e3 ? 6 : 4;
      for (let index = 0; index < must_len; index++) {
        await Sleep(ref.int(500));
        const the_LastInputTime2 = getLastInputTime();
        if (the_LastInputTime2 != cursor_LastInputTime) {
          native.setCursorPos(ref.int(x), ref.int(y));
          cursor_LastInputTime = the_LastInputTime2;
        }
      }
      const the_LastInputTime = getLastInputTime();
      await Sleep(500);
      if (the_LastInputTime == cursor_LastInputTime) {
        return resolve(true);
      } else {
        resolve(false);
      }
    });
  }
  return native.setCursorPos(ref.int(x), ref.int(y));
}
function setShortcutLink(...args) {
  if (args.length < 2)
    throw new Error("not LnkPath and FilePath arguments");
  if (typeof args[1] == "object") {
    const shortcutData = args[1] || {};
    args[1] = shortcutData.path || "";
    args[2] = shortcutData.cwd || "";
    args[3] = shortcutData.desc || "";
    args[4] = shortcutData.args || "";
    args[5] = shortcutData.showCmd || 1;
    args[6] = shortcutData.icon || "";
    args[7] = shortcutData.iconIndex || 0;
  }
  args[0] = ref.string(args[0] || "");
  args[1] = ref.string(args[1] || "");
  args[2] = ref.string(args[2] || "");
  args[3] = ref.string(args[3] || "");
  if (Array.isArray(args[4])) {
    args[4] = ref.formatArgv(args[4]);
  }
  args[4] = ref.string(args[4] || "");
  if (args.length > 5) {
    args[5] = ref.int(args[5] || 0);
  }
  if (args.length > 6) {
    args[6] = ref.string(args[6] || "");
  }
  if (args.length > 7) {
    args[7] = ref.int(args[7] || 0);
  }
  return native.setShortcutLink(...args);
}
function createSymlink(LinkPath, sourcePath) {
  return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath));
}
function createDirSymlink(LinkPath, sourcePath) {
  return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath));
}
function createHardLink(LinkPath, sourcePath) {
  return native.createSymlink(ref.string(LinkPath), ref.string(sourcePath));
}
function showMonitors(show) {
  if (typeof show == "boolean") {
    return show ? native.showMonitors() : native.shutMonitors();
  }
  return native.showMonitors();
}
function shutMonitors(show) {
  if (typeof show == "boolean") {
    return show ? native.showMonitors() : native.shutMonitors();
  }
  return native.shutMonitors();
}
function sleep(awaitTime) {
  return native.sleep(ref.int(awaitTime));
}
async function Sleep(awaitTime, Sync) {
  if (Sync) {
    return sleep(ref.int(awaitTime));
  }
  return new Promise(
    (resolve) => setTimeout(resolve, ref.int(awaitTime))
  );
}
function systemStartTime() {
  return native.systemStartTime();
}
function getAllWindows(isWindows, initialize) {
  class WINDOWS_INFO {
    constructor(handle) {
      this.handle = handle;
    }
    get rect() {
      if (!this._rect)
        this._rect = native.getWindowRect(this.handle);
      return this._rect;
    }
    get className() {
      if (typeof this._className == "undefined")
        this._className = native.getWindowClassName(this.handle);
      return this._className;
    }
    get style() {
      if (typeof this._style == "undefined")
        this._style = native.getWindowStyle(this.handle);
      return this._style;
    }
    get title() {
      if (typeof this._title == "undefined")
        this._title = native.lookHandleGetTitle(this.handle);
      return this._title;
    }
  }
  let AllWindowsHandle = native.getAllWindowsHandle(isWindows === false ? false : true);
  let AllWindows = [];
  for (let index = 0; index < AllWindowsHandle.length; index++) {
    const handle = AllWindowsHandle[index];
    const WINDOWS_INFO_ITEM = new WINDOWS_INFO(handle);
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
function getWindowClassName(Handle) {
  return native.getWindowClassName(ref.int(Handle));
}
function getWindowStyle(Handle) {
  return native.getWindowStyle(ref.int(Handle));
}
function GetWebView2Info(Has) {
  const INFO = {
    version: "",
    name: "",
    location: ""
  };
  const { HKEY_LOCAL_MACHINE, HKEY_CURRENT_USER } = Hkey;
  let WebView2IDKEY = "{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";
  let Path_64bit_LOCAL = [HKEY_LOCAL_MACHINE, "SOFTWARE\\WOW6432Node\\Microsoft\\EdgeUpdate\\Clients"];
  let Path_64bit_USER = [HKEY_CURRENT_USER, "SOFTWARE\\Microsoft\\EdgeUpdate\\Clients"];
  let Path_32bit_LOCAL = [HKEY_LOCAL_MACHINE, "SOFTWARE\\Microsoft\\EdgeUpdate\\Clients"];
  let Path_32bit_USER = [HKEY_CURRENT_USER, "Software\\Microsoft\\EdgeUpdate\\Clients"];
  let ForEachKey = [Path_64bit_LOCAL, Path_64bit_USER, Path_32bit_LOCAL, Path_32bit_USER];
  for (let index = 0; index < ForEachKey.length; index++) {
    const KEY_PATH = ForEachKey[index];
    if (registr.hasRegistrKey(...KEY_PATH, WebView2IDKEY)) {
      if (Has)
        return true;
    }
    const [Hkey2, Path] = KEY_PATH;
    INFO.location = registr.getStringRegKey(Hkey2, Path.concat("\\", WebView2IDKEY), "location");
    INFO.name = registr.getStringRegKey(Hkey2, Path.concat("\\", WebView2IDKEY), "name");
    INFO.version = registr.getStringRegKey(Hkey2, Path.concat("\\", WebView2IDKEY), "pv");
    break;
  }
  return INFO;
}
function getWebView2Info() {
  return GetWebView2Info();
}
async function WebView2OnlineInstall() {
  const webView2URL = "https://go.microsoft.com/fwlink/p/?LinkId=2124703";
  const webView2Path = path.join("MicrosoftEdgeWebview2Setup.exe");
  const webView2InstallCommand = ["/silent", "/install"];
  return new Promise((resolve, reject) => {
    const buffList = [];
    https.get(webView2URL, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error("Install  WebView2 failure statusCode: ".concat(res.statusCode || 404)));
        return;
      }
      res.on("data", (data) => {
        buffList.push(data);
      });
      res.once("error", (err) => {
        reject(err);
      });
      res.on("end", () => {
        const buff = ref.concatBuff(buffList);
        buffList.length = 0;
        fs.promises.writeFile(webView2Path, buff).then(() => {
          const spawn = child_process.spawn(webView2Path, webView2InstallCommand, { "windowsHide": true });
          spawn.on("error", function() {
            reject(new Error("Install  WebView2 failure Installation process creation failed"));
            spawn.kill();
          });
          spawn.once("exit", function() {
            resolve(void 0);
          });
        }).catch((err) => {
          reject(new Error("Install  WebView2 failure Update file cannot be written"));
        });
      });
    });
  });
}
function hasWebView2() {
  return GetWebView2Info(true);
}
function hasPortTCP(port, callBack) {
  let resolve = null;
  let prom;
  let sock = net.createServer(function() {
  });
  sock.listen(port);
  if (typeof callBack == "function") {
    resolve = callBack;
  } else {
    prom = new Promise((Prom_resolve) => {
      resolve = Prom_resolve;
    });
  }
  sock.on("error", function(err) {
    resolve && resolve(true);
    sock.close();
  });
  sock.on("listening", function() {
    resolve && resolve(false);
    sock.close();
  });
  if (typeof callBack !== "function") {
    return prom;
  }
}
function hasPortUDP(port, callBack) {
  let resolve = null;
  let prom;
  let udp4 = dgram.createSocket("udp4");
  udp4.bind(port);
  if (typeof callBack == "function") {
    resolve = callBack;
  } else {
    prom = new Promise((Prom_resolve) => {
      resolve = Prom_resolve;
    });
  }
  udp4.on("error", function(err) {
    resolve && resolve(true);
    udp4.close();
  });
  udp4.on("listening", function() {
    resolve && resolve(false);
    udp4.close();
  });
  if (typeof callBack !== "function") {
    return prom;
  }
}
function formatVolumePath(VolumePath) {
  if (VolumePath && (VolumePath == null ? void 0 : VolumePath.match(/^\\/))) {
    for (let Volume of hmc.getVolumeList()) {
      if (VolumePath.indexOf(Volume.device) == 0) {
        return VolumePath.replace(Volume.device, Volume.path).replace(/[\\/]+/, "\\");
      }
    }
  } else
    return VolumePath;
}
function getVolumeList() {
  return native.getVolumeList();
}
function getModulePathList(ProcessID) {
  return native.getModulePathList(ref.int(ProcessID));
}
function enumProcessHandle(ProcessID, CallBack) {
  let enumID = native.enumProcessHandle(ref.int(ProcessID));
  let next = true;
  let enumProcessHandleList = [];
  if (typeof enumID != "number")
    throw new Error("No enumerated id to query unknown error");
  if (typeof CallBack == "function") {
    ;
    (async () => {
      while (next) {
        await Sleep(50);
        let data = native.enumProcessHandlePolling(enumID);
        if (data) {
          for (let index = 0; index < data.length; index++) {
            const enumProcessHandle2 = data[index];
            if (!enumProcessHandle2)
              continue;
            if (enumProcessHandle2.type == "hmc::endl::") {
              return;
            }
            CallBack(enumProcessHandle2);
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
          const enumProcessHandle2 = data[index];
          if (!enumProcessHandle2)
            continue;
          if (enumProcessHandle2.type == "hmc::endl::") {
            return resolve(enumProcessHandleList);
          }
          enumProcessHandleList.push(enumProcessHandle2);
        }
      }
    }
    resolve(enumProcessHandleList);
  });
}
function getProcessThreadList(ProcessID, returnDetail) {
  const _returnDetail = returnDetail ? true : false;
  if (_returnDetail)
    return native.getProcessThreadList(ref.int(ProcessID), true) || [];
  return native.getProcessThreadList(ref.int(ProcessID)) || [];
}
function getSubProcessID(ProcessID) {
  return native.getSubProcessID(ref.int(ProcessID)) || [];
}
function getProcessParentProcessID(ProcessID, is_SessionCache = true) {
  var _a;
  return ((_a = getProcessParentProcessMatch2Sync(ProcessID, is_SessionCache)) == null ? void 0 : _a.th32ParentProcessID) || null;
}
function enumAllProcessHandle(CallBack) {
  let enumID = native.enumAllProcess();
  let next = true;
  let PROCESSENTRYLIST = [];
  if (typeof enumID != "number")
    throw new Error("No enumerated id to query unknown error");
  if (typeof CallBack == "function") {
    ;
    (async () => {
      while (next) {
        await Sleep(15);
        let data = native.enumAllProcessPolling(enumID);
        if (data) {
          for (let index = 0; index < data.length; index++) {
            const PROCESSENTRY = data[index];
            if (!PROCESSENTRY)
              continue;
            if (PROCESSENTRY.szExeFile == "HMC::endl::") {
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
          if (!PROCESSENTRY)
            continue;
          if (PROCESSENTRY.szExeFile == "HMC::endl::") {
            return resolve(PROCESSENTRYLIST);
          }
          PROCESSENTRYLIST.push(PROCESSENTRY);
        }
      }
    }
    resolve(PROCESSENTRYLIST);
  });
}
function getCursorPos() {
  const data = native.getCursorPos();
  if (data.includes("null"))
    return null;
  return JSON.parse(data);
}
function hasMouseLeftActivate() {
  return Auto.hasKeyActivate(1);
}
function hasMouseRightActivate() {
  return Auto.hasKeyActivate(2);
}
function hasMouseMiddleActivate() {
  return Auto.hasKeyActivate(4);
}
function hasMouseBtnActivate() {
  return {
    "left": Auto.hasKeyActivate(1),
    "right": Auto.hasKeyActivate(2),
    "middle": Auto.hasKeyActivate(4)
  };
}
function setWindowIconForExtract(handle, Extract, index) {
  if (!Extract)
    throw new Error("Extract Path not defined");
  return native.setWindowIconForExtract(ref.int(handle), ref.string(Extract), index ? ref.int(index) : 0);
}
function sendKeyboard(keyCode, keyDown) {
  let vk = vkKey(keyCode);
  if (!vk)
    throw new Error("The currently entered keyboard key name/key value does not exist");
  if (keyDown === null) {
    native.sendKeyboard(vk);
  } else
    native.sendKeyboard(vk, ref.bool(keyDown));
}
function sendKeyboardSequence(...keys) {
  (async () => {
    for (let index = 0; index < keys.length; index++) {
      const of_key = keys[index];
      if (Array.isArray(of_key)) {
        if (of_key == null ? void 0 : of_key[2]) {
          let ms = ref.int(of_key == null ? void 0 : of_key[2]);
          await Sleep(ms);
        }
        if (of_key.length < 2)
          continue;
        sendKeyboard(of_key[0], typeof (of_key == null ? void 0 : of_key[1]) == "boolean" ? of_key == null ? void 0 : of_key[1] : null);
      } else if (typeof of_key == "object") {
        let keys2 = Object.keys(of_key);
        if (!keys2.includes("key"))
          continue;
        if (keys2.includes("ms")) {
          let ms = ref.int(of_key.ms);
          await Sleep(ms);
        }
        sendKeyboard(of_key.key, typeof of_key.down == "undefined" ? null : of_key.down);
      }
    }
  })();
}
function getColor(x, y) {
  return native.getColor(ref.int(x), ref.int(y));
}
function sendBasicKeys(ctrlKey, shiftKey, altKey, winKey, KeyCode) {
  let _ctrlKey = false, _shiftKey = false, _altKey = false, _winKey = false;
  let _KeyCode = null;
  if (ctrlKey && typeof ctrlKey == "object") {
    let keys = Object.keys(ctrlKey);
    if (!keys.includes("key") && !keys.includes("code") && !vkKey(shiftKey)) {
      throw new Error("The current function requires other keys, not only (ctrl, shift, ait, win)");
    }
    _ctrlKey = keys.includes("ctrl") ? true : false;
    _shiftKey = keys.includes("shift") ? true : false;
    _altKey = keys.includes("alt") ? true : false;
    _winKey = keys.includes("win") ? true : false;
    _KeyCode = vkKey((ctrlKey == null ? void 0 : ctrlKey.key) || (ctrlKey == null ? void 0 : ctrlKey.code) || shiftKey || 0);
  } else if (typeof ctrlKey == "string") {
    _ctrlKey = ctrlKey.includes("ctrl") ? true : false;
    _shiftKey = ctrlKey.includes("shift") ? true : false;
    _altKey = ctrlKey.includes("alt") ? true : false;
    _winKey = ctrlKey.includes("win") ? true : false;
    _KeyCode = vkKey(ctrlKey.replace(/[+]|ctrl|shift|alt|win/g, ""));
  } else {
    _ctrlKey = ctrlKey ? true : false;
    _shiftKey = shiftKey ? true : false;
    _altKey = altKey ? true : false;
    _winKey = winKey ? true : false;
    _KeyCode = vkKey(KeyCode);
  }
  if ((_ctrlKey || _shiftKey || _altKey || _winKey) && _KeyCode !== null) {
    native.sendBasicKeys(ref.bool(_ctrlKey), ref.bool(_shiftKey), ref.bool(_altKey), ref.bool(_winKey), ref.int(_KeyCode));
  } else {
    throw new Error("The current function can only execute standard shortcuts and cannot enter a key value alone or without a regular keystroke");
  }
}
function getProcessCwd2(pid) {
  return PromiseSP(native.getProcessCwd(ref.int(pid)), (data) => {
    if (typeof data === "string")
      return data;
    return (data == null ? void 0 : data[0]) ? String(data == null ? void 0 : data[0]) : null;
  });
}
function getProcessCwd2Sync(pid) {
  return native.getProcessCwdSync(ref.int(pid));
}
function getProcessCommand2(pid) {
  return PromiseSP(native.getProcessCommand(ref.int(pid)), (data) => {
    if (typeof data === "string")
      return data;
    return String((data == null ? void 0 : data[0]) || "");
  });
}
function getProcessCommand2Sync(pid) {
  return native.getProcessCommandSync(ref.int(pid));
}
function setLimitMouseRange(ms, x, y, right = 1, bottom = 1) {
  ms = Math.abs(ref.int(ms));
  x = Math.abs(ref.int(x));
  y = Math.abs(ref.int(y));
  right = Math.abs(ref.int(right)) || 1;
  bottom = Math.abs(ref.int(bottom)) || 1;
  if (ms > 30 * 1e3 || ms < 30) {
    throw new Error("The range is only allowed from 31 milliseconds to 30 seconds (31ms-30000).");
  }
  native.setLimitMouseRange(ms, x, y, right, bottom);
  const res = {
    ms,
    x,
    y,
    right,
    bottom,
    closed: (() => {
      setTimeout(() => {
        res.closed = native.hasLimitMouseRangeWorker();
      }, ms + 80);
      return false;
    })(),
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
  };
  return res;
}
function getLastInputTime() {
  return native.getLastInputTime();
}
function _popen(cmd) {
  return native.popen(ref.string(cmd));
}
function hasMutex(MutexName) {
  return native.hasMutex(ref.string(MutexName));
}
function createMutex(MutexName) {
  return native.createMutex(ref.string(MutexName));
}
function popen(cmd) {
  return native.popen(ref.string(cmd));
}
function getAllEnv() {
  return native.getAllEnv();
}
function getenv(key) {
  return native.getenv(ref.string(key));
}
function getUDPPortProcessID(Port) {
  throw new Error("此api对hmc的架构存在安全威胁，已经废弃，请使用 'net-win32' 模块代替\nThis API poses a security threat to the HMC architecture and has been deprecated. Please use the 'net-win32' module instead.");
  return null;
}
function putenv(key, data) {
  return native.putenv(ref.string(key), ref.string(Array.isArray(data) ? data.join(";") : data));
}
function getTCPPortProcessID(Port) {
  throw new Error("此api对hmc的架构存在安全威胁，已经废弃，请使用 'net-win32' 模块代替\nThis API poses a security threat to the HMC architecture and has been deprecated. Please use the 'net-win32' module instead.");
  return null;
}
function findWindow(className, titleName) {
  return native.findWindow(
    typeof className == "string" ? ref.string(className) : null,
    typeof titleName == "string" ? ref.string(titleName) : null
  );
}
function findWindowEx(hWndParent, hWndChildAfter, className, titleName) {
  return native.findWindowEx(
    !!hWndParent ? ref.int(className) : null,
    !!hWndChildAfter ? ref.int(titleName) : null,
    typeof className == "string" ? ref.string(className) : null,
    typeof titleName == "string" ? ref.string(titleName) : null
  );
}
function findProcess(ProcessName, isMacthFile = false) {
  var _a;
  let result = [];
  let ProcessList = isMacthFile ? getDetailsProcessList() : getProcessList();
  for (let index = 0; index < ProcessList.length; index++) {
    const Process2 = ProcessList[index];
    if (typeof ProcessName == "string") {
      if (Process2.name.includes(ProcessName) || ((_a = Process2 == null ? void 0 : Process2.path) == null ? void 0 : _a.includes(ProcessName))) {
        result.push(Process2);
      }
    } else if (typeof ProcessName == "number") {
      if (Process2.pid == ProcessName) {
        result.push(Process2);
      }
    } else {
      if (Process2.name.match(ProcessName) || typeof (Process2 == null ? void 0 : Process2.path) == "string" ? Process2.path.match(ProcessName) : false) {
        result.push(Process2);
      }
    }
  }
  return result;
}
function getProcessStartTime(ProcessID) {
  return native.getProcessStartTime(ref.int(ProcessID));
}
function hasKeyExists(key) {
  return native.hasKeyExists(ref.string(key));
}
function hasUseKeyExists(key) {
  return native.hasUseKeyExists(ref.string(key));
}
function hasSysKeyExists(key) {
  return native.hasSysKeyExists(ref.string(key));
}
function escapeEnvVariable(input) {
  return native.escapeEnvVariable(ref.string(input));
}
function removeUserVariable(key) {
  return native.removeUserVariable(ref.string(key));
}
function removeVariable(key) {
  return native.removeSystemVariable(ref.string(key)) && native.removeUserVariable(ref.string(key));
}
function removeSystemVariable(key) {
  return native.removeSystemVariable(ref.string(key));
}
function getSystemVariable(key, transMean) {
  return native.getSystemVariable(ref.string(key), ref.bool(typeof transMean == "undefined" ? true : transMean));
}
function getUserVariable(key, transMean) {
  return native.getUserVariable(ref.string(key), ref.bool(typeof transMean == "undefined" ? true : transMean));
}
function getVariableAnalysis(key) {
  return native.getVariableAnalysis(ref.string(key));
}
function putSystemVariable(key, value, append, transMean) {
  return native.putSystemVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}
function setUserVariable(key, value, append, transMean) {
  return native.putUserVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}
function setSystemVariable(key, value, append, transMean) {
  return native.putSystemVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}
function putUserVariable(key, value, append, transMean) {
  return native.putUserVariable(ref.string(key), ref.string(value || ""), ref.bool(typeof append == "undefined" ? false : append), ref.bool(typeof transMean == "undefined" ? false : transMean));
}
function getVariableAll() {
  return native.getVariableAll();
}
function getRealGlobalVariableList() {
  let RealGlobalVariableList = JSON.parse(JSON.stringify(native.getRealGlobalVariable()));
  for (const key in RealGlobalVariableList) {
    if (key.match(/path/img)) {
      delete RealGlobalVariableList[key];
    }
  }
  RealGlobalVariableList.Path = getVariableAnalysis("Path");
  return RealGlobalVariableList;
}
function getUserKeyList() {
  return native.getUserKeyList();
}
function getSystemKeyList() {
  return native.getSystemKeyList();
}
function updateThis(remove, update_add, append, filter) {
  let result = [];
  const realGlobalVariable = native.getRealGlobalVariable();
  for (const key in realGlobalVariable) {
    const element = realGlobalVariable[key];
    const p_value = process.env[key];
    if (filter) {
      if (typeof filter === "string") {
        if (key.toUpperCase() != filter.toUpperCase()) {
          continue;
        }
      } else if (typeof filter === "function") {
        if (filter(key.toUpperCase(), element, p_value)) {
          continue;
        }
      } else if (Array.isArray(filter)) {
        for (let index = 0; index < filter.length; index++) {
          const element2 = filter[index];
          if (key.toUpperCase() != element2.toUpperCase()) {
            continue;
          }
        }
      } else {
        if (key.match(filter)) {
          continue;
        }
      }
    }
    if (p_value && element) {
      if (p_value != element) {
        if (update_add && !append && !remove || append && remove) {
          process.env[key] = element;
          result.push({
            key,
            oid_value: p_value,
            new_vaule: element,
            update_type: "update"
          });
          continue;
        }
        if (update_add && append) {
          let new_vaule = /* @__PURE__ */ new Set();
          for (const iterator of p_value.split(";")) {
            new_vaule.add(iterator);
          }
          for (const iterator of element.split(";")) {
            if (!new_vaule.has(iterator)) {
              new_vaule.add(iterator);
              result.push({
                key,
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
        if (update_add && remove) {
          let new_vaule = /* @__PURE__ */ new Set();
          for (const iterator of element.split(";")) {
            new_vaule.add(iterator);
          }
          for (const iterator of p_value.split(";")) {
            if (!new_vaule.has(iterator)) {
              new_vaule.delete(iterator);
              result.push({
                key,
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
    if (!p_value && element) {
      if (update_add || append) {
        process.env[key] = element;
        result.push({
          key,
          oid_value: p_value,
          new_vaule: element,
          update_type: "update"
        });
      }
    }
    if (p_value && !element) {
      if (remove) {
        process.env[key] = element;
        result.push({
          key,
          oid_value: p_value,
          new_vaule: element,
          update_type: "remove"
        });
      }
    }
  }
  return result;
}
function getAllProcessListSnp2(callback) {
  const data = native.getAllProcessListSnp();
  let result;
  if (typeof data == "number") {
    result = new PromiseSession(data).to_Promise((data2) => {
      return !data2 ? [] : JSON.parse(data2[0]).map((result2) => {
        result2.pid = result2.UniqueProcessId;
        result2.name = result2.ImageName;
        return result2;
      });
    });
  } else {
    result = data.then((data2) => {
      return !data2 ? [] : JSON.parse(data2).map((result2) => {
        result2.pid = result2.th32ProcessID;
        result2.name = result2.szExeFile;
        result2.ppid = result2.th32ParentProcessID;
        return result2;
      });
    });
  }
  if (typeof callback === "function") {
    result.then((data2) => callback(data2, null)).catch((err) => {
      callback([], err);
    });
    return void 0;
  } else
    return result;
}
function getAllProcessListSnpSession2(callback) {
  return callback ? void 0 : new Promise(async (resolve, reject) => {
    if (getAllProcessListSnpSessionBuffList.length) {
      return typeof callback == "function" ? callback(getAllProcessListSnpSessionBuffList, null) : resolve(getAllProcessListSnpSessionBuffList);
    }
    for (const iterator of await getAllProcessListSnp2().catch((err) => {
      if (typeof callback == "function") {
        callback([], err);
      } else
        reject(err);
    }) || []) {
      getAllProcessListSnpSessionBuffList.push(iterator);
    }
    typeof callback == "function" ? callback(getAllProcessListSnpSessionBuffList, null) : resolve(getAllProcessListSnpSessionBuffList);
    setTimeout(() => {
      getAllProcessListSnpSessionBuffList.length = 0;
    }, 1200);
  });
}
function getAllProcessListSnpSession2Sync() {
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
function getAllProcessListNt2(callback) {
  const data = native.getAllProcessListNt();
  let result;
  if (typeof data == "number") {
    result = new PromiseSession(data).to_Promise((data2) => {
      return JSON.parse(data2[0]).map((result2) => {
        result2.pid = result2.UniqueProcessId;
        result2.name = result2.ImageName;
        return result2;
      });
    });
  } else {
    result = data.then((data2) => {
      return JSON.parse(data2).map((result2) => {
        result2.pid = result2.UniqueProcessId;
        result2.name = result2.ImageName;
        return result2;
      });
    });
  }
  if (typeof callback === "function") {
    result.then((data2) => callback(data2, null)).catch((err) => {
      callback(null, err);
    });
    return void 0;
  } else
    return result;
}
function getAllProcessList2(callback, is_execPath) {
  if (typeof callback == "boolean") {
    is_execPath = callback;
    callback = void 0;
  }
  const data = is_execPath ? native.getAllProcessList(true) : native.getAllProcessList();
  let result;
  if (typeof data == "number") {
    result = new PromiseSession(data).to_Promise((data2) => {
      var _a, _b, _c;
      let data_list = JSON.parse(data2[0]);
      const v_list = [];
      for (let index = 0; index < data_list.length; index++) {
        const element = data_list[index];
        if ((_a = element == null ? void 0 : element.path) == null ? void 0 : _a.match(/^[\\\/][\\\/]?Device[\\\/][\\\/]?HarddiskVolume/)) {
          if (!v_list.length) {
            v_list.push(...native.getVolumeList());
            for (let index2 = 0; index2 < v_list.length; index2++) {
              const Volume = v_list[index2];
              element.path = ((_b = element == null ? void 0 : element.path) == null ? void 0 : _b.replace(Volume.device, Volume.path)) || "";
              element.path = ((_c = element == null ? void 0 : element.path) == null ? void 0 : _c.replace(Volume.name, Volume.path)) || "";
            }
          }
        }
      }
      return data_list;
    });
  } else {
    result = data.then((data2) => JSON.parse(data2));
  }
  if (typeof callback === "function") {
    const to_callback = callback;
    result.then((data2) => to_callback(data2, null)).catch((err) => {
      to_callback(null, err);
    });
    return void 0;
  } else
    return result;
}
function getAllProcessList2Sync(is_execPath) {
  var _a;
  const v_list = [];
  return (_a = JSON.parse(is_execPath ? native.getAllProcessListSync(true) : native.getAllProcessListSync())) == null ? void 0 : _a.map((item) => {
    var _a2, _b;
    if ((_a2 = item == null ? void 0 : item.path) == null ? void 0 : _a2.match(/^[\\\/][\\\/]?Device[\\\/][\\\/]?HarddiskVolume/)) {
      if (!v_list.length) {
        v_list.push(...native.getVolumeList());
        for (let index = 0; index < v_list.length; index++) {
          const Volume = v_list[index];
          item.path = ((_b = item == null ? void 0 : item.path) == null ? void 0 : _b.replace(Volume.device, Volume.path)) || "";
        }
      }
    }
    return item;
  });
}
function getAllProcessListNt2Sync() {
  const data_list = JSON.parse(native.getAllProcessListNtSync());
  for (let index = 0; index < data_list.length; index++) {
    const data = data_list[index];
    data.pid = data.UniqueProcessId;
    data.name = data.ImageName;
  }
  return data_list;
}
function getAllProcessListSnp2Sync() {
  const data_list = JSON.parse(native.getAllProcessListSnpSync());
  for (let index = 0; index < data_list.length; index++) {
    const data = data_list[index];
    data.ppid = data.th32ParentProcessID;
    data.pid = data.th32ProcessID;
    data.name = data.szExeFile;
  }
  return data_list;
}
function getProcessParentProcessMatch2(Process2, is_SessionCache = true) {
  return new Promise((resolve, reject) => {
    const fun = is_SessionCache ? getAllProcessListSnpSession2 : getAllProcessListSnp2;
    const data_list = [];
    fun().then((process_list) => {
      for (let index = 0; index < process_list.length; index++) {
        const for_process_item = process_list[index];
        if (typeof Process2 == "number" && for_process_item.th32ProcessID == Process2) {
          return resolve(for_process_item);
        }
        if (typeof Process2 == "string" && for_process_item.szExeFile == "string") {
          data_list.push(for_process_item);
        }
        if (Process2 instanceof RegExp && for_process_item.szExeFile.match(Process2)) {
          data_list.push(for_process_item);
        }
      }
      return is_SessionCache ? resolve(null) : resolve(data_list);
    }).catch(reject);
  });
}
function getProcessParentProcessMatch2Sync(Process2, is_SessionCache = true) {
  const data_list = [];
  const process_list = is_SessionCache ? getAllProcessListSnp2Sync() : getAllProcessListSnpSession2Sync();
  for (let index = 0; index < process_list.length; index++) {
    const for_process_item = process_list[index];
    if (typeof Process2 == "number" && for_process_item.th32ProcessID == Process2) {
      return for_process_item;
    }
    if (typeof Process2 == "string" && for_process_item.szExeFile == "string") {
      data_list.push(for_process_item);
    }
    if (Process2 instanceof RegExp && for_process_item.szExeFile.match(Process2)) {
      data_list.push(for_process_item);
    }
  }
  return data_list;
}
function get_sy_ProcessFilePathSync(error_name, ProcessID) {
  if (ProcessID == 0 || ProcessID == 4) {
    return ProcessID == 0 ? "[System Process]" : "C:\\Windows\\System32\\ntoskrnl.exe";
  }
  if (!error_name)
    return null;
  if (error_name.indexOf("\\\\?\\Volume") == 0 || error_name.indexOf("\\Device\\") == 0) {
    const volumeList = hmc.getVolumeList();
    for (let index = 0; index < volumeList.length; index++) {
      const volume = volumeList[index];
      if (error_name.indexOf(volume.name)) {
        error_name = error_name == null ? void 0 : error_name.replace(volume.name, volume.path + "\\");
        error_name = error_name == null ? void 0 : error_name.replace(/[\\\/]+]/g, path.sep);
      }
      if (error_name.indexOf(volume.device)) {
        error_name = error_name == null ? void 0 : error_name.replace(volume.device, volume.path + "\\");
        error_name = error_name == null ? void 0 : error_name.replace(/[\\\/]+]/g, path.sep);
      }
    }
  }
  if (!(error_name == null ? void 0 : error_name.match(/error:::.+?5.+?5/))) {
    return (error_name == null ? void 0 : error_name.includes("error:::")) ? null : error_name || null;
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
async function get_sy_ProcessFilePath(error_name, ProcessID) {
  return new Promise(async function(resolve, _reject) {
    var _a, _b, _c;
    if (ProcessID == 0 || ProcessID == 4) {
      return resolve(ProcessID == 0 ? "[System Process]" : "C:\\Windows\\System32\\ntoskrnl.exe");
    }
    if (!error_name)
      return resolve(null);
    if (error_name.indexOf("\\\\?\\Volume") == 0 || error_name.indexOf("\\Device\\") == 0) {
      const volumeList = hmc.getVolumeList();
      for (let index = 0; index < volumeList.length; index++) {
        const volume = volumeList[index];
        if (error_name.indexOf(volume.name)) {
          error_name = error_name == null ? void 0 : error_name.replace(volume.name, volume.path + "\\");
          error_name = error_name == null ? void 0 : error_name.replace(/[\\\/]+]/g, path.sep);
        }
        if (error_name.indexOf(volume.device)) {
          error_name = error_name == null ? void 0 : error_name.replace(volume.device, volume.path + "\\");
          error_name = error_name == null ? void 0 : error_name.replace(/[\\\/]+]/g, path.sep);
        }
      }
    }
    if (!(error_name == null ? void 0 : error_name.match(/error:::.+?5.+?5/))) {
      return resolve((error_name == null ? void 0 : error_name.includes("error:::")) ? null : error_name || null);
    }
    const not_fun = () => {
    };
    const name = await ((_a = getProcessNameSnp2(ProcessID)) == null ? void 0 : _a.catch(not_fun)) || await ((_b = getProcessNameNt2(ProcessID)) == null ? void 0 : _b.catch(not_fun)) || await ((_c = getProcessNameNt2(ProcessID)) == null ? void 0 : _c.catch(not_fun));
    if (!name || (name == null ? void 0 : name.match(/error:::/))) {
      return resolve(null);
    }
    const sy_path = path.resolve("C:\\Windows\\System32", name);
    if (fs.existsSync(sy_path)) {
      return resolve(sy_path);
    }
    return resolve(name);
  });
}
function getProcessFilePath2(ProcessID, callback) {
  const data = native.getProcessFilePath(ref.int(ProcessID));
  let result;
  if (typeof data == "number") {
    result = new PromiseSession(data).to_Promise((data2) => {
      return data2[0];
    }).then(async (data2) => {
      return await get_sy_ProcessFilePath(data2, ref.int(ProcessID)).catch((err) => {
      }) || null;
    });
  } else {
    result = data.then(async (data2) => await get_sy_ProcessFilePath(data2, ref.int(ProcessID)));
  }
  if (typeof callback === "function") {
    result.then((data2) => callback(data2, null)).catch((err) => {
      callback(null, err);
    });
    return void 0;
  } else
    return result;
}
function getProcessFilePath2Sync(ProcessID) {
  const data = native.getProcessFilePathSync(ref.int(ProcessID));
  return get_sy_ProcessFilePathSync(data, ref.int(ProcessID));
  ;
}
function existProcess2(ProcessID, callback) {
  const data = native.existProcess(ref.int(ProcessID));
  let result;
  if (typeof data == "number") {
    result = new PromiseSession(data).to_Promise((data2) => {
      return data2[0] || false;
    });
  } else {
    if (!data) {
      if (typeof callback === "function") {
        callback(false, new Error("failed To Create Asynchronous Function"));
        return void 0;
      } else {
        return Promise.resolve(false);
      }
    }
    result = data.then((data2) => data2 || false);
  }
  if (typeof callback === "function") {
    result.then((data2) => callback(data2, null)).catch((err) => {
      callback(null, err);
    });
    return void 0;
  } else
    return result;
}
function existProcess2Sync(ProcessID) {
  const data = native.existProcessSync(ref.int(ProcessID));
  return data || false;
}
function getDetailsProcessList2() {
  return getAllProcessList2Sync(true);
}
function getProcessNameSnp2Sync(ProcessID, is_SessionCache) {
  const data_list = is_SessionCache ? getAllProcessListSnpSession2Sync() : getAllProcessListSnp2Sync();
  for (let index = 0; index < data_list.length; index++) {
    const element = data_list[index];
    if (element.pid == ProcessID) {
      return element.szExeFile;
    }
  }
  return null;
}
function getProcessNameSnp2(ProcessID, is_SessionCache) {
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
function getProcessNameNt2Sync(ProcessID) {
  const data_list = getAllProcessListNt2Sync();
  for (let index = 0; index < data_list.length; index++) {
    const element = data_list[index];
    if (element.pid == ProcessID) {
      return element.ImageName;
    }
  }
  return null;
}
function getProcessNameNt2(ProcessID) {
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
function getProcessName2(ProcessID) {
  return new Promise(async (resolve, reject) => {
    var _a, _b, _c, _d;
    let FilePath = await ((_a = getProcessFilePath2(ProcessID)) == null ? void 0 : _a.catch(reject));
    if (FilePath)
      return resolve(FilePath.split(/[\\\/]+/).pop() || null);
    FilePath = await ((_b = getProcessNameSnp2(ProcessID, false)) == null ? void 0 : _b.catch(reject));
    if (FilePath)
      return resolve(FilePath || null);
    FilePath = await ((_c = getProcessNameNt2(ProcessID)) == null ? void 0 : _c.catch(reject));
    if (FilePath)
      return resolve(FilePath || null);
    FilePath = await ((_d = getProcessNameNt2(ProcessID)) == null ? void 0 : _d.catch(reject));
    if (FilePath)
      return resolve(FilePath || null);
    return resolve(null);
  });
}
function getProcessName2Sync(ProcessID) {
  let FilePath = getProcessFilePath2Sync(ProcessID);
  if (FilePath)
    return FilePath.split(/[\\\/]+/).pop() || null;
  FilePath = getProcessNameSnp2Sync(ProcessID, false);
  if (FilePath)
    return FilePath;
  FilePath = getProcessNameNt2Sync(ProcessID);
  if (FilePath)
    return FilePath;
  FilePath = getProcessNameNt2Sync(ProcessID);
  if (FilePath)
    return FilePath;
  return null;
}
async function findProcess2(ProcessName) {
  return new Promise(async (resolve, reject) => {
    var _a, _b, _c, _d;
    let result = [];
    const isMacthFile = ProcessName && typeof ProcessName != "number";
    let ProcessList = await (isMacthFile ? getAllProcessList2(true) : getAllProcessList2()).catch(reject) || [];
    for (let index = 0; index < ProcessList.length; index++) {
      const Process2 = ProcessList[index];
      if (typeof ProcessName == "string") {
        if (((_a = Process2 == null ? void 0 : Process2.name) == null ? void 0 : _a.includes(ProcessName)) || ((_b = Process2 == null ? void 0 : Process2.path) == null ? void 0 : _b.includes(ProcessName))) {
          result.push(Process2);
        }
      } else if (typeof ProcessName == "number") {
        if (Process2.pid == ProcessName) {
          let path2 = await getProcessFilePath2(ProcessName).catch(reject);
          Process2.path = path2 || null;
          Process2.name = (path2 == null ? void 0 : path2.split(/[\\\/]+/).at(-1)) || null;
          result.push(Process2);
        }
      } else {
        if (((_c = Process2 == null ? void 0 : Process2.name) == null ? void 0 : _c.match(ProcessName)) || typeof (Process2 == null ? void 0 : Process2.path) == "string" ? (_d = Process2 == null ? void 0 : Process2.path) == null ? void 0 : _d.match(ProcessName) : false) {
          result.push(Process2);
        }
      }
    }
    resolve(result);
  });
}
function findProcess2Sync(ProcessName) {
  var _a, _b, _c, _d;
  let result = [];
  const isMacthFile = ProcessName && typeof ProcessName != "number";
  let ProcessList = (isMacthFile ? getAllProcessList2Sync(true) : getAllProcessList2Sync()) || [];
  for (let index = 0; index < ProcessList.length; index++) {
    const Process2 = ProcessList[index];
    if (typeof ProcessName == "string") {
      if (((_a = Process2 == null ? void 0 : Process2.name) == null ? void 0 : _a.includes(ProcessName)) || ((_b = Process2 == null ? void 0 : Process2.path) == null ? void 0 : _b.includes(ProcessName))) {
        result.push(Process2);
      }
    } else if (typeof ProcessName == "number") {
      if (Process2.pid == ProcessName) {
        let path2 = getProcessFilePath2Sync(ProcessName);
        Process2.path = path2 || null;
        Process2.name = (path2 == null ? void 0 : path2.split(/[\\\/]+/).at(-1)) || null;
        result.push(Process2);
      }
    } else {
      if (((_c = Process2 == null ? void 0 : Process2.name) == null ? void 0 : _c.match(ProcessName)) || typeof (Process2 == null ? void 0 : Process2.path) == "string" ? (_d = Process2 == null ? void 0 : Process2.path) == null ? void 0 : _d.match(ProcessName) : false) {
        result.push(Process2);
      }
    }
  }
  return result;
}
var path, os, fs, https, dgram, child_process, net, beta, argvSplit, $_thenConsole, Hkey, get_native2, native, HWND2, HMC, ref, PromiseSession, trash, setShowWindow, setCloseWindow, getWindowTitle, setWindowTitle, powerControl, _KeyboardcodeEmenList, _KeyboardcodeComparisonTable, version, desc, platform, Window, Watch, Clipboard, MousePoint, Keyboard, SetIohook, Iohook_Mouse, mouseHook, Iohook_Keyboard, keyboardHook, Auto, Usb, Shell, Process, registr, getWindowProcess, getProcessWindow, isWindowVisible, closeWindow, setWindowShake, isWindowTop, getProcessFilePath, getAllProcessListSnpSessionBuffList, Environment, Registr, hmc, hmc_default;
var init_hmc = __esm({
  "source/mian/hmc.ts"() {
    init_chcpList();
    init_vkKey();
    init_hmc2();
    path = require("path");
    os = require("os");
    fs = require("fs");
    https = require("https");
    dgram = require("dgram");
    child_process = require("child_process");
    net = require("net");
    beta = (init_hmc2(), __toCommonJS(hmc2_exports));
    argvSplit = require_split();
    $_thenConsole = null;
    Hkey = {
      /**用作默认用户首选设置|也作为单个用户的首选设置 */
      HKEY_CURRENT_CONFIG: "HKEY_CURRENT_CONFIG",
      /**用作默认用户首选设置|也作为单个用户的首选设置 */
      HKEY_USERS: "HKEY_USERS",
      /**是与文档类型和 OLE\COM 相关的信息的支持键。这个键是 */
      HKEY_CLASSES_ROOT: "HKEY_CLASSES_ROOT",
      /**包含描述计算机及其配置的条目。其中包括关于处理器、系统主板、内存和已安装的软件和硬件的信息 */
      HKEY_LOCAL_MACHINE: "HKEY_LOCAL_MACHINE",
      /**管理系统当前的用户信息 */
      HKEY_CURRENT_USER: "HKEY_CURRENT_USER"
    };
    get_native2 = (binPath) => {
      function _require_bin() {
        try {
          if (binPath)
            return require(binPath);
          if (process.arch.match(/^x32|ia32$/))
            return require("./bin/HMC_x86.node");
          if (process.arch.match(/^x64$/))
            return require("./bin/HMC_x64.node");
        } catch (X_X) {
        }
        return null;
      }
      let Native = (process.platform == "win32" ? _require_bin() : null) || (() => {
        let HMCNotPlatform = "HMC::HMC current method only supports win32 platform";
        function fnBool(...args) {
          console.error(HMCNotPlatform);
          return false;
        }
        function fnVoid(...args) {
          console.error(HMCNotPlatform);
          return void 0;
        }
        function fnNull(...args) {
          console.error(HMCNotPlatform);
          return null;
        }
        function fnNum(...args) {
          console.error(HMCNotPlatform);
          return 0;
        }
        function fnStrList(...args) {
          console.error(HMCNotPlatform);
          return [];
        }
        function fnStr(...args) {
          console.error(HMCNotPlatform);
          return "";
        }
        function fnAnyArr(...args) {
          console.error(HMCNotPlatform);
          return [];
        }
        function fnPromise(...args) {
          console.error(HMCNotPlatform);
          return Promise.reject("HMC::HMC current method only supports win32 platform");
        }
        function fnArrStr(...args) {
          console.error(HMCNotPlatform);
          return "[]";
        }
        return {
          v2: {},
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
          getVariableAll(...args) {
            return {};
          },
          getRealGlobalVariable(...args) {
            return {};
          },
          getUserKeyList: fnAnyArr,
          getClipboardInfo: () => {
            return { format: [], formatCount: 0, hwnd: 0, id: 0 };
          },
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
            return { cwd: "", icon: "", iconIndex: 0, desc: "", args: "", showCmd: 0, hotkey: 0, path: "" };
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
              "win": false
            };
          },
          getClipboardFilePaths: fnArrStr,
          getClipboardText: fnStr,
          // getDetailsProcessList: fnAnyArr,
          getDeviceCaps: () => {
            console.error(HMCNotPlatform);
            return {
              "height": 0,
              "width": 0
            };
          },
          getForegroundWindow: fnNum,
          getForegroundWindowProcessID: fnNull,
          getHandleProcessID: fnNull,
          getHidUsbList: fnAnyArr,
          getMainWindow: fnNull,
          getMetrics: () => {
            console.error(HMCNotPlatform);
            return { "left": 0, "top": 0, "x": 0, "y": 0 };
          },
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
            return { "bottom": 0, "height": 0, "width": 0, "left": 0, "top": 0, "right": 0, "x": 0, "y": 0 };
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
          messageBox: fnNum,
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
          getCurrentMonitorRect: () => {
            console.error(HMCNotPlatform);
            return { "bottom": 0, "left": 0, "top": 0, "right": 0 };
          },
          getSystemMetricsLen: fnNum,
          getWindowStyle: fnNum,
          getWindowClassName: fnStr,
          formatVolumePath: fnStr,
          getVolumeList: fnAnyArr,
          enumProcessHandlePolling: fnVoid,
          enumProcessHandle: fnNum,
          getModulePathList: fnStrList,
          getColor() {
            return { r: 0, g: 0, b: 0, hex: "#000000" };
          },
          sendKeyboard: fnBool,
          sendBasicKeys: fnBool,
          sendKeyT2C: fnVoid,
          sendKeyT2CSync: fnVoid,
          hasMutex: fnBool,
          getAllEnv() {
            return process.env;
          },
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
          getProcessCwdSync: fnStr
        };
      })();
      return Native;
    };
    native = get_native2();
    native.v2 = native2;
    HWND2 = class extends Number {
      constructor(hWnd) {
        super(hWnd);
        this.HWND = hWnd;
      }
      /**句柄 */
      get handle() {
        return this.HWND;
      }
      /**
       * 强制关闭窗口不发送被关闭的消息给窗口
       */
      closed() {
        if (!this.exists)
          return false;
        return native.closedHandle(this.HWND);
      }
      /**
       * 向窗口发送关闭的消息
       */
      close() {
        if (!this.exists)
          return false;
        return native.lookHandleCloseWindow(this.HWND);
      }
      /**
       * [异步 不支持并发] 关闭窗口
       * - 1 温柔的关闭 (正常关闭)
       * - 2 关闭 / 系统级(半强制)
       * - 3 关闭线程 (强制)
       */
      close2(grade) {
        var _a, _b;
        if (!this.exists)
          return false;
        return ((_a = native2) == null ? void 0 : _a.closeWindow2) ? (_b = native2) == null ? void 0 : _b.closeWindow2(this.HWND, 2) : Promise.resolve(false);
      }
      /**
       * [同步步 不支持并发] 关闭窗口
       * - 1 温柔的关闭 (正常关闭)
       * - 2 关闭 / 系统级(半强制)
       * - 3 关闭线程 (强制)
       */
      close2Sync(grade) {
        var _a, _b;
        if (!this.exists)
          return false;
        return ((_a = native2) == null ? void 0 : _a.closeWindow2Sync) ? (_b = native2) == null ? void 0 : _b.closeWindow2Sync(this.HWND, 2) : false;
      }
      /*
       * 窗口位置
       */
      get rect() {
        if (!this.exists)
          return null;
        return native.getWindowRect(this.HWND);
      }
      /**
       * 窗口名称
       */
      get title() {
        return native.lookHandleGetTitle(this.HWND) || "";
      }
      /**
       * 设置窗口的标题
       * @param Title 标题
       * @returns
       */
      setTitle(Title) {
        if (typeof Title !== "string" || !this.exists) {
          return false;
        }
        return native.lookHandleSetTitle(this.HWND, Title);
      }
      /**句柄是否有效 */
      get exists() {
        if (!this.HWND)
          return false;
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
        if (!this.exists)
          return 0;
        return native.getHandleProcessID(this.HWND);
      }
      /**
       * 获取主窗口的pid
       */
      get MianPid() {
        if (!this.exists)
          return 0;
        return native.getHandleProcessID(this.MainHandle);
      }
      get MainHandle() {
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
        if (!this.HWND)
          return false;
        return native.isHandleWindowVisible(this.HWND);
      }
      /**
       * 结束该进程
       * @returns
       */
      kill() {
        let processid = this.MianPid;
        if (!processid)
          return false;
        return native.killProcess(processid);
      }
      /**
       * 隐藏窗口
       * @returns
       */
      hide() {
        if (!this.HWND)
          return false;
        return native.lookHandleShowWindow(this.HWND, 0);
      }
      /**
       * 显示窗口
       * @returns
       */
      show() {
        if (!this.HWND)
          return false;
        return native.lookHandleShowWindow(this.HWND, 5);
      }
      /**
       * 窗口最小化
       * @returns
       */
      setMin() {
        if (!this.HWND)
          return false;
        return native.lookHandleShowWindow(this.HWND, 7);
      }
      /**
       * 窗口最大化
       * @returns
       */
      setMax() {
        if (!this.HWND)
          return false;
        return native.lookHandleShowWindow(this.HWND, 3);
      }
      /**
       * 恢复最近的状态
       * @returns
       */
      setRestore() {
        if (!this.HWND)
          return false;
        return native.lookHandleShowWindow(this.HWND, 9);
      }
      /**
       * 聚焦该窗口
       * @returns
       */
      setFocus() {
        if (!this.HWND)
          return false;
        return native.setWindowFocus(this.HWND);
      }
      /**
       * 禁用窗口
       * @param enabled
       * @returns
       */
      setEnabled(enabled) {
        if (!this.HWND)
          return false;
        return native.setWindowEnabled(this.HWND, enabled);
      }
      /**
       * 是否被禁用
       * @returns
       */
      isEnabled() {
        if (!this.HWND)
          return false;
        return native.isEnabled(this.HWND);
      }
      /**
       * 窗口抖动
       * @returns
       */
      setJitter() {
        if (!this.HWND)
          return false;
        return native.windowJitter(this.HWND);
      }
      /**
       * 判断窗口是否被顶设
       * @returns
       */
      isTop() {
        if (!this.HWND)
          return false;
        return native.hasWindowTop(this.HWND);
      }
      /**
       * 设置窗口顶设或者取消
       * @returns
       */
      setTopOrCancel() {
        if (!this.HWND)
          return false;
        return native.setWindowTop(this.HWND);
      }
      /**
       * 设置窗口不透明度
       * @param opacity 0-100 or 0.0 - 1.0
       */
      setOpacity(opacity) {
        if (typeof opacity !== "number" || opacity > 100 || isNaN(opacity))
          throw new Error(
            "fun <setOpacity> arg:<Opacity> is only allowed from 0.0 to 1.0 or  0 to 255"
          );
        if (opacity < 1) {
          return this.setTransparent(Math.trunc(255 * opacity));
        }
        opacity = 255 / 100 * opacity;
        if (!isNaN(opacity)) {
          return this.setTransparent(Math.trunc(255 * opacity));
        }
        return false;
      }
      /**
       * 设置窗口不透明度
       * @param opacity -1 - 255
       */
      setTransparent(opacity) {
        if (opacity < -1 || opacity > 255) {
          throw new Error(
            "fun <setTransparent> arg:<Opacity> is only allowed from -1 to 255"
          );
        }
        if (!this.HWND)
          return false;
        return native.setHandleTransparent(this.HWND, opacity);
      }
    };
    ((HMC2) => {
      let REG_TYPE;
      ((REG_TYPE2) => {
        REG_TYPE2[REG_TYPE2["REG_NONE"] = 0] = "REG_NONE";
        REG_TYPE2[REG_TYPE2["REG_SZ"] = 1] = "REG_SZ";
        REG_TYPE2[REG_TYPE2["REG_EXPAND_SZ"] = 2] = "REG_EXPAND_SZ";
        REG_TYPE2[REG_TYPE2["REG_BINARY"] = 3] = "REG_BINARY";
        REG_TYPE2[REG_TYPE2["REG_DWORD"] = 4] = "REG_DWORD";
        REG_TYPE2[REG_TYPE2["REG_DWORD_LITTLE_ENDIAN"] = 4] = "REG_DWORD_LITTLE_ENDIAN";
        REG_TYPE2[REG_TYPE2["REG_DWORD_BIG_ENDIAN"] = 5] = "REG_DWORD_BIG_ENDIAN";
        REG_TYPE2[REG_TYPE2["REG_LINK"] = 6] = "REG_LINK";
        REG_TYPE2[REG_TYPE2["REG_MULTI_SZ"] = 7] = "REG_MULTI_SZ";
        REG_TYPE2[REG_TYPE2["REG_RESOURCE_LIST"] = 8] = "REG_RESOURCE_LIST";
        REG_TYPE2[REG_TYPE2["REG_FULL_RESOURCE_DESCRIPTOR"] = 9] = "REG_FULL_RESOURCE_DESCRIPTOR";
        REG_TYPE2[REG_TYPE2["REG_RESOURCE_REQUIREMENTS_LIST"] = 10] = "REG_RESOURCE_REQUIREMENTS_LIST";
        REG_TYPE2[REG_TYPE2["REG_QWORD"] = 11] = "REG_QWORD";
        REG_TYPE2[REG_TYPE2["REG_QWORD_LITTLE_ENDIAN"] = 11] = "REG_QWORD_LITTLE_ENDIAN";
      })(REG_TYPE = HMC2.REG_TYPE || (HMC2.REG_TYPE = {}));
      ;
      let MouseKey;
      ((MouseKey2) => {
        MouseKey2[MouseKey2["WM_MOUSEMOVE"] = 512] = "WM_MOUSEMOVE";
        MouseKey2[MouseKey2["WM_LBUTTONDOWN"] = 513] = "WM_LBUTTONDOWN";
        MouseKey2[MouseKey2["WM_RBUTTONDOWN"] = 516] = "WM_RBUTTONDOWN";
        MouseKey2[MouseKey2["WM_LBUTTONUP"] = 514] = "WM_LBUTTONUP";
        MouseKey2[MouseKey2["WM_RBUTTONUP"] = 517] = "WM_RBUTTONUP";
        MouseKey2[MouseKey2["WM_MBUTTONDOWN"] = 519] = "WM_MBUTTONDOWN";
        MouseKey2[MouseKey2["WM_MBUTTONUP"] = 520] = "WM_MBUTTONUP";
        MouseKey2[MouseKey2["WM_MOUSEWHEEL"] = 522] = "WM_MOUSEWHEEL";
      })(MouseKey = HMC2.MouseKey || (HMC2.MouseKey = {}));
      let SYSTEM_METRICS_NINDEX;
      ((SYSTEM_METRICS_NINDEX2) => {
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_ARRANGE"] = 56] = "SM_ARRANGE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CLEANBOOT"] = 67] = "SM_CLEANBOOT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CMONITORS"] = 80] = "SM_CMONITORS";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CMOUSEBUTTONS"] = 43] = "SM_CMOUSEBUTTONS";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CONVERTIBLESLATEMODE"] = 8195] = "SM_CONVERTIBLESLATEMODE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXBORDER"] = 5] = "SM_CXBORDER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXCURSOR"] = 13] = "SM_CXCURSOR";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXDLGFRAME"] = 7] = "SM_CXDLGFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXDOUBLECLK"] = 36] = "SM_CXDOUBLECLK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXDRAG"] = 68] = "SM_CXDRAG";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXEDGE"] = 45] = "SM_CXEDGE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXFIXEDFRAME"] = 7] = "SM_CXFIXEDFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXFOCUSBORDER"] = 83] = "SM_CXFOCUSBORDER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXFRAME"] = 32] = "SM_CXFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXFULLSCREEN"] = 16] = "SM_CXFULLSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXHSCROLL"] = 21] = "SM_CXHSCROLL";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXHTHUMB"] = 10] = "SM_CXHTHUMB";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXICON"] = 11] = "SM_CXICON";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXICONSPACING"] = 38] = "SM_CXICONSPACING";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMAXIMIZED"] = 61] = "SM_CXMAXIMIZED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMAXTRACK"] = 59] = "SM_CXMAXTRACK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMENUCHECK"] = 71] = "SM_CXMENUCHECK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMENUSIZE"] = 54] = "SM_CXMENUSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMIN"] = 28] = "SM_CXMIN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMINIMIZED"] = 57] = "SM_CXMINIMIZED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMINSPACING"] = 47] = "SM_CXMINSPACING";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXMINTRACK"] = 34] = "SM_CXMINTRACK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXPADDEDBORDER"] = 92] = "SM_CXPADDEDBORDER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXSCREEN"] = 0] = "SM_CXSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXSIZE"] = 30] = "SM_CXSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXSIZEFRAME"] = 32] = "SM_CXSIZEFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXSMICON"] = 49] = "SM_CXSMICON";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXSMSIZE"] = 52] = "SM_CXSMSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXVIRTUALSCREEN"] = 78] = "SM_CXVIRTUALSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CXVSCROLL"] = 2] = "SM_CXVSCROLL";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYBORDER"] = 6] = "SM_CYBORDER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYCAPTION"] = 4] = "SM_CYCAPTION";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYCURSOR"] = 14] = "SM_CYCURSOR";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYDLGFRAME"] = 8] = "SM_CYDLGFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYDOUBLECLK"] = 37] = "SM_CYDOUBLECLK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYDRAG"] = 69] = "SM_CYDRAG";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYEDGE"] = 46] = "SM_CYEDGE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYFIXEDFRAME"] = 8] = "SM_CYFIXEDFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYFOCUSBORDER"] = 84] = "SM_CYFOCUSBORDER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYFRAME"] = 33] = "SM_CYFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYFULLSCREEN"] = 17] = "SM_CYFULLSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYHSCROLL"] = 3] = "SM_CYHSCROLL";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYICON"] = 12] = "SM_CYICON";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYICONSPACING"] = 39] = "SM_CYICONSPACING";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYKANJIWINDOW"] = 18] = "SM_CYKANJIWINDOW";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMAXIMIZED"] = 62] = "SM_CYMAXIMIZED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMAXTRACK"] = 60] = "SM_CYMAXTRACK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMENU"] = 15] = "SM_CYMENU";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMENUCHECK"] = 72] = "SM_CYMENUCHECK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMENUSIZE"] = 55] = "SM_CYMENUSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMIN"] = 29] = "SM_CYMIN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMINIMIZED"] = 58] = "SM_CYMINIMIZED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMINSPACING"] = 48] = "SM_CYMINSPACING";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYMINTRACK"] = 35] = "SM_CYMINTRACK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSCREEN"] = 1] = "SM_CYSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSIZE"] = 31] = "SM_CYSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSIZEFRAME"] = 33] = "SM_CYSIZEFRAME";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSMCAPTION"] = 51] = "SM_CYSMCAPTION";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSMICON"] = 50] = "SM_CYSMICON";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYSMSIZE"] = 53] = "SM_CYSMSIZE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYVIRTUALSCREEN"] = 79] = "SM_CYVIRTUALSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYVSCROLL"] = 20] = "SM_CYVSCROLL";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_CYVTHUMB"] = 9] = "SM_CYVTHUMB";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_DBCSENABLED"] = 42] = "SM_DBCSENABLED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_DEBUG"] = 22] = "SM_DEBUG";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_DIGITIZER"] = 94] = "SM_DIGITIZER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_IMMENABLED"] = 82] = "SM_IMMENABLED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MAXIMUMTOUCHES"] = 95] = "SM_MAXIMUMTOUCHES";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MEDIACENTER"] = 87] = "SM_MEDIACENTER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MENUDROPALIGNMENT"] = 40] = "SM_MENUDROPALIGNMENT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MIDEASTENABLED"] = 74] = "SM_MIDEASTENABLED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MOUSEPRESENT"] = 19] = "SM_MOUSEPRESENT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MOUSEHORIZONTALWHEELPRESENT"] = 91] = "SM_MOUSEHORIZONTALWHEELPRESENT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_MOUSEWHEELPRESENT"] = 75] = "SM_MOUSEWHEELPRESENT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_NETWORK"] = 63] = "SM_NETWORK";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_PENWINDOWS"] = 41] = "SM_PENWINDOWS";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_REMOTECONTROL"] = 8193] = "SM_REMOTECONTROL";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_REMOTESESSION"] = 4096] = "SM_REMOTESESSION";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SAMEDISPLAYFORMAT"] = 81] = "SM_SAMEDISPLAYFORMAT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SECURE"] = 44] = "SM_SECURE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SERVERR2"] = 89] = "SM_SERVERR2";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SHOWSOUNDS"] = 70] = "SM_SHOWSOUNDS";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SHUTTINGDOWN"] = 8192] = "SM_SHUTTINGDOWN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SLOWMACHINE"] = 73] = "SM_SLOWMACHINE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_STARTER"] = 88] = "SM_STARTER";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SWAPBUTTON"] = 23] = "SM_SWAPBUTTON";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_SYSTEMDOCKED"] = 8196] = "SM_SYSTEMDOCKED";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_TABLETPC"] = 86] = "SM_TABLETPC";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_XVIRTUALSCREEN"] = 76] = "SM_XVIRTUALSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["SM_YVIRTUALSCREEN"] = 77] = "SM_YVIRTUALSCREEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_BOTTOMLEFT"] = 0] = "ARW_BOTTOMLEFT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_BOTTOMRIGHT"] = 1] = "ARW_BOTTOMRIGHT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_TOPLEFT"] = 2] = "ARW_TOPLEFT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_TOPRIGHT"] = 3] = "ARW_TOPRIGHT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_DOWN"] = 4] = "ARW_DOWN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_HIDE"] = 8] = "ARW_HIDE";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_LEFT"] = 0] = "ARW_LEFT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_RIGHT"] = 0] = "ARW_RIGHT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["ARW_UP"] = 4] = "ARW_UP";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_INTEGRATED_TOUCH"] = 1] = "NID_INTEGRATED_TOUCH";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_EXTERNAL_TOUCH"] = 2] = "NID_EXTERNAL_TOUCH";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_INTEGRATED_PEN"] = 4] = "NID_INTEGRATED_PEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_EXTERNAL_PEN"] = 8] = "NID_EXTERNAL_PEN";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_MULTI_INPUT"] = 64] = "NID_MULTI_INPUT";
        SYSTEM_METRICS_NINDEX2[SYSTEM_METRICS_NINDEX2["NID_READY"] = 128] = "NID_READY";
      })(SYSTEM_METRICS_NINDEX = HMC2.SYSTEM_METRICS_NINDEX || (HMC2.SYSTEM_METRICS_NINDEX = {}));
      let MouseKeyName;
      ((MouseKeyName2) => {
        MouseKeyName2["UNKNOWN"] = "unknown";
        MouseKeyName2["WM_LBUTTONDOWN"] = "left-button-down";
        MouseKeyName2["WM_RBUTTONDOWN"] = "right-button-down";
        MouseKeyName2["WM_LBUTTONUP"] = "left-button-up";
        MouseKeyName2["WM_RBUTTONUP"] = "right-button-up";
        MouseKeyName2["WM_MBUTTONDOWN"] = "mouse-button-down";
        MouseKeyName2["WM_MBUTTONUP"] = "mouse-button-up";
        MouseKeyName2["WM_MOUSEWHEEL"] = "mouse-wheel";
        MouseKeyName2["WM_MOUSEMOVE"] = "move";
      })(MouseKeyName = HMC2.MouseKeyName || (HMC2.MouseKeyName = {}));
      ;
      ;
      ;
    })(HMC || (HMC = {}));
    ref = {
      /**
      * 将内容格式化为文本路径
      * @param Str
      * @returns
      */
      path(Str) {
        return path.resolve(String(Str || "")).replace(/([\0\n\r]+)?$/, "\0");
      },
      /**
       * 格式化为bool
       * @param bool
       * @returns
       */
      bool(bool) {
        return bool ? true : false;
      },
      /**
       * 将内容格式化为文本
       * @param Str
       * @returns
       */
      string(Str) {
        return String(Str || "");
      },
      /**
       * 格式化数字为int(强制)
       * @param Num
       * @returns
       */
      int(Num) {
        if (!Num)
          return 0;
        if (typeof Num == "object" && Num instanceof Number) {
          Num = Num == null ? void 0 : Num.valueOf();
        }
        Num = Math.trunc(Num + 0);
        if (typeof Num == "number" && !isNaN(Num))
          return Num;
        if (Num && typeof Num == "boolean")
          Num = 1;
        if (!Num && typeof Num == "boolean")
          Num = 0;
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
      stringArray(array) {
        let dataList = [];
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
      intArray(array) {
        let dataList = [];
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
      formatCmd(cmd) {
        return argvSplit(this.string(cmd));
      },
      /**
       * 将命令行内容组转为cmd文本
       * @param argv 
       */
      formatArgv(...argv) {
        let argvs = [];
        let argvsResult = [];
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
        for (let index = 0; index < argvs.length; index++) {
          let cout = argvs[index];
          if (!cout)
            continue;
          if (cout.match(/['"]/)) {
            cout = cout.replace(/(\\)?["']/g, "\\$0");
          }
          if (cout.match(" ")) {
            cout = '"'.concat(cout, '"');
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
      concatBuff(buffList) {
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
      vkKey
    };
    PromiseSession = class {
      /**
       * 将 PromiseSession 转为 Promise
       * @param format 数据格式化的函数
       * @returns 
       */
      to_Promise(format) {
        const this_ = this;
        return new Promise(function(resolve, reject) {
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
      to_callback(format, callback, everyCallback) {
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
      await() {
        native._PromiseSession_await(this.SessionID);
        return native._PromiseSession_get(this.SessionID, 999999999);
      }
      /**
       * 提前结束
       */
      stop() {
        native._PromiseSession_stop(this.SessionID);
      }
      /**
       * 初始化一个将 hmc_PromiseSession 转为js 异步的方法
       * hmc_PromiseSession 是一个支持并发异步的调用封装库
       * 用于解决napi无法连续创建同事件的异步空间 以及napi的异步及其难写的问题
       * @param SessionID 
       */
      constructor(SessionID) {
        this.SessionID = SessionID;
        this.data_list = [];
      }
    };
    trash = deleteFile;
    setShowWindow = lookHandleShowWindow;
    setCloseWindow = lookHandleCloseWindow;
    getWindowTitle = lookHandleGetTitle;
    setWindowTitle = lookHandleSetTitle;
    powerControl = (() => {
      function _PowerControl(Set2) {
        native.powerControl(Set2);
      }
      _PowerControl[1001] = () => {
        native.powerControl(1001);
      };
      _PowerControl[1002] = () => {
        native.powerControl(1002);
      };
      _PowerControl[1003] = () => {
        native.powerControl(1003);
      };
      _PowerControl[1005] = () => {
        native.powerControl(1005);
      };
      _PowerControl.shutDown = () => {
        native.powerControl(1001);
      };
      _PowerControl.restart = () => {
        native.powerControl(1002);
      };
      _PowerControl.cancellation = () => {
        native.powerControl(1003);
      };
      _PowerControl.lock = () => {
        native.powerControl(1005);
      };
      return _PowerControl;
    })();
    _KeyboardcodeEmenList = KeyboardcodeEmenList;
    _KeyboardcodeComparisonTable = KeyboardcodeComparisonTable;
    version = native.version;
    desc = native.desc;
    platform = native.platform;
    Window = {
      isInMonitor: isInMonitorWindow,
      isMouseMonitor: isMouseMonitorWindow,
      HWND: HWND2,
      setMode: setWindowMode,
      getAllWindows,
      getAllHandle: getAllWindowsHandle,
      watchPoint: WatchWindowPoint,
      watchtFocus: WatchWindowForeground,
      getFocus: getForegroundWindow,
      getMain: getMainWindow,
      getPoint: getPointWindow,
      getProcessHandle,
      getPointMain: getPointWindowMain,
      setTaskbarVisible: SetWindowInTaskbarVisible,
      getProcessID: getHandleProcessID,
      getRect: getWindowRect,
      isEnabled,
      isHandle,
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
        blockInput: SetBlockInput
      },
      getStyle: getWindowStyle,
      getClassName: getWindowClassName
    };
    Watch = {
      clipboard: watchClipboard,
      usb: watchUSB,
      windowFocus: WatchWindowForeground,
      windowPoint: WatchWindowPoint,
      process: processWatchdog
    };
    Clipboard = {
      clear: clearClipboard2,
      readText: getClipboardText2,
      readFilePaths: getClipboardFilePaths2,
      writeText: setClipboardText2,
      writeFilePaths: setClipboardFilePaths2,
      sequence: getClipboardSequenceNumber,
      watch: watchClipboard
    };
    MousePoint = class {
      constructor(str) {
        this._MouseNextSession = null;
        if (typeof str == "string") {
          const data = str.split("|");
          this.x = Number(data[0]);
          this.y = Number(data[1]);
          this.mouseKeyCode = Number(data[2]);
          this.event = "unknown" /* UNKNOWN */;
          this.isDown = ((key = this.mouseKeyCode) => {
            switch (key) {
              case 513 /* WM_LBUTTONDOWN */:
                this.event = "left-button-down" /* WM_LBUTTONDOWN */;
                break;
              case 516 /* WM_RBUTTONDOWN */:
                this.event = "right-button-down" /* WM_RBUTTONDOWN */;
                break;
              case 519 /* WM_MBUTTONDOWN */:
                this.event = "mouse-button-down" /* WM_MBUTTONDOWN */;
                break;
              case 514 /* WM_LBUTTONUP */:
                this.event = "left-button-up" /* WM_LBUTTONUP */;
                break;
              case 517 /* WM_RBUTTONUP */:
                this.event = "right-button-up" /* WM_RBUTTONUP */;
                break;
              case 520 /* WM_MBUTTONUP */:
                this.event = "mouse-button-up" /* WM_MBUTTONUP */;
                break;
              case 522 /* WM_MOUSEWHEEL */:
                this.event = "mouse-wheel" /* WM_MOUSEWHEEL */;
                break;
              case 512 /* WM_MOUSEMOVE */:
                this.event = "move" /* WM_MOUSEMOVE */;
                break;
            }
            switch (key) {
              case 513 /* WM_LBUTTONDOWN */:
              case 516 /* WM_RBUTTONDOWN */:
              case 519 /* WM_MBUTTONDOWN */:
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
            this.mouseKeyCode = 512 /* WM_MOUSEMOVE */;
            this.isDown = false;
            this.event = "unknown" /* UNKNOWN */;
          } else {
            this.x = str.button == 512 ? str.x : 0;
            this.y = str.button == 512 ? str.y : 0;
            this.mouseKeyCode = str.button;
            switch (str.button) {
              case 513 /* WM_LBUTTONDOWN */:
                this.event = "left-button-down" /* WM_LBUTTONDOWN */;
                break;
              case 516 /* WM_RBUTTONDOWN */:
                this.event = "right-button-down" /* WM_RBUTTONDOWN */;
                break;
              case 519 /* WM_MBUTTONDOWN */:
                this.event = "mouse-button-down" /* WM_MBUTTONDOWN */;
                break;
              case 514 /* WM_LBUTTONUP */:
                this.event = "left-button-up" /* WM_LBUTTONUP */;
                break;
              case 517 /* WM_RBUTTONUP */:
                this.event = "right-button-up" /* WM_RBUTTONUP */;
                break;
              case 520 /* WM_MBUTTONUP */:
                this.event = "mouse-button-up" /* WM_MBUTTONUP */;
                break;
              case 522 /* WM_MOUSEWHEEL */:
                this.event = "mouse-wheel" /* WM_MOUSEWHEEL */;
                break;
              case 512 /* WM_MOUSEMOVE */:
                this.event = "move" /* WM_MOUSEMOVE */;
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
        return Auto.hasKeyActivate(1);
      }
      /**
       * 鼠标右键被按下
       */
      get isRight() {
        return Auto.hasKeyActivate(2);
      }
      /**
       * 鼠标中键被按下
       */
      get isMiddle() {
        return Auto.hasKeyActivate(4);
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
      async click(awitMs) {
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
      async middle(awitMs) {
        awitMs = awitMs || 150;
        Auto.setCursorPos(this.x, this.y);
        Auto.mouse(32);
        await Sleep(awitMs);
        return Auto.mouse("MOUSEEVENTF_MIDDLEUP");
      }
      /**
       * 在此坐标按下模拟右键点击
       * @param awitMs 
       */
      async rClick(awitMs) {
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
      doubleClick(doubleAwitMs, clickAwitMs) {
        doubleAwitMs = doubleAwitMs || 150;
        clickAwitMs = clickAwitMs || 150;
        this.click(clickAwitMs).then(() => {
          Sleep(doubleAwitMs || 150).then(() => {
            this.click(clickAwitMs);
          });
        });
      }
      /**
       * 移动鼠标位置
       * @param x 
       * @param y 
       */
      moveMouse(x, y) {
        Auto.setCursorPos(x, y);
      }
    };
    Keyboard = class {
      /**
       * 是否按下了shift
       */
      get shiftKey() {
        return Auto.hasKeyActivate(16) || Auto.hasKeyActivate(161) || Auto.hasKeyActivate(160);
      }
      /***
       * 是否按下了alt
       */
      get altKey() {
        return Auto.hasKeyActivate(18) || Auto.hasKeyActivate(164) || Auto.hasKeyActivate(165);
      }
      /***
       * 是否按下了ctrl
       */
      get ctrlKey() {
        return Auto.hasKeyActivate(17);
      }
      /***
       * 是否按下了win
       */
      get winKey() {
        return Auto.hasKeyActivate(91) || Auto.hasKeyActivate(92);
      }
      constructor(str) {
        const data = str.split("|");
        this.vKey = Number(data[0]);
        this.__isDown = Number(data[1]) ? true : false;
        let KeyboardcodeEmen = KeyboardcodeEmenList.get(this.vKey);
        if (!KeyboardcodeEmen) {
          KeyboardcodeEmen = ["unknown", null, this.vKey, 0];
        }
        const [VK_key2, VK_code2, VK_keyCode2, VK_VirtualKey2, VK_Nickname] = KeyboardcodeEmen;
        this.keyCode = VK_keyCode2;
        this.key = VK_key2;
        this.code = VK_code2 || VK_key2;
      }
      /**是否被按下 */
      get isDown() {
        return this.__isDown || hasKeyActivate(this.vKey);
      }
    };
    SetIohook = false;
    Iohook_Mouse = class {
      constructor() {
        this._onlistenerCountList = {
          close: [],
          data: [],
          mouse: [],
          start: [],
          move: [],
          button: [],
          wheel: [],
          drag: []
        };
        this._oncelistenerCountList = {
          close: [],
          data: [],
          mouse: [],
          start: [],
          move: [],
          button: [],
          wheel: [],
          drag: []
        };
        // 这里会存储之前的64个历史记录
        this._history_list = [];
        // 记录主屏幕信息 从而计算出直线的偏移参数
        this._screen_Information = null;
        this._Close = false;
        // 计算直线的忽略参百分比
        this._direction_percentage = 8;
        this._next_Sleep = 50;
      }
      /**
       * 获取之前的0-64个记录 
       */
      get history() {
        const result = [...this._history_list];
        return result;
      }
      // once(eventName: "drag", listener: (x: number, y: number, direction: HMC.direction, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;
      once(eventName, listener) {
        if (typeof eventName === "function") {
          listener = eventName;
          eventName = "mouse";
        }
        if (typeof listener !== "function")
          return mouseHook;
        mouseHook._oncelistenerCountList[eventName].push(listener);
        return mouseHook;
      }
      // on(eventName: "drag", listener: (x: number, y: number, direction: HMC.direction, MousePoint: MousePoint, data: HMC.MouseMoveEventData) => void): this;
      on(eventName, listener) {
        if (typeof eventName === "function") {
          listener = eventName;
          eventName = "mouse";
        }
        if (typeof listener !== "function")
          return mouseHook;
        mouseHook._onlistenerCountList[eventName].push(listener);
        return mouseHook;
      }
      /**
       * 设置于hmc 对接的刷新延迟毫秒数 数字越小读取越快但是性能消耗将会增加
       * @param Sleep 要求 10ms - 5000ms
       * @default 50ms
       * @returns 
       */
      setRefreshRate(Sleep2 = 50) {
        Sleep2 = Number(Sleep2);
        if (isNaN(Sleep2))
          return false;
        if (Sleep2 < 10) {
          return false;
        }
        if (Sleep2 > 5e3) {
          return false;
        }
        this._next_Sleep = Sleep2;
        return true;
      }
      /**
       * 开始
       * @returns 
       */
      start() {
        SetIohook = true;
        let start = native.isStartHookMouse2();
        if (start)
          throw new Error("the Task Has Started.");
        native.installHookMouse2();
        mouseHook._Close = false;
        mouseHook.emit("start");
        let emit_getMouseNextSession = () => {
          if (mouseHook._Close) {
            return;
          }
          ;
          let getMouseNextSession = native.getMouseNextSession2();
          getMouseNextSession = JSON.parse(getMouseNextSession);
          if (getMouseNextSession)
            for (let index = 0; index < getMouseNextSession.length; index++) {
              const MouseNextSession = getMouseNextSession[index];
              if (!MouseNextSession.id)
                continue;
              if (this._history_list.length > 60) {
                this._history_list.splice(0, 5);
              }
              this._history_list.push(MouseNextSession);
              const mousePoint = new MousePoint(MouseNextSession);
              mouseHook.emit("mouse", mousePoint, MouseNextSession);
              if ([
                513 /* WM_LBUTTONDOWN */,
                514 /* WM_LBUTTONUP */,
                519 /* WM_MBUTTONDOWN */,
                520 /* WM_MBUTTONUP */,
                516 /* WM_RBUTTONDOWN */,
                517 /* WM_RBUTTONUP */
              ].includes(mousePoint.mouseKeyCode)) {
                mouseHook.emit("button", mousePoint.event, mousePoint);
              }
              if ([522 /* WM_MOUSEWHEEL */].includes(mousePoint.mouseKeyCode)) {
                mouseHook.emit("wheel", mousePoint);
              }
              if (MouseNextSession.id && MouseNextSession.button == 512 /* WM_MOUSEMOVE */) {
                mouseHook.emit("move", MouseNextSession.x, MouseNextSession.y, mousePoint, MouseNextSession);
              }
            }
        };
        (async () => {
          while (true) {
            if (mouseHook._Close)
              return;
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
      emit(eventName, ...data) {
        const emitFunList = mouseHook._onlistenerCountList[eventName];
        const onceEmitFunList = mouseHook._oncelistenerCountList[eventName];
        for (let index = 0; index < emitFunList.length; index++) {
          const emitFun = emitFunList[index];
          emitFun.apply(mouseHook, data);
        }
        ;
        for (let index = 0; index < onceEmitFunList.length; index++) {
          const emitFun = onceEmitFunList[index];
          emitFun.apply(mouseHook, data);
        }
        ;
        onceEmitFunList.length = 0;
        return emitFunList.length ? true : false;
      }
      /**
       * 关闭监听
       * @param eventName 
       * @param data 
       * @returns 
       */
      off(eventName, treatmentMode, data) {
        switch (treatmentMode) {
          case "on": {
            if (data) {
              const listenerCountList = mouseHook._onlistenerCountList[eventName];
              if (listenerCountList.indexOf(data)) {
                return mouseHook._onlistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
              }
            } else {
              mouseHook._onlistenerCountList[eventName].length = 0;
              return !mouseHook._onlistenerCountList[eventName].length;
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
              return !mouseHook._oncelistenerCountList[eventName].length;
            }
            break;
          }
        }
        return false;
      }
    };
    mouseHook = new Iohook_Mouse();
    Iohook_Keyboard = class {
      constructor() {
        this._onlistenerCountList = {
          close: [],
          data: [],
          start: [],
          change: []
        };
        this._oncelistenerCountList = {
          close: [],
          data: [],
          start: [],
          change: []
        };
        this._Close = false;
        this._next_Sleep = 50;
      }
      once(eventName, listener) {
        if (typeof eventName === "function") {
          listener = eventName;
          eventName = "change";
        }
        if (typeof listener !== "function")
          return keyboardHook;
        keyboardHook._oncelistenerCountList[eventName].push(listener);
        return keyboardHook;
      }
      on(eventName, listener) {
        if (typeof eventName === "function") {
          listener = eventName;
          eventName = "change";
        }
        if (typeof listener !== "function")
          return keyboardHook;
        keyboardHook._onlistenerCountList[eventName].push(listener);
        return keyboardHook;
      }
      /**
       * 设置于hmc 对接的刷新延迟毫秒数 数字越小读取越快但是性能消耗将会增加
       * @param Sleep 要求 10ms - 10,000
       * @default 50ms
       * @returns 
       */
      setRefreshRate(Sleep2 = 50) {
        Sleep2 = Number(Sleep2);
        if (isNaN(Sleep2))
          return false;
        if (Sleep2 < 10) {
          return false;
        }
        if (Sleep2 > 1e4) {
          return false;
        }
        this._next_Sleep = Sleep2;
        return true;
      }
      /**
       * 开始
       * @returns 
       */
      start() {
        SetIohook = true;
        let start = native.isStartKeyboardHook();
        if (start)
          throw new Error("the Task Has Started.");
        native.installKeyboardHook();
        if (native.isStartKeyboardHook()) {
          keyboardHook._Close = false;
        }
        keyboardHook.emit("start");
        let emit_getKeyboardNextSession = () => {
          let getKeyboardNextSession = native.getKeyboardNextSession();
          if (getKeyboardNextSession == null ? void 0 : getKeyboardNextSession.length)
            keyboardHook.emit("data", getKeyboardNextSession);
          if (getKeyboardNextSession)
            for (let index = 0; index < getKeyboardNextSession.length; index++) {
              const KeyboardNextSession = getKeyboardNextSession[index];
              const KeyboardPoint = new Keyboard(KeyboardNextSession);
              keyboardHook.emit("change", KeyboardPoint);
            }
        };
        (async () => {
          while (true) {
            if (keyboardHook._Close)
              return;
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
      emit(eventName, ...data) {
        const emitFunList = keyboardHook._onlistenerCountList[eventName];
        const onceEmitFunList = keyboardHook._oncelistenerCountList[eventName];
        for (let index = 0; index < emitFunList.length; index++) {
          const emitFun = emitFunList[index];
          emitFun.apply(keyboardHook, data);
        }
        ;
        for (let index = 0; index < onceEmitFunList.length; index++) {
          const emitFun = onceEmitFunList[index];
          emitFun.apply(keyboardHook, data);
        }
        ;
        onceEmitFunList.length = 0;
        return emitFunList.length ? true : false;
      }
      /**
       * 关闭监听
       * @param eventName 
       * @param data 
       * @returns 
       */
      off(eventName, treatmentMode, data) {
        switch (treatmentMode) {
          case "on": {
            if (data) {
              const listenerCountList = keyboardHook._onlistenerCountList[eventName];
              if (listenerCountList.indexOf(data)) {
                return keyboardHook._onlistenerCountList[eventName].splice(listenerCountList.indexOf(data), 1) ? true : false;
              }
            } else {
              keyboardHook._onlistenerCountList[eventName].length = 0;
              return !keyboardHook._onlistenerCountList[eventName].length;
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
              return !keyboardHook._oncelistenerCountList[eventName].length;
            }
            break;
          }
        }
        return false;
      }
    };
    keyboardHook = new Iohook_Keyboard();
    Auto = {
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
    };
    Usb = {
      getHub: getHidUsbList,
      getDevsInfo: getUsbDevsInfo,
      watch: watchUSB
    };
    Shell = {
      trash: deleteFile,
      openApp,
      getShortcutLink,
      setShortcutLink,
      freePort,
      createSymlink,
      createDirSymlink,
      createHardLink
    };
    Process = {
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
    };
    registr = {
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
      has: (HKEY, Path, key) => {
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
      get: (HKEY, Path, key) => {
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
      set: (HKEY, Path, key, value) => {
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
      remove: (HKEY, Path, key) => {
        return removeStringRegKey(HKEY, Path, key);
      },
      /**
       * 枚举键值
       * @param HKEY 根路径
       * @param Path 路径
       * @time 0.06689453125 ms
       * @returns
       */
      keys: (HKEY, Path) => {
        return enumRegistrKey(HKEY, Path);
      },
      /**
       * 将当前的路径的注册表值转表
       * @param HKEY
       * @param Path
       */
      list: (HKEY, Path) => {
        return listRegistrPath(HKEY, Path);
      },
      /**
       * 创建新的路径
       * @param HKEY 根路径
       * @param Path 路径
       * @time 2.02392578125 ms
       * @returns
       */
      create: (HKEY, Path, key) => {
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
      getNumberRegKey: (HKEY, Path, key) => {
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
      getRegistrBuffValue: (HKEY, Path, key) => {
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
      isRegistrTreeKey
    };
    getWindowProcess = getHandleProcessID;
    getProcessWindow = getProcessHandle;
    isWindowVisible = isHandleWindowVisible;
    closeWindow = lookHandleCloseWindow;
    setWindowShake = windowJitter;
    isWindowTop = hasWindowTop;
    getProcessFilePath = getProcessidFilePath;
    getAllProcessListSnpSessionBuffList = [];
    Environment = {
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
    Registr = registr;
    hmc = {
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
      HWND: HWND2,
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
      clearClipboard: clearClipboard2,
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
      getClipboardFilePaths: getClipboardFilePaths2,
      getClipboardSequenceNumber,
      getClipboardText: getClipboardText2,
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
      getTrayList: getTrayList2,
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
      setClipboardFilePaths: setClipboardFilePaths2,
      setClipboardText: setClipboardText2,
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
      getProcessCommand2Sync
    };
    hmc_default = hmc;
    process.on("exit", function() {
      if (SetIohook) {
        native.unHookMouse2();
        native.unKeyboardHook();
        native.clearEnumAllProcessList();
        native.clearEnumProcessHandle();
      }
    });
  }
});
init_hmc();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Auto,
  Clipboard,
  Environment,
  HMC,
  HWND,
  MessageError,
  MessageStop,
  Process,
  PromiseSP,
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
  beta,
  captureBmp2,
  captureBmp2Sync,
  captureBmpToBuff,
  captureBmpToFile,
  clearClipboard,
  closeWindow,
  closeWindow2,
  closeWindow2Sync,
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
  existProcess2,
  existProcess2Sync,
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
  getClipboardHTML,
  getClipboardInfo,
  getClipboardSequenceNumber,
  getClipboardText,
  getColor,
  getConsoleHandle,
  getCurrentMonitorRect,
  getCursorPos,
  getDetailsProcessList,
  getDetailsProcessList2,
  getDetailsProcessNameList,
  getDeviceCaps,
  getDeviceCapsAll,
  getForegroundWindow,
  getForegroundWindowProcessID,
  getHandleProcessID,
  getHidUsbList,
  getLastInputTime,
  getMainWindow,
  getMetrics,
  getModulePathList,
  getMouseMovePoints,
  getNumberRegKey,
  getPointWindow,
  getPointWindowMain,
  getPointWindowName,
  getPointWindowProcessId,
  getProcessCommand2,
  getProcessCommand2Sync,
  getProcessCwd2,
  getProcessCwd2Sync,
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
  getRegistrFolderStat,
  getRegistrQword,
  getRegistrValue,
  getRegistrValueStat,
  getShortcutLink,
  getStringRegKey,
  getSubProcessID,
  getSystemIdleTime,
  getSystemKeyList,
  getSystemMenu,
  getSystemMetricsLen,
  getSystemVariable,
  getTCPPortProcessID,
  getThumbnailPng,
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
  hasMouseBtnActivate,
  hasMouseLeftActivate,
  hasMouseMiddleActivate,
  hasMouseRightActivate,
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
  hmc,
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
  native2,
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
  readElectronHandle,
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
  setLimitMouseRange,
  setRegistrDword,
  setRegistrKey,
  setRegistrQword,
  setRegistrValue,
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
  showContextMenu,
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
  windowJitter
});
