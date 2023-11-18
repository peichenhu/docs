const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router")();
const logger = require("./winston.js");
const fs = require("fs");

const getResource = () => {
    return new Promise((res) => {
        fs.readFile("files/test.txt", (err, data) => {
            if (err) return;
            res(data);
        });
    });
};

const getResourceStats = () => {
    return new Promise((res) => {
        fs.stat("files/test.txt", (err, stats) => {
            err && console.log(err);
            // stats.atime	Access Time	访问时间 最后一次访问文件（读取或执行）的时间
            // stats.ctime	Change Time	变化时间 最后一次改变文件（属性或权限）或者目录（属性或权限）的时间
            // stats.mtime	Modify Time	修改时间 最后一次修改文件（内容）或者目录（内容）的时间
            res(stats);
        });
    });
};

Router.get("/", async (ctx) => {
    logger.info("visit /");
    const createTagA = (obj) => `<a href='${obj.href}'>${obj.name}</a>`;
    const body = [
        "访问成功",
        createTagA({
            href: "/max-age",
            name: "设置强缓存 max-age,过期时间为10秒",
        }),
        createTagA({
            href: "/if-modified-since",
            name: "设置协商缓存 Last-Modified 和 if-modified-since",
        }),
        createTagA({
            href: "/if-none-match",
            name: "设置协商缓存 Etag 和 if-none-match",
        }),
    ];
    ctx.type = "html";
    ctx.body = body.map((i) => `<p>${i}</p>`).join("");
});

Router.get("/max-age", async (ctx) => {
    logger.info("visit /max-age");
    ctx.set("Cache-Control", `public, max-age=10`); // 设置强缓存，过期时间为10秒
    ctx.body = await getResource();
});

Router.get("/if-none-match", async (ctx) => {
    logger.info("visit /if-none-match");
    const resource = await getResourceStats();
    const oldMtime = ctx.request.header["if-none-match"];
    const mtime = String(+resource.mtime);
    ctx.set("Etag", mtime);
    if (oldMtime === mtime) {
        logger.info("前端协商缓存 oldMtime 与当前 mtime 一致, 返回 304");
        ctx.status = 304;
        ctx.body = null;
    } else {
        logger.info("前端协商缓存无效, 返回 200");
        ctx.body = resource;
    }
});

Router.get("/if-modified-since", async (ctx) => {
    logger.info("visit /if-modified-since");
    const resource = await getResourceStats();
    const mtime = String(+resource.mtime);
    const oldMtime = ctx.request.header["if-modified-since"];
    ctx.set("Last-Modified", mtime); // 把具体的日期转换为（根据 GMT）字符串
    if (oldMtime === mtime) {
        logger.info("前端协商缓存 oldMtime 与当前 mtime 一致, 返回 304");
        ctx.status = 304;
        ctx.body = null;
    } else {
        logger.info("前端协商缓存无效, 返回 200");
        ctx.body = resource;
    }
});

app.use(Router.routes()); //启动路由
app.use(Router.allowedMethods());
app.listen(3000);
