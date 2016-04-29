---
layout: post
title: ubuntu上nginx的安装与socketio配置
description: "ubuntu上nginx的安装与socketio配置"
category: 服务端开发
tags: [ubuntu,nginx,安装,配置,socketio]
keywords: [ubuntu,nginx,安装,配置,socketio]
---

1.更新系统

```bash
sudo apt-get update
```

2.安装nginx

```bash
sudo apt-get install mongodb
```

ubuntu安装Nginx之后的文件结构大致为：

所有的配置文件都在/etc/nginx下，并且每个虚拟主机已经安排在了/etc/nginx/sites-available下

启动程序文件在/usr/sbin/nginx

日志放在了/var/log/nginx中，分别是access.log和error.log

并已经在/etc/init.d/下创建了启动脚本nginx

默认的虚拟主机的目录设置在了/usr/share/nginx/www

3.启动Nginx

```bash
$sudo /etc/init.d/nginx start
```

4.例子

nginx 对socketio的配置

```bash

#user  nobody;
worker_processes  4;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  200;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    # 配置负载的后端
        upstream socket_nodes {
            ip_hash;
            server 192.168.0.51:3000 weight=5;
            server 192.168.0.27:5678;
            keepalive 64;
        }

    server {
        listen 8080;
        server_name localhost;

        location /socket.io/ {

            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;

            proxy_pass http://socket_nodes;
            proxy_redirect off;

            # Socket.IO Support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

    }
    include servers/*;
}

```