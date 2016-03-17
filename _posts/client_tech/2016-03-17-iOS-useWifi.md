---
layout: post
title: iOS私有API之wifi扫描和wifi连接
description: ""
category: 客户端开发
tags: [iOS,私有AP,wifi扫描,wifi连接]
keywords: iOS,私有AP,wifi扫描,wifi连接
---


公开的api

如果只是想获取已连接的wifi信息。apple已经有公开的api可以使用.

首先需要

```objc
#import <SystemConfiguration/CaptiveNetwork.h>

+ (id)fetchSSIDInfo
{
NSArray *ifs = (id)CNCopySupportedInterfaces();
NSLog(@"%s: Supported interfaces: %@", __func__, ifs);
id info = nil;
for (NSString *ifnam in ifs) {
info = (id)CNCopyCurrentNetworkInfo((CFStringRef)ifnam);
if (info &amp;&amp; [info count]) {
break;
}
[info release];
}
[ifs release];
return [info autorelease];
}
```


私有api
首先需要链接到设备系统的lib包。注意，这里ios4和ios5，6是不一样的。


```
 //iOS5+
libHandle = dlopen("System/Library/SystemConfiguration/IPConfiguration.bundle/IPConfiguration", RTLD_LAZY);
//iOS4
// libHandle = dlopen("/System/Library/SystemConfiguration/WiFiManager.bundle/WiFiManager", RTLD_LAZY);
这里使用的是Apple80211.h。
apple80211Open = dlsym(libHandle, "Apple80211Open");
apple80211Bind = dlsym(libHandle, "Apple80211BindToInterface");
apple80211Close = dlsym(libHandle, "Apple80211Close");
apple80211Scan = dlsym(libHandle, "Apple80211Scan");
apple80211Associate = dlsym(libHandle, "Apple80211Associate");
apple80211Open(&amp;airportHandle);
apple80211Bind(airportHandle, @"en0");
```


扫描wifi的时候最好使用异步


```
- (void)scanNetworks
{
NSLog(@"Scanning WiFi Channels...");
NSDictionary *parameters = ［NSDictionary alloc] init];
NSArray *scan_networks; //is a CFArrayRef of CFDictionaryRef(s) containing key/value data on each discovered network
apple80211Scan(airportHandle, &amp;scan_networks, parameters);
// NSLog(@"===--======\n%@",scan_networks);
networks = ［NSMutableDictionary alloc] init];
networkDicts = [NSMutableArray array];
for (int i = 0; i &lt; [scan_networks count]; i++) {
[networks setObject:[scan_networks objectAtIndex: i] forKey:［scan_networks objectAtIndex: i] objectForKey:@"BSSID"］;
[networkDicts addObject:[scan_networks objectAtIndex: i］;
}
NSLog(@"Scanning WiFi Channels Finished.");
}

```

连接某个wifi，注意，如果没密码可以传null，返回值如果为0则说明成功

```
- (int)associateToNetwork:(NSString *)SSID withPassword:(NSString *)password
{
for (id key in networks) {
if (［[networks objectForKey:key] objectForKey:@"SSID_STR"] isEqualToString:SSID]) {
// For connecting to WPA network, replace NULL below with a string containing the key
// apple80211Associate;
int associateResult = apple80211Associate(airportHandle, [networks objectForKey:key],password);
// int associateResult = 1;
return associateResult;
}
}
return -1;
}
```

打包和调试部分：

调用私有api需要比普通app更高级的权限。一般安装的app是会在程序(用户)这个文件夹里。而我们的app必须要放在程序(系统)下。

网上讲了很多把app上传到设备的程序(系统)的文件夹，下面我说下我的做法

打开xcode – Product – Build For -Archiving

在设备上(iPhone或iPad)，打开Cydia，在首页 – 用户指南 – OpenSSH Access How-To 安装OpenSSH(注意默认密码是alpine)

然后打开itools-高级功能 – 打开ssh

在命令行通过shh把生成好的app上传到设备的程序(系统)文件夹下
```
scp -P 5000 -r /Users/carlosk/Library/Developer/Xcode/DerivedData/WifiPlus_workspace-aokocyaishpniuhfkvpcpzwjvjex/Build/Products/Release-iphoneos/WifiScanPrivateAPI.app root@127.0.0.1:/Applications
/
```

如果是第一次run到设备上，则需要重启，快捷键是按住Home和电源键 5-8秒。以后每次打包到设备上，只需要把app关闭掉，重新打开就可以了。

这种方式的缺点

调用私有api，故无法提交appsotre审核。

调试非常麻烦，没有办法做实时的调试

需要安装在设备的application文件夹下，开发的时候可以使用shh，但是正式发布的时候我现在所知的方法就是一种：采用deb文件。具体我还没看，大家可以百度下。

最后：

这是我第一次对私有api的尝试，可能会有不少问题。希望各位朋友能给点指点，谢谢。

代码我放在github上。需要的同学可以下过来参考下:https://github.com/carlosk/iphone_wifi


原文链接：http://www.carloschen.cn/?p=206