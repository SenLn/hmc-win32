# 自动化键鼠相关 hmc_automation_util

自动化键鼠相关

- include ： `hmc-module\include\hmc_automation_util.h`
- cpp : `hmc-module\src\hmc_automation_util.cpp`
- c++ version ：`C++17`



## hmc_Keyboard 是个键盘操作功能合集

#### 结构体

- **chHasKeysBasic** 键盘四大功能键的状态数据体
  - shift `bool`
  - alt `bool`
  - ctrl `bool`
  - win `bool`

- **chKeyboardHookEvent** 低级hook事件数据体
  -  `long long` id;  // 事件id
  - `long` keyCode;  // 键码
  - `DWORD` time;   // 事件时间
  - `bool` down;    // 按键是否被按下
  - `DWORD` scanCode; // 执行的设备id
  - `DWORD` flags;   // 扩展键标志
  -  `bool`  is_valid();   // 判断内容是否有效
  - `std::string` to_json(); // 转为json

### keyboardHook 键盘低级监听函数

- 方法1允许返回一个布尔值用于控制此事件是否拦截

##### 方法1

```c++
#include <iostream>
#include "hmc_automation_util.h"


bool keyCallBack(hmc_Keyboard::chKeyboardHookEvent event)
{

    std::cout << "Keyboard-> " << event.to_mpKey() <<"  down: " << std::boolalpha << event.down << "\n";

   if (event.keyCode == VK_ESCAPE && event.down)
            {
                hmc_Keyboard::keyboardHook::stopHookKeyboard();
            }

    return true;
}



int main()
{

    hmc_Keyboard::keyboardHook::initKeyboardEventHook(keyCallBack);

    do
    {
        ::Sleep(1500);
    } while (hmc_Keyboard::keyboardHook::isValidHookKeyboard());

}

```

##### 方法2

```c++
#include <iostream>
#include "hmc_automation_util.h"

int main()
{

    hmc_Keyboard::keyboardHook::initKeyboardEventHook();

    do
    {

        auto KeyboardEvent = hmc_Keyboard::keyboardHook::getAllKeyboardEvent();

        for (auto&& event : KeyboardEvent)
        {
            std::cout << " [ " << event.to_mpKey() << " ] " << event.to_json() << std::endl;

            if (event.keyCode == VK_ESCAPE && event.down)
            {
                hmc_Keyboard::keyboardHook::stopHookKeyboard();
            }
        }

        ::Sleep(50);

    } while (hmc_Keyboard::keyboardHook::isValidHookKeyboard());
}

```



## hmc_mouse 是个鼠标操作功能合集

#### 结构体

- **chMouseHookEvent** 低级hook事件数据体
  - `long long` id;    // 事件id
  - `long` button;     // 按钮是哪个
  - `long` wheelDelta; // 滚轮数据 如果向上则为正值 向下则为负值
  - `bool` buttonDown; // 按钮是否按下状态的  如果滚轮则为向上
  - `DWORD` time;      // 事件时间
  - `long` x;          // 坐标 左到右边
  - `long` y;          // 坐标 顶部到底部
  - `MouseEvent();`    // 开辟内存
  - `bool is_valid();` // 判断内容是否有效
  - `std::string to_json();` // 转到json
  
-  **chMouseBasic**
  - `bool` middle; // 鼠标中键被按下
  - `bool` right;  // 鼠标右键被按下
  - `bool` left;   // 鼠标左键被按下



### MouseHook鼠标低级监听函数

- 方法1允许返回一个布尔值用于控制此事件是否拦截

##### 方法1

```c++
#include <iostream>
#include "hmc_automation_util.h"


bool mouseCallBack(hmc_mouse::chMouseHookEvent event) {

    std::cout << " [ chMouseHookEvent ] " << event.to_json() << std::endl;
    

    if (event.id > 500) {
    
        hmc_mouse::MouseHook::stopHookMouse();
    
    }

    return true;
}

int main()
{

    hmc_mouse::MouseHook::initMouseEventHook(mouseCallBack);

    do
    {
        ::Sleep(1500);
    } while (hmc_mouse::MouseHook::isValidHookMouse());

}

```

##### 方法2

```c++
#include <iostream>
#include "hmc_automation_util.h"

int main()
{

    hmc_mouse::MouseHook::initMouseEventHook();

    do
    {
        auto mousePoints = hmc_mouse::MouseHook::getMouseEvent();

        for (auto&& event : mousePoints) {

            std::cout << " [ chMouseHookEvent ] " << event.to_json() << std::endl;


            if (event.id > 500) {

                hmc_mouse::MouseHook::stopHookMouse();

            }

        }

        ::Sleep(30);
    } while (hmc_mouse::MouseHook::isValidHookMouse());

}

```

## 限制鼠标移动位置

setLimitMouseRange API 是一个限制鼠标可移动范围的函数，他可以为鼠标划定一个屏幕上的指定矩形，划定为鼠标可移动的范围

ps:

- 可以调用 **stopLimitMouseRangeWorker** 提前结束
- 最高不允许超过30000ms (30秒) 最低不允许低于31ms
- 范围为正方形 如果没有设置right与bottom的值则将限制为1x1的正方形 (不可动)

```javascript
#include <iostream>
#include "hmc_automation_util.h"

int main()
{

    if (!hmc_mouse::LimitMouseRange::hasLimitMouseRange_worker()) {
       
        // 划分一个 从1,1 开始 的50x50矩形限制位置
        hmc_mouse::LimitMouseRange::setLimitMouseRange(5000, 1, 50, 50, 50);
        
        // 提前结束
        hmc_mouse::LimitMouseRange::stopLimitMouseRange_worker();
    
    }
}

```

![image-20240404132340084](https://s2.loli.net/2024/04/04/KaoEypRqPlfzOLj.png)

### hmc_automation_util 是个相关操作功能合集

#### 类型定义

- **GpMouseEventList**  事件名称对应表
- 
