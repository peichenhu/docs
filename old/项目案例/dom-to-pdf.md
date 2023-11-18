# HTML 导出 PDF

> 在工作中经常遇到导出报告的功能，开发过程中遇到了诸如：导出时间太长，导出报告图像品质太差等等问题。

## 基本知识

- A4纸张宽高：`210mm × 297mm`
- 前端还没有找到可以 `HTML` 直接输出 `PDf` 的插件，一般都是 `HTML => Image => PDF`
- 浏览器自带的打印 `PDF` ,会发生样式错乱，文字截断等糟糕效果
- `HTML => Image` 的插件有两个 ：`html2canvas.js` 、 `dom-to-image.js`
- `Image => PDF` 的插件有一个： `jspdf.js`

## 实例,  [在线 DEMO 点我](/websiteList/HTMLToPDF/index.html)

- HTML 

```html
<!-- 一个 PDF 页面 -->
<div class="pdf-page">
        <!-- 一个段文本 -->
        <p>
            - **意图**：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
            - **主要解决**：一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。
            - **何时使用**：一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。
            - **如何解决**：使用面向对象技术，可以将这种依赖关系弱化。
            - **关键代码**：在抽象类里有一个 ArrayList 存放观察者们。
            - **应用实例**： 1、拍卖的时候，拍卖师观察最高标价，然后通知给其他竞价者竞价。
            2、西游记里面悟空请求菩萨降服红孩儿，菩萨洒了一地水招来一个老乌龟，这个乌龟就是观察者，他观察菩萨洒水这个动作。
            - **优点**： 1、观察者和被观察者是抽象耦合的。 2、建立一套触发机制。
            - **缺点**： 1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。
            2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
            3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。
        </p>
        <!-- 一个 Echarts 图表 -->
        <div id="chart" class="chart"></div>
    </div>
```
- CSS

一个 A4 的 PDF 页面的 HTML 结构 宽高比应该为 `0.7` (**重要**)，下面我们设置宽度（`840px`）、高度（`1200px`）

```css
html * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}


.pdf-page {
    border: 1px solid red;
    width: 840px;
    height: 1200px;
    position: relative;
    overflow: hidden;
    padding: 30px;
    background-color: white;
}

```
- JS

```js

exportPDF();

function exportPDF() {
    var listNode = document.querySelectorAll(".pdf-page ");
    var node = listNode[ 0 ];

    domtoimage
        .toCanvas(node, { quality: 1, scale: 2 })
        .then(function (canvas) {
            imgToPDF(canvas);
        })
        .catch(function (error) {
            console.error("oops, something went wrong!", error);
        });
}

function imgToPDF(item) {
    var doc = new jsPDF("p", "px", "a4");
    var docH = doc.internal.pageSize.height; // 631.4175
    var docW = doc.internal.pageSize.width; // 446.46
    // console.log(docH, docW);
    doc.addImage(item, "png", 0, 0, docW, docH);
    doc.save("a4.pdf");
}
```