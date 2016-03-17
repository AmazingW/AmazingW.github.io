---
layout: post
title: NSAttributedString 常用方法
description: ""
category: 客户端开发
tags: [iOS,NSAttributedString]
keywords: iOS,NSAttributedString
---

头文件：<CoreText/CoreText.h>

初始化:

```oc
NSMutableAttributedString *abStr  =[ [NSMutableAttributedString alloc]initWithString:@“this is roger”];
```

部分属性：

```oc
[abStr addAttribute:(NSString *)kCTForegroundColorAttributeName
              value:(id)[UIColor redColor].CGColor
              range:NSMakeRange(0,4)];
//从t到s变成红色 改变字体颜色

//改变t-s的字体，value要做成一个CTFontRef
[abStr addAttribute:(NSString *)kCTFontAttributeName
     value:(id)CTFontCreateWithName((CFStringRef)[UIFont boldSystemFontOfSize:14.0].fontName,14,NULL)
    range:NSMakeRange(0,4)];

//在t-s加入下划线 单下滑，多下滑 可以选择
[abStr addAttribute:(NSString *)kCTUnderlineStyleAttributeName
     value:(id)[NSNumber numberWithInt:kCTUnderlineStyleDouble]
    range:NSMakeRange(0,4)];
```

在label中定义后者其他view中定义时


```oc
-(void)drawRect:(CGrect)rect
{
    [super drawRect:rect];
    NSAttributedString *atrStr = //‘’自定义的str”;
    CGContextRef ctx = UIGraphicsGetCurrentContext();
    CGContextConcatCTM(ctx,CGAffineTransformScale(CGAffineTransformMakeTranslation(0,rect.size.height),1.f,-1.f));//连接转换矩阵和ctm
    CTFramesetterRef framesetter = CTFramesetterCreateWithAttributedString(CFAttributedStringRef) atrStr);//创建ct frame
    CGMuatblePathRef path = CGPathCreateMutable();
    CGPathAddRect(path,NULL,rect);
    CTFrameRef fame = CTFramesetterCreateFrame(framesetter,CFRangeMake(0,0),path,NULL);
    CTFrameDraw(frame,ctx);
}


//quartz 2d左标与我们ios坐标不同，类似于数学的笛卡尔坐标系.
CGContextConcatCTM(ctx, CGAffineTransformScale(CGAffineTransformMakeTranslation(0, rect.size.height), 1.f, -1.f));
CGContextTranslateCTM(ctx, 0, rect.size.height);
CGContextScaleCTM(ctx, 1, -1);
```

CTFramesetter是CTFrame的创建工厂，将NSAttributedString通过CTFrame绘制到界面，得到CTFramesetter创建path(绘制路径)，然后得到CTFrame，通过CTFrameDraw方法绘制到界面

若是计算NSAttributedString 所要的size可以用CTFramesetterSuggestFrameSizeWithConstraints用NSString 的sizeWithFont计算多行不准确，因为在CoreText中，行间距也是由开发者控制。

设置行间距和换行模式都是设置:kCTParagraphStyleAttributeName,这个属性由有很多属性：kCTLineBreakByCharWrapping,kCTParagraphStyleSpecifierLineSpacingAdjustment

```oc
//line break
CTParagraphStyleSetting lineBreakMode;
CTLineBreakMode lineBreak = kCTLineBreakByCharWrapping;//换行模式
lineBreakMode.spec = kCTParagraphStyleSpecifierLineBreakMode;
lineBreakMode.value = &lineBreak;
lineBreakMode.valueSize = sizeof(CTLineBreakMode);
//行间距
CTParagraphStyleSetting lineSpacing;
CGFloat spacing = 4.0;//指定间距
LineSpacing.spec = kCTParagraphStyleSpecifierLineSpacingAdjustment;
LineSpacing.value = &spacing;
LineSpacing.valueSize = sizeof(CGFloat);

CTParagraphStyleSetting settings[] = {lineBreakMode,LineSpacing};
CTParagraphStyleRef paragraphStyle = CTParagraphStyleCreate(settings, 2);   //第二个参数为settings的长度
[attributedString addAttribute:(NSString *)kCTParagraphStyleAttributeName
                         value:(id)paragraphStyle
 range:NSMakeRange(0, attributedString.length)];
```

另外一种方法：

```oc
CATextLayer *textLayer = [CATextLayer layer];
textLayer.string = ///我们的str
textLayer.frame = CGRectMake(0,CGRectGetMaxY(self.frame),200,200);
[self.view.frame addSublayer:textLayer];
```