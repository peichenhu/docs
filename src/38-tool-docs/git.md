# 学习 Git

Git 用户可以大致分为四类: `个人开发者`、`协作开发者`、`分支集成者`、`仓库管理员`

## 常用命令

```sh
git-clone
git-init
git-pull
git-fetch
git-log
git-checkout
git-branch
git-add
git-diff
git-status
git-commit
git-reset
git-merge
git-rebase
git-tag
git-am
git-revert
git-push
```

## 命令介绍

```sh
# 初始化仓库
git init

# 关联远程仓库
git remote -v # 列出当前仓库中已配置的远程仓库，并显示它们的 URL。
git remote rm origin # 先删除
git remote add origin git@github.com:peichenhu/test1.git

# 状态
git log # 仓库状态
git status # 分支状态
git checkout -- . # 撤销所有未暂存的更改

# 暂存
git add . # 暂存全部
git add -all # 暂存全部
git add folder/ # 暂存单个文件夹
git add file # 暂存单个文件
git add file file folder/ # 暂存多个目标

# 撤销暂存
git reset # 撤销全部暂存
git reset file # 撤销单个文件
git reset folder/ # 撤销单个文件夹
git reset file folder/ # 撤销多个目标

# 列出、创建或删除分支
git branch
git branch -m main # 重命名当前分支
git branch test # 基于当前创建新分支 test
git branch -d test # 删除分支

# checkout 切换分支或恢复分支
git checkout [name] # 切换分支

# 提交
git commit -m "feature: 1"
git commit -am "feature: 1"

# 撤销提交
# git reset <commit hash> --soft、--mixed 或 --hard
# --soft：保留更改内容到暂存区
# --mixed：保留更改内容到工作区
# --hard： 不保留更改内容
git reset HEAD^ # 将 HEAD 指针指向上一次提交的 commit，并将工作区的文件恢复到上一次提交的状态
git reset HEAD~1 # 将 HEAD 指针指向上一次提交的 commit，并将工作区的文件恢复到上一次提交的状态
git reset HEAD~1 --soft # 将 HEAD 指针指向上一次提交的 commit，并将工作区的文件恢复到上一次提交的状态, 保留工作区的修改
git reset -i <commit hash> # 进入交互式模式，显示了从指定提交到当前提交的所有提交，选择要保留的提交、要删除的提交或要合并的提交。【不推荐】

# 撤销提交，但保留撤销记录
# git revert <commit hash>
git revert casd8as8  # 撤销最近的一个
git revert <commit1> <commit2> <commit3> ... # 撤销多个连续提交 【推荐】


## 合并提交
git rebase -i HEAD~5
# 【i 打开编辑模式】对 commit id 选择 squash 压缩模式；
# 【esc 退出编辑模式】
# 【:wq 保存并退出当前阶段】进入编辑 commit message 阶段
# 【i 打开编辑模式】对 commit message 任意编辑
# 【:wq 保存并退出当前阶段】不出意外显示 Successfully rebased

# 贮藏
git stash # 贮藏当前暂存的工作区内容到 stash@{0},最新的从0开始
git stash save "描述" # 贮藏当前暂存的工作区内容到 stash@{0}, 最新的从0开始，并添加描述
git stash list # 显示贮藏列表
git stash clear # 清除贮藏列表
git stash drop # 清除贮藏，默认清除最新的 stash@{0}
git stash apply stash@{0} # 应用贮藏 stash@{0}
git stash drop stash@{1} # 清除贮藏 stash@{1}
git stash show stash@{1} # 显示贮藏内容信息

## 推送
git branch --set-upstream-to=origin/main main # 先关联远程分支
git push --set-upstream origin main # 新分支推送并关联到远程分支

## 构建后并推送
cd dist
git init
git add -A
git commit -m 'deploy'
# 如果你想要部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:peichenhu/peichenhu.github.io.git master


## 合并但不提交更改
git merge --no-commit <other-branch>
```
