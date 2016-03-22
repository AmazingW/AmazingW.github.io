---
layout: post
title: 在ubuntu上安装gogs
description: 在ubuntu上安装gogs
category: 工具
tags: [gogs,ubuntu]
keywords: gogs,ubuntu
---


升级你的软件及系统

```bash
sudo apt-get update;
sudo apt-get upgrade;
```

创建用户

```bash
sudo adduser gogs;
```

安装git

```bash
sudo apt-get install git;
```

安装mysql

```bash
sudo apt-get install mysql-server
```

创建gogs数据库

```sql
mysql -u root -p;
create database gogs;
show databases;
quit;
```

切换用户

```bash
su gogs;
cd ~;
```

安装golang环境
可以在http://www.golangtc.com/ 这里查询到最新的包下载地址

```bash
sudo wget http://www.golangtc.com/static/go/1.6/go1.6.linux-amd64.tar.gz;
tar -xzvf go1.6.linux-amd64.tar.gz -C /var/opt;
```

配置gogs环境

```bash
echo export GOROOT=/var/opt/go >> .bashrc;

echo export GOBIN=$GOROOT/bin >> .bashrc;

echo export GOARCH=amd64 >> .bashrc;

echo export GOOS=linux >> .bashrc;

echo export GOPATH=/home/gogs/goapp >> .bashrc;

echo export PATH=.:$PATH:$GOBIN >> .bashrc;
```

使你配置的环境生效

```bash
source .bashrc;
```

检查golang是否安装成功,如果不成功，则vi .bashrc,看一下gopath是不是配置的有问题

```bash
go env；
```

建立仓库目录

```bash
mkdir repositories;
```

建立gogs的安装目录

```bash
mkdir goapp;
cd goapp;
```

安装gogs
在这里 https://gogs.io/docs/installation/install_from_binary 找到最新的gogs的包下载地址

```bash
sudo wget https://dl.gogs.io/gogs_v0.9.13_linux_amd64.zip;

unzip gogs_v0.9.13_linux_amd64.zip;

cd gogs;

mkdir custom;

mkdir custom/conf;#创建自定义配置文件目录

sudo chmod -R 777 custom;#修改custom文件夹权限

mkdir log;#创建日志目录

sudo chmod -R 777 log;#修改log文件夹权限

```

启动gogs

```bash
cd /home/gogs/goapp/gogs;
./gogs  web;
```

然后访问http://localhost:3000;完成配置

如果想配置永久启动,可以用tmux等等，或者参考我 《nodejs守护进程的启动方法》 这篇文章;