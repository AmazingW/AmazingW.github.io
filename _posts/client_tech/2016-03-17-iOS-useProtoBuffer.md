---
layout: post
title: iOS 从0使用protobuffer
description: ""
category: 客户端开发
tags: [protobuffer,iOS]
keywords: protobuffer,iOS
---
<html>
<head>
  <title>IOS 从0使用protobuffer</title>
  <basefont face="微软雅黑" size="2" />
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <meta name="exporter-version" content="Evernote Windows/277494; Windows/6.1.7601 Service Pack 1 (Win64);"/>
  <meta name="content-class" content="maxiang"/>
  <style>
    body, td {
      font-family: 微软雅黑;
      font-size: 10pt;
    }
  </style>
</head>
<body>
<a name="342"/>

<div><span lang="v2" style="color: #2c3f51; line-height: 1.6;"><del style="position:relative;display:block;z-index:10;"><a href="http://maxiang.io/#/?provider=evernote_int&amp;guid=f8d452e4-61b4-4980-be02-1bad5ee230b3&amp;notebook=IOS" style="position: absolute;color: #FFF;text-decoration: none;font-size: 12px;height: 25px;border-radius: 0;margin-top: -20px;right: 15px;background: rgba(0, 0, 0, 0);border-left: 10px solid #BB3A34;border-right: 10px solid #BB3A34;border-bottom: 5px solid rgba(0, 0, 0, 0);width: 0;text-indent:-100000px;">Edit</a></del><div style="color: #2c3f51; line-height: 1.6;">
                        <div style="line-height: 1.6;"></div>
                    <div style="line-height: 1.6;"></div><div style="line-height: 1.6;">

<h1 style="font-size: 2.6em; margin: 1.2em 0 .6em 0; font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; text-align: start;">IOS 从0使用protobuffer</h1>

<p style="margin: 0 0 1.1em; line-height: 1.6;"></p>

<p style="margin: 0 0 1.1em; line-height: 1.6;"><strong style="font-weight: bold; line-height: 1.6;">protocolbuffer</strong>(以下简称PB)是google 的一种数据交换的格式，它独立于语言，独立于平台。google 提供了三种语言的实现：java、c++ 和 python，每一种实现都包含了相应语言的编译器以及库文件。由于它是一种二进制的格式，比使用 xml 进行数据交换快许多。可以把它用于分布式应用之间的数据通信或者异构环境下的数据交换。作为一种效率和兼容性都很优秀的二进制数据传输格式，可以用于诸如网络传输、配置文件、数据存储等诸多领域。</p>

</div><div style="line-height: 1.6;">

<hr style="-moz-box-sizing: content-box; box-sizing: content-box; height: 0; margin-top: 21px; margin-bottom: 21px; border: 0; border-top: 1px solid rgba(102,128,153,0.1); margin: 2em 0; line-height: 1.6;"/>

</div><div style="line-height: 1.6;">

<h2 style="font-family: inherit; font-weight: bold; line-height: 1.1; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 2.15em; margin: 1.2em 0 .6em 0; text-align: start;">使用简介</h2>

<blockquote style="padding: 15px 20px; margin: 0 0 1.1em; border-left: 5px solid rgba(102,128,153,0.075); border-left-width: 10px; background-color: rgba(102,128,153,0.05); border-top-right-radius: 5px; border-bottom-right-radius: 5px;">
  <p style="margin: 0 0 1.1em; font-size: 1em; font-weight: 300; margin-bottom: 0; line-height: 1.6;">以下是我遇到的坑，给大家予以共勉    —— [zz] <br/>
  准备工作，下载<a href="https://github.com/google/protobuf" style="background: transparent; color: #1980e6; text-decoration: none;" target="_blank">protobuffer</a></p>
</blockquote>

<p style="margin: 0 0 1.1em; line-height: 1.6;">1.检查是否安装brew，巨坑～</p>

</div><div style="line-height: 1.6;">

