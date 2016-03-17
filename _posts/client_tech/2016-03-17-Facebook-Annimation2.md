---
layout: post
title: Facebook开源动画框架 Pop体验（二）
description: ""
category: 客户端开发
tags: [FaceBook,Pop,Annimation,UIScrollView]
keywords: FaceBook,Pop,Annimation,UIScrollView
---
<html>
<head>
  <title>Facebook开源动画框架 Pop体验（二）--重现UIScrollView减速效果</title>
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
<a name="406"/>
<h1>Facebook开源动画框架 Pop体验（二）--重现UIScrollView减速效果</h1>

<div>
<span>
<div>
<div style="padding: 0px; color: rgb(51, 51, 51); font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
<p style="padding: 0px;">本周早些时候，Ole Begemann写了一个很棒的教程：“<a href="http://oleb.net/blog/2014/04/understanding-uiscrollview/" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">UIScrollView是如何工作的</span></a>”。并且作了详细解释，他甚至从头开始创建了一个<a href="https://github.com/ole/CustomScrollView" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">非常简单的滚动视图</span></a>。</p>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">创建过程很简单：使用UIPanGestureRecognizer，然后改变边界的原点来响应拖拽手势的转化。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">扩展Ole的自定义滚动视图，以包含UIScrollView内部惯性滚动似乎很自然，使用Facobook最近发布的Pop动画引擎，我认为编写一个减速自定义滚动视图将是一个很有意思的项目。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;"><a href="http://iosdevtips.co/post/84160910513/exploring-facebook-pop" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">Pop是Facebook当前使用的开源动画框架</span></a>，承载了Paper中所有的动画和交互。Pop的API与CoreAnimation很相似，所以并不难学习。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">Pop中两个很好的地方：</div>
<div style="padding: 0px;">1.除了基本的动画外，Pop还提供spring和decay动画；</div>
<div style="padding: 0px;">2.你可以使用Pop对NSObject对象上的任何属性执行动画效果，而不仅仅是UIKit中声明的动画属性。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">由于Pop内置支持decaying动画，实现UIScrollView的声明就不那么困难了。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">主要思想是在动画结束时，从UIPanGestureRecognizer中去掉速度属性，以减缓的方式来设置边界原点的动画。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">那么让我们开始吧！首先先不考虑Ole的<a href="https://github.com/rounak/CustomScrollView" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">CustomScrollView项目</span></a>，先看看handlePanGesture--CustomScrollView.m. 的方法（为什么要先看我的项目而不是Ole的呢？因为，每次激发手势时，Ole都会将translation设置为零，这就重置了速度。然而，我们是想保存速度）。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">我们想要在手势完成之后开始一个decay动画，因此我们对switch语句中的UIGestureRecognizerStateEnded实例很感兴趣。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">以下是嵌入代码片段的基本流程：</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">我们使用velocityInView: 方法获得手势的速度：</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">CGPoint velocity = [panGestureRecognizer velocityInView:self]; </span></span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">如果没有足够的水平或者垂直内容，我们不希望在x或者y方向发生任何移动。因此，我们添加判断语句：</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.width &gt;= self.contentSize.width) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.x = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.height &gt;= self.contentSize.height) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.y = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">事实证也证明，我们使用velocityInView: 方法获得的速度是我们真正想要的负值，所以我们来解决这个问题。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">我们想要为边界设置动画（尤其是边界的原点），因此我们使用kPOPViewBounds属性创建一个新的POPDecayAnimation。</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">POPDecayAnimation *decayAnimation = [POPDecayAnimation animationWithPropertyNamed:kPOPViewBounds]; </span></span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">Pop希望这个速度的坐标空间与你打算设置动画的属性的坐标空间相同。这个值将会是alpha(CGFloat)的一个NSNumber，CGPoint封装在NSValue中作为中心值，</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">CGRect封装在NSValue中作为边界值。正如你或许已经猜到了，在动画期间，属性值的改变是相应的速度分量的一个因素。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">在我们的例子中，为边界设置动画意味着速度将是一个CGRect，它的origin.x值和origin.y值对应边界原点的变化。同样地，size.width速度和size.height速度对应边界大小的变化。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">我们不想改变边界的大小，所以我们将它的速度分量设置为0。将拖拽手势的速度分别赋值给origin.x和origin.y。将整个事情封装到NSValue中，然后赋值给decayAnimation.velocity。</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">decayAnimation.velocity = [NSValue valueWithCGRect:CGRectMake(velocity.x, velocity.y, 0, 0)]; </span></span></li>
</ol>
<div style="padding: 0px;"></div>
<div style="padding: 0px;">最后，使用pop_addAnimation: 方法和你想用的任意键，将decayAnimation 添加到视图上。</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">[self pop_addAnimation:decayAnimation forKey:@</span><span style="padding: 0px; border: 0px; color: blue; background-color: inherit;">&quot;decelerate&quot;</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">]; </span></span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">以下是整合后的代码：</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//get velocity from pan gesture</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">CGPoint velocity = [panGestureRecognizer velocityInView:self]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.width &gt;= self.contentSize.width) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//make movement zero along x if no horizontal scrolling</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.x = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.height &gt;= self.contentSize.height) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//make movement zero along y if no vertical scrolling</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.y = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//we need the negative velocity of what we get from the pan gesture, so flip the signs</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">velocity.x = -velocity.x; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">velocity.y = -velocity.y; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">POPDecayAnimation *decayAnimation = [POPDecayAnimation animationWithPropertyNamed:kPOPViewBounds]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//last two components zero as we do not want to change bound's size</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">decayAnimation.velocity = [NSValue valueWithCGRect:CGRectMake(velocity.x, velocity.y, 0, 0)]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">[self pop_addAnimation:decayAnimation forKey:@<span style="padding: 0px; border: 0px; color: blue; background-color: inherit;">&quot;decelerate&quot;</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">]; </span></span></li>
</ol>
<div style="padding: 0px; text-align: center;"> <img src="Facebook开源动画框架 Pop体验（二）--重现UIScrollView减速效果_files/Image.gif" type="image/gif" alt="" style="border: 0px; max-width: 700px; text-align: center; cursor: pointer;" width="280"/></div>
<div style="padding: 0px;">使用这个你应该能获得减速的基本功能。你将注意到，如果速度很高的话，视图滚动时会超出contentSize。但是，这个事情很好解决，只要重载setBound:并添加判断语句来检查边界原点没有超出阈值。我很惊讶的是Pop并没有自动添加这个判断。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">Pop中一个真正有趣的部分是，它能够为所有的属性设置动画，而不仅仅是UIKit声明的动画属性。既然我们只为边界远点设置动画，我认为这是一个很好的计划去尝试Pop自定义属性动画。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">通过在动画进程中发送固定的回调，Pop允许你做这件事情，因此，你可以相应地更新你的视图。Pop处理了最难的部分--时间处理，将时间转换成属性值，是动画减缓或者震荡等。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">这里你做的事情跟我们之前做的事情是一样的，不同的是现在你使用的是自定义属性。尤其是我们将动画bounds.origin.x和bounds.origin.y。你会看到代码结构大体上没有变化，除了这个巨大的POPAnimatableProperty属性的初始化。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">就我个人理解，属性的名称可以是任意的字符串。在这个例子中，我命名为：</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">@</span><span style="padding: 0px; border: 0px; color: blue; background-color: inherit;">&quot;com.rounak.bounds.origin&quot;</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">还有一个将POPMutableAnimatableProperty作为参数的初始化block（我认为这个初始化模式可以称为builder pattern）。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">POPMutableAnimatableProperty有两个重要属性：readBlock 和 writeBlock。在readBlock中，你需要向Pop中传数据，而在writeBlock中你需要检索这个数据，并更新你的视图。readBlock值调用一次，而writeBlock在每一帧更新显示的时候都会被调用（通过CADisplayLink）。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">Pop内在地将所有变量转化为矢量，因此它以CGFloat的线性数组的形式请求和发送数据。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">在readBlcok中，你只需分别地将bounds.origin.x和bounds.origin.y分配给 values[0] 和 values[1]。 </div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">prop.readBlock = ^(id obj, CGFloat values[]) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    values[0] = [obj bounds].origin.x; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    values[1] = [obj bounds].origin.y; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">}; </span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">在writeBlock中，你需要读取values[0] (bounds.origin.x) 和 values[1] (bounds.origin.y) ，并更新你的视图边界。</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">prop.writeBlock = ^(id obj, </span><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">const</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> CGFloat values[]) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    CGRect tempBounds = [obj bounds]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    tempBounds.origin.x = values[0]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    tempBounds.origin.y = values[1]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    [obj setBounds:tempBounds]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">}; </span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">writeBlock中有神奇的事情发生了，每次使用值调用writeBlock都会遵循一个减缓(或振动)曲线。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">你会注意到，由于这里我们只是在二维中操作，我们的速度是CGPoint，而不是CGRect。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">以下是整合后的代码：</div>
<pre style="padding: 0px; font-family: 'Courier New', monospace; font-size: 12px; overflow: auto; background-color: rgb(247, 247, 247); background-position: initial initial; background-repeat: initial initial;">
</pre>
<ol style="padding: 5px 0px; list-style: decimal; border-width: 0px 0px 0px 3px; border-left-style: solid; border-left-color: rgb(20, 107, 0); background-color: rgb(247, 247, 247); color: rgb(92, 92, 92); background-position: initial initial; background-repeat: initial initial;">
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//get velocity from pan gesture</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">CGPoint velocity = [panGestureRecognizer velocityInView:self]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.width &gt;= self.contentSize.width) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//make movement zero along x if no horizontal scrolling</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.x = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">if</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> (self.bounds.size.height &gt;= self.contentSize.height) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//make movement zero along y if no vertical scrolling</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    velocity.y = 0; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">} </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"><span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">//we need the negative velocity of what we get from the pan gesture, so flip the signs</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">velocity.x = -velocity.x; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">velocity.y = -velocity.y; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">POPDecayAnimation *decayAnimation = [POPDecayAnimation animation]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">POPAnimatableProperty *prop = [POPAnimatableProperty propertyWithName:@<span style="padding: 0px; border: 0px; color: blue; background-color: inherit;">&quot;com.rounak.boundsY&quot;</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> initializer:^(POPMutableAnimatableProperty  </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">*prop) { </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">// read value, feed data to Pop1111111</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    prop.readBlock = ^(id obj, CGFloat values[]) { </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        values[0] = [obj bounds].origin.x; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        values[1] = [obj bounds].origin.y; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    };    </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">// write value, get data from Pop, and apply it to the view</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    prop.writeBlock = ^(id obj, <span style="padding: 0px; border: 0px; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;">const</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> CGFloat values[]) { </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        CGRect tempBounds = [obj bounds]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        tempBounds.origin.x = values[0]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        tempBounds.origin.y = values[1]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">        [obj setBounds:tempBounds]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    }; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  <span style="padding: 0px; border: 0px; color: rgb(0, 130, 0); background-color: inherit;">// dynamics threshold</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;"> </span></span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">    prop.threshold = 0.01; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">}]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">  </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">decayAnimation.property = prop; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: rgb(92, 92, 92);"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">decayAnimation.velocity = [NSValue valueWithCGPoint:velocity]; </span></li>
<li style="padding: 0px 3px 0px 10px !important; border: 0px; list-style: decimal-leading-zero outside; color: inherit;"><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">[self pop_addAnimation:decayAnimation forKey:@<span style="padding: 0px; border: 0px; color: blue; background-color: inherit;">&quot;decelerate&quot;</span><span style="padding: 0px; border: 0px; color: black; background-color: inherit;">]; </span></span></li>
</ol>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">整个关于减速的项目可以在<a href="https://github.com/rounak/CustomScrollView/tree/custom-scroll-with-pop" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">GitHub</span></a>上找到。对这个话题有什么反馈吗? 可以在Twitter上联系我（<a href="http://twitter.com/r0unak" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">@r0unak</span></a>）。另外，试试我帮忙制作的<a href="https://itunes.apple.com/us/app/design-shots/id792517951?mt=8" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">Design Shots, a  Dribbble的app</span></a>。</div>
<div style="padding: 0px;"> </div>
<div style="padding: 0px;">原文：<a href="http://iosdevtips.co/post/84571595353/replicating-uiscrollviews-deceleration-with-facebook" style="font-style: normal; font-variant: normal; font-weight: normal; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; text-decoration: none; color: rgb(102, 102, 102);" target="_blank"><span style="color: rgb(0, 0, 255);">Replicating UIScrollView’s deceleration with Facebook Pop</span></a></div>
</div>
<div style="padding: 10px 0px 0px; color: rgb(51, 51, 51); font-family: 'Helvetica Neue', Helvetica, STheiti, 微软雅黑, 黑体, Arial, Tahoma, sans-serif, serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; border-top-width: 1px; border-top-style: solid; border-top-color: rgb(204, 204, 204);">
<div><br/></div>
</div>
</div>
</span>
</div></body></html>
