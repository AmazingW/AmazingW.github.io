---
layout: post
title: redis master/slave 模式
description: "redis master/slave 模式"
category: 服务端开发
tags: [redis,主从]
keywords: [redis,主从]
---

#### 主从复制:让多个slave server拥有和master server相同的数据库副本。

----



##### 特点

>1.master可以有多个slave
>2.除了多个slave连到相同的master外，slave也可以连接其他slave形成图状结构
>3.主从复制不会阻塞master。也就是说当一个或多个slave与master进行初次同步数据时，master可以继续处理client发来的请求。
相反slave在初次同步数据时则会阻塞不能处理client的请求。
>4.主从复制可以用来提高系统的可伸缩性,我们可以用多个slave 专门用于client的读请求，
如sort操作可以使用slave来处理。也可以用来做简单的数据冗余
>5.可以在master禁用数据持久化，只需要注释掉master 配置文件中的所有save配置，然后只在slave上配置数据持久化


##### 主从复制的过程

>当设置好slave服务器后，slave会建立和master的连接，然后发送sync命令。
>无论是第一次同步建立的连接还是连接断开后的重新连 接，master都会启动一个后台进程，将数据库快照保存到文件中，同时master主进程会开始收集新的写命令并缓存起来。后台进程完成写文件 后，master就发送文件给slave，slave将文件保存到磁盘上，然后加载到内存恢复数据库快照到slave上。接着master就会把缓存的命 令转发给slave。而且后续master收到的写命令都会通过开始建立的连接发送给slave。
>从master到slave的同步数据的命令和从 client发送的命令使用相同的协议格式。当master和slave的连接断开时slave可以自动重新建立连接。
>如果master同时收到多个 slave发来的同步连接命令，只会使用启动一个进程来写数据库镜像，然后发送给所有slave。


#### 文件配置

先进入redis的config文件夹下

创建不同的端口的redis文件

```bash

cp redis.config backup.reidis.config;#拷贝备份

cp redis.config 6379.config;#master config

cp redis.config 6380.config;#slave config

cp redis.config 6381.config;#slave config

rm redis.config; # Y
```


修改master配置文件

```bash
sudo vi 6379.config
```

1.默认后台启动

```bash
daemonize no
```

2.修改绑定的主机地址
想让其他的服务器访问你的redis,server,最好配置这里的bind

```bash
bind 127.0.0.1
```

3.设置Redis连接密码

```bash
requirepass mypassword
```


修改slave

```bash
sudo vi 6380.config
```

1.默认后台启动

```bash
daemonize no
```

2.修改绑定的主机地址
想让其他的服务器访问你的redis,server,最好配置这里的bind

```bash
bind 127.0.0.1
```

3.设置Redis连接密码

```bash
requirepass mypassword
```

4.修改端口号

```bash
port 6380
```

5.设置隶属的master的redis

```bash
slaveof 127.0.0.1 6379
```

6.如果 master 需要密码认证，就在这里设置

```bash
masterauth mypassword
```

#### notice : 主从的数据库总量要相同,否则无法启动

最后,启动redis

```
redis-server /usr/local/etc/6379.conf
redis-server /usr/local/etc/6381.conf
redis-server /usr/local/etc/6380.conf
```