<h3 style="font-family: inherit; font-weight: bold; color: inherit; margin-top: 21px; margin-bottom: 10.5px; font-size: 1.7em; margin: 1.2em 0 .6em 0; text-align: start; line-height: 1.6;">代码块</h3>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>brew -v<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><span style="line-height: 1.6; color: #75715e;">#如果输出</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span><span style="line-height: 1.6; color: #75715e;">#--message &gt; -bash: brew: command not found</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">5.</span><span style="line-height: 1.6; color: #75715e;">#我们没有brew</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">2.安装brew</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>ruby <span style="line-height: 1.6;">-e</span> <span style="line-height: 1.6; color: #e6db74;">&quot;<span style="line-height: 1.6; color: #f8f8f2;">$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)</span>&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><span style="line-height: 1.6; color: #75715e;">#等个几分钟</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">3.接下来我不清楚你们安装autoconf，automake没有 <br/>
    － 默认没有安装</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>brew install autoconf;<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span>brew install automake;<br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span><span style="line-height: 1.6; color: #75715e;">#等个几分钟</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">4.执行./autogen.sh</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>./autogen.sh;<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span><span style="line-height: 1.6; color: #75715e;">#message;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">5.</span><span style="line-height: 1.6; color: #75715e;">#+ sed -i -e 's/RuntimeLibrary=&quot;5&quot;/RuntimeLibrary=&quot;3&quot;/g;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">6.</span><span style="line-height: 1.6; color: #75715e;">#           s/RuntimeLibrary=&quot;4&quot;/RuntimeLibrary=&quot;2&quot;/g;' #gtest/msvc/gtest.vcproj gtest/msvc/gtest_color_test_.vcproj #gtest/msvc/gtest_env_var_test_.vcproj #gtest/msvc/gtest_environment_test.vcproj #gtest/msvc/gtest_main.vcproj #gtest/msvc/gtest_output_test_.vcproj #gtest/msvc/gtest_prod_test.vcproj #gtest/msvc/gtest_uninitialized_test_.vcproj #gtest/msvc/gtest_unittest.vcproj</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">7.</span><span style="line-height: 1.6; color: #75715e;">#+ autoreconf -f -i -Wall,no-obsolete</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">8.</span><span style="line-height: 1.6; color: #75715e;">#configure.ac:29: error: possibly undefined macro: #AC_PROG_LIBTOOL</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">9.</span><span style="line-height: 1.6; color: #75715e;">#      If this token and others are legitimate, please use #m4_pattern_allow.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">10.</span><span style="line-height: 1.6; color: #75715e;">#      See the Autoconf documentation.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">11.</span><span style="line-height: 1.6; color: #75715e;">#autoreconf: /usr/local/Cellar/autoconf/2.69/bin/autoconf #failed with exit status: 1</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">12.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">13.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">14.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">15.</span><span style="line-height: 1.6; color: #75715e;">#等个几分钟</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">如果有上述的报错，请执行下面的内容</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>brew install libtool;<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><span style="line-height: 1.6; color: #75715e;">#等个几分钟</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">5.执行余下操作</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>./configure;<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span>make;<br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span>make install;<br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span><span style="line-height: 1.6; color: #75715e;">#等个几分钟</span><br/></code></pre>

<hr style="-moz-box-sizing: content-box; box-sizing: content-box; height: 0; margin-top: 21px; margin-bottom: 21px; border: 0; border-top: 1px solid rgba(102,128,153,0.1); margin: 2em 0; line-height: 1.6;"/>

</div><div style="line-height: 1.6;">

<h4 style="font-family: inherit; font-weight: bold; color: inherit; margin-top: 10.5px; margin-bottom: 10.5px; font-size: 1.25em; margin: 1.2em 0 .6em 0; text-align: start; line-height: 1.6;">使用方式</h4>

