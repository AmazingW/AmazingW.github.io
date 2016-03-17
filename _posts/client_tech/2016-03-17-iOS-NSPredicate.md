---
layout: post
title: iOS 谓词查询NSPredicate
description: ""
category: 客户端开发
tags: [NSPredicate,iOS]
keywords: NSPredicate,iOS
---


一般来说这种情况还是蛮多的，比如你从文件中读入了一个array1，然后想把程序中的一个array2中符合array1中内容的元素过滤出来。

正常傻瓜一点就是两个for循环，一个一个进行比较，这样效率不高，而且代码也不好看。

其实一个循环或者无需循环就可以搞定了，那就需要用搞 NSPredicate这个类了～膜拜此类～

1）例子一，一个循环

```
NSArray *arrayFilter = [NSArray arrayWithObjects:@"pict", @"blackrain", @"ip", nil];

NSArray *arrayContents = [NSArray arrayWithObjects:@"I am a picture.", @"I am a guy", @"I am gagaga", @"ipad", @"iphone", nil];
```

我想过滤arrayContents的话只要循环 arrayFilter就好了
```
int i = 0, count = [arrayFilter count];

for(i = 0; i < count; i ++)

{

    NSString *arrayItem = (NSString *)[arrayFilter objectAtIndex:i];

    NSPredicate *filterPredicate = [[NSPredicate predicateWithFormat:@"SELF CONTAINS %@", arrayItem];

    NSLog(@"Filtered array with filter %@, %@", arrayItem, [arrayContents filteredArrayUsingPredicate:filterPredicate]);

}
```

当然以上代码中arrayContent最好用mutable 的，这样就可以直接filter了，NSArray是不可修改的。

2）例子二，无需循环

```
NSArray *arrayFilter = [NSArray arrayWithObjects:@"abc1", @"abc2", nil];

NSArray *arrayContent = [NSArray arrayWithObjects:@"a1", @"abc1", @"abc4", @"abc2", nil];

NSPredicate *thePredicate = [NSPredicate predicateWithFormat:@"NOT (SELF in %@)", arrayFilter];

[arrayContent filterUsingPredicate:thePredicate];
```


这样arrayContent过滤出来的就是不包含 arrayFilter中的所有item了。



3）生成文件路径下文件集合列表

```
NSFileManager *fileManager = [NSFileManagerdefaultManager];NSString *defaultPath = [[NSBundle mainBundle]resourcePath]; NSError *error; NSArray *directoryContents = [fileManager contentsOfDirectoryAtPath:defaultPatherror:&error]
```


4）match的用法

1. 简单比较

```
NSString *match = @"imagexyz-999.png";NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF == %@", match]; NSArray *results = [directoryContents filteredArrayUsingPredicate:predicate];
```

2. match里like的用法（类似Sql中的用法）NSString *match = @"imagexyz*.png";NSPredicate *predicate = [NSPredicatepredicateWithFormat:@"SELF like %@", match]; NSArray *results = [directoryContentsfilteredArrayUsingPredicate:predicate];

3. 大小写比较 ［c］表示忽略大小写，［d］表示忽略重音，可以在一起使用，如下：NSString *match = @"imagexyz*.png";NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF like[cd] %@", match]; NSArray *results = [directoryContents filteredArrayUsingPredicate:predicate];

4.使用正则 NSString *match = @"imagexyz-\\d{3}\\.png"; //imagexyz－123.pngNSPredicate *predicate = [NSPredicatepredicateWithFormat:@"SELF matches %@", match]; NSArray *results = [directoryContentsfilteredArrayUsingPredicate:predicate];

总结：

1） 当使用聚合类的操作符时是可以不需要循环的

2）当使用单个比较类的操作符时可以一个循环来搞定

PS，例子 一中尝试使用[@"SELF CONTAINS %@", arrayFilter] 来过滤会挂调，因为CONTAINS时字符串比较操作符，不是集合操作符。
Cocoa过滤器NSPredicate的完全用法

