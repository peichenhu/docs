# 数码照片方向参数修正

## 什么是数码照片方向错误?

使用数码设备拍照，照片会存储拍摄时物理设备的旋转方向，造成图片在 Web 环境展示时依然保存旋转方向，例如下面：

|旋转方向参数|效果图|
|---|---|
|1|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_1.jpg)|
|2|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_2.jpg)|
|3|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_3.jpg)|
|4|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_4.jpg)|
|5|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_5.jpg)|
|6|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_6.jpg)|
|7|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_7.jpg)|
|8|![方向错误效果图](http://peichenhu.cn/assets/fix-img/Landscape_8.jpg)|

## 开源脚本

1. 项目里 先 node npm 安装 [exif-js](https://www.npmjs.com/package/exif-js),读取图像元数据。

```bash
npm i exif-js -S
```

2. 定制脚本模块

```js
// 引入依赖插件
import EXIF from 'exif-js'; 
/**
* 
* @param img 图像对象
* @param callback 完成后的回调函数 参数为Base64图片编码
* @param ext 需要输出的图像格式 默认值(体积更小) image/jpeg
* @param quality 需要输出的图像的质量 默认值 0.9
* @constructor
*/
export const FixImg = (img, callback, ext = 'image/jpeg', quality = 0.9) => {
    
  // 定义所需变量
  let Orientation, ctxWidth, ctxHeight, base64; 
  
  // 读取 IMG 元数据 (异步函数)
  EXIF.getData(img, function() {
      
    // 获取 IMG 方向参数
    Orientation = EXIF.getTag(this, 'Orientation');
    
    // 获取 IMG 宽高
    ctxWidth = this.naturalWidth;
    ctxHeight = this.naturalHeight;
    
    // 创建 Canvas 画布
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    
    // 根据 IMG 方向参数 判断 是否需要旋转 90deg
    let isRotate = [5, 6, 7, 8].includes(Orientation);
    
    // 设置画布宽高 等于 IMG 宽或者高
    canvas.width = isRotate?ctxHeight:ctxWidth;
    canvas.height = isRotate?ctxWidth:ctxHeight;
    
    // 精确控制
    switch (Orientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, ctxWidth, 0);
        break;
      case 3:
        ctx.transform(-1, 0, 0, -1, ctxWidth, ctxHeight);
        break;
      case 4:
        ctx.transform(1, 0, 0, -1, 0, ctxHeight);
        break;
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, ctxHeight, 0);
        break;
      case 7:
        ctx.transform(0, -1, -1, 0, ctxHeight, ctxWidth);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, ctxWidth);
        break;
      default:
        ctx.transform(1, 0, 0, 1, 0, 0);
    }
    
    // 得到正确旋转方向的画布，将图片打印到画布
    ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);
    
    // 也可以读取原图片格式，最后输出原图格式，搜索关键词 ：File.type
    base64 = canvas.toDataURL(ext, quality); 
    // 回调函数，返回 base64 格式图像
    callback(base64);
  });
};
```