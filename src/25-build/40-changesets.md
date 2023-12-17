# Changesets 指南

## 第一步：安装并初始化

```bash
# 安装
pnpm add @changesets/cli -D
# 初始化
pnpm changeset init

# 此时根目录会生成 .changeset 文件夹（包含 ）
.
├── README.md                # 工具介绍文件
└── config.json              # 工具配置文件
└── popular-swans-rhyme.md   # 工具收集变更信息文件
```
