# linux centos

## 静态博客搭建一条龙服务

```bash
# 清理 SSH 链接记录，避免密钥变更导致的问题
ssh-keygen -R 120.48.97.59
# 安装系统软件
yum udpate
yum install -y nginx
yum install -y nodejs
yum install -y git
yum install -y rsync
# 安装 node 插件
npm i -g n nrm
# 升级 nodejs
n lts
# 切换 npm 包安装来源
nrm use taobao
# 启动 nginx 服务
systemctl start nginx
systemctl status nginx
systemctl reload nginx
systemctl stop nginx
# 进入工作目录
cd /home
# 创建 GIT 仓库密钥
ssh-keygen
# 复制密钥并设置 Github 密钥
cat /root/.ssh/id_rsa.pub
ssh -T git@github.com
# 克隆仓库
git clone git@github.com:peichenhu/blog.git
# 修改nginx 默认配置
# location /blog {
#     alias /home/blog/docs;
#     # try_files $uri $uri/ /index.html;
#     index index.html;
# }
nginx -t
systemctl reload nginx
systemctl status nginx

```

## HTTPS

```sh
# 进入Nginx默认配置文件目录。该目录为手动编译安装Nginx时的默认目录，
# 如果您修改过默认安装目录或使用其他方式安装，请根据实际配置调整。
cd /usr/local/nginx/conf
#创建证书目录，命名为cert。
mkdir cert
# 使用 scp 上传文件（过程需要输入密码）
scp /Users/pch/Documents/ssl/peichenhu.cn.key  root@120.48.97.59:/etc/nginx
scp /Users/pch/Documents/ssl/peichenhu.cn.pem  root@120.48.97.59:/etc/nginx

# 下载远程 nginx 配置文件并修改
scp root@120.48.97.59:/etc/nginx/nginx.conf   /Users/pch/Documents/ssl/
# 上传修改的nginx 配置文件文件到远程
scp /Users/pch/Documents/ssl/nginx.conf    root@120.48.97.59:/etc/nginx/nginx.conf
# 重载
nginx -t
systemctl reload nginx
systemctl status nginx
```

## 报错

```sh
# Failed to set locale, defaulting to C.UTF-8
echo "export LC_ALL=en_US.UTF-8"  >>  ~/.bashrc
source ~/.bashrc

# Error: Failed to download metadata for repo 'appstream': Cannot prepare internal mirrorlist: No URLs in mirrorlist

# 进入yum.repos.d 目录下
cd /etc/yum.repos.d/
# 修改源链接
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
# 要将之前的mirror.centos.org 改成 vault.centos.org
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*

```

## 参考资料

-   [解决 Failed to download metadata for repo ‘AppStream’](https://juejin.cn/post/7294079777711226919?searchId=2023111422280133FD871572983D2055FD)
-   [使用 SCP 命令上传文件到 Linux 云服务器](https://help.aliyun.com/zh/ecs/use-cases/run-scp-commands-to-transfer-files-to-or-from-a-linux-instance?spm=a2c4g.11186623.0.i0)
-   [在 Nginx 服务器安装证书](https://help.aliyun.com/zh/ssl-certificate/user-guide/install-ssl-certificates-on-nginx-servers-or-tengine-servers)
