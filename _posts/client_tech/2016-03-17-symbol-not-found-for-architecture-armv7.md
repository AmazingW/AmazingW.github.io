---
layout: post
title: symbol(s) not found for architecture armv7
description: ""
category: 客户端开发
tags: [symbol,iOS]
keywords: symbol,iOS
---


Undefined symbols for architecture i386:
“_OBJC_CLASS_$_XXX”, referenced from:
objc-class-ref in XXX

ld: symbol(s) not found for architecture i386

clang: error: linker command failed with exit code 1 (use -v to see invocation)

如果真机调试就是 undefined symbols for architecture armv7错误！

发生这种错误通常是project.pbxproj这个文件引起的，尤其在多人合作开发的时候，svn提交不规范可能导致project.pbxproj发生错误，导致文件的引用不在project.pbxproj文件中。

xcode项目import文件会根据project.pbxproj来查找，查找不到文件的引用则会有上述的错误。

解决方法点击工程，在主界面中点击Build Phases，根据提示信息“XXX”来判断缺少什么文件，一般如果缺少自定义的文件,Complie Sources下没有XXX文件，那么就在Complie Sources中加入该文件。如果缺少类库，则在Link Binary With Libraries中加入该类库
