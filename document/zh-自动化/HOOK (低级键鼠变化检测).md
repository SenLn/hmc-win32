# 键鼠HOOK

低级键鼠变化检测

## `mouseHook `鼠标低级变化响应展示

`mouseHook` 是一个类 但是在加载的时候已经初始化完成了，所以不需要用户主动 new ，但是他并不会主动注册hook，因为他需要 `.start()` 启动，启动的同时将会注册win32的低级hook函数，但是值得注意的是这个功能十分低级，他会处理每一次鼠标的事件，处理完成才会回传给下一个鼠标处理事件，最后才会响应给系统，hmc也提供了回馈值的响应速率 如果反馈时间过快将会影响系统性能，以及鼠标卡顿感，所以建议默认值使用

------

**一个简单的实例**

```javascript
    // all
    hmc.mouseHook.on("mouse",(MousePointEvent,sessionEvent)=>{
        const {event,x,y,buttonDown} = MousePointEvent;
        const {time} = sessionEvent;
        console.log(`[ ${event} ]  { x:%d y:%d }  [ ${buttonDown?"按下":"释放"} ]  time:[%d]`,x,y,time,[MousePointEvent,sessionEvent]);
        
        // 滚轮
        if(event=="mouse-wheel"){
            // buttonDown==true  or  wheelDelta==true   是 滚轮向上  
            
    		console.log((sessionEvent.wheelDelta>0)?"滚轮向上":"滚轮向下")    
        }
    });

    // 监听函数已经添加  启动hook
    hmc.mouseHook.start();
	// 在适当的时间时候释放变化检测函数
	setTimeout(()=>hmc.mouseHook.stop(),5000);
```

### 数据体封装

hmc.mouseHook.on( "mouse" , ( **MousePointEvent** , **sessionEvent** )=>{})

------

### MousePointEvent

MousePoint是一个new出来的类，他记录了基础的信息以及简单的判断

- **.isDown** 按键是否被按下 如果事件是`mouse-wheel` 这参数代表了滚轮是否是向上的
- **.mouseKeyCode** 鼠标的按键代码 代码值详见 .event
- **.x** 事件被记录时候的鼠标坐标位置 (仅在move 事件中有数据 其他事件时为节省性能并不会添加值)
- **.y** 事件被记录时候的鼠标坐标位置 (仅在move 事件中有数据 其他事件时为节省性能并不会添加值)
- **.isLeft** 判断当前左键是否被按下 (实时)
- **.isMiddle** 判断当前中键是否被按下 (实时)
- **.isRight** 判断当前右键是否被按下 (实时)
- **.click** 在此坐标模拟进行单击
- **.middle** 模拟右键在此坐标按下和释放鼠标中键
- **.rClick** 在此坐标按下模拟右键点击
- **.doubleClick** 双击
- **.moveMouse** 移动鼠标位置
- **.event** 事件名
  - **move** 鼠标移动 [ code: 512 ]
  - **mouse-wheel** 鼠标滚轮 ps: [ code: 522 ]
  - **left-button-down** 鼠标左键按下 [ code: 513 ]
  - **right-button-down** 鼠标右键按下 [ code: 516 ]
  - **left-button-up** 鼠标左键释放 [ code: 514 ]
  - **right-button-up** 鼠标右键释放 [ code: 517 ]
  - **mouse-button-down** 鼠标中键按下 [ code: 519 ]
  - **mouse-button-up** 鼠标中键释放 [ code: 520 ]

### sessionEvent

sessionEvent 是与c++内部交流的一个数据体包装，他同时还提供了部分可能会用得到的数据体，因为例如 移动 , 按键 这些数据体需要的数据不一样所以我将他进行简单的分类

**这些是必须会有的值**

- **time** 此值是鼠标响应事件时候的时间 他是由计算机启动时间开始时候开始计算的
- **id** 本次事件的id (如果你发现id不连续这是正常现象，由于鼠标移动数据更新量非常巨大，为了api稳定hmc省略了一些无意义的数据 例如15ms内的5像素偏移) 如果你使用的鼠标具有调整刷新率的功能 你就会发现他具备有很多分类例如 800 1500 这些数据就是每秒向计算机发送坐标的数据量，所以他带有了很多的无意义内容 例如1px的来回移动

### **MouseMoveEventData 鼠标移动 [move]**

- **time** 见↑
- **id** 见↑
- **button** move只会是 512
- **x** 坐标 从右边到左边的距离
- **y** 坐标 从顶部到底部的距离

### **MouseMouseEventData 鼠标按钮**

- **time** 见↑
- **id** 见↑
- **button** 见 MousePointEvent.event
- **buttonDown** 按钮是否是按下的 如果是滚轮这里也代表了是否向上
- **wheelDelta** 如果是滚轮这里是正数字或者负数字 代表了滚轮是向上还是向下
- **name** 按键名称 "left-mouse-button" | "right-mouse-button" | "middle-mouse-button"

