## 介绍

Homebrew 是一款包管理工具，目前支持 macOS 和 Linux 系统。主要有四个部分组成：brew、homebrew-core 、homebrew-cask、homebrew-bottles。

## 安装

执行 `/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`，镜像选阿里巴巴，傻瓜式安装，30 分钟左右，安装完成。

## 更换下载源

```bash
### 更换 brew.git
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git # 中科大
# 或
git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git # 阿里巴巴
# 或
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git # 清华大学

### 更换 homebrew-core.git
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git # 中科大
# 或
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git # 阿里巴巴
# 或
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git # 清华大学

### 更换homebrew-cask.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git # 中科大
# 或
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-cask.git # 阿里巴巴
# 或
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git # 清华大学

### 更换homebrew-bottles
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile # 阿里云
# 或
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles/bottles' >> ~/.bash_profile # 中科大
# 或
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/bottles' >> ~/.bash_profile # 清华大学

source ~/.bash_profile

### 恢复默认源
# 某些情况下，可能我们使用的国内源挂掉了，就需要恢复默认源。
# 1. git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git
# 2. git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
# 3. git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
# 4. 删除环境变量 HOMEBREW_BOTTLE_DOMAIN
# 5. source ~/.bash_profile
# 6. brew update
```

## 使用

```bash
brew --version
brew update
brew install node #默认安装最新版
brew install node@14.16.8 #安装指定版本
brew switch node 16.0.0 #切换版本
brew upgrade name #更新安装过的软件(如果不加软件名，就更新所有可以更新的软件)
brew uninstall node #卸载 node

### 服务相关
brew services list #获取services列表
brew services start/stop/restart serverName
    brew services start mysql #启动mysql服务
    brew services restart mysql #重启mysql服务
    brew services stop mysql #停止mysql服务

### 其他常用命令
brew config #查看 brew 配置
brew info node #查看 node 安装信息
brew list #查看已安装软件
brew list --versions #查看已安装软件版本号
brew search node #搜索可用 node 相关软件
brew update #brew 自身更新
brew cleanup #清除下载的缓存
brew doctor #诊断 brew，并给出修复命令

### 意外处理
# 先执行 brew doctor 查看问题，按照指示对问题进行修复
# 执行 brew update-reset 将 homebrew 还原到稳定版
# 执行 brew update 更新软件包

### 卸载 Homebrew
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

## 资料

[程序员 Homebrew 使用指北](https://sspai.com/post/56009#!#)
