# 学习笔记-阿里云ECS容器服务配置

>LNMN 环境代表 Linux 系统下 Nginx + MySQL + Nodejs 网站服务器架构。本文档介绍 CentOS 下的 LNMN 环境搭建。
>
> Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括VMs（虚拟机）、 bare metal、OpenStack 集群和其他的基础应用平台。 

Docker通常用于如下场景：
- web 应用的自动化打包和发布；
- 自动化测试和持续集成、发布；
- 在服务型环境中部署和调整数据库或其他的后台应用；
- 从头编译或者扩展现有的 OpenShift 或 Cloud Foundry 平台来搭建自己的PaaS环境。

## 我要做甚么？
我自己用 centos 配置了自己的网站，但是考虑到以后可能要换服务器，不想再配置一次，节省劳动力，所以想把服务器配置搬到Docker，一劳永逸。 
docker_centos 主要是网站配置和网站数据访问，之后的服务器登录依然先登录服务器再登录docker_centos

## 开始学习
> Docker 命令大全
>> http://www.runoob.com/docker/docker-command-manual.html

1. 安装 windows 10 docker

先把系统升级到专业版，再从官网注册并下载docker for Windows 10

2. 确定centos为服务器版本，那就开始：

```bash
# CMD 检查安装
docker version  

# 搜索 centos 公共镜像
docker search centos

# 下载
docker pull centos

# 查看下载
docker image ls -a

# 删除 image
docker rmi centos

# 容器操作
docker run <image name>
docker stop <container name>
docker start <container name>
docker restart <container name>
docker kill <container name>

# shell 交互模式运行 centos image 作为容器
docker run --privileged --cap-add SYS_ADMIN -e container=docker -it --name my_centos -p 80:80 -p 3306:3306 -d  --restart=always centos /usr/sbin/init
# 这个命令用来建立一个CENTOS的容器。把80端口映射到容器的8080端口。
# --privileged 指定容器是否是特权容器。这里开启特权模式。
# --cap-add SYS_ADMIN 添加系统的权限。不然，系统很多功能都用不了的。
# -e container=docker 设置容器的类型。
# -it 启动互动模式。
# /usr/sbin/init  初始容器里的CENTOS。
# 以上的参数是必需的。不然，建立的CENTOS容器不能正常使用和互动。
# 如果没有-it参数，容器会不停启动。
# 如果没有初始化和特权等等的开关，就不能使用systemctl。所以，以上的开关和设置是一样不能少的。

# 进入容器
docker exec -it my_centos /bin/bash


# 交互模式下查看centos 版本
cat /etc/redhat-release

# 安装网络工具（可选）
yum install net-tools

# 至此centos 镜像以作为容器运行，然后就是常规操作配置centos
```

<b>划重点：从这里开始，如果中途退出并kill rm 容器，容器将变回初始状态</b>

3. centos 安装 node

```bash
# 安装 nodejs
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum install -y nodejs
node -v
npm -v
```

4. centos 安装 mariadb
```
# 卸载
yum remove mariadb
rm -rf /var/lib/mysql/
rm -rf /etc/my.cnf

# 搜索 MariaDB 现有的包
rpm -qa | grep MariaDB
# 如果存在（删不了的话，就一个一个删），全部删除
rpm -e --nodeps MariaDB-\*

# 开始新的安装, 创建 MariaDB.repo 文件

vim /etc/yum.repos.d/mariadb.repo

mariadb]
name = mariadb
baseurl = http://yum.mariadb.org/10.4/centos7-amd64
gpgkey = https://yum.mariadb.org/RPM-GPG-KEY-MariaDB
gpgcheck = 1

# 安装 MariaDB
yum install -y MariaDB-server MariaDB-client


# 启动 MariaDB 服务，并设为开机自启
systemctl start mariadb #启动服务
systemctl enable mariadb #设置开机启动
systemctl restart mariadb #重新启动
systemctl stop mariadb.service #停止 MariaDB

# 登录到数据库用,此时 root 账户的密码为空，直接回车即可，退出 Mariadb，exit；即可
mysql -uroot -p

# 进行 MariaDB 的相关简单配置(可选)
mysql_secure_installation

    首先是设置密码，会提示先输入密码
    Enter current password for root (enter for none):<–初次运行直接回车
    设置密码
    Set root password? [Y/n] <– 是否设置root用户密码，输入y并回车或直接回车
    New password: <– 设置root用户的密码
    Re-enter new password: <– 再输入一次你设置的密码
    其他配置
    Remove anonymous users? [Y/n] <– 是否删除匿名用户，回车
    Disallow root login remotely? [Y/n] <–是否禁止root远程登录,回车（后面授权配置）
    Remove test database and access to it? [Y/n] <– 是否删除test数据库，回车
    Reload privilege tables now? [Y/n] <– 是否重新加载权限表，回车

# 修改默认密码(可选)
use mysql;
update user set password=PASSWORD("你的密码") where user='root';

# 授予外网登录和所有操作权限 %
grant all privileges on *.* to root@'%' identified by '你的密码';

# 刷新权限
flush privileges; 

# 删除用户
drop user zhangsan@'%';

```
## 安装 Nginx

```shell
rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
yum install -y nginx
systemctl start nginx.service
systemctl enable nginx.service
yum info nginx

## 查看容器IP地址
docker inspect <name/id>
```

## 上传发布
```
docker push 注册用户名/镜像名

## 修改本地镜像名
docker tag lnmn pch1024/lnmn 
docker push pch1024/lnmn:latest


```
## 导出备份
```
# docker export [OPTIONS] CONTAINER
docker export --output="pch1024/lnmn.tar" my_lnmn

```



## 进阶
进一步优化镜像文件的大小需要 自己手写 dockerfile ，未完待续














