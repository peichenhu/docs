#!/bin/sh
# 任何命令执行失败时立即退出脚本
set -e

# 更新版本号
# pnpm version major
# pnpm version minor
# pnpm version patch

# 保存并推送仓库
git add .
git commit -m "deploy"
pnpm version patch
git push
