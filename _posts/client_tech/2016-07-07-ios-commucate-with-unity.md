---
layout: post
title: iOS与unity交互
description: ""
category: 客户端开发
tags: [unity,iOS,xcode]
keywords: unity,iOS,xcode
---


C/C++可以直接与object-c交互，只需把文件后缀写成.mm就行了。c#又可以和C/C++交互，所以嘛。。。c#也就可以和object-c交互了。


1、在unity中 c#调用object-c 函数

首先，定义一个新建一个.mm文件，然后在里面定义一个C风格接口的函数，如

extern "C"

{

void testFunc(char* arg)

{

// 这里可以调用object-c的函数了

// 如 [[ AlertView alloc] init]; ...

}

}


第二步，将这个mm文件放到unity工程的Assets/Plugins/IOS路径下。

第三步，声明C函数。c#脚本，调用上面的C接口，C函数里面又调用object-c的函数，最终就能达到c#调用object-c的目的。但是，如何C#中并没有testFunc这个函数，所以要先做函数声明。

unity若要编译ios项目，首先要导出xcode工程，然后再由xcode导出ipa安装包。当你生产xcode工程时，你会发现，第二步中的mm文件被引用到了xcdoe工程的Libraries下（你可以在xcdoe中的Libraries下找找看）。我的理解是这个mm文件最终会被编译成库，那上面的testFunc函数就成了库函数。在c#中要使用这个库函数，首先要在文件头加入using System.Runtime.InteropServices;然后声明函数：

[DllImort("__Internal")]

private static extern void testFunc(string arg);

  注意：这里的参数类型！！！是string而不是char*。关于C与C#参数类型映射关系，可以看这里 http://blog.csdn.net/yatusiter/article/details/9221861

第四步，调用函数。这时函数也在c#中声明过了，使用时就可以直接调用了。

代码如下：

```objc
extern "C"

{

    void test(char* title, char* msg, char* url)

    {

        NSString* nstitle = [[NSString alloc] initWithUTF8String:title];

        NSString* nsmsg = [[NSString alloc] initWithUTF8String:msg];

        NSString* nsurl = [[NSString alloc] initWithUTF8String:url];



        UIAlertView* view = [[UIAlertView alloc] initWithTitle:nstitle

                                                       message:nsmsg

                                                      delegate:nil

                                             cancelButtonTitle:NSLocalizedString(@"Close", nil)

                                             otherButtonTitles:nil];



        [view show];

    }

}
```


```c#
using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;
public class testscript : MonoBehaviour {

    // Use this for initialization
    void Start () {

    }

    // Update is called once per frame
    void Update () {

    }

    [DllImport("__Internal")]
    private static extern void test (string title, string msg, string url);

    void OnGUI()
    {
        if (GUI.Button (new Rect (100, 100, 100, 50), "test obj-c func")) {
            test ("omytitle", "omymsg", "omyurl");
        }
    }
}
```

2、unity中 object-c 调用c#

```c#
UnitySendMessage("GameObjectName1", "MethodName1", "Message to send");
```
参数1：gameobject名字；参数2：回调函数的名字；参数3：参数。同android开发中java回调c#一样，三个参数都是字符串类型！但android开发中的第三个参数不能是null（若没有参数，可以用空字符串""，因为使用null程序会崩掉），这里不知道能不能为null，还没测试过。


