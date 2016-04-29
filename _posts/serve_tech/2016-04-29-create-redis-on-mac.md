---
layout: post
title: "在mac上部署redis-server服务器"
description: "在mac上部署redis-server服务器"
category: 服务端开发
tags: [redis,mac]
keywords: "redis,mac"
---

### 1.安装homebrew

确保已经安装了xCode

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

 打开terminal,将上面的一段粘贴到terminal,然后执行,等待2分钟左右,brew就安装成功了

### 2.安装redis

```bash
brew install redis
```

安装完成后你会看到

```bash
#To have launchd start redis at login:
#  ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents
#Then to load redis now:
#  launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
#Or, if you don't want/need launchctl, you can just run:
#  redis-server /usr/local/etc/redis.conf
```

上面是redis配置文件所在的目录.