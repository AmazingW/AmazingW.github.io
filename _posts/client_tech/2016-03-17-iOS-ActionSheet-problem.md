---
layout: post
title: UIActionSheet问题
description: ""
category: 客户端开发
tags: [UIActionSheet,develop,iOS]
keywords: UIActionSheet,develop,iOS
---
在开发过程中，发现有时候UIActionSheet的最后一项点击失效，点最后一项的上半区域时有效，这是在特定情况下才会发生，这个场景就是试用了UITabBar的时候才有。解决办法：

在showView时这样使用

[actionSheet showInView:[UIApplication sharedApplication].keyWindow];或者[sheet showInView:[AppDelegate sharedDelegate].tabBarController.view];

这样就不会发生遮挡现象了
