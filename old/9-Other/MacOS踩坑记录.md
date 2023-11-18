# MacOS踩坑记录

## MacOS 文件系统根目录 和 用户目录

```bash
根目录 /
用户目录 /Users/$(whoami)
```

## 用户根目录新建文件夹没有读写权限

> sudo chown -R $(whoami) ~/新建文件夹名称

## npm 命令没有权限

> sudo chown -R $(whoami) ~/.npm

## npm 插件（ 例如 vuepress ）没有权限

> sudo chown -R $USER /usr/local/lib/node_modules/vuepress/node_modules/@vuepress/core/.temp/

## 当前用户

> whoami

> id -un

## 新建文件

> cd 目标文件夹

> touch 新建文件名称.文件后缀名

## 截图

> 全屏 cmd+shift+3
> 区域 cmd+shift+4

## 快捷搜索

> cmd + 空格

##  ssh

```bash
# git ssh 添加后测试可用性

ssh -T git@github.com

#您应该通过输入以下内容来验证您的连接(更详细的数据)：

ssh -vT git@github.com

# 查看 ssh
ls -al ~/.ssh 

# 修改 ~/.ssh/config, 自动将密钥加载到ssh-agent中并将密码短语存储在密钥链中。

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
  
# Add your SSH private key to the ssh-agent and store your passphrase in the keychain. If you created your key with a different name, or if you are adding an existing key that has a different name, replace id_rsa in the command with the name of your private key file.
# 将您的SSH私钥添加到ssh-agent并将密码短语存储在钥匙串中。如果您使用其他名称创建密钥，或者要添加具有其他名称的现有密钥，请使用私有密钥文件的名称替换命令中的id_rsa。

ssh-add -K ~/.ssh/id_rsa
```
> 