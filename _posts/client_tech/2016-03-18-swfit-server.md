---
layout: post
title: 服务端 Swift
description: ""
category: 客户端开发
tags: [Swift,server]
keywords: Swift,server
---


自从苹果官方发布了一个 Swift 的 Linux 开源版本之后，服务端 Swift 终于迎来了一个令人激动的前景。我的好奇心终于无法克制，是时候尝试一下服务端 Swift 了！

除了用过几个 Baas 以外，我没有任何后端编程经验，但幸运的是开源社区已经提供了现成的框架。我试了一下 Tanner Nelson 推荐的 Vapor 框架。它的使用非常简单，非常适合我当前的任务，在这篇文档中还会使用到 Heroku。我决定使用 Heroku 的原因是我们的后端团队在使用它，它对于前端来说非常友好。

写到这里的时候，为了解决 Heroku 框架运行中的几个小问题，我专门提交了一个 pull request 。如果代码还没被合并的话，请设置你的包管理器从 这里 下载。

### 安装

要继续本教程，首先，你需要一个 Heroku 账号 ，并安装好 Swift Development Snapshot 。写到这里的时候，在它的正式版中还未包含 swift 包管理器。因此为了使用这个工具，你必须下载开发版的 snapshot。

### 开始

我们的目标是创建一个简单的 Swift 服务器并运行在 Heroku 上。这不需要在 linux 环境下进行，就像是你在使用本地服务器。你只消创建一个本地的 Xcode 项目，对项目进行一些设置，然后就可以在 Swift 包管理器 中运行它。整过过程分为 4 个步骤：

将 main.swift 拷贝根目录下的 Sources 目录

![POZWJg](../../../assets/img/swift-server1.png)

创建一个 Package.swift 文件

![POZWJg](../../../assets/img/swift-server2.png)

将 .build 目录添加到 import paths

要使用自动补全和语法加亮功能，需要将 Swift 包管理器的 build 目录提交到 import paths 中。注意，在 import paths 的 Debug 中设置的 debug 目录，而 Release 项则输入 release 目录。

![POZWJg](../../../assets/img/swift-server3.png)

用 toolchain 运行 Xcode

如果你使用 Xcode 7.3，你可以用 Xcode > Toolchains 菜单开启一个Xcode 实例，用于打开 swift snapshot。因为我们不能在 Xcode 中进行编译，我们只能以命令行的方式进行编译。

![POZWJg](../../../assets/img/swift-server4.png)

编写服务器

令我高兴的是，为了进行概念验证，我需要编写的代码其实只有寥寥数行。我启动和运行服务器的代码甚至不到 10 行。

![POZWJg](../../../assets/img/swift-server5.png)

要启动服务器，只需在终端中输入一句命令，：

![POZWJg](../../../assets/img/swift-server6.png)

好了，让我们打开浏览器。我的浏览器安装了 json 插件，你的画面或许会有不同。

![POZWJg](../../../assets/img/swift-server7.png)

迁移到云上

服务器在本地顺利运行起来了，但如果放到云端则更好。我迫不及待地想将 App 在云上跑起来。对于我来说这是一个全新的挑战，幸运的是，我得到了 Vincent Toms 的悉心指导。

Heroku 的安装是一件非常愉悦的体验，几分钟后我就创建了一个 Heroku App，接下来我就要上传我的项目了。

出错啦

这只是今天的诸多错误中的一个。我已经预计到事情不可能一帆风顺，因此我查看了 Vapor 的文档，最终发现问题出在所谓的 buildpacks 上。Heorku 提供了一些标准的 buildpacks，但完全没有针对 Swift 的 buildpacks。无奈之下求救于开源社区，刚好看到 Kyle Fuller 的 buildpack 。集成它就简单得多了。

![POZWJg](../../../assets/img/swift-server8.png)

用这个 buildpack 启动后，App 成功加载，接下来就是访问它的 URL。

再次出错

![POZWJg](../../../assets/img/swift-server9.png)

事情不会那么顺利的，是吧？经过 google 一番，仔细查看了一些例子，我发现我还差一个 Procfile。浏览一下这个文件的内容，你就能明白这个文件是干什么用的了。

![POZWJg](../../../assets/img/swift-server10.png)

buildpack 创建了可执行文件，但 Heroku 并不知道。通过 Procfile，我们告诉 Heroku 去运行 SwiftServerIO 可执行文件。上传这个 Procfile。

仍然出错

Heroku 编译的 2 分支仿佛变得无比漫长。我重新打开了浏览器，发现仍然报错。

![POZWJg](../../../assets/img/swift-server11.png)

我以为 Heroku 可能还未启动完成（实际不是），因此我又等了一小会，终于发现出错了。可执行文件生成了， process file 也就绪，一定是别的什么地方出问题了。再次 google，一直到我最终发现我需要设置 App 的规模(scale up)。这要使用到 Heroku 的 toolbelt 中的一个简单命令。

heroku ps:scale web=1

![POZWJg](../../../assets/img/swift-server12.png)

Heroku 在免费情况下只有一个 dyno（Heroku 计费单位，10~50 个请求/秒）。但对于我们的简单服务器来说，这也够了。因此，在我们将 scale web 设置为 1 个 dyno 之后，再次用浏览器查看。

成功了！

![POZWJg](../../../assets/img/swift-server13.png)

成功了！服务器启动，出现了万能的 hello world！经过一番欢呼雀跃之后，让我们真正来问一声好吧！

响应请求

在 main.swfit 文件中添加一小段代码，让服务器在问好的同时能够因人而异。就微微偷一下懒，新加一个路由，让服务器根据输入输出不同的问候语。

![POZWJg](../../../assets/img/swift-server14.png)

一切正常，但根据一般规律，我仍然做好了出错的心理准备。提交修改，push 代码到 Heroku。

Say Hello!

![POZWJg](../../../assets/img/swift-server15.png)

大约一份多钟的编译之后，在浏览器中访问 URL，服务器返回了问候语。你可以在这里查看效果 。

接下来是什么？

可以说，服务端 Swift 的今天离不开社区强大支持。对于我来说，能够从云端获取 JSON 是一个令人兴奋的开始，我已经迫不及待地想看看接下来还会发生什么。