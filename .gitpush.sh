#!/bin/sh

# 所有用户都可读可写可执行
# chmod 777 .gitpush.sh

echo "===== 开始同步仓库 $(date) ====="
git pull
git add .
git status
git commit -m "auto commit"
git push
echo "===== 完成同步仓库 $(date) ====="