<p style="margin: 0 0 1.1em; line-height: 1.6;">1.文件data.proto</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span><span style="line-height: 1.6; color: #75715e;">//查询到的玩家的简单信息</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><span style="line-height: 1.6;"><span style="line-height: 1.6; color: #66d9ef;">message</span> <span style="line-height: 1.6; color: #f8f8f2;">PlayerEasyData</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span></span>{<br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span>    <span style="line-height: 1.6; color: #f92672;">required</span> <span style="line-height: 1.6; color: #e6db74;">int64</span> nplayerid = <span style="line-height: 1.6; color: #ae81ff;">1</span>;<span style="line-height: 1.6; color: #75715e;">//玩家ID</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">5.</span>    <span style="line-height: 1.6; color: #f92672;">required</span> <span style="line-height: 1.6; color: #e6db74;">string</span> nplayerheadid = <span style="line-height: 1.6; color: #ae81ff;">2</span>;<span style="line-height: 1.6; color: #75715e;">//玩家头像ID</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">6.</span>    <span style="line-height: 1.6; color: #f92672;">required</span> <span style="line-height: 1.6; color: #e6db74;">int32</span> nlevel = <span style="line-height: 1.6; color: #ae81ff;">3</span>;<span style="line-height: 1.6; color: #75715e;">//玩家等级</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">7.</span>};<br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">2.建立文件夹</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span><span style="line-height: 1.6; color: #75715e;"># 到compiler 文件夹中</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><span style="line-height: 1.6; color: #e6db74;">cd</span> compiler;<br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span>mkdir build;<br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span>mkdir build/objc;<br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">3.将proto文件放入src文件夹中</p>

<p style="margin: 0 0 1.1em; line-height: 1.6;">4.执行生成程序</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span>src/protoc --proto_path=src --objc_out=build/objc src/data.proto<br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><span style="line-height: 1.6; color: #75715e;">#就会生成 Data.pb.h Data.pb.m文件两个文件了,这两个文件中,包含的就是 对应的oc对象了</span><br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">5.多个proto文件执行脚本 <br/>
建立一个 脚本文件,命令为pro.sh <br/>
内容如下</p>

</div><div style="line-height: 1.6;">

<pre style="font-family: 'Source Code Pro',monospace; white-space: pre-wrap; display: block; background-color: rgba(102,128,153,0.05); color: #333; word-wrap: break-word; font-size: .9em; background: #f6f6f6; line-height: 1.6; margin: 0 0 1.1em; padding: 0; border: 0; border-radius: 5px; text-align: start; word-break: break-all;"><code style="font-family: 'Source Code Pro',monospace; font-size: inherit; background-color: transparent; white-space: pre-wrap; border-radius: 0; color: #f8f8f2; display: block; background: #23241f; padding: 1.3em 2em;"><span style="line-height: 1.6; display: none; color: #75715e;">1.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">2.</span><span style="line-height: 1.6; color: #75715e;">#!/bin/sh<br/><span style="line-height: 1.6; display: none; color: #75715e;">3.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">4.</span></span><br/><span style="line-height: 1.6; display: none; color: #75715e;">5.</span><span style="line-height: 1.6; color: #75715e;">#protocol的命令所在目录</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">6.</span><span style="line-height: 1.6; color: #e6db74;">command</span>Path=<span style="line-height: 1.6; color: #e6db74;">&quot;/Users/wuqifei/Desktop/protobuf-ios-master/compiler/src/protoc&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">7.</span><span style="line-height: 1.6; color: #75715e;">#protocol文件所在的目录</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">8.</span>protoPath=<span style="line-height: 1.6; color: #e6db74;">&quot;/Users/wuqifei/Desktop/protobuf-ios-master&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">9.</span><span style="line-height: 1.6; color: #75715e;">#最后的存放生成的.m文件的目录</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">10.</span>objcOut=<span style="line-height: 1.6; color: #e6db74;">&quot;/Users/wuqifei/Desktop/protobuf-ios-master/compiler/build/objc&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">11.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">12.</span>rm -rf <span style="line-height: 1.6; color: #e6db74;">&quot;<span style="line-height: 1.6; color: #f8f8f2;">${objcOut}</span>&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">13.</span>mkdir -p <span style="line-height: 1.6; color: #e6db74;">&quot;<span style="line-height: 1.6; color: #f8f8f2;">${objcOut}</span>&quot;</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">14.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">15.</span><br/><span style="line-height: 1.6; display: none; color: #75715e;">16.</span><span style="line-height: 1.6; color: #f92672;">for</span> file <span style="line-height: 1.6; color: #f92672;">in</span> <span style="line-height: 1.6; color: #e6db74;">&quot;<span style="line-height: 1.6; color: #f8f8f2;">${protoPath}</span>&quot;</span>/*.proto;  <br/><span style="line-height: 1.6; display: none; color: #75715e;">17.</span><span style="line-height: 1.6; color: #f92672;">do</span>  <br/><span style="line-height: 1.6; display: none; color: #75715e;">18.</span>    <span style="line-height: 1.6; color: #75715e;">#echo $file </span><br/><span style="line-height: 1.6; display: none; color: #75715e;">19.</span>    <span style="line-height: 1.6; color: #f8f8f2;">${commandPath}</span> --proto_path=<span style="line-height: 1.6; color: #f8f8f2;">${protoPath}</span> --objc_out=<span style="line-height: 1.6; color: #f8f8f2;">${objcOut}</span> <span style="line-height: 1.6; color: #f8f8f2;">${file}</span> <br/><span style="line-height: 1.6; display: none; color: #75715e;">20.</span><span style="line-height: 1.6; color: #f92672;">done</span>  <br/></code></pre>

