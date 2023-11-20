#!/bin/sh
# 任何命令执行失败时立即退出脚本
set -e

echo "=========================="
echo "====== DEPLOY START ======"
echo "=========================="

ssh -T git@github.com

# 保存并推送仓库
git add .
git commit -m "deploy"
git push

# 更新版本号
# npm version major
# npm version minor
npm version patch

# 构建
npm run build

# 进入生成的构建文件夹
cd dist

# 如果你是要部署到自定义域名
echo 'docs.peichenhu.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:peichenhu/peichenhu.github.io.git master

# 快速切换到你之前所在的目录
cd -

echo "=========================="
echo "====== DEPLOY SUCCESS ===="
echo "=========================="