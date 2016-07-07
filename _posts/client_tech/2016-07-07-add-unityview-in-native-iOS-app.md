---
layout: post
title: 在原生iOS应用中添加unity view
description: ""
category: 客户端开发
tags: [unity,iOS,xcode]
keywords: unity,iOS,xcode
---

#### 开发环境:
```
Unity 5.3.5f1
Xcode 7.3.1
```

#### 准备工作:

准备一个开发好的unity工程,如果没有,可以下载[https://github.com/xiayangqun/Unity535Demo](https://github.com/xiayangqun/Unity535Demo)

这个是我在网上随机找到的一个简单的unity 工程,对于此工程发生的任何XXXX,不负任何责任。


#### 开发

1.导出unity的xcode工程。

--(1).打开build settting。

![POZWJg](../../../assets/img/unity_xcode1.png)

--(2).设置playersetting

![POZWJg](../../../assets/img/unity_xcode2.png)

--(3).building导出,并选择你要导出的目录,并记录

2.设置xcode

--(1).新建xcode工程与unity导出的项目在同一级目录下,例如:~/Document/unity ; ~/Document/iostest;

![POZWJg](../../../assets/img/unity_xcode3.png)

--(2).删除storyboard以及删除plist文件相关设置

![POZWJg](../../../assets/img/unity_xcode4.png)

![POZWJg](../../../assets/img/unity_xcode5.png)

--(3).引入unity工程文件

![POZWJg](../../../assets/img/unity_xcode6.png)


Classes以及Libraries文件夹选择如下引入方式

![POZWJg](../../../assets/img/unity_xcode7.png)

Data选择如下引入方式

![POZWJg](../../../assets/img/unity_xcode8.png)


4.清理无用文件引用

在xcode中删除,请这样删除,只删除引用

![POZWJg](../../../assets/img/unity_xcode11.png)

在Libraries中的libil2cpp这个文件夹

![POZWJg](../../../assets/img/unity_xcode9.png)

在Classes中的Native这个文件夹下所有.h文件
![POZWJg](../../../assets/img/unity_xcode10.png)

5.添加链接的库文件

![POZWJg](../../../assets/img/unity_xcode12.png)

6.设置build settting

![POZWJg](../../../assets/img/unity_xcode13.png)

![POZWJg](../../../assets/img/unity_xcode14.png)

![POZWJg](../../../assets/img/unity_xcode15.png)

![POZWJg](../../../assets/img/unity_xcode16.png)

![POZWJg](../../../assets/img/unity_xcode17.png)

![POZWJg](../../../assets/img/unity_xcode18.png)

![POZWJg](../../../assets/img/unity_xcode19.png)

![POZWJg](../../../assets/img/unity_xcode20.png)

user defined ,在xcode中的build setting中添加。

![POZWJg](../../../assets/img/unity_xcode21.png)

7.添加文件

添加pch文件,并且将unity中Classes的Prefix.pch复制并替换到我们的pch文件中。

![POZWJg](../../../assets/img/unity_xcode22.png)

修改我们自己的supporting files下面的main.m 为main.mm

![POZWJg](../../../assets/img/unity_xcode23.png)

删除在build phases的unity的main.mm文件

![POZWJg](../../../assets/img/unity_xcode24.png)

8.修改代码

appdelegate的代码
![POZWJg](../../../assets/img/unity_xcode25.png)

![POZWJg](../../../assets/img/unity_xcode26.png)

viewController的代码
![POZWJg](../../../assets/img/unity_xcode27.png)

UnityAppController.h的代码
![POZWJg](../../../assets/img/unity_xcode28.png)

9.编译运行,最好在真机调试。