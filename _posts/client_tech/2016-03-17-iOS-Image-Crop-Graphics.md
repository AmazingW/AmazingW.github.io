---
layout: post
title: 图片裁剪
description: ""
category: 客户端开发
tags: [iOS,crop,image]
keywords: iOS,crop,image
---

```oc
-(UIImage*)imageWithImage:(UIImage*)image scaledToSize:(CGSize)newSize

{

    // Create a graphics image context

    UIGraphicsBeginImageContext(newSize);

    // Tell the old image to draw in this new context, with the desired

    // new size

    [image drawInRect:CGRectMake(0,0,newSize.width,newSize.height)];

    // Get the new image from the context

    UIImage* newImage = UIGraphicsGetImageFromCurrentImageContext();


    // End the context

    UIGraphicsEndImageContext();



    // Return the new image.

    return newImage;

}
```