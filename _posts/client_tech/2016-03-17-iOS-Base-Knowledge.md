---
layout: post
title: iOS 开发的基本知识
description: ""
category: 客户端开发
tags: [iOS,基本,基础]
keywords: iOS,基本,基础
---
1、

了解main函数，  UIApplication是初始化程序的核心，它接受4个参数。  其中argc和argv两个参数来自于main()接受的两个参数；另外两个String型参数分别表示程序的主要类(principal class)和代理类(delegate class）


2、

plist xml格式文件通常用于储存用户设置

pch  预编译文件头

xib  nterface Builder 的图形界面设计文档

StoryBoard是iOS 5的新特征，旨在代替历史悠久的NIB/XIB

3、

AppDelegate.m 妙用  类似于监听接口

应用程序启动后，委托调用applicationDidFinishLaunching方法

应用程序要完全退出， 委托调用applicationWillTerminate方法


4、

viewcontroller

创建viewcontroller时，执行loadview -> viewDidLoad

内存警告，后台，会执行didReceiveMemoryWarning -> viewDidUnLoad；如果viewcontroller当前正在显示（前台）didReceiveMemoryWarning


5、

IBOutlet   对编译器而言只是一个标记，额外retain一次，所以需要release.

IBoutlet修饰的字段可以和InterfaceBuilder里相应控件相关联；

IBaction修饰的方法可以和InterfaceBuilder里控件的相应动作相关联。


6、

addSubview 是将view加到所有层的最顶层

7、
insertSubView可以控制它添加到父视图的哪一层

makeKeyAndVisible作用被使用对象的主窗口显示到屏幕的最前端。

hiddenUIView方法隐藏这个窗口

8、

@protocol MyProtocol <NSObject>

-(void) firstMethod

@end 协议，OC 没有多继承，不过可以通过协议来委托或者叫代理


9、

@property (nonatomic, retain) Engine* engine; 代码生成机制 ,生成不同类型的getter／setter函数，接口类使用

@synthesize   engine, 合成器，实现类里面使用，两者缺一不可

10、

initWithFrame  没用Nib文件(XIB)时,用代码控制视图内容，需要调用initWithFrame去初始化

视图加载nib文件，从nib中加载对象实例时, 使用 initWithCoder初始化这些实例对象

11、

respondsToSelector该方法询问对象以确定其是否能够响应某个特定的消息

if([car respondsToSelector @selector(setWheel)] == YES]){}

12、

viewDidLoad:在视图加载后被调用

viewWillAppear:视图即将可见时调用。默认情况下不执行任何操作

viewDidAppear: 视图已完全过渡到屏幕上时调用

viewWillDisappear:视图被驳回时调用，覆盖或以其他方式隐藏。默认情况下不执行任何操作

viewDidDisappear:视图被驳回后调用，覆盖或以其他方式隐藏。默认情况下不执行任何操作



13、

initWithFrame  没用Nib文件(XIB)时,用代码控制视图内容，需要调用initWithFrame去初始化

视图加载nib文件，从nib中加载对象实例时, 使用 initWithCoder初始化这些实例对象


14、

respondsToSelector该方法询问对象以确定其是否能够响应某个特定的消息

[car respondsToSelector @selector(setWheel)] == YES]


15、

viewDidLoad:在视图加载后被调用

viewWillAppear:视图即将可见时调用。默认情况下不执行任何操作

viewDidAppear: 视图已完全过渡到屏幕上时调用

viewWillDisappear:视图被驳回时调用，覆盖或以其他方式隐藏。默认情况下不执行任何操作

viewDidDisappear:视图被驳回后调用，覆盖或以其他方式隐藏。默认情况下不执行任何操作


16、

loadNibNamed  动态加载视图

NSArray *nibViews=[[NSBundle mainBundle] loadNibNamed:@"Empty" owner:self options:nil];


17、

1）componentsSeparatedByString:截取指定字符串；

2) pathForResource：获取程序运行时目录

3)  objectAtIndex:获取当前索引的字符串；

