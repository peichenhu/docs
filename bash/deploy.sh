#!/bin/sh
# 任何命令执行失败时立即退出脚本
set -e

echo "=========================="
echo "====== DEPLOY START ======"
echo "=========================="

# ssh -T git@github.com
git config --global user.email "pch1024@outlook.com"
git config --global user.name "pch1024"

# 保存并推送仓库
# git add .
# git commit -m "deploy"
# git push

# 更新版本号
# pnpm version major
# pnpm version minor
# pnpm version patch

# 构建
pnpm run build

# 进入生成的构建文件夹
cd dist

# 如果你是要部署到自定义域名
echo 'docs.peichenhu.cn' > CNAME

git init --initial-branch=main
git add -A
git commit -m 'deploy'

# 如果你想要部署到 git push -f <远程仓库: https|ssh> <本地分支>:<远程分支>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:peichenhu/peichenhu.github.io.git main

echo "=========================="
echo "====== DEPLOY SUCCESS ===="
echo "=========================="

# 快速切换到你之前所在的目录
cd -