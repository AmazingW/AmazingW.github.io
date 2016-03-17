---
layout: post
title: iOS，由于图片原因导致tabbar图片点击发生zoom的现象
description: ""
category: 客户端开发
tags: [iOS,图片,tabbar,zoom]
keywords: iOS,图片,tabbar,zoom
---

代码：

```
[tabBarItem1 setFinishedSelectedImage:[UIImage imageNamed:@"tab_pressed_home_icon"] withFinishedUnselectedImage:[UIImage imageNamed:@"tab_home_icon"]];

tabBarItem1.imageInsets = UIEdgeInsetsMake(8, 0, -2, 0);
```

点击之后一直不断的变化

解决方案及原因：

这首先不是iOS语言的问题：

原因是美术给的图并不满足现有环境的使用

http://www.raywenderlich.com/50310/storyboards-tutorial-in-ios-7-part-2这个工程使用就完全没有问题

因为他的icon有retina和非retina两种的图片。我们的icon没有。

如果你需要正确展示图片，你需要通过屏幕scale的这个属性来支持你重绘图片

```
(UIImage *)thumbnailImageSize:(CGSize)size fromImage:(UIImage *)image {
    if ([[UIScreen mainScreen] respondsToSelector:@selector(scale)] == YES && [[UIScreen mainScreen] scale] == 3.00) {
        _scale = 3.00;
    } else if ([[UIScreen mainScreen] respondsToSelector:@selector(scale)] == YES && [[UIScreen mainScreen] scale] == 2.00) {
        _scale = 2.00;
    } else
        _scale = 1.00;

    UIGraphicsBeginImageContextWithOptions(size, NO, _scale);
    [image drawInRect:CGRectMake(0, 0, size.width, size.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}
```