4)  rangeOfString:获取指定短字符串在长字符串中的开始，结尾索引值；

5) stringWithContentsOfFile：按行读取文件

6) componentsSeparatedByString:@""];换行分割字符串；

7) NSEnumerator *nse = [lines objectEnumerator];

将数组转换为NSEnumerator，可向前读取数据；
nextObject 读取下一行数据

18、

-(BOOL) isKindOfClass: classObj判断是否是这个类或者这个类的子类的实例

-(BOOL) isMemberOfClass: classObj 判断是否是这个类的实例

19、

创建一个UIImageView对象有五种方法

UIImageView *imageView1 = [[UIImageViewalloc] init];

UIImageView *imageView2 = [[UIImageViewalloc] initWithFrame:(CGRect)];

UIImageView *imageView3 = [[UIImageView alloc] initWithImage:(UIImage *)];

UIImageView *imageView4 = [[UIImageView alloc] initWithImage:(UIImage *) highlightedImage:(UIImage *)];

UIImageView *imageView5 = [[UIImageView alloc] initWithCoder:(NSCoder *)];

常用的是前边三个。

20、

UIScreen可以获取设备屏幕的大小

UIView对象定义了一个屏幕上的一个矩形区域，同时处理该区域的绘制和触屏事件,一个UIView的实例可以包含和管理若干个子UIView

UIWindow对象是所有UIView的根，管理和协调的应用程序

UIViewController对象负责管理所有UIView的层次结构，并响应设备的方向变化

21、

@class 当一个类需要引用另一个类

demo.h  @class Rectangle;

demo.m import Rectangle

22、

UISwitch开关、

UIButton按钮、

UISegmentedControl分段控件、

UISlider滑块、

UITextField文本字段控件、

UIPageControl分页控件

23、

UIControlEventTouchDown

单点触摸按下事件：用户点触屏幕，或者又有新手指落下的时候。

UIControlEventTouchDownRepeat

多点触摸按下事件，点触计数大于1：用户按下第二、三、或第四根手指的时候。

UIControlEventTouchDragInside

当一次触摸在控件窗口内拖动时。

UIControlEventTouchDragOutside

当一次触摸在控件窗口之外拖动时。

UIControlEventTouchDragEnter

当一次触摸从控件窗口之外拖动到内部时。

UIControlEventTouchDragExit

当一次触摸从控件窗口内部拖动到外部时。

UIControlEventToucUpInside

所有在控件之内触摸抬起事件。

UIControlEventTouchUpOutside

所有在控件之外触摸抬起事件(点触必须开始与控件内部才会发送通知)。

UIControlEventTouchCancel

所有触摸取消事件，即一次触摸因为放上了太多手指而被取消，或者被上锁或者电话da'duaUIControlEventTouchChanged



当控件的值发生改变时，发送通知。用于滑块、分段控件、以及其他取值的控件。你可以配置滑块控件何时发送通知，在滑块被放下时发送，或者在被拖动时发送。

UIControlEventEditingDidBegin

当文本控件中开始编辑时发送通知。

UIControlEventEditingDidEnd

当文本控件中编辑结束时发送通知。

UIControlEventEditingChanged

当文本控件中的文本被改变时发送通知。

UIControlEventEditingDidOnExit

当文本控件内通过按下回车键（或等价行为）结束编辑时，发送通知。

UIControlEventAlltouchEvents

通知所有触摸事件。

UIControlEventAllEditingEvents

通知所有关于文本编辑的事件

UIControlEventAllEvents

通知所有事件。

24、

SUserDefaults用于存储数据量小的数据，例如用户配置。并不是所有的东西都能往里放的，只支持：NSString,NSNumber, NSDate, NSArray, NSDictionary.

25、

NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];

[defaults objectForKey:key]; 提取

[defaults setObject:item forKey:key]; 设置

[defaults removeObjectForKey:key]; 移除


26、


resignFirstResponder 触发键盘隐藏


27、

UITabBarController通常作为整个程序的rootViewController ,常见的创建地方就是在application delegate中的 applicationDidFinishLaunching:方法