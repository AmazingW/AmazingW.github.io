---
layout: post
title: OC静态库编辑问题
description: ""
category: 客户端开发
tags: [OC,iOS,静态库]
keywords: "OC,iOS,静态库"
---


如果遇到提示Symbol __os_os 错误类的问题，静态库重复的问题。、

打开控制台找到对应的.a文件，执行下列命令，查看库的cpu架构代码：

lipo -info libx.a

如果看到i386 armv7 （cputype（12）subcputyp（11））这个是armv7以后的架构用

命令1：xcrun -sdk iphoneos lipo -info libx.a

可查看到cpu架构的代码

一般情况下是i386 armv7 armv7s

此时，用

命令2：xcrun -sdk iphoneos lipo -extract_family armv7 -output libx-inter.a libx.a

这个时候，解压的armv7是一个fat lib。包含了armv7 armv7s，可以用上面的命令1查看


此时分离thinlab用命令3：

lipo libx-inter.a -thin armv7s -output libx-armv7s.a

lipo libx-inter.a -thin armv7 -output libx-armv7.a


之后解压静态库

ar -x libx-armv7.a

解压之后将静态库处理后合并

libtool -static -o lib-armv7_backup.a *.o

最后把库文件整体合并一次

lipo -create -output libx.a libx-armv7.a libx-i386.a libx-armv7s.a

这样以后就不会有问题了。