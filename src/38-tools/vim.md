# vim

## 基本命令

```bash
i           # 在当前光标位置插入文本。
x           # 删除当前光标所在位置的字符。
:w          # 保存文件。
:q          # 退出Vim编辑器。
:q!         # 强制退出Vim编辑器，不保存文件。
:wq         # 保存文件并退出Vim编辑器。
```

## 光标移动命令

```bash
h       # 将光标向左移动一个字符。
j       # 将光标向下移动一行。
k       # 将光标向上移动一行。
l       # 将光标向右移动一个字符。
w       # 将光标移动到下一个单词的开头。
e       # 将光标移动到当前单词的末尾。
b       # 将光标移动到上一个单词的开头。
0       # 将光标移动到当前行的开头。
$       # 将光标移动到当前行的末尾。
G       # 将光标移动到文件的末尾。
gg      # 将光标移动到文件的开头。
```

## 文本编辑命令

```bash
dd                  # 删除当前行。
yy                  # 复制当前行。
p                   # 粘贴已复制或删除的文本。
u                   # 撤销上一次操作。
Ctrl-r              # 重做上一次操作。
r                   # 替换当前光标所在位置的字符。
c                   # 删除从当前光标位置到指定位置的文本并进入插入模式。
v                   # 进入可视模式，选择文本。
:s/<old>/<new>/g    # 将当前行中的<old>替换为<new>。
:%s/<old>/<new>/g   # 将整个文件中的<old>替换为<new>。
```

## 插入模式命令

```bash
Esc         # 退出插入模式。
Ctrl-h      # 删除光标左侧的字符。
Ctrl-w      # 删除光标左侧的单词。
Ctrl-u      # 删除当前行的所有文本。
Ctrl-a      # 插入文本到行首。
Ctrl-e      # 插入文本到行尾。
Ctrl-t      # 插入一个制表符。
```

## 其他命令

```bash
:set number             # 显示行号。
:set nonumber           # 隐藏行号。
:set expandtab          # 使用空格代替制表符。
:set tabstop=4          # 设置制表符宽度为4个字符。
:set hlsearch           # 高亮显示搜索结果。
:set nohlsearch         # 取消高亮显示搜索结果。
:set background=dark    # 将背景设置为暗色。
:set background=light   # 将背景设置为亮色。
```

## 参考资料

-   [Linux vi/vim](https://www.runoob.com/linux/linux-vim.html#Vi/Vim%20%E6%8C%89%E9%94%AE%E8%AF%B4%E6%98%8E)

-   [vim 命令大全](https://zhuanlan.zhihu.com/p/628940845)
