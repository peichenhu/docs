# GitHub Actions 快速入门

> [文档](https://docs.github.com/zh/actions)

1. 仓库根目录创建文件 `.github/workflows/github-actions-demo.yml`

```yml
# 为工作空间配置 SSH-KEY，再配合 Shell 脚本，支持更多玩法
# ssh-keygen -t rsa -b 4096 -C "pch1024@outlook.com"

name: deploy
on:
    push:
        branches: [main]
    workflow_dispatch:
permissions:
    contents: read
    pages: write
    id-token: write
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
            - run: npm ci
            - name: ssh # 添加完整 SSH-KEY 授权，让本地和此工作空间体验一致。
              run: |
                  mkdir -p /home/runner/.ssh/
                  echo "${{ secrets.SSH_PRIVATE_KEY }}" > /home/runner/.ssh/id_rsa
                  chmod 600 /home/runner/.ssh/id_rsa
                  ssh-keyscan github.com >> /home/runner/.ssh/known_hosts
            - run: npm run deploy # 执行项目里的 shell 脚本

```