<p style="margin: 0 0 1.1em; line-height: 1.6;">执行它(当然,你得赋予它可执行的权限 chmod a+x pro.sh) <br/>
执行它  ./pro.sh</p>

<hr style="-moz-box-sizing: content-box; box-sizing: content-box; height: 0; margin-top: 21px; margin-bottom: 21px; border: 0; border-top: 1px solid rgba(102,128,153,0.1); margin: 2em 0; line-height: 1.6;"/>

</div><div style="line-height: 1.6;">

<h4 style="font-family: inherit; font-weight: bold; color: inherit; margin-top: 10.5px; margin-bottom: 10.5px; font-size: 1.25em; margin: 1.2em 0 .6em 0; text-align: start; line-height: 1.6;">引入方式</h4>

<p style="margin: 0 0 1.1em; line-height: 1.6;">1.将google的objectc文件夹，复制到自己的文件夹中 <br/>
<img src="../../../assets/img/proto1.png" type="image/png" alt="Alt text" longdesc="./proto1.png" style="border: 0; vertical-align: middle; max-width: 100%;" title=""/></p>

<p style="margin: 0 0 1.1em; line-height: 1.6;">2.设置header search paths <br/>
<img src="../../../assets/img/proto2.png" type="image/png" alt="Alt text" longdesc="./proto2.png" style="border: 0; vertical-align: middle; max-width: 100%;" title=""/></p>

<p style="margin: 0 0 1.1em; line-height: 1.6;">3.设置依赖和连接库。 <br/>
<img src="../../../assets/img/proto3.png" type="image/png" alt="Alt text" longdesc="./proto3.png" style="border: 0; vertical-align: middle; max-width: 100%;" title=""/></p>

<p style="margin: 0 0 1.1em; line-height: 1.6;">4.引入我们编译好的data.pbobjc.h以及.m文件</p>

<p style="margin: 0 0 1.1em; line-height: 1.6;">5.使用。</p>

<hr style="-moz-box-sizing: content-box; box-sizing: content-box; height: 0; margin-top: 21px; margin-bottom: 21px; border: 0; border-top: 1px solid rgba(102,128,153,0.1); margin: 2em 0; line-height: 1.6;"/>

