---
layout: post
title: hitTest:withEvent:流程
description: ""
category: 客户端开发
tags: [hitTest,iOS]
keywords: hitTest,iOS
---
<html>
<head>
  <title>hitTest:withEvent:流程</title>
  <basefont face="微软雅黑" size="2" />
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <meta name="exporter-version" content="Evernote Windows/277494; Windows/6.1.7601 Service Pack 1 (Win64);"/>
  <style>
    body, td {
      font-family: 微软雅黑;
      font-size: 10pt;
    }
  </style>
</head>
<body>
<a name="341"/>
<h1>hitTest:withEvent:流程</h1>

<div>
<span>
<div>
<h3 style="padding: 0px; color: rgb(0, 0, 0); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; font-family: verdana, Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);">一. <a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>调用过程</h3>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">iOS系统检测到手指触摸(Touch)操作时会将其放入当前活动Application的事件队列，<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplication_Class/" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">UIApplication</a>会从事件队列中取出触摸事件并传递给key window(当前接收用户事件的窗口)处理,window对象首先会使用hitTest:withEvent:方法寻找此次Touch操作初始点所在的视图(View),即需要将触摸事件传递给其处理的视图,称之为hit-test view。</p>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">window对象会在首先在view hierarchy的顶级view上调用<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>，此方法会在视图层级结构中的每个视图上调用<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/pointInside:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">pointInside:withEvent:</a>,如果pointInside:withEvent:返回YES,则继续逐级调用，直到找到touch操作发生的位置，这个视图也就是hit-test view。</p>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);"><a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>方法的处理流程如下:</p>
<ol style="font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; padding: 0px 0px 0px 50px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">
<li style="padding: 0px; list-style: decimal;">首先调用当前视图的<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/pointInside:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">pointInside:withEvent:</a>方法判断触摸点是否在当前视图内；</li>
<li style="padding: 0px; list-style: decimal;">若返回NO,则hitTest:withEvent:返回nil;</li>
<li style="padding: 0px; list-style: decimal;">若返回YES,则向当前视图的所有子视图(subviews)发送hitTest:withEvent:消息，所有子视图的遍历顺序是从top到bottom，即从subviews数组的末尾向前遍历,直到有子视图返回非空对象或者全部子视图遍历完毕；</li>
<li style="padding: 0px; list-style: decimal;">若第一次有子视图返回非空对象,则hitTest:withEvent:方法返回此对象，处理结束；</li>
<li style="padding: 0px; list-style: decimal;">如所有子视图都返回非，则hitTest:withEvent:方法返回自身(self)。</li>
</ol>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);"><a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>方法忽略隐藏(<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instp/UIView/hidden" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hidden</a>=YES)的视图,禁止用户操作(<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instp/UIView/userInteractionEnabled" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">userInteractionEnabled</a>=YES)的视图，以及alpha级别小于0.01(<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instp/UIView/alpha" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">alpha</a>&lt;0.01)的视图。如果一个子视图的区域超过父视图的bound区域(父视图的<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instp/UIView/clipsToBounds" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">clipsToBounds</a> 属性为NO,这样超过父视图bound区域的子视图内容也会显示)，那么正常情况下对子视图在父视图之外区域的触摸操作不会被识别,因为父视图的pointInside:withEvent:方法会返回NO,这样就不会继续向下遍历子视图了。当然，也可以重写pointInside:withEvent:方法来处理这种情况。</p>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">对于每个触摸操作都会有一个<a href="http://developer.apple.com/library/ios/#documentation/UIKit/Reference/UITouch_Class/Reference/Reference.html" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">UITouch</a>对象,UITouch对象用来表示一个触摸操作，即一个手指在屏幕上按下、移动、离开的整个过程。UITouch对象在触摸操作的过程中在不断变化，所以在使用UITouch对象时，不能直接retain,而需要使用其他手段存储UITouch的内部信息。UITouch对象有一个<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UITouch_Class/Reference/Reference.html#//apple_ref/occ/instp/UITouch/view" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">view</a>属性，表示此触摸操作初始发生所在的视图，即上面检测到的hit-test view,此属性在UITouch的生命周期不再改变，即使触摸操作后续移动到其他视图之上。</p>
<h3 style="padding: 0px; color: rgb(0, 0, 0); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; font-family: verdana, Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);"><a name="t2" style="color: rgb(202, 0, 0); text-decoration: none;"></a>二.定制<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>方法</h3>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">如果父视图需要对对哪个子视图可以响应触摸事件做特殊控制，则可以重写<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>或<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/pointInside:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">pointInside:withEvent:</a>方法。</p>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">这里有几个例子:</p>
<ol style="font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; padding: 0px 0px 0px 50px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">
<li style="padding: 0px; list-style: decimal;"><a href="http://bynomial.com/blog/?p=74" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest Hacking the responder chain</a><br style="padding: 0px;"/>
在此例子中button,scrollview同为topView的子视图，但scrollview覆盖在button之上，这样在在button上的触摸操作返回的hit-test view为scrollview,button无法响应，可以修改topView的hitTest:withEvent:方法如下:
<p style="padding: 0px;"> </p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
    UIView *result = [super hitTest:point withEvent:event];
    CGPoint buttonPoint = [underButton convertPoint:point fromView:self];
    if ([underButton pointInside:buttonPoint withEvent:event]) {
        return underButton;
    }
    return result;
}</code>
</pre>
<p style="padding: 0px;">这样如果触摸点在button的范围内，返回hittestView为button,从button按钮可以响应点击事件。</p>
</li>
<li style="padding: 0px; list-style: decimal;"><a href="http://blog.proculo.de/archives/180-Paging-enabled-UIScrollView-With-Previews.html" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">Paging-enabled UIScrollView with Previews</a><br style="padding: 0px;"/>
<a href="http://blog.sallarp.com/iphone-ipad-appstore-like-uiscrollview-with-paging-and-preview/" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">BSPreviewScrollView </a><br style="padding: 0px;"/>
关于这两个例子，可以看之前文章的说明，见<a href="http://www.winddisk.com/2012/06/11/paging-enabled-uiscrollview/" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">Paging-enabled UIScrollView</a></li>
</ol>
<h3 style="padding: 0px; color: rgb(0, 0, 0); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; font-family: verdana, Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);"><a name="t3" style="color: rgb(202, 0, 0); text-decoration: none;"></a>三.<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>探秘，诡异的三次调用</h3>
<p style="padding: 0px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">在测试中发现对每一次触摸操作实际会触发三次<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/UIView/UIView.html#//apple_ref/occ/instm/UIView/hitTest:withEvent:" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">hitTest:withEvent:</a>方法调用,有测试环境视图结构如下 UIWindow-&gt;UIScrollView-&gt;TapDetectingImageView</p>
<ol style="font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; padding: 0px 0px 0px 50px; color: rgb(51, 51, 51); font-family: verdana, Arial, Helvetica, sans-serif; font-size: 14.4444px; background-color: rgb(255, 255, 255);">
<li style="padding: 0px; list-style: decimal;">首先在TapDetectingImageView的三次hitTest:withEvent:打印两个参数查看有何不同<br style="padding: 0px;"/>
三次的打印结果分别为:
<p style="padding: 0px;"> </p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">point:{356.25, 232.031} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25269.8 touches: {()}
point:{356.25, 232.031} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25269.8 touches: {()}
point:{356.25, 232.031} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25272 touches: {()}</code>
</pre>
<p style="padding: 0px;">三次调用的point参数完全相同,event从指针看为同一对象，但时间戳有变化，第一次和第二次的时间戳相同，第三次的与之前有区别。</p>
</li>
<li style="padding: 0px; list-style: decimal;">深入检查event参数<br style="padding: 0px;"/>
对于<a href="http://developer.apple.com/library/ios/documentation/UIKit/Reference/UIEvent_Class/" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">UIEvent</a>对象我们还可以查看其内部的数据,UIEvent实际上是对GSEventRefs的包装，在GSEventRefs中又包含GSEventRecord,其结构如下:
<p style="padding: 0px;"> </p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">typedef struct __GSEvent {
    CFRuntimeBase _base;
    GSEventRecord record;
} GSEvent; typedef struct __GSEvent* GSEventRef;

