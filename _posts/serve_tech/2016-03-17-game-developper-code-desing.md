---
layout: post
title: 游戏设计规范要求
description: ""
category: 服务端开发
tags: [规范,设计,开发,游戏]
keywords: 规范,设计,开发,游戏
---


由于采用游戏引擎为unity3d，固在游戏设计方面主要着重于对算法篇的要求

代码规范：

类行数要求：低于500行
代码方法行数要求：低于80行。
引包规范，所有包都放在util文件夹中

命名规范，变量用驼峰命名法则，getModel，方法首字母大写
文件夹统一小写

变量使用规范：
凡是有可能超过int32最大值的数，例如时间类型，全部使用long对于不存在负数类型的数，都采用unsigned long， 统一用宏定义为UINT64 INT64等
对于不存在负数的int，统一用unsigned int,不允许由于变量过小，而去采用byte等，只允许使用bool。32位cpu存储规范。

类内单次使用数据结构，统一用struct，不允许用class，对于可能被统一调用的数据，采用class存储

由于协议内不存在json等结构，不允许使用反射等消耗过大的内容

算法设计要求：
多于50次循环需要提交讨论，不允许在设计中存在双重循环，程序内原则上不允许递归。数据结构选择优先级：数组>list>set>dic。

代码注释要求：
每个类需要注释，方法有时间则写，没时间可避免。
文档用功能分类，游戏数据结构一旦建立，变更需要结合游戏需求。

协议要求：

```php
a.description(object);

sendTo<< a;
sendTo<<b;
sendTo<<n;
for(var i=0;i<n;i++)
{
sendTo<<40;
sendTo<<40;
}
sendToEnd;
协议封装要求：
enum Proto
{
getPlayerName 30,
}
```

version:内部版本
code:协议是否正常(exception 用3位连数 ，999为最严重异常，负数为系统级别以及外挂级别异常，0代表正常)
msgID:游戏设计中唯一的消息ID   通过 ,IDGenertor.GeneratorID()生成

协议数据结构以：为分割。匹配客户端及服务端：
默认必须传得数据结构：
server:
//version:2,code:3,msgID:1 content:内容 time:serverTime
client:
//version:2,msgID:9
content: Proto. getPlayerName
