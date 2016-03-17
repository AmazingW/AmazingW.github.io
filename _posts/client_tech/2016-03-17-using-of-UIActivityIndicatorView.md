---
layout: post
title: UIActivityIndicatorView 的使用
description: ""
category: 客户端开发
tags: [UIActivityIndicatorView,iOS]
keywords: "UIActivityIndicatorView,iOS"
---


UIActivityIndicatorView 非常简单 ，就是一个转圈圈的控件

初始化方法

- initWithActivityIndicatorStyle

控制一个Activity Indicator

- startAnimating

- stopAnimating

- isAnimating

hidesWhenStopped 属性

配置Activity Indicator 外观

activityIndicatorViewStyle 属性

color 属性  （iOS 5  引入）

常量三个

```c
typedef enum {
UIActivityIndicatorViewStyleWhiteLarge,
UIActivityIndicatorViewStyleWhite,
UIActivityIndicatorViewStyleGray,
} UIActivityIndicatorViewStyle;
```

使用方式就是

```oc
UIActivityIndicatorView *testActivityIndicator = [UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite]];
testActivityIndicator.center = CGPointMake(100.0f, 100.0f);//只能设置中心，不能设置大小
[testActivityIndicator setFrame = CGRectMack(100, 100, 100, 100)];//不建议这样设置，因为UIActivityIndicatorView是不能改变大小只能改变位置，这样设置得到的结果是控件的中心在（100，100）上，而不是和其他控件的frame一样左上角在（100， 100）长为100，宽为100.
[self addSubview:testActivityIndicator];
testActivityIndicator.color = [UIColor redColor]; // 改变圈圈的颜色为红色； iOS5引入
[testActivityIndicator startAnimating]; // 开始旋转
[testActivityIndicator stopAnimating]; // 结束旋转
[testActivityIndicator setHidesWhenStopped:YES]; //当旋转结束时隐藏
```

还有一个是isAnimating方法，返回一个BOOL值，可以用这个方法来判断控件是否在旋转



initWithActivityIndicatorStyle是UIActivityIndicatorView唯一的初始化方法

属性值是一个枚举变量，只有三个值：

UIActivityIndicatorViewStyleWhite; 白色圆圈

UIActivityIndicatorViewStyleWhiteLarge; 白色圆圈 但是要大些

UIActivityIndicatorViewStyleGray; 灰色圆圈