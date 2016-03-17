---
layout: post
title: cocopods 出现更新错误
description: ""
category: 工具
tags: iOS
keywords: iOS,Cocoapods,博客
---


```
2015-09-18 10:39:02.521 ruby[3178:88741] [MT] DVTAssertions: ASSERTION FAILURE in /Library/Caches/com.apple.xbs/Sources/IDEFrameworks/IDEFrameworks-8227/IDEFoundation/Initialization/IDEInitialization.m:590
Details:  Assertion failed: _initializationCompletedSuccessfully
Function: BOOL IDEIsInitializedForUserInteraction()
Thread:   <NSThread: 0x7f99f4dd77d0>{number = 1, name = main}
Hints: None
Backtrace:
  0  0x000000010dcfea5c -[DVTAssertionHandler handleFailureInFunction:fileName:lineNumber:assertionSignature:messageFormat:arguments:] (in DVTFoundation)
  1  0x000000010dcfe1e9 _DVTAssertionHandler (in DVTFoundation)
  2  0x000000010dcfe455 _DVTAssertionFailureHandler (in DVTFoundation)
  3  0x000000010dcfe3b7 _DVTAssertionFailureHandler (in DVTFoundation)
  4  0x000000010f242f5c IDEIsInitializedForUserInteraction (in IDEFoundation)
  5  0x0000000111e42eb9 +[PBXProject projectWithFile:errorHandler:readOnly:] (in DevToolsCore)
  6  0x0000000111e44a3e +[PBXProject projectWithFile:errorHandler:] (in DevToolsCore)
  7  0x00007fff93ef1f44 ffi_call_unix64 (in libffi.dylib)
Abort trap: 6
```

解决办法1：
先卸载cocopods

```
sudo gem uninstall cocoapods
```
再安装

```
sudo gem install cocoapods
```
再

```
pod install
```