<p style="margin: 0 0 1.1em; line-height: 1.6;">感谢阅读这份帮助文档。</p></div><div style="line-height: 1.6;"></div></div><center style="display:none">%23%20IOS%20%u4ECE0%u4F7F%u7528protobuffer%0A%0A@%28IOS%29%5B%u5E2E%u52A9%2C%20protocolbuffer%2C%20ios%2C%20published%5D%0A%0A**protocolbuffer**%28%u4EE5%u4E0B%u7B80%u79F0PB%29%u662Fgoogle%20%u7684%u4E00%u79CD%u6570%u636E%u4EA4%u6362%u7684%u683C%u5F0F%uFF0C%u5B83%u72EC%u7ACB%u4E8E%u8BED%u8A00%uFF0C%u72EC%u7ACB%u4E8E%u5E73%u53F0%u3002google%20%u63D0%u4F9B%u4E86%u4E09%u79CD%u8BED%u8A00%u7684%u5B9E%u73B0%uFF1Ajava%u3001c++%20%u548C%20python%uFF0C%u6BCF%u4E00%u79CD%u5B9E%u73B0%u90FD%u5305%u542B%u4E86%u76F8%u5E94%u8BED%u8A00%u7684%u7F16%u8BD1%u5668%u4EE5%u53CA%u5E93%u6587%u4EF6%u3002%u7531%u4E8E%u5B83%u662F%u4E00%u79CD%u4E8C%u8FDB%u5236%u7684%u683C%u5F0F%uFF0C%u6BD4%u4F7F%u7528%20xml%20%u8FDB%u884C%u6570%u636E%u4EA4%u6362%u5FEB%u8BB8%u591A%u3002%u53EF%u4EE5%u628A%u5B83%u7528%u4E8E%u5206%u5E03%u5F0F%u5E94%u7528%u4E4B%u95F4%u7684%u6570%u636E%u901A%u4FE1%u6216%u8005%u5F02%u6784%u73AF%u5883%u4E0B%u7684%u6570%u636E%u4EA4%u6362%u3002%u4F5C%u4E3A%u4E00%u79CD%u6548%u7387%u548C%u517C%u5BB9%u6027%u90FD%u5F88%u4F18%u79C0%u7684%u4E8C%u8FDB%u5236%u6570%u636E%u4F20%u8F93%u683C%u5F0F%uFF0C%u53EF%u4EE5%u7528%u4E8E%u8BF8%u5982%u7F51%u7EDC%u4F20%u8F93%u3001%u914D%u7F6E%u6587%u4EF6%u3001%u6570%u636E%u5B58%u50A8%u7B49%u8BF8%u591A%u9886%u57DF%u3002%0A%20%0A-------------------%0A%0A%23%23%20%u4F7F%u7528%u7B80%u4ECB%0A%0A%3E%20%u4EE5%u4E0B%u662F%u6211%u9047%u5230%u7684%u5751%uFF0C%u7ED9%u5927%u5BB6%u4E88%u4EE5%u5171%u52C9%20%20%20%20%u2014%u2014%20%5Bzz%5D%0A%u51C6%u5907%u5DE5%u4F5C%uFF0C%u4E0B%u8F7D%5Bprotobuffer%5D%28https%3A//github.com/google/protobuf%29%0A%0A1.%u68C0%u67E5%u662F%u5426%u5B89%u88C5brew%uFF0C%u5DE8%u5751%uFF5E%0A%0A%23%23%23%20%u4EE3%u7801%u5757%0A%60%60%60%20bash%0Abrew%20-v%0A%0A%23%u5982%u679C%u8F93%u51FA%0A%23--message%20%3E%20-bash%3A%20brew%3A%20command%20not%20found%0A%23%u6211%u4EEC%u6CA1%u6709brew%0A%60%60%60%0A%0A2.%u5B89%u88C5brew%0A%60%60%60%20bash%0Aruby%20-e%20%22%24%28curl%20-fsSL%20https%3A//raw.githubusercontent.com/Homebrew/install/master/install%29%22%0A%0A%23%u7B49%u4E2A%u51E0%u5206%u949F%0A%60%60%60%0A3.%u63A5%u4E0B%u6765%u6211%u4E0D%u6E05%u695A%u4F60%u4EEC%u5B89%u88C5autoconf%uFF0Cautomake%u6CA1%u6709%0A%09%uFF0D%20%u9ED8%u8BA4%u6CA1%u6709%u5B89%u88C5%0A%60%60%60%20bash%0Abrew%20install%20autoconf%3B%0Abrew%20install%20automake%3B%0A%0A%23%u7B49%u4E2A%u51E0%u5206%u949F%0A%60%60%60%0A%0A4.%u6267%u884C./autogen.sh%0A%60%60%60%20bash%0A./autogen.sh%3B%0A%0A%0A%23message%3B%0A%23+%20sed%20-i%20-e%20%27s/RuntimeLibrary%3D%225%22/RuntimeLibrary%3D%223%22/g%3B%0A%23%20%20%20%20%20%20%20%20%20%20%20s/RuntimeLibrary%3D%224%22/RuntimeLibrary%3D%222%22/g%3B%27%20%23gtest/msvc/gtest.vcproj%20gtest/msvc/gtest_color_test_.vcproj%20%23gtest/msvc/gtest_env_var_test_.vcproj%20%23gtest/msvc/gtest_environment_test.vcproj%20%23gtest/msvc/gtest_main.vcproj%20%23gtest/msvc/gtest_output_test_.vcproj%20%23gtest/msvc/gtest_prod_test.vcproj%20%23gtest/msvc/gtest_uninitialized_test_.vcproj%20%23gtest/msvc/gtest_unittest.vcproj%0A%23+%20autoreconf%20-f%20-i%20-Wall%2Cno-obsolete%0A%23configure.ac%3A29%3A%20error%3A%20possibly%20undefined%20macro%3A%20%23AC_PROG_LIBTOOL%0A%23%20%20%20%20%20%20If%20this%20token%20and%20others%20are%20legitimate%2C%20please%20use%20%23m4_pattern_allow.%0A%23%20%20%20%20%20%20See%20the%20Autoconf%20documentation.%0A%23autoreconf%3A%20/usr/local/Cellar/autoconf/2.69/bin/autoconf%20%23failed%20with%20exit%20status%3A%201%0A%0A%0A%0A%23%u7B49%u4E2A%u51E0%u5206%u949F%0A%60%60%60%0A%u5982%u679C%u6709%u4E0A%u8FF0%u7684%u62A5%u9519%uFF0C%u8BF7%u6267%u884C%u4E0B%u9762%u7684%u5185%u5BB9%0A%60%60%60%20bash%0Abrew%20install%20libtool%3B%0A%0A%23%u7B49%u4E2A%u51E0%u5206%u949F%0A%60%60%60%0A%0A5.%u6267%u884C%u4F59%u4E0B%u64CD%u4F5C%0A%60%60%60%20bash%0A./configure%3B%0Amake%3B%0Amake%20install%3B%0A%23%u7B49%u4E2A%u51E0%u5206%u949F%0A%60%60%60%0A%0A----%0A%23%23%23%23%u4F7F%u7528%u65B9%u5F0F%0A%0A1.%u6587%u4EF6data.proto%0A%60%60%60%20protobuf%0A//%u67E5%u8BE2%u5230%u7684%u73A9%u5BB6%u7684%u7B80%u5355%u4FE1%u606F%0Amessage%20PlayerEasyData%0A%7B%0A%20%20%20%20required%20int64%20nplayerid%20%3D%201%3B//%u73A9%u5BB6ID%0A%20%20%20%20required%20string%20nplayerheadid%20%3D%202%3B//%u73A9%u5BB6%u5934%u50CFID%0A%20%20%20%20required%20int32%20nlevel%20%3D%203%3B//%u73A9%u5BB6%u7B49%u7EA7%0A%7D%3B%0A%60%60%60%0A%0A2.%u5EFA%u7ACB%u6587%u4EF6%u5939%0A%60%60%60%20bash%0A%23%20%u5230compiler%20%u6587%u4EF6%u5939%u4E2D%0Acd%20compiler%3B%0Amkdir%20build%3B%0Amkdir%20build/objc%3B%0A%60%60%60%0A%0A3.%u5C06proto%u6587%u4EF6%u653E%u5165src%u6587%u4EF6%u5939%u4E2D%0A%0A4.%u6267%u884C%u751F%u6210%u7A0B%u5E8F%0A%60%60%60%20bash%0Asrc/protoc%20--proto_path%3Dsrc%20--objc_out%3Dbuild/objc%20src/data.proto%0A%0A%23%u5C31%u4F1A%u751F%u6210%20Data.pb.h%20Data.pb.m%u6587%u4EF6%u4E24%u4E2A%u6587%u4EF6%u4E86%2C%u8FD9%u4E24%u4E2A%u6587%u4EF6%u4E2D%2C%u5305%u542B%u7684%u5C31%u662F%20%u5BF9%u5E94%u7684oc%u5BF9%u8C61%u4E86%0A%60%60%60%0A%0A5.%u591A%u4E2Aproto%u6587%u4EF6%u6267%u884C%u811A%u672C%0A%u5EFA%u7ACB%u4E00%u4E2A%20%u811A%u672C%u6587%u4EF6%2C%u547D%u4EE4%u4E3Apro.sh%0A%u5185%u5BB9%u5982%u4E0B%0A%60%60%60%20bash%0A%0A%23%21/bin/sh%0A%0A%0A%23protocol%u7684%u547D%u4EE4%u6240%u5728%u76EE%u5F55%0AcommandPath%3D%22/Users/wuqifei/Desktop/protobuf-ios-master/compiler/src/protoc%22%0A%23protocol%u6587%u4EF6%u6240%u5728%u7684%u76EE%u5F55%0AprotoPath%3D%22/Users/wuqifei/Desktop/protobuf-ios-master%22%0A%23%u6700%u540E%u7684%u5B58%u653E%u751F%u6210%u7684.m%u6587%u4EF6%u7684%u76EE%u5F55%0AobjcOut%3D%22/Users/wuqifei/Desktop/protobuf-ios-master/compiler/build/objc%22%0A%0Arm%20-rf%20%22%24%7BobjcOut%7D%22%0Amkdir%20-p%20%22%24%7BobjcOut%7D%22%0A%0A%0Afor%20file%20in%20%22%24%7BprotoPath%7D%22/*.proto%3B%20%20%0Ado%20%20%0A%20%20%20%20%23echo%20%24file%20%0A%20%20%20%20%24%7BcommandPath%7D%20--proto_path%3D%24%7BprotoPath%7D%20--objc_out%3D%24%7BobjcOut%7D%20%24%7Bfile%7D%20%0Adone%20%20%0A%60%60%60%0A%u6267%u884C%u5B83%28%u5F53%u7136%2C%u4F60%u5F97%u8D4B%u4E88%u5B83%u53EF%u6267%u884C%u7684%u6743%u9650%20chmod%20a+x%20pro.sh%29%0A%u6267%u884C%u5B83%20%20./pro.sh%0A%0A----%0A%23%23%23%23%u5F15%u5165%u65B9%u5F0F%0A%0A1.%u5C06google%u7684objectc%u6587%u4EF6%u5939%uFF0C%u590D%u5236%u5230%u81EA%u5DF1%u7684%u6587%u4EF6%u5939%u4E2D%0A%21%5BAlt%20text%5D%28./1450937401512.png%29%0A%0A2.%u8BBE%u7F6Eheader%20search%20paths%0A%21%5BAlt%20text%5D%28./1450937483085.png%29%0A%0A3.%u8BBE%u7F6E%u4F9D%u8D56%u548C%u8FDE%u63A5%u5E93%u3002%0A%21%5BAlt%20text%5D%28./1450937521339.png%29%0A%0A4.%u5F15%u5165%u6211%u4EEC%u7F16%u8BD1%u597D%u7684data.pbobjc.h%u4EE5%u53CA.m%u6587%u4EF6%0A%0A5.%u4F7F%u7528%u3002%0A%0A---------%0A%u611F%u8C22%u9605%u8BFB%u8FD9%u4EFD%u5E2E%u52A9%u6587%u6863%u3002%0A%0A</center><br/></span>
</div></body></html>