2012-03-16 15:50:35| 分类： 数据库编程|字号订阅



Cocoa用NSPredicate描述查询的方式，原理类似于在数据库中进行查询
计算谓词：

```
//基本的查询
NSPredicate *predicate;
predicate = [NSPredicate predicateWithFormat: @"name == 'Herbie'"];
BOOL match = [predicate evaluateWithObject: car];
NSLog (@"%s", (match) ? "YES" : "NO");
//在整个cars里面循环比较
predicate = [NSPredicate predicateWithFormat: @"engine.horsepower > 150"];
NSArray *cars = [garage cars];
for (Car *car in [garage cars]) {
    if ([predicate evaluateWithObject: car]) {
         NSLog (@"%@", car.name);
    }
}
//输出完整的信息
predicate = [NSPredicate predicateWithFormat: @"engine.horsepower > 150"];
NSArray *results;
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
//含有变量的谓词
NSPredicate *predicateTemplate = [NSPredicate predicateWithFormat:@"name == $NAME"];
NSDictionary *varDict;
varDict = [NSDictionary dictionaryWithObjectsAndKeys:
@"Herbie", @"NAME", nil];
predicate = [predicateTemplate predicateWithSubstitutionVariables: varDict];
NSLog(@"SNORGLE: %@", predicate);
match = [predicate evaluateWithObject: car];
NSLog (@"%s", (match) ? "YES" : "NO");
//注意不能使用$VARIABLE作为路径名，因为它值代表值
//谓词字符窜还支持c语言中一些常用的运算符

predicate = [NSPredicate predicateWithFormat:
@"(engine.horsepower > 50) AND (engine.horsepower < 200)"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"oop %@", results);

predicate = [NSPredicate predicateWithFormat: @"name < 'Newton'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", [results valueForKey: @"name"]);
//强大的数组运算符
predicate = [NSPredicate predicateWithFormat:
@"engine.horsepower BETWEEN { 50, 200 }"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

NSArray *betweens = [NSArray arrayWithObjects:
[NSNumber numberWithInt: 50], [NSNumber numberWithInt: 200], nil];
predicate = [NSPredicate predicateWithFormat: @"engine.horsepower BETWEEN %@", betweens];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
predicateTemplate = [NSPredicate predicateWithFormat: @"engine.horsepower BETWEEN $POWERS"];
varDict = [NSDictionary dictionaryWithObjectsAndKeys: betweens, @"POWERS", nil];
predicate = [predicateTemplate predicateWithSubstitutionVariables: varDict];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
//IN运算符
predicate = [NSPredicate predicateWithFormat: @"name IN { 'Herbie', 'Snugs', 'Badger', 'Flap' }"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", [results valueForKey: @"name"]);
predicate = [NSPredicate predicateWithFormat: @"SELF.name IN { 'Herbie', 'Snugs', 'Badger', 'Flap' }"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", [results valueForKey: @"name"]);

names = [cars valueForKey: @"name"];
predicate = [NSPredicate predicateWithFormat: @"SELF IN { 'Herbie', 'Snugs', 'Badger', 'Flap' }"];
results = [names filteredArrayUsingPredicate: predicate];//这里限制了SELF的范围
NSLog (@"%@", results);
//BEGINSWITH,ENDSWITH,CONTAINS
//附加符号，[c],[d],[cd],c表示不区分大小写，d表示不区分发音字符，cd表示什么都不区分
predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH 'Bad'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH 'HERB'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name BEGINSWITH[cd] 'HERB'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);
//LIKE运算符（通配符）
predicate = [NSPredicate predicateWithFormat: @"name LIKE[cd] '*er*'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

predicate = [NSPredicate predicateWithFormat: @"name LIKE[cd] '???er*'"];
results = [cars filteredArrayUsingPredicate: predicate];
NSLog (@"%@", results);

```