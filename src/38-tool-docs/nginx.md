# NGINX CentOS

```bash
# 静默安装 nginx
yum install -y nginx
# 帮助信息
nginx -h
# 版本号查看
nginx -v
# 检查配置正确性
nginx -t
nginx -T                # 查看当前 Nginx 最终的配置
nginx -t -c <配置路径>    # 检查配置是否有问题，如果已经在配置目录，则不需要-c

systemctl start nginx # 开始启动
systemctl status nginx # 状态信息
nginx -s reload     # 重载配置
nginx -s stop       # 强制退出
nginx -s quit       # 安全退出
nginx -s reopen     # 默认日志文件找不到时，执行该命令可以生成一个新的默认日志文件。

```

## 默认工作空间

-   `/etc/nginx/conf.d/` 文件夹，是我们进行子配置的配置项存放处，
-   `/etc/nginx/nginx.conf` 主配置文件会默认把这个 `/etc/nginx/conf.d/` 文件夹中所有子配置项都引入；
-   `/usr/share/nginx/html/` 文件夹，通常静态文件都放在这个文件夹，也可以根据你自己的习惯放其他地方

## 参考资料

-   [Nginx 从入门到实践](https://juejin.cn/post/6844904144235413512)
-   [nginx tool](https://www.digitalocean.com/community/tools/nginx)
