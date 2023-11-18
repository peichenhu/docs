# JS-数码照片旋转角度修复

> 在相机或者某些手机（三星、苹果）的拍摄照片里会带有 Orientation 属性，记录相机拍摄时物理设备的拍照方向，导致图片在浏览器显示时图片处于拍照方向旋转状态（旋转角度，左右颠倒，上下倒置）

## 解决方案 Exif + Canvas

Exif.js 提供了 JavaScript 读取图像的原始数据的功能扩展，例如：拍照方向、相机设备型号、拍摄时间、ISO 感光度、GPS 地理位置等数据。

```js
import EXIF from 'exif-js';

export const FixImg = (img, callback, quality = 1) => {

  let Orientation, ctxWidth, ctxHeight, base64;

  EXIF.getData(img, function () {
    // console.log(EXIF.getAllTags(this))
    Orientation = EXIF.getTag(this, 'Orientation');
    ctxWidth = this.naturalWidth;
    ctxHeight = this.naturalHeight;

    // console.log(this, Orientation, ctxWidth, ctxHeight);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = ctxWidth;
    canvas.height = ctxHeight;

    if ([5, 6, 7, 8].includes(Orientation)) {
      canvas.width = ctxHeight;
      canvas.height = ctxWidth;
    }

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

    ctx.drawImage(img, 0, 0, ctxWidth, ctxHeight);

    base64 = canvas.toDataURL('image/jpeg', quality);

    callback(base64);
  });
};

```