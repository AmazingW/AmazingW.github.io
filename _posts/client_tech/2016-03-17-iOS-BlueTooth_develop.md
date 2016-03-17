---
layout: post
title: iOS蓝牙4.0开发例子
description: ""
category: 客户端开发
tags: [蓝牙,iOS]
keywords: 蓝牙,iOS
---


1建立中心角色

```objc
#import <CoreBluetooth/CoreBluetooth.h>
CBCentralManager *manager;
manager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
```

2扫描外设（discover）

```objc
[manager scanForPeripheralsWithServices:nil options:options];
```

3连接外设(connect)


```objc
- (void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSI:(NSNumber *)RSSI
{
        if([peripheral.name  isEqualToString:BLE_SERVICE_NAME]){
                [self connect:peripheral];
        }
);
}
```

```objc
-(BOOL)connect:(CBPeripheral *)peripheral{
        self.manager.delegate = self;
        [self.manager connectPeripheral:peripheral
                                options:[NSDictionary dictionaryWithObject:[NSNumber numberWithBool:YES] forKey:CBConnectPeripheralOptionNotifyOnDisconnectionKey]];
}
```

　
4扫描外设中的服务和特征(discover)

```objc
- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral
{

    NSLog(@"Did connect to peripheral: %@", peripheral);
    _testPeripheral = peripheral;

    [peripheral setDelegate:self];  <br>//查找服务
    [peripheral discoverServices:nil];


}
```

```objc
- (void)peripheral:(CBPeripheral *)peripheral didDiscoverServices:(NSError *)error
{


    NSLog(@"didDiscoverServices");

    if (error)
    {
        NSLog(@"Discovered services for %@ with error: %@", peripheral.name, [error localizedDescription]);

        if ([self.delegate respondsToSelector:@selector(DidNotifyFailConnectService:withPeripheral:error:)])
            [self.delegate DidNotifyFailConnectService:nil withPeripheral:nil error:nil];

        return;
    }


    for (CBService *service in peripheral.services)
    {
         //发现服务
        if ([service.UUID isEqual:[CBUUID UUIDWithString:UUIDSTR_ISSC_PROPRIETARY_SERVICE]])
        {
            NSLog(@"Service found with UUID: %@", service.UUID);  <br>//查找特征
            [peripheral discoverCharacteristics:nil forService:service];
            break;
        }


    }
}
```

```objc
- (void)peripheral:(CBPeripheral *)peripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error
{

    if (error)
    {
        NSLog(@"Discovered characteristics for %@ with error: %@", service.UUID, [error localizedDescription]);

        [self error];
        return;
    }

    NSLog(@"服务：%@",service.UUID);
    for (CBCharacteristic *characteristic in service.characteristics)
    {
       //发现特征
            if ([characteristic.UUID isEqual:[CBUUID UUIDWithString:@"xxxxxxx"]]) {
                NSLog(@"监听：%@",characteristic);<br>//监听特征
                [self.peripheral setNotifyValue:YES forCharacteristic:characteristic];
            }

    }
}
```


5与外设做数据交互(读 与 写)　　

读

```objc
- (void)peripheral:(CBPeripheral *)peripheral didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error
{
    if (error)
    {
        NSLog(@"Error updating value for characteristic %@ error: %@", characteristic.UUID, [error localizedDescription]);
        self.error_b = BluetoothError_System;
        [self error];
        return;
    }

//    NSLog(@"收到的数据：%@",characteristic.value);
    [self decodeData:characteristic.value];
}
```

写

```objc
NSData *d2 = [[PBABluetoothDecode sharedManager] HexStringToNSData:@"0x02"];
[self.peripheral writeValue:d2 forCharacteristic:characteristic type:CBCharacteristicWriteWithoutResponse];
```