typedef struct GSEventRecord {
    GSEventType type; // 0x8 //2
    GSEventSubType subtype;    // 0xC //3
    CGPoint location;     // 0x10 //4
    CGPoint windowLocation;    // 0x18 //6
    int windowContextId;    // 0x20 //8
    uint64_t timestamp;    // 0x24, from mach_absolute_time //9
    GSWindowRef window;    // 0x2C //
    GSEventFlags flags;    // 0x30 //12
    unsigned senderPID;    // 0x34 //13
    CFIndex infoSize; // 0x38 //14 } GSEventRecord;
</code>
</pre>
<p style="padding: 0px;">在GSEventRecord中我们可以获取到GSEvent事件类型type,windowLocation(在窗口坐标系中的位置)等参数。</p>
<p style="padding: 0px;">访问UIEvent中的GSEventRecord可以使用以下代码</p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">if ([event respondsToSelector:@selector(_gsEvent)]) {
    #define GSEVENT_TYPE 2
    #define GSEVENT_SUBTYPE 3
    #define GSEVENT_X_OFFSET 6
    #define GSEVENT_Y_OFFSET 7
    #define GSEVENT_FLAGS 12
    #define GSEVENTKEY_KEYCODE 15
    #define GSEVENT_TYPE_KEYUP 11
    int *eventMem;
    eventMem = (int *)objc_unretainedPointer([event performSelector:@selector(_gsEvent)]);
    if (eventMem) {
        int eventType = eventMem[GSEVENT_TYPE];
        int eventSubType = eventMem[GSEVENT_SUBTYPE];
        float xOffset =  *((float*)(eventMem + GSEVENT_X_OFFSET));
        float yOffset =  *((float*)(eventMem + GSEVENT_Y_OFFSET));
    }
}</code>
</pre>
<p style="padding: 0px;">按照上文描述的方法我们获取到UIEvent内部的windowLocation数据,同时将接收到的point参数在window坐标系中的位置也打印出，这样三次调用的数据分别为</p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">point:{356.25, 232.031} windowPoint:{152, 232} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25269.8 touches: {()} gsEventType:3001 gsXoffset:213.000000 gsYoffset:316.000000
point:{356.25, 232.031} windowPoint:{152, 232} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25269.8 touches: {()} gsEventType:3001 gsXoffset:213.000000 gsYoffset:316.000000
point:{356.25, 232.031} windowPoint:{152, 232} event:&lt;UITouchesEvent: 0x8653ea0&gt; timestamp: 25272 touches: {()} gsEventType:3001 gsXoffset:152.000000 gsYoffset:232.000000</code>
</pre>
<p style="padding: 0px;"> </p>
<p style="padding: 0px;">第一次和第二次调用的时间戳相同，GSEvent中的windowLocation也相同，但windowLocation并不是当前请求的point位置，第三次请求的时间戳与前两次不同，GSEvent中的windowLocation与当前请求的point位置一致。</p>
<p style="padding: 0px;">多次点击可发现，第一次和第二次调用中的windowLocation数据实际上是上次点击操作的位置，猜测前两次hitTest是对上次点击操作的终结？第三次hitTest才是针对当前点击的。</p>
</li>
<li style="padding: 0px; list-style: decimal;">调用栈分析<br style="padding: 0px;"/>
使用
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">[NSThread <a href="http://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSThread_Class/Reference/Reference.html#//apple_ref/occ/clm/NSThread/callStackSymbols" style="color: rgb(0, 0, 0); text-decoration: none; padding: 0px; border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(51, 51, 51);" target="_blank">callStackSymbols</a>];</code>
</pre>
<p style="padding: 0px;">可以获取到当前线程的调用栈数据，在TapDetectingImageView的hitTest:withEvent:中打印调用栈信息，分别为:<br style="padding: 0px;"/>
第一次调用:</p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">0   RenrenPhoto                         0x0002b52d -[TapDetectingImageView hitTest:withEvent:] + 93
1   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
2   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
3   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
4   CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
5   UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
6   UIKit                               0x00497397 -[UIScrollView hitTest:withEvent:] + 79
7   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
8   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
9   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
10  CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
11  UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
12  RenrenPhoto                         0x0002e01b -[UIEventProbeWindow hitTest:withEvent:] + 395
13  UIKit                               0x00477a02 __47+[UIWindow _hitTestToPoint:pathIndex:forEvent:]_block_invoke_0 + 150
14  UIKit                               0x00477888 +[UIWindow _topVisibleWindowPassingTest:] + 196
15  UIKit                               0x00477965 +[UIWindow _hitTestToPoint:pathIndex:forEvent:] + 177
16  UIKit                               0x0043cd06 _UIApplicationHandleEvent + 1696
17  GraphicsServices                    0x01ff8df9 _PurpleEventCallback + 339
18  GraphicsServices                    0x01ff8ad0 PurpleEventCallback + 46
19  CoreFoundation                      0x01aa4bf5 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 53
20  CoreFoundation                      0x01aa4962 __CFRunLoopDoSource1 + 146
21  CoreFoundation                      0x01ad5bb6 __CFRunLoopRun + 2118
22  CoreFoundation                      0x01ad4f44 CFRunLoopRunSpecific + 276
23  CoreFoundation                      0x01ad4e1b CFRunLoopRunInMode + 123
24  GraphicsServices                    0x01ff77e3 GSEventRunModal + 88
25  GraphicsServices                    0x01ff7668 GSEventRun + 104
26  UIKit                               0x0043c65c UIApplicationMain + 1211
27  RenrenPhoto                         0x000026b2 main + 178
28  RenrenPhoto                         0x000025b5 start + 53
29  ???                                 0x00000001 0x0 + 1</code>
</pre>
<p style="padding: 0px;">第二次调用</p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">0   RenrenPhoto                         0x0002b52d -[TapDetectingImageView hitTest:withEvent:] + 93
1   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
2   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
3   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
4   CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
5   UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
6   UIKit                               0x00497397 -[UIScrollView hitTest:withEvent:] + 79
7   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
8   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
9   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
10  CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
11  UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
12  RenrenPhoto                         0x0002e01b -[UIEventProbeWindow hitTest:withEvent:] + 395
13  UIKit                               0x00477a02 __47+[UIWindow _hitTestToPoint:pathIndex:forEvent:]_block_invoke_0 + 150
14  UIKit                               0x00477888 +[UIWindow _topVisibleWindowPassingTest:] + 196
15  UIKit                               0x00477965 +[UIWindow _hitTestToPoint:pathIndex:forEvent:] + 177
16  UIKit                               0x0043cfd3 _UIApplicationHandleEvent + 2413
17  GraphicsServices                    0x01ff8df9 _PurpleEventCallback + 339
18  GraphicsServices                    0x01ff8ad0 PurpleEventCallback + 46
19  CoreFoundation                      0x01aa4bf5 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 53
20  CoreFoundation                      0x01aa4962 __CFRunLoopDoSource1 + 146
21  CoreFoundation                      0x01ad5bb6 __CFRunLoopRun + 2118
22  CoreFoundation                      0x01ad4f44 CFRunLoopRunSpecific + 276
23  CoreFoundation                      0x01ad4e1b CFRunLoopRunInMode + 123
24  GraphicsServices                    0x01ff77e3 GSEventRunModal + 88
25  GraphicsServices                    0x01ff7668 GSEventRun + 104
26  UIKit                               0x0043c65c UIApplicationMain + 1211
27  RenrenPhoto                         0x000026b2 main + 178
28  RenrenPhoto                         0x000025b5 start + 53
29  ???                                 0x00000001 0x0 + 1</code>
</pre>
<p style="padding: 0px;">第三次调用:</p>
<pre style="white-space: pre-wrap; word-wrap: break-word; padding: 0px;">
<code style="padding: 0px;">0   RenrenPhoto                         0x0002b52d -[TapDetectingImageView hitTest:withEvent:] + 93
1   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
2   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
3   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
4   CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
5   UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
6   UIKit                               0x00497397 -[UIScrollView hitTest:withEvent:] + 79
7   UIKit                               0x0047f4d5 __38-[UIView(Geometry) hitTest:withEvent:]_block_invoke_0 + 132
8   CoreFoundation                      0x01b515a7 __NSArrayChunkIterate + 359
9   CoreFoundation                      0x01b2903f __NSArrayEnumerate + 1023
10  CoreFoundation                      0x01b28a16 -[NSArray enumerateObjectsWithOptions:usingBlock:] + 102
11  UIKit                               0x0047f3d1 -[UIView(Geometry) hitTest:withEvent:] + 640
12  RenrenPhoto                         0x0002e01b -[UIEventProbeWindow hitTest:withEvent:] + 395
13  UIKit                               0x0043d986 _UIApplicationHandleEvent + 4896
14  GraphicsServices                    0x01ff8df9 _PurpleEventCallback + 339
15  GraphicsServices                    0x01ff8ad0 PurpleEventCallback + 46
16  CoreFoundation                      0x01aa4bf5 __CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE1_PERFORM_FUNCTION__ + 53
17  CoreFoundation                      0x01aa4962 __CFRunLoopDoSource1 + 146
18  CoreFoundation                      0x01ad5bb6 __CFRunLoopRun + 2118
19  CoreFoundation                      0x01ad4f44 CFRunLoopRunSpecific + 276
20  CoreFoundation                      0x01ad4e1b CFRunLoopRunInMode + 123
21  GraphicsServices                    0x01ff77e3 GSEventRunModal + 88
22  GraphicsServices                    0x01ff7668 GSEventRun + 104
23  UIKit                               0x0043c65c UIApplicationMain + 1211
24  RenrenPhoto                         0x000026b2 main + 178
25  RenrenPhoto                         0x000025b5 start + 53
26  ???                                 0x00000001 0x0 + 1</code>
</pre>
<p style="padding: 0px;">从调用栈上看，三次调用的路径都不相同，关键区分点在_UIApplicationHandleEvent函数中，<br style="padding: 0px;"/>
第一次的调用位置为_UIApplicationHandleEvent + 1696<br style="padding: 0px;"/>
第二次的调用位置为_UIApplicationHandleEvent + 2413<br style="padding: 0px;"/>
第三次的调用位置为_UIApplicationHandleEvent + 4896</p>
</li>
<li style="padding: 0px; list-style: decimal;">结论<br style="padding: 0px;"/>
没有结论，具体机制仍然是扑朔迷离，搞不懂….，实际写代码时也不需要考虑这些</li>
</ol>
</div>
</span>
</div></body></html>
