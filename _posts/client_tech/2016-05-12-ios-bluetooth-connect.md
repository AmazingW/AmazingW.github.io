---
layout: post
title: iOS项目中的蓝牙通信
description: "iOS项目中的蓝牙通信"
category: 客户端开发
tags: [iOS,蓝牙,通信]
keywords: iOS,蓝牙,通信
---

最近碰到了一个蓝牙通信的项目,虽然不难,也花费了不少时间.

#### 1.核心框架:CoreBluetooth

他的api是基于BLE4.0,兼容的机型也是4s以上

#### 2.相关的类

在corebluetooth中,有两个主要的角色,周围和中央(peripheral和central),整个框架也是在围绕这两个角色设计的.所有iOS设备既可以作为中央角色也可以作为周围角色,但不能同时拥有两个角色.

周围和中央这两个角色在CoreBluetooth中,CBPeripheralManager代表周围,CBCentralManager代表中央.

中央请求连接周围,以获取周围的数据.这些数据在实用过程中被结构化,每个服务拥有不同的特征(Characteristics),这些特征是包含一个单一逻辑的属性类型.

在中央:CBService,代表服务,CBCharacteristic代表特征,在周边则用CBMutableService代表服务,CBMutableCharacteristic代笔特征

![图](../../../assets/img/iOS-bluetooth1.jpeg)

#### 3.操作流程
 - 1.建立中心
 - 2.扫描设备
 - 3.连接设备
 - 4.扫描设备服务与特征
 - 5.交互读写

 在第四步中,peripheral必须查找服务,才毁掉用didDisCoverService,发现服务之后,需要去查找特征,来确定是否有需要与周围通信的uuid.

 源码在[https://github.com/AmazingW/bluetooth/tree/master](https://github.com/AmazingW/bluetooth/tree/master)