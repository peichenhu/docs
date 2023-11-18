const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const views = require("@ladjs/koa-views");
const open = require("open");

// 初始化实例
const app = new Koa();
const frontend = path.join(__dirname, "../frontend");
const render = views(frontend, { autoRender: false, extension: "ejs" });

// 路由配置前置模块依赖
app.use(render);

// 路由配置
router.get("/", async (ctx) => {
    const data = {
        head: {
            title: "APP CORS",
        },
        body: {
            user: {
                name: "pch1024",
                age: "18",
                species: undefined,
            },
        },
    };
    ctx.type = "html";
    ctx.body = await ctx.render("index.ejs", data);
});

router.get("/no-cros", async (ctx) => {
    ctx.type = "json";
    ctx.body = { title: "非跨域请求" };
});

// 模块挂载
app.use(router.routes()); // 启动路由
app.use(router.allowedMethods());

// 服务启动
app.listen(3001);

// 前端启动
open("http://localhost:3001");
