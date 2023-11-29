# npm

## 查询包的依赖关系

```bash
# 这将列出你的项目中使用了 `@npmcli/move-file` 的所有包及其依赖关系。
npm ls @npmcli/move-file

npm ls -g --depth=0
# 这将列出全局安装的 npm 包，你可以检查列表中的包是否使用了 `@npmcli/move-file`。
```

## 安装哪些包

```bash
npm ls -g
```
