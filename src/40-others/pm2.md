## 安装

> npm install -g pm2

## 命令

```sh
pm2 start bin/www 或 pm2 start app.js #启动进程/应用
pm2 start app.js --name wb123 #重命名进程/应用
pm2 start bin/www --watch #添加进程/应用
pm2 stop www #结束进程/应用
pm2 stop all #结束所有进程/应用
pm2 delete www #删除进程/应用
pm2 delete all #删除所有进程/应用
pm2 list #列出所有进程/应用
pm2 describe www #查看某个进程/应用具体情况
pm2 monit #查看进程/应用的资源消耗情况
pm2 logs #查看pm2的日志
pm2 logs www #若要查看某个进程/应用的日志
pm2 restart www #重新启动进程/应用
pm2 restart alls #重新启动所有进程/应用
```

## pm2 配置文件启动

> pm2 start apps.json

`apps:json` 结构，`apps` 是一个数组，数组中的每一个对象就对应一个 `pm2` 中运行的应用

```sh
###  参数说明：
name  #应用程序名称
args  #脚本的参数域
cwd  #应用程序所在的目录
script  #应用程序的脚本路径
log_date_format  #
node_args  #node 的参数域
error_file  #自定义应用程序的错误日志文件
out_file  #自定义应用程序日志文件
pid_file  #自定义应用程序的pid文件
instances  #
min_uptime  #最小运行时间，这里设置的是60s即如果应用程序在60s内退出，pm2会认为程序异常退出，此时触发重启max_restarts设置数量
max_restarts  #设置应用程序异常退出重启的次数，默认15次（从0开始计数）
cron_restart  #定时启动，解决重启能解决的问题
watch  #是否启用监控模式，默认是false。如果设置成true，当应用程序变动时，  pm2会自动重载。这里也可以设置你要监控的文件。
merge_logs  #
exec_interpreter  #应用程序的脚本类型，这里使用的shell，默认是nodejs
exec_mode  #应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
autorestart  #启用/禁用应用程序崩溃或退出时自动重启
vizion  #启用/禁用vizion特性(版本控制)
```

```json
// apps.json 示例
{
    "apps": [
        {
            "name": "serverName", // 名称
            "script": "./index.js", // 入口文件
            "env": {
                // 环境
                "NODE_ENV": "development"
            },
            "env_production": {
                "NODE_ENV": "production"
            },
            "instances": 4, // 启用多少个实例
            "exec_mode": "cluster", // 应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
            "max_restarts": 3, // 设置应用程序异常退出重启的次数，默认15次（从0开始计数）
            "restart_delay": 5000, // 异常重启情况下，延时重启时间
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "combine_logs": true,
            "log_file": "<yourpath>/combined.outerr.log", // 日志目录
            "out_file": "<yourpath>/out.log",
            "error_file": "<yourpath>/err.log"
        }
    ]
}
```

## 资料

[PM2 中文网](https://pm2.fenxianglu.cn/docs/start)
[PM2 命令使用方法总结](https://juejin.cn/post/6889300755539312653)
