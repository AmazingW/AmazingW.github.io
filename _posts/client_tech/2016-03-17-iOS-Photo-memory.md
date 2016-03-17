---
layout: post
title: iOS图片与内存
description: ""
category: 客户端开发
tags: [iOS,图片,内存]
keywords: iOS,图片,内存
---


第一种解决方法：选择适当的加载方式

在程序的开发过程中，经常会用到很多的图片，适当的选择加载图片的方式就显得格外的重要，如果选择不得当，很容易造成内存吃紧而引起程序的崩溃。

这里介绍一下几种常见的加载方式：


用UIImage加载图像的方法很多，最常用的是下面两种：

### 一、用imageNamed函数


[UIImage imageNamed:ImageName];


### 二、用NSData的方式加载，例如：


```objc
NSString *filePath = [[NSBundle mainBundle] pathForResource:fileName ofType:extension];
NSData *image = [NSData dataWithContentsOfFile:filePath];
[UIImage imageWithData:image];
```

### 三，使用[UIImage imageWithContentOfFile:] 或者[image initWithContentOfFile:]


```objc
NSString *filePath = [[NSBundle mainBundle] pathForResource:fileName ofType:@"图片扩展名"];
[UIImage imageWithContentsOfFile:aImagePath];
```


其实本质上和方法二是一样的

由于第一种方式要写的代码比较少，可能比较多人利用imageNamed的方式加载图像。其实这两种加载方式都有各自的特点。

1）用imageNamed的方式加载时，系统会把图像Cache到内存。如果图像比较大，或者图像比较多，用这种方式会消耗很大的内存，而且释放图像的内存是一件相对来说比较麻烦的事情。例如：如果利用imageNamed的方式加载图像到一个动态数组NSMutableArray，然后将将数组赋予一个UIView的对象的animationImages进行逐帧动画，那么这将会很有可能造成内存泄露。并且释放图像所占据的内存也不会那么简单。但是利用imageNamed加载图像也有自己的优势。对于同一个图像系统只会把它Cache到内存一次，这对于图像的重复利用是非常有优势的。例如：你需要在一个TableView里重复加载同样一个图标，那么用imageNamed加载图像，系统会把那个图标Cache到内存，在Table里每次利用那个图像的时候，只会把图片指针指向同一块内存。这种情况使用imageNamed加载图像就会变得非常有效。

2）利用NSData或imageWithContentOfFile方式加载时，图像会被系统以数据方式加载到程序。当你不需要重用该图像，或者你需要将图像以数据方式存储到数据库，又或者你要通过网络下载一个很大的图像时，请尽量使用imageWithData的方式加载图像。

无论用哪种方式加载图像，图像使用结束后，一定要记得显示释放内存。



第二种解决方法：使用urlloader


近排做项目研究发现，如果直接用loader加载图片，然后在用bitmap生成图片，内存占用巨大，如果图片多了，那么放到移动设备肯定就会直接泪奔。


研究发现，如果用 urlloader 来加载图片，获取图片的2进制数据，保存起来，内存占用很小。我加载了50张图片，大小为1024*576像素，发现内存只用了30-40M，比保存bitmapdata小得很多很多，如果放在 移动端，那么这内存还是可以接受的，除非你真的用1000张图片，这是你就得分布加载了······


那么如何读取呢，唔错，我们可以用loader的 loadbytes方法来读取，但是要注意一点，在移动端，必须添加一个loaderContext,并且设置 loaderContext.allowLoadBytesCodeExecution = true;才能在移动端加载bytes图片


第三种方法：


程序里经常会加载一些UI图片，当取souce里的图片时无外乎用类方法和实例方法，在这里推荐用实例方法即用alloc并且手动释放的方式，图片小且数量不大时影响不大，若大量图片可以看到对内存的影响，用类方法（不手动释放内存，而是仍到自动释放池里让系统自动释放，实际却是不知道**何时释放）则会占用大量内存。


以下是发现的转换成NSData进行加载方法：


```objc
NSString *filePath = [[NSBundle mainBundle] pathForResource:fileName ofType:extension];
NSData *image = [NSData dataWithContentsOfFile:filePath];
[UIImage imageWithData:image];
```

这里的image用alloc创建并手动释放更具效率，以下是常用方法：


```objc
UIImageView *bacImageView = [[UIImageViewalloc]initWithFrame:CGRectMake(0,0,320,460)];
SString *bacString = [[NSBundlemainBundle]pathForResource:@"testImage"ofType:@"png"];
UIImage *bacImage = [[UIImagealloc]initWithContentsOfFile:bacString];
[bacImageViewsetImage:bacImage];
[self.viewaddSubview:bacImageView];
[bacImageViewrelease];
[bacImagerelease];
```

UIImageView显示选取的图片，加载完成后直接手动释放。