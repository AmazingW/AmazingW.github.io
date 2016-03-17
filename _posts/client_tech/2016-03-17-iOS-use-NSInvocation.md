---
layout: post
title: iOS NSInvocation用法
description: ""
category: 客户端开发
tags: [iOS,NSInvocation]
keywords: iOS,NSInvocation
---

在 iOS中可以直接调用 某个对象的消息 方式有两种

一种是performSelector:withObject:

再一种就是NSInvocation

第一种方式比较简单，能完成简单的调用。但是对于>2个的参数或者有返回值的处理，那就需要做些额外工作才能搞定。那么在这种情况下，我们就可以使用NSInvocation来进行这些相对复杂的*作

main.h

```objc
#import <Foundation/Foundation.h>
#import "MyClass.h"

int main (int argc, const char * argv[])
{

    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    MyClass *myClass = [[MyClass alloc] init];
    NSString *myString = @"My string";

    //普通调用
    NSString *normalInvokeString = [myClass appendMyString:myString];
    NSLog(@"The normal invoke string is: %@", normalInvokeString);

    //NSInvocation调用
    SEL mySelector = @selector(appendMyString:);
    NSMethodSignature * sig = [[myClass class]
                               instanceMethodSignatureForSelector: mySelector];

    NSInvocation * myInvocation = [NSInvocation invocationWithMethodSignature: sig];
    [myInvocation setTarget: myClass];
    [myInvocation setSelector: mySelector];

    [myInvocation setArgument: &myString atIndex: 2];

    NSString * result = nil;
    [myInvocation retainArguments];
    [myInvocation invoke];
    [myInvocation getReturnValue: &result];
    NSLog(@"The NSInvocation invoke string is: %@", result);

    [myClass release];

    [pool drain];
    return 0;
}
```


```objc
#import <Foundation/Foundation.h>


@interface MyClass : NSObject {

}

- (NSString *)appendMyString:(NSString *)string;

@end
MyClass.m


[html] view plaincopy
#import "MyClass.h"


@implementation MyClass

- (id)init
{
    self = [super init];
    if (self) {
        // Initialization code here.
    }

    return self;
}

- (NSString *)appendMyString:(NSString *)string
{
    NSString *mString = [NSString stringWithFormat:@"%@ after append method", string];

    return mString;
}

- (void)dealloc
{
    [super dealloc];
}

@end
```

这里说明一下[myInvocation setArgument: &myString atIndex: 2];为什么index从2开始 ，原因为：0 1 两个参数已经被target 和selector占用