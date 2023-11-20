# tree

以树状方式显示当前目录及其子目录的内容

## 安装

> brew install tree

## 命令

在终端直接执行 tree 命令，展示当前文件夹下所有的目录树结构（包含文件和文件夹以及子文件夹）

```sh
 tree --help #查看帮助
 tree -L 2 #指定层级
 tree -d "src" #显示目录名称而非内容
 tree -I "node_modules" #不显示符合范本样式的文件或目录名称
 tree -I "node_modules|tests" #不显示符合范本样式的文件或目录名称
 tree -I "node_modules|test\*|LICENSE|README.en.md" -L 2 > README.md #写入指定文件，如果文件不存在自动创建，如果存在则覆盖内容

 ### 生成目录树结构
 tree -I "node_modules|test*|LICENSE|README.en.md"-L 2
```
