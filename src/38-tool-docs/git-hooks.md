# githooks

## githooks

-   `pre-commit hook`, 在运行 git commit 命令时且在 commit 完成前被触发
-   `commit-msg hook`, 在编辑完 commit-msg 时被触发，并且接受一个参数，这个参数是存放当前 commit-msg 的临时文件的路径
-   `pre-push hook`, 在运行 git push 命令时且在 push 命令完成前被触发
-   [其他](https://git-scm.com/docs/githooks)

原生的 git hooks 有一个比较大的问题是 .git 文件夹下的内容不会被 Git 追踪。 <br />
这就表示，无法保证让一个仓库中所有的成员都使用同样的 git hooks，<br />
除非仓库的所有成员都手动同步同一份 git hooks，但这显然不是个好办法。

## husky

一个支持所有客户端 GitHooks 的工具，在提交或推送时使用它来整理提交消息、运行测试、整理代码等。

```bash
# 安装
pnpx i -wD husky
# 初始化
pnpx husky install
# 安装后自动启用Git挂钩
pnpm pkg set scripts.prepare="husky install"

# 配置 pre-commit 挂钩
pnpx husky add .husky/pre-commit "lint-staged"

#################################################
# 搭配 commitizen cz-conventional-changelog 使用 #
#################################################

# 安装
pnpm i -wD commitizen cz-conventional-changelog
# 手动配置 package.json 文件
# "config": {
#   "commitizen": {
#     "path": "cz-conventional-changelog"
#   }
# }
# 配置 prepare-commit-msg 挂钩
pnpx husky add .husky/prepare-commit-msg "exec < /dev/tty && node_modules/.bin/cz --hook || true"
# 测试
git add .
git commit
```
