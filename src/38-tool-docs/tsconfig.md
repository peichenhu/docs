# tsconfig 文件

> 使用 `tsc --init` 快速生成, 参观 [docs](https://aka.ms/tsconfig.json) 阅读有关此文件的详细信息.

```json
{
	"include": ["相对 tsconfig.json 的文件或文件夹路径"],
	"exclude": ["与 include 作用相反"],
	"extends": "继承一个配置",
	"compilerOptions": {
		/* 基础配置 */
		// "incremental": true,                         /* 启用增量编译 */
		// "target": "es5",                             /* 指定生成的 ECMAScript 目标版本：“ES3”（默认值）、“ES5”、“ES2015”、“ES 2016” 或 “ESNEXT” 等等 */
		// "module": "commonjs",                        /* 指定生成的模块代码：'none'、'commonjs'、'amd'、'system'、'umd'、's2015'、'es2020'或'ESNext' */
		// "lib": [],                                   /* 指定要包含在编译中的库文件 */
		// "allowJs": true,                             /* 允许编译 javascript 文件 */
		// "checkJs": true,                             /* 报告.js文件中的错误 */
		// "jsx": "preserve",                           /* 指定 JSX 代码生成：“preserve”、“react native”、“react”、“response JSX”或“react jsxdev” */
		// "declaration": true,                         /* 生成相应的 “.d.ts” 文件 */
		// "declarationMap": true,                      /* 为每个相应的 “.d.ts” 文件生成一个源映射 */
		// "sourceMap": true,                           /* 生成相应的 “.map” 文件 */
		// "outFile": "./",                             /* 将输出连接并发送到单个文件 */
		// "outDir": "./",                              /* 将输出结构重定向到目录 */
		// "rootDir": "./",                             /* 指定输入文件的根目录。用于使用 --outDir 控制输出目录结构 */
		// "composite": true,                           /* 启用项目编译 */
		// "tsBuildInfoFile": "./",                     /* 指定用于存储增量编译信息的文件 */
		// "removeComments": true,                      /* 不要向输出发出注释 */
		// "noEmit": true,                              /* 不要发出输出 */
		// "importHelpers": true,                       /* 从“tslib”导入发射帮助程序 */
		// "downlevelIteration": true,                  /* 当目标为“ES5”或“ES3”时，为“for of”、spread 和 destructuring 中的可迭代项提供完全支持 */
		// "isolatedModules": true,                     /* 将每个文件转换为一个单独的模块（类似于“ts.transfileModule”）*/
		//
		//
		/* 严格类型检查选项 */
		// "strict": true,                              /* 启用所有严格的类型检查选项。 */
		// "noImplicitAny": true,                       /* 在具有隐含“any”类型的表达式和声明上引发错误 */
		// "strictNullChecks": true,                    /* 启用严格的空检查 */
		// "strictFunctionTypes": true,                 /* 启用对函数类型的严格检查 */
		// "strictBindCallApply": true,                 /* 对函数启用严格的“绑定”、“调用”和“应用”方法 */
		// "strictPropertyInitialization": true,        /* 启用对类中属性初始化的严格检查 */
		// "noImplicitThis": true,                      /* 在具有隐含“any”类型的“this”表达式上引发错误 */
		// "alwaysStrict": true,                        /* 在严格模式下进行分析，并对每个源文件发出“use strict” */
		//
		//
		/* 附加检查 */
		// "noUnusedLocals": true,                      /* 报告未使用的本地文件的错误 */
		// "noUnusedParameters": true,                  /* 报告未使用参数的错误 */
		// "noImplicitReturns": true,                   /* 当函数中并非所有代码路径都返回值时，报告错误 */
		// "noFallthroughCasesInSwitch": true,          /* 在switch语句中报告失败案例的错误 */
		// "noUncheckedIndexedAccess": true,            /* 在索引签名结果中包括“未定义” */
		// "noImplicitOverride": true,                  /* 确保用“override”修饰符标记派生类中的重写成员 */
		// "noPropertyAccessFromIndexSignature": true,  /* 需要索引签名中未声明的属性才能使用元素访问 */
		//
		//
		/* 模块分辨率选项 */
		// "moduleResolution": "node",                  /* 指定模块解析策略：“node”（node.js）或“classic”（TypeScript 1.6之前的版本） */
		// "baseUrl": "./",                             /* 用于解析非绝对模块名称的基目录 */
		// "paths": {},                                 /* 将导入重新映射到相对于“baseUrl”的查找位置的一系列条目 */
		// "rootDirs": [],                              /* 根文件夹的列表，其组合内容表示运行时项目的结构 */
		// "typeRoots": [],                             /* 要包含其中的类型定义的文件夹列表 */
		// "types": [],                                 /* 要包含在编译中的类型声明文件 */
		// "allowSyntheticDefaultImports": true,        /* 允许默认导入没有默认导出的模块 (import * as x from 'x') */
		// "esModuleInterop": true,                     /* 通过为所有导入创建命名空间对象，实现CommonJS和ES模块之间的发射互操作性。暗示“allowSyntheticDefaultImports”。 */,
		// "preserveSymlinks": true,                    /* 不要解析符号链接的真实路径。 */
		// "allowUmdGlobalAccess": true,                /* 允许从模块访问UMD全局。 */
		//
		//
		/* 源映射选项 */
		// "sourceRoot": "",                            /* 指定调试器应定位TypeScript文件的位置，而不是源位置 */
		// "mapRoot": "",                               /* 指定调试器应定位映射文件的位置，而不是生成的位置 */
		// "inlineSourceMap": true,                     /* 发射具有源映射的单个文件，而不是具有单独的文件 */
		// "inlineSources": true,                       /* 将源与源映射一起发射到单个文件中；要求设置“--inlineSourceMap”或“--sourceMap” */
		//
		//
		/* 实验选项 */
		// "experimentalDecorators": true,              /* 启用对ES7装饰器的实验性支持 */
		// "emitDecoratorMetadata": true,               /* 为decorator启用对发射类型元数据的实验性支持 */
		//
		//
		/* 高级选项 */
		// "skipLibCheck": true,                        /* 跳过声明文件的类型检查。 */
		// "forceConsistentCasingInFileNames": true     /* 不允许对同一文件进行大小写不一致的引用 */
	}
}
```
