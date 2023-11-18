# GitHub Actions 快速入门

> [文档](https://docs.github.com/zh/actions)

1. 仓库创建 `.github/workflows/github-actions-demo.yml`

```yml
# ${{ github.actor }} 作者名称
# ${{ github.event_name }} 触发事件名称
# ${{ runner.os }} 运行系统
# ${{ github.ref }} 分支名称
# ${{ github.repository }} 仓库名称
# ${{ github.workspace }} 工作空间
# ${{ job.status }} 工作状态

name: 自动打包工作流
run-name: 🚀 ${{ github.actor }} 规定 push 操作后，自动打包项目生成静态站点文件。
on: [push]
permissions: write-all
jobs:
    # act -j docs-build --bind . -W .github/workflows/github-actions-build.yml
    docs-build:
        if: github.ref == 'refs/heads/main'
        runs-on: ubuntu-latest
        steps:
            - run: echo "当前触发事件是：${{ github.event_name }}"
            - run: echo "当前运行系统是：${{ runner.os }}"
            - run: echo "当前仓库名称是：${{ github.repository }}"
            - run: echo "当前仓库分支是：${{ github.ref }}"
            - uses: actions/checkout@v4
            - name: 安装项目运行环境
              uses: actions/setup-node@v3
              with:
                  node-version: "20.x"
                  cache: npm
            - run: npm ci
            - run: npm install
            - run: git fetch
            - run: git checkout gh-pages
            - run: npm run docs:build
            - run: rm -fr ./docs
            - run: mv -f ./src/.vitepress/dist ./docs
            - run: git config --global user.email "pch1024@outlook.com"
            - run: git config --global user.name "pch1024"
            - run: git add .
            - run: git status
            - run: git commit -m 'auto-deploy'
            - run: git push --set-upstream origin gh-pages
            - run: git log --oneline
# end
```
