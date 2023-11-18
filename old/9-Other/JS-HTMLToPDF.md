# JS-HTMLToPDF

前端开发中遇到的将网页导出为PDF文件的方式有三种：
1. 直接鼠标右键选择打印功能，这样导出的pdf其实会产生错乱的版面，效果最差。
2. 通过将HTML网页先生成图片，再将图片生成PDF,对客户设备有一定要求。
3. 通过后端服务器将HTML页面生成PDF，前端只需要下载文件。

下面主要介绍第二种。

# 关键类库

- HTML生成图片：html2canvas, dom-to-image
- 图片生成PDF：jspdf

经过我个人使用发现dom-to-image 生成的图片比html2canvas 的清晰度要好一些。

## 案例讲解
A4纸张大小一般为210mm * 297mm,比例为 1：√2
为了更好的阅读体验，我们提前将每一个页面都独立制作，从而避免有页面太高生成PDF时发生字体截断现象。

我们可以设置每一页大小为 840px * 1188px。
如果需要PDF封面等其他子页面，推荐提前生成图片，再合并网页生成的图片
```html
    <!--    按钮：点击在线生成PDF-->
    <button onclick="getPDF()">ToPDF</button>
    <!--    页面列表-->
    <div class="pageList">
      <div class="p1 page">
        <!--        文本-->
        <!--        视频-->
        <!--        Canvas-->
        <!-- 测试注释信息是否影响该 item dom to image，结论：是，存在注释时生成截图失败 -->
      </div>
      <div class="p2 page">
        <!--        文本-->
        <!--        视频-->
        <!--        Canvas-->
        <!-- 测试注释信息是否影响该 item dom to image，结论：是，存在注释时生成截图失败 -->
      </div>
      <div class="p3 page">
        <!--        文本-->
        <!--        视频-->
        <!--        Canvas-->
        <!-- 测试注释信息是否影响该 item dom to image，结论：是，存在注释时生成截图失败 -->
      </div>
      
    </div>
```

## CSS样式约定

每一个 Page DIV 宽高比等于A4纸张宽高比例，除了封面，每一页都含有Echats图表

```css
html* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: 0;
}

.pageList {
  width: 840px;
  height: auto;
  margin: 0 auto;
  background: #fafafa;
  min-height: 1188px;
}
.pageList .page {
  width: 100%;
  height: 1142px;
  margin-bottom: 50px;
  background: #ececec;
  position: relative;
  overflow: hidden;
}
```
## JS 功能设计

```js

// 文档加载

// 交互按钮，获取PDF
function getPDF() {
  alert('getPDF');

  var tmp = Array.prototype.slice.call(document.querySelectorAll('.page'));

  renderImg(tmp)
}

// 生成 DIV 截图
function renderImg(listNode) {
  var base64List = [];

  listNode.forEach(function(node, index) {
    domtoimage
      .toJpeg(node, { quality: 1 })
      .then(function(dataUrl) {
        base64List[index] = dataUrl;

        if(notEmpty(base64List).length === listNode.length) {
            renderPDF(base64List);
            changeShow(false);
         }
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  });
}

// 数组去空
function notEmpty(arr,tmp) {
    tmp = [];
    arr.forEach(function(val ) {
        if (!!val) tmp.push(val);
    });
    return tmp;
}

// 截图生成PDF
function renderPDF(list) {
  // 这里可以插入PDF封面图片等
  
  // PDF 宽高
  var size = [840, 1188];
  var doc = new jsPDF('p', 'px', size);
  
  var docH = doc.internal.pageSize.height; 
  var docW = doc.internal.pageSize.width; 
  
  console.log(docW, docH);

  list.forEach(function(item, index) {
    doc.addImage(item, 'jpeg', 0, 0, docW, docH);

    // 设置页脚页码
    doc.setTextColor('#003333');
    doc.setFontSize(14);
    doc.text('—— Page : ' + (index + 1) + ' ——', 350, 620);

    if (index < list.length - 1) doc.addPage();
    if (index === list.length - 1) doc.save('A4.pdf');
  });
}


```

## 特别提醒

1. `html` 内注释信息会阻止`dom-to-image.min.js`生成截图
2. pdf内容模糊问题，可以查看html2canvas 的scale参数 和 dom-to-image-more 的 scale 参数进一步了解
3. 目前遇到的难题，scale 处理后 对于canvas元素的图片没有作用

