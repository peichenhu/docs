import fs from "node:fs";
import path from "node:path";

const input = path.join(__dirname, "../../../src");
const output = path.join(__dirname, "../../../src/.vitepress/config-menu.json");

export function createMenu() {
    const menu = [];
    const files = fs.readdirSync(input);
    files.forEach((file) => {
        const filePath = path.join(input, file);
        const fileStats = fs.statSync(filePath);
        if (file === "public") return; // 忽略项
        if (file.startsWith(".")) return; // 忽略项
        if (fileStats.isFile()) return; // 忽略项
        if (fileStats.isDirectory()) {
            const text = file.toLocaleUpperCase().replace(/^\d+-/, "");
            const items = [];
            const collapsed = true;
            menu.push({ text, items, collapsed });
            // const resList = [];
            // menu[file] = resList;
            readDirectory(filePath, [file], items);
        }
    });
    createMenuJSON({ menu });
    return menu;
}

export function readDirectory(dirPath, namePath = [], resList) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);
        const fileNamePath = namePath.slice();
        // 忽略项
        if (file.startsWith(".")) return;
        // 文件夹
        if (fileStats.isDirectory()) {
            fileNamePath.push(file);
            readDirectory(filePath, fileNamePath, resList);
            return;
        }
        // md文件
        if (fileStats.isFile() && path.extname(file) === ".md") {
            const basename = path.basename(file, path.extname(file));
            fileNamePath.push(basename);
            // 菜单数据模版 { text: "JS-迭代", link: "/js/迭代" },
            // const text = fileNamePath.join("-");
            const text = basename.replace(/^\d+-/, "");
            const link = "/" + fileNamePath.join("/");
            resList.push({ text, link });
        }
    });
}

export function createMenuJSON(menu) {
    menu = menu || createMenu();
    const formattedJsonData = JSON.stringify(menu, null, 2);
    const formattedJsonString = `\n${formattedJsonData}\n`;
    fs.writeFileSync(output, formattedJsonString, "utf8");
}
