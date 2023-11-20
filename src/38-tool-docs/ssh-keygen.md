# ssh-keygen

-   `id_rsa` 私有密钥
-   `id_rsa.pub` 公共密钥
-   `known_hosts` 存储用户之前连接过的远程主机的公钥信息，如果公钥不匹配或者在 known_hosts 文件中没有与远程主机相关的条目，SSH 会显示警告或错误信息，以提醒你可能存在安全问题。
-   `config` 是 SSH（Secure Shell）客户端的配置文件，它允许你定义和自定义 SSH 连接的各种参数和选项。通过修改 ssh config 文件，你可以配置 SSH 客户端的行为，以适应你的需求和偏好。

## 检查 SSH

```sh
# 进入 SSH 目录
cd ~/.ssh
# 如果路径不存在的话，键入下述命令创建ssh文件夹
mkdir ~/.ssh
# 查看文件列表
ls
# 查看文件列表(包含 .* 文件)
ls -a
# 查看
cat ~/.ssh/id_rsa.pub
cat ~/.ssh/id_rsa
```

## 生产 KEY

```sh
# 进入 SSH 目录
cd ~/.ssh

# 生成默认配置的公钥和私钥
ssh-keygen

# 键入下述命令生成自定义 ssh-key 的公钥和私钥
# 会让你依次输入文件名，密码，密码，结束后默认生成id_rsa和id_rsa.pub
ssh-keygen -t rsa -C "xxx@xxx.cn"

# 你还可以写得简短点直接把名字写在命令后
# 这个命令会生成 id_rsa_xx 和id_rsa_xx.pub 的私钥和公钥
ssh-keygen -t rsa -C "xxx@xxx.cn" -f ~/.ssh/id_rsa_xx
ssh-keygen -t rsa -C "pch1024@outlook.com" -f ~/.ssh/id_rsa_blog

# ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# -t：密钥类型，一般为dsa，ecdsa，ed25519和rsa这几种，默认为rsa，可省略；
# -b：密钥的位数；
# -C：注释文字，比如邮箱。
```

## known_hosts 报错处理

```sh
# 删除错误的IP或者域名
ssh-keygen -R 120.48.97.59
```

## ssh-config

```sh
touch ~/.ssh/config # 新建
vim ~/.ssh/config # 编辑

# 配置文件参数
# Host: 指定主机名称或模式，用于匹配要应用配置的远程主机。
# HostName: 指定远程主机的名称或 IP 地址。
# User: 指定要用于 SSH 连接的用户名。
# Port: 指定 SSH 连接的端口号。
# IdentityFile: 指定用于身份验证的私钥文件的路径。
# ProxyCommand: 指定用于连接到远程主机的代理命令。
# ForwardAgent: 指示是否进行 SSH 代理转发。
# Compression: 指定是否启用连接的压缩。
# ServerAliveInterval: 指定发送保持活动消息的时间间隔，以保持 SSH 连接的活动状态。
# PreferredAuthentications: 设置登录方式，publickey 公钥，改成 password 则要输密码

# 工作
Host gitee
    HostName gitee.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_work
    user git
# 生活
Host github
    HostName github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_my
    user git
```

## SSH 配合 Git

```sh
# 链接测试
ssh -T git@github.com

# 在你的项目目录下先使用git remote -v查看远程地址
git remote -v
# 输出  origin  https://github.com/peichenhu/learn-github-actions.git (fetch)
# 输出  origin  https://github.com/peichenhu/learn-github-actions.git (push)

# 使用命令将 https 协议改成SSH协议进行访问:
git remote set-url origin git@github.com:peichenhu/learn-github-actions.git
# 输出  origin  git@github.com:peichenhu/learn-github-actions.git (fetch)
# 输出  origin  git@github.com:peichenhu/learn-github-actions.git (push)
```

## Github 的 HTTPS 和 SSH 区别

> SSH 在国内访问 Github 比 HTTPS 快

https 可以随意克隆 github 上的项目，而不管是谁的；
而 SSH 则是你必须是你要克隆的项目的拥有者或管理员，且需要先添加 SSH key，否则无法克隆。

https url 在 push 的时候是需要验证用户名和密码的；
而 SSH 在 push 的时候，是不需要输入用户名的，
如果配置 SSH key 的时候设置了密码，则需要输入密码的，否则直接是不需要输入密码的。
