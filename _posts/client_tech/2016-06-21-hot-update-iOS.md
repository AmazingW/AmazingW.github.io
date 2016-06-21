---
layout: post
title: iOS的原生热更新做法
description: "iOS的原生热更新做法"
category: 客户端开发
tags: [iOS,热更新]
keywords: iOS,热更新
---

#### 简介

framework是Cocoa/Cocoa Touch程序中使用的一种资源打包方式，可以将将代码文件、头文件、资源文件、说明文档等集中在一起，方便开发者使用，作为一名Cocoa/Cocoa Touch程序员每天都要跟各种各样的Framework打交道。Cocoa/Cocoa Touch开发框架本身提供了大量的Framework，比如Foundation.framework/UIKit.framework/AppKit.framework等。需要注意的是，这些framework无一例外都是动态库


#### iOS上动态库可以做什么

和静态库在编译时和app代码链接并打进同一个二进制包中不同，动态库可以在运行时手动加载，这样就可以做很多事情，比如：


##### 应用插件化

目前很多应用功能越做越多，软件显得越来越臃肿。因此插件化就成了很多软件发展的必经之路，比如支付宝这种平台级别的软件：

![POZWJg](../../../assets/img/hot1.png)

首页上密密麻麻的功能，而且还在增多，照这个趋势发展下去，软件包的大小将会不可想象。目前常用的解决方案是使用web页面，但用户体验和Native界面是没法比的。

设想，如果每一个功能点都是一个动态库，在用户想使用某个功能的时候让其从网络下载，然后手动加载动态库，实现功能的的插件化，就再也不用担心功能点的无限增多了，这该是件多么美好的事！

##### 软件版本实时模块升级

还在忍受苹果动辄一周，甚至更长的审核周期吗？有了动态库妈妈就再也不用担心你的软件升级了！

如果软件中的某个功能点出现了严重的bug，或者想在其中新增功能，你的这个功能点又是通过动态库实现的，这时候你只需要在适当的时候从服务器上将新版本的动态库文件下载到本地，然后在用户重启应用的时候即可实现新功能的展现。

##### 共享可执行文件

在其它大部分平台上，动态库都可以用于不同应用间共享，这就大大节省了内存。从目前来看，iOS仍然不允许进程间共享动态库，即iOS上的动态库只能是私有的，因为我们仍然不能将动态库文件放置在除了自身沙盒以外的其它任何地方。

不过iOS8上开放了App Extension功能，可以为一个应用创建插件，这样主app和插件之间共享动态库还是可行的


#### 创建动态库

##### 1、创建动态库

##### 创建工程文件
在下图所示界面能够找到Cocoa Touch动态库的创建入口：

![POZWJg](../../../assets/img/hot2.png)


##### 2.编写动态库

![POZWJg](../../../assets/img/hot3.png)

##### 3.暴露头文件

![POZWJg](../../../assets/img/hot4.png)

##### 4.执行

![POZWJg](../../../assets/img/hot5.png)



### 接下来是本地的操作过程,远程下载也是一样

找到framework,放入你的工程中,用添加图片资源的方式放入

![POZWJg](../../../assets/img/hot6.png)


在linklibray,删除可能被引入库。

### 执行

![POZWJg](../../../assets/img/hot7.png)


源码在[https://github.com/AmazingW/runlibtest](https://github.com/AmazingW/runlibtest)