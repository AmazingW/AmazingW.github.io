---
layout: post
title: 在ubuntu配置安装mongodb
description: 在ubuntu配置安装mongodb
category: 服务端开发
tags: [mongodb,ubuntu,配置,安装]
keywords: [mongodb,ubuntu,配置,安装]
---

1.更新系统

```bash
sudo apt-get update
```

2.安装mongodb

```bash
sudo apt-get install mongodb
```

3.关闭或启动mongodb

```bash
sudo service mongodb stop;
sudo service mongodb start;
#后台启动 设置fork＝true
sudo mongo --dbpath=/data/db --fork --logpath=/data/log/mongodb.log --logappend
```

4.设置数据库密码
数据库启动后

```bash
mongo
> use admin
> db.addUser("root","123")
> exit
sudo service mongodb stop;
sudo service mongodb start;
mongo -auth
...
>db.auth("root","123")#验证用户
```

5.mongodb 配置文件

```bash
sudo vi /etc/mongodb.conf
//修改 bind—ip,配制成你需要通过的远程服务器的ip,就可以远程连接了.
```