------

### 函数封装

- **on** 注册检测变化响应函数
  - "**start**" 启动响应函数
  - "**close**" 关闭响应函数
  - "**mouse**" 鼠标所有事件响应函数
  - "**button**" 按键按下时候响应函数(滚轮也算按键)
  - "**whee**" 滚轮响应函数
  - "**move**" 鼠标移动 响应函数
  - "**data**" 内联数据体 非必要请勿获取
- **once** 注册检测变化响应函数 可注册内容同on
- **start** 启动并且向系统注册低级检测
- **history** 获取之前的0-64个记录
- **stop** 停止检测变化(全部)
- **off** 关闭指定的检测变化响应函数
  - ***eventName*** 需要关闭事件：
    - "start" 启动响应函数
    - "close" 关闭响应函数
    - "mouse" 鼠标所有事件响应函数
    - "move" 鼠标移动 响应函数
    - "data" 如果treatmentMode为on 将彻底禁用响应但是不结束检测变化
    - "button" 按键按下时候响应函数
    - "whee" 滚轮响应函数
  - ***treatmentMode*** 需要关闭事件的注册方式 ：
    - "on" 关闭所有的on函数
    - "once" 关闭所有的once函数
    - Function 注册时候用的函数
  - **data** Function [可省略]





## `keyboardHook`   键盘低级变化响应展示

`keyboardHook` 是一个类 但是在加载的时候已经初始化完成了，所以不需要用户主动 new ，但是他并不会主动注册hook，因为他需要 `.start()` 启动，启动的同时将会注册win32的低级hook函数，但是值得注意的是这个功能十分低级，他会处理每一次键盘的事件，处理完成才会回传给下一个键盘处理事件，最后才会响应给系统，hmc也提供了回馈值的响应速率 如果反馈时间过快将会影响系统性能，以及键盘卡顿感，所以建议默认值使用

------

### **一个简单的实例**

```javascript
	hmc.keyboardHook.start();

    hmc.keyboardHook.on("change", function (KeyboardPoint) {
        
        console.log(
            "key-> " + KeyboardPoint.key, 
            "keyCode -> " + KeyboardPoint.keyCode, 
            ` [ ${KeyboardPoint.isDown ? "按下" : "释放"} ] `
            );

            // 按下回车时候结束
            if(KeyboardPoint.key=='Enter'){
                // 结束
                hmc.keyboardHook.close();
            }
            
    });
```

### **数据体解析**

hmc.keyboardHook.on("change", function (**KeyboardPoint**) );

------

### **KeyboardPoint**

- **code**: 这个和浏览器是同标准的 **详见按键名称**
- **key**: 这个和浏览器是同标准的 **详见按键名称**
- **keyCode**: 这个和浏览器是同标准的 **详见按键名称**
- **isDown**: 按钮是否被按下
- **vKey**: 这个和浏览器是同标准的
- **altKey**: 当前Alt是否被按下(实时)
- **ctrlKey**: 当前Ctrl是否被按下(实时)
- **shiftKey**: 当前Shift是否被按下(实时)
- **winKey**: 当前Win是否被按下(实时)

### **按键名称**



