---
layout: post
title: 无限后台测试代码
description: ""
category: 客户端开发
tags: [iOS,无限后台]
keywords: iOS,无限后台
---

```oc
//--无线后台测试代码
- (void)applicationDidEnterBackground:(UIApplication *)application
{
    NSLog(@"applicationDidEnterBackground");
    [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:nil];
    mytime= [NSTimer scheduledTimerWithTimeInterval:5 target:self selector:@selector(tik) userInfo:nil repeats:YES];
}
- (void)tik{

    NSLog(@"我还活着~~%f",[[UIApplication sharedApplication]backgroundTimeRemaining]);
    if ([[UIApplication sharedApplication] backgroundTimeRemaining] < 61.0) {
        NSLog(@"要被杀了");
        //[[CKAudioTool sharedInstance] playSound];
        [[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:nil];

    }

}

```