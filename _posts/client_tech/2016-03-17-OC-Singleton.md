---
layout: post
title: oc 设计模式总结
description: ""
category: 客户端开发
tags: [iOS,OC,Singleton,GCD]
keywords: "iOS,OC,Singleton,GCD"
---

```objc
#undef AS_SINGLETON

#define AS_SINGLETON(class) \

+ (instancetype)sharedInstance; \

+ (void)distroyInstance;



#undef DEF_SINGLETON

#define DEF_SINGLETON(class) \

static class *sharedInstance##class; \

+ (instancetype)sharedInstance { \

    @synchronized (self) { \

        if (sharedInstance##class == nil) { \

            sharedInstance##class = [[self alloc] init]; \

        } \

    } \

    return sharedInstance##class; \

} \

+ (void)distroyInstance { \

    @synchronized (self) { \

        sharedInstance##class = nil; \

    } \

}
```