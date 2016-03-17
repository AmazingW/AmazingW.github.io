---
layout: post
title: iOS 如何暂停和恢复CALayer上的动画
description: ""
category: 客户端开发
tags: [iOS，CALayer，动画]
keywords: iOS，CALayer，动画
---


coreAnimation的动画是存在于CALayer上面的，有些时候需要突然暂停某个组件的动画效果，同时保留当前动画的状态，

如果是用removeAnimation会显得很突兀，不够平滑，所以可以利用设置动画速度和设置一个时间偏移量来暂停动画：

```objc
//用来暂停layer上的动画
-(void)pauseLayer:(CALayer*)layer
{
    CFTimeInterval pausedTime = [layer convertTime:CACurrentMediaTime() fromLayer:nil];
    layer.speed = 0.0;
    layer.timeOffset = pausedTime;
}
//恢复layer上的动画
-(void)resumeLayer:(CALayer*)layer
{
    CFTimeInterval pausedTime = [layer timeOffset];
    layer.speed = 1.0;
    layer.timeOffset = 0.0;
    layer.beginTime = 0.0;
    CFTimeInterval timeSincePause = [layer convertTime:CACurrentMediaTime() fromLayer:nil] - pausedTime;
    layer.beginTime = timeSincePause;
}
```