| key                | code           | keyCode | VirtualKey | 别名(用于send)                       |
| :----------------- | :------------- | :------ | :--------- | :----------------------------------- |
| 0                  | Digit0         | 48      | 0x30       |                                      |
| 1                  | Digit1         | 49      | 0x31       |                                      |
| 2                  | Digit2         | 50      | 0x32       |                                      |
| 3                  | Digit3         | 51      | 0x33       |                                      |
| 4                  | Digit4         | 52      | 0x34       |                                      |
| 5                  | Digit5         | 53      | 0x35       |                                      |
| 6                  | Digit6         | 54      | 0x36       |                                      |
| 7                  | Digit7         | 55      | 0x37       |                                      |
| 8                  | Digit8         | 56      | 0x38       |                                      |
| 9                  | Digit9         | 57      | 0x39       |                                      |
| A                  | KeyA           | 65      | 0x41       |                                      |
| B                  | KeyB           | 66      | 0x42       |                                      |
| C                  | KeyC           | 67      | 0x43       |                                      |
| D                  | KeyD           | 68      | 0x44       |                                      |
| E                  | KeyE           | 69      | 0x45       |                                      |
| F                  | KeyF           | 70      | 0x46       |                                      |
| G                  | KeyG           | 71      | 0x47       |                                      |
| H                  | KeyH           | 72      | 0x48       |                                      |
| I                  | KeyI           | 73      | 0x49       |                                      |
| J                  | KeyJ           | 74      | 0x4a       |                                      |
| K                  | KeyK           | 75      | 0x4b       |                                      |
| L                  | KeyL           | 76      | 0x4c       |                                      |
| M                  | KeyM           | 77      | 0x4d       |                                      |
| N                  | KeyN           | 78      | 0x4e       |                                      |
| O                  | KeyO           | 79      | 0x4f       |                                      |
| P                  | KeyP           | 80      | 0x50       |                                      |
| Q                  | KeyQ           | 81      | 0x51       |                                      |
| R                  | KeyR           | 82      | 0x52       |                                      |
| S                  | KeyS           | 83      | 0x53       |                                      |
| T                  | KeyT           | 84      | 0x54       |                                      |
| U                  | KeyU           | 85      | 0x55       |                                      |
| V                  | KeyV           | 86      | 0x56       |                                      |
| W                  | KeyW           | 87      | 0x57       |                                      |
| X                  | KeyX           | 88      | 0x58       |                                      |
| Y                  | KeyY           | 89      | 0x59       |                                      |
| Z                  | KeyZ           | 90      | 0x5a       |                                      |
| 0                  | Numpad0        | 96      | 0x60       |                                      |
| 1                  | Numpad1        | 97      | 0x61       |                                      |
| 2                  | Numpad2        | 98      | 0x62       |                                      |
| 3                  | Numpad3        | 99      | 0x63       |                                      |
| 4                  | Numpad4        | 100     | 0x64       |                                      |
| 5                  | Numpad5        | 101     | 0x65       |                                      |
| 6                  | Numpad6        | 102     | 0x66       |                                      |
| 7                  | Numpad7        | 103     | 0x67       |                                      |
| 8                  | Numpad8        | 104     | 0x68       |                                      |
| 9                  | Numpad9        | 105     | 0x69       |                                      |
| Alt                | Alt            | 18      | 0x12       |                                      |
| Alt                | AltLeft        | 164     | 0xa4       |                                      |
| Alt                | AltRight       | 165     | 0xa5       |                                      |
| CapsLock           | CapsLock       | 20      | 0x14       |                                      |
| Control            | Control        | 17      | 0x11       | ctrl                                 |
| Control            | ControlLeft    | 162     | 0xa2       | ctrl                                 |
| Control            | ControlRight   | 163     | 0xa3       | ctrl                                 |
| Win                | MetaLeft       | 91      | 0x5b       |                                      |
| Win                | MetaRight      | 92      | 0x5c       |                                      |
| NumLock            | NumLock        | 144     | 0x90       |                                      |
| ScrollLock         | null           | 145     | 0x91       |                                      |
| Shift              | Shift          | 16      | 0x10       |                                      |
| Shift              | ShiftLeft      | 160     | 0xa0       |                                      |
| Shift              | ShiftRight     | 161     | 0xa1       |                                      |
| Enter              | Enter          | 13      | 0xd        | [ **\r** ]   [ **\n\r** ] [ **\n** ] |
| Tab                | Tab            | 9       | 0x9        |                                      |
| Space              | Space          | 32      | 0x20       |                                      |
| ArrowDown          | null           | 40      | 0x28       |                                      |
| ArrowLeft          | null           | 37      | 0x25       |                                      |
| ArrowRight         | null           | 39      | 0x27       |                                      |
| ArrowUp            | null           | 38      | 0x26       |                                      |
| End                | End            | 35      | 0x23       |                                      |
| Home               | Home           | 36      | 0x24       |                                      |
| PageDown           | null           | 34      | 0x22       |                                      |
| PageUp             | null           | 33      | 0x21       |                                      |
| Backspace          | null           | 8       | 0x8        |                                      |
| Clear              | null           | 12      | 0xc        |                                      |
| Clear              | null           | 254     | 0xfe       |                                      |
| CrSel              | null           | 247     | 0xf7       |                                      |
| Delete             | null           | 46      | 0x2e       |                                      |
| EraseEof           | null           | 249     | 0xf9       |                                      |
| ExSel              | null           | 248     | 0xf8       |                                      |
| Insert             | null           | 45      | 0x2d       |                                      |
| Accept             | null           | 30      | 0x1e       |                                      |
| ContextMenu        | null           | 93      | 0x5d       |                                      |
| Escape             | null           | 27      | 0x1b       | esc                                  |
| Execute            | null           | 43      | 0x2b       |                                      |
| Finish             | null           | 241     | 0xf1       |                                      |
| Help               | null           | 47      | 0x2f       |                                      |
| Pause              | null           | 19      | 0x13       |                                      |
| Play               | null           | 250     | 0xfa       |                                      |
| Select             | null           | 41      | 0x29       |                                      |
| PrintScreen        | null           | 44      | 0x2c       |                                      |
| Standby            | null           | 95      | 0x5f       |                                      |
| Alphanumeric       | null           | 240     | 0xf0       |                                      |
| Convert            | null           | 28      | 0x1c       |                                      |
| FinalMode          | null           | 24      | 0x18       |                                      |
| ModeChange         | null           | 31      | 0x1f       |                                      |
| NonConvert         | null           | 29      | 0x1d       |                                      |
| Process            | null           | 229     | 0xe5       |                                      |
| HangulMode         | null           | 21      | 0x15       |                                      |
| HanjaMode          | null           | 25      | 0x19       |                                      |
| JunjaMode          | null           | 23      | 0x17       |                                      |
| Hankaku            | null           | 243     | 0xf3       |                                      |
| Hiragana           | null           | 242     | 0xf2       |                                      |
| KanaMode           | null           | 246     | 0xf6       |                                      |
| Romaji             | null           | 245     | 0xf5       |                                      |
| Zenkaku            | null           | 244     | 0xf4       |                                      |
| F1                 | null           | 112     | 0x70       |                                      |
| F2                 | null           | 113     | 0x71       |                                      |
| F3                 | null           | 114     | 0x72       |                                      |
| F4                 | null           | 115     | 0x73       |                                      |
| F5                 | null           | 116     | 0x74       |                                      |
| F6                 | null           | 117     | 0x75       |                                      |
| F7                 | null           | 118     | 0x76       |                                      |
| F8                 | null           | 119     | 0x77       |                                      |
| F9                 | null           | 120     | 0x78       |                                      |
| F10                | null           | 121     | 0x79       |                                      |
| F11                | null           | 122     | 0x7a       |                                      |
| F12                | null           | 123     | 0x7b       |                                      |
| F13                | null           | 124     | 0x7c       |                                      |
| F14                | null           | 125     | 0x7d       |                                      |
| F15                | null           | 126     | 0x7e       |                                      |
| F16                | null           | 127     | 0x7f       |                                      |
| F17                | null           | 128     | 0x80       |                                      |
| F18                | null           | 129     | 0x81       |                                      |
| F19                | null           | 130     | 0x82       |                                      |
| F20                | null           | 131     | 0x83       |                                      |
| MediaPlayPause     | null           | 179     | 0xb3       |                                      |
| MediaStop          | null           | 178     | 0xb2       |                                      |
| MediaTrackNext     | null           | 176     | 0xb0       |                                      |
| MediaTrackPrevious | null           | 177     | 0xb1       |                                      |
| AudioVolumeDown    | null           | 174     | 0xae       |                                      |
| AudioVolumeMute    | null           | 173     | 0xad       |                                      |
| AudioVolumeUp      | null           | 175     | 0xaf       |                                      |
| ZoomToggle         | null           | 251     | 0xfb       |                                      |
| LaunchMail         | null           | 180     | 0xb4       |                                      |
| LaunchMediaPlayer  | null           | 181     | 0xb5       |                                      |
| LaunchApplication1 | null           | 182     | 0xb6       |                                      |
| LaunchApplication2 | null           | 183     | 0xb7       |                                      |
| BrowserBack        | null           | 166     | 0xa6       |                                      |
| BrowserFavorites   | null           | 171     | 0xab       |                                      |
| BrowserForward     | null           | 167     | 0xa7       |                                      |
| BrowserHome        | null           | 172     | 0xac       |                                      |
| BrowserRefresh     | null           | 168     | 0xa8       |                                      |
| BrowserSearch      | null           | 170     | 0xaa       |                                      |
| BrowserStop        | null           | 169     | 0xa9       |                                      |
| .                  | NumpadDecimal  | 110     | 0x6e       |                                      |
| *                  | NumpadMultiply | 106     | 0x6a       |                                      |
| +                  | NumpadAdd      | 107     | 0x6b       |                                      |
| /                  | NumpadDivide   | 111     | 0x6f       |                                      |
| -                  | NumpadSubtract | 109     | 0x6d       |                                      |
| Separator          | null           | 108     | 0x6c       |                                      |
| ;                  | Semicolon      | 186     | 0xba       |                                      |
| +                  | Equal          | 187     | 0xbb       |                                      |
| ,                  | Comma          | 188     | 0xbc       |                                      |
| -                  | Minus          | 189     | 0xbd       |                                      |
| .                  | Period         | 190     | 0xbe       |                                      |
| /                  | Slash          | 191     | 0xbf       |                                      |
| `                  | Backquote      | 192     | 0xc0       |                                      |
| [                  | BracketLeft    | 219     | 0xdb       |                                      |
| \                  | Backslash      | 220     | 0xdc       |                                      |
| ]                  | BracketRight   | 221     | 0xdd       |                                      |
| '                  | Quote          | 222     | 0xde       |                                      |
| Enter              | NumpadEnter    | 224     | 0xe0       |                                      |