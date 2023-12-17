# githooks

> [git docs](https://git-scm.com/docs/githooks)

原生的 `git hooks` 有一个比较大的问题是 `.git` 文件夹下的内容不会被 Git 追踪。 <br />
这就表示，无法保证让一个仓库中所有的成员都使用同样的 `git hooks`，<br />
除非仓库的所有成员都手动同步同一份 `git hooks`，但这显然不是个好办法。

## 客户端 GitHook

<!-- prettier-ignore -->
| 客户端 GitHook | 调用时机 | 说明 |
|---|---|---|
|`pre-commit`               | 在执行`git commit`命令生成提交对象之前被触发 (错误则中断)。| 常用来检查即将提交的快照，比如运行`lint`工具检查代码格式。|
|`prepare-commit-msg`       | 在提交信息编辑器显示之前，提交对象创建完毕之后被触发。       | 常用于给提交信息编辑器提供默认的提交信息，如修复`bug`时引用`bug`号等。|
|`commit-msgcommit-msg`     | 在提交信息编辑器关闭后、提交对象生成之前被触发(错误则中断)。  | 常用于检查提交信息是否符合格式要求。|
|`post-commitpost-commit`   | 在整个提交过程完成后被触发。                             | 常用于通知其他工具提交已经完成。此钩子不能影响提交过程的结果。|
|`pre-rebasepre-rebase`     | 在`git rebase`命令执行前被触发 (错误则中断)。             | 常用于阻止对已经推送的提交进行`rebase`操作。|
|`post-checkoutpost-checkout`| 在`git checkout`或`git switch`成功运行后被触发。        | 常用于提醒用户工作目录已经改变。|
|`post-mergepost-merge`     | 在`git merge`成功运行后被触发。                          | 常用于通知用户有文件被合并。|
|`pre-pushpre-push`         | 在`git push`命令发送数据到远程仓库之前被触发 (错误则中断)。   | 常用于确保不会推送错误的提交到远程仓库。|

## 服务端 GitHook

<!-- prettier-ignore -->
| 服务端 GitHook | 调用时机 | 说明 |
|---|---|---|
| `pre-receivepre-receive`    |在远程仓库接收到`git push`数据并开始更新处理之前被触发。                  |常用于实现权限控制和引用（branch、tag等）的规则检查。|
| `updateupdate`              |在远程仓库接收到`git push`数据，每个引用更新前被触发。与`pre-receive`类似。|常用于实现权限控制和引用的规则检查。|
| `post-receivepost-receive`  |在远程仓库接收到`git push`数据并完成所有更新后被触发。                    |常用于触发持续集成、部署等后续任务，或者向外部系统发送有关新提交的通知。|

## husky

[husky](https://typicode.github.io/husky/#/)
是一个支持所有客户端 GitHooks 的工具，在提交或推送时使用它来整理提交消息、运行测试、整理代码等。

```bash
# 安装
npx i -wD husky
# 初始化
npx husky install
# 安装后自动启用Git挂钩
pnpm pkg set scripts.prepare="husky install"

# 配置 pre-commit 挂钩
npx husky add .husky/pre-commit "lint-staged"

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
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && node_modules/.bin/cz --hook || true"
# 测试
git add .
git commit
```
