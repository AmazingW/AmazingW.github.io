---
layout: post
title: 生成Bundle包-引入bundle-使用bundle
description: 生成Bundle包-引入bundle-使用bundle
category: 客户端开发
tags: [iOS,bundle]
keywords: iOS,bundle
---

在我们使用第三方框架时，常常看到XXX.bundle的文件。

我们找到该文件，显示包内容，大致看到很多资源文件：图片、配置文本、XIB文件……

什么是Bundle文件？

简单理解，就是资源文件包。我们将许多图片、XIB、文本文件组织在一起，打包成一个Bundle文件。方便在其他项目中引用包内的资源。

Bundle文件的特点？

Bundle是静态的，也就是说，我们包含到包中的资源文件作为一个资源包是不参加项目编译的。也就意味着，bundle包中不能包含可执行的文件。它仅仅是作为资源，被解析成为特定的2进制数据。

### 制作Bundle

1.新建bundle项目

![bundle图片](../../../assets/img/bundle1.jpeg)

2.添加需要的图片

加入你需要编译在bundle中的资源文件。

当然，默认的配置也是可以的，如果你需要特定的优化或者特定的路径配置，你可以进行下面第3步的配置。

3.你可以对编译的bundle进行一些可选的设置（可选）

a.作为资源包，仅仅需要编译就好，无需安装相关的配置。

![bundle图片](../../../assets/img/bundle2.png)

b.同样要删除安装路径。

![bundle图片](../../../assets/img/bundle3.png)

c.该资源包的pch文件和strings文件是可以删除的。

![bundle图片](../../../assets/img/bundle4.png)

d.最好状态下，要编译出适用与iPhone的bundle文件。

![bundle图片](../../../assets/img/bundle5.png)


### 项目集成bundle

使用bundle就非常的easy了，将编译好的XXXX.bundle 文件直接加入到需要的项目中。省略了！

使用bundle中的资源
将要使用的bundle集成到项目中后，就可以使用了。需要注意的就是，bundle是静态的，不进行编译的资源文件。所以，要使用bundle中的资源，就需要找到相应的资源路径。
这里废话就不多说了，贴代码!

VC获得bundle中的资源

```obj-c
NSString * bundlePath = [[ NSBundle mainBundle] pathForResource: @ "MyBundle"ofType :@ "bundle"];

NSBundle *resourceBundle = [NSBundle bundleWithPath:bundlePath];

UIViewController *vc = [[UIViewController alloc] initWithNibName:@"vc_name"bundle:resourceBundle];
```

图片获得bundle中的资源

```oc
UIImageView *imgView=[[UIImageView alloc] initWithFrame:CGRectMake(50, 50, 50,50)];

UIImage *image = [UIImage imageNamed:@"MyBundle.bundle/img_collect_success"];

[imgView setImage:image];
```

或者

```oc
UIImageView *imgView=[[UIImageView alloc] initWithFrame:CGRectMake(50, 50, 50,50)];

NSString *imgPath= [bundlePath stringByAppendingPathComponent:@"img_collect_success.png"];

UIImage *image_1=[UIImage imageWithContentsOfFile:imgPath];

[imgView setImage:image_1];
```

当然，可以写成预编译语句：

```oc
#define MYBUNDLE_NAME @ "MyBundle.bundle"

#define MYBUNDLE_PATH [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent: MYBUNDLE_NAME]

#define MYBUNDLE [NSBundle bundleWithPath: MYBUNDLE_PATH]
```