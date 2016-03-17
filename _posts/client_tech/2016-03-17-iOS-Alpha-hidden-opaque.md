---
layout: post
title: iOS alpha hidden opaque
description: ""
category: 客户端开发
tags: [iOS,alpha,hidden,opaque]
keywords: iOS,alpha,hidden,opaque
---


alpha支持animation, hidden和opaque不支持

hidden开销小,alpha=0透明开销大,如果效果一样,用hidden好一点.

hideen的时候view是不接收事件的,但alpha为0接收

当把View设置为透明的背景时,一般把opaque设置为NO,可以减少开销,对内存也好.
