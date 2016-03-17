---
layout: post
title: iOS 常用动画
description: ""
category: 客户端开发
tags: [动画,iOS]
keywords: 动画,iOS
---
使用前

需引入QuartzCore.framework, 并在相关文件中加入 #import "QuartzCore/QuartzCore.h"

定义

shakeFeedbackOverlay为UIImageView

设置

```objc
self.shakeFeedbackOverlay.alpha = 0.0;

self.shakeFeedbackOverlay.layer.cornerRadius = 10.0; //设置圆角半径
```

1、图像左右抖动

```objc
CABasicAnimation* shake = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];

shake.fromValue = [NSNumber numberWithFloat:-M_PI/32];

shake.toValue = [NSNumber numberWithFloat:+M_PI/32];

shake.duration = 0.1;

shake.autoreverses = YES; //是否重复

shake.repeatCount = 4;

[self.shakeFeedbackOverlay.layer addAnimation:shake forKey:@"shakeAnimation"];

self.shakeFeedbackOverlay.alpha = 1.0;

[UIView animateWithDuration:2.0 delay:0.0 options:UIViewAnimationOptionCurveEaseIn | UIViewAnimationOptionAllowUserInteraction animations:^{ self.shakeFeedbackOverlay.alpha = 0.0; //透明度变0则消失 } completion:nil];
```

2、图像顺时针旋转

```objc
CABasicAnimation* shake = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];

shake.fromValue = [NSNumber numberWithFloat:0];

shake.toValue = [NSNumber numberWithFloat:2*M_PI];

shake.duration = 0.8; shake.autoreverses = NO;

shake.repeatCount = 1;

[self.shakeFeedbackOverlay.layer addAnimation:shake forKey:@"shakeAnimation"];

self.shakeFeedbackOverlay.alpha = 1.0;

[UIView animateWithDuration:10.0 delay:0.0 options:UIViewAnimationOptionCurveEaseIn | UIViewAnimationOptionAllowUserInteraction animations:^{ self.shakeFeedbackOverlay.alpha = 0.0; } completion:nil];
```

3、图像关键帧动画
```objc
CAKeyframeAnimation *animation = [CAKeyframeAnimation animation];

CGMutablePathRef aPath = CGPathCreateMutable();

CGPathMoveToPoint(aPath, nil, 20, 20);

CGPathAddCurveToPoint(aPath, nil, 160, 30, 220, 220, 240, 420);

animation.path = aPath;

animation.autoreverses = YES;

animation.duration = 2;

animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseOut];

animation.rotationMode = @"auto";

[ballView.layer addAnimation:animation forKey:@"position"];
```

4、组合动画 CAAnimationGroup

```objc
CABasicAnimation *flip = [CABasicAnimation animationWithKeyPath:@"transform.rotation.y"];

flip.toValue = [NSNumbernumberWithDouble:-M_PI];



CABasicAnimation *scale= [CABasicAnimation animationWithKeyPath:@"transform.scale"];

scale.toValue = [NSNumbernumberWithDouble:12];

scale.duration = 1.5;

scale.autoreverses = YES;



CAAnimationGroup *group = [CAAnimationGroup animation];

group.animations = [NSArray arrayWithObjects:flip, scale, nil];

group.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];

group.duration = 3;

group.fillMode = kCAFillModeForwards;

group.removedOnCompletion = NO;

[ballView.layer addAnimation:group forKey:@"position"];
```

5、指定时间内旋转图片


```objc
//启动定时器旋转光圈

- (void)startRotate

{

    self.rotateTimer = [NSTimer scheduledTimerWithTimeInterval:0.02

                                                  target:self

                                                selector:@selector(rotateGraduation)

                                                userInfo:nil

                                                 repeats:YES];

}

//关闭定时器

- (void)stopTimer

{

    if ([self.rotateTimerisValid])

{

        [self.rotateTimerinvalidate];

        self.rotateTimer = nil;

    }

}


//旋转动画

- (void)rotateGraduation

{

    self.timeCount--;

    if (self.timeCount == 0)

    {

        [self stopTimer];

        // doSomeThing //旋转完毕 可以干点别的

        self.timeCount = 25;

    }

    else

    {

        //计算角度 旋转

        static CGFloat radian = 150 * (M_2_PI / 360);

        CGAffineTransform transformTmp = self.lightImageView.transform;

        transformTmp = CGAffineTransformRotate(transformTmp, radian);

        self.lightImageView.transform = transformTmp;

    };

}
```

调用方法

```objc
self.timeCount = 25; //动画执行25次

[self startRotate];
```