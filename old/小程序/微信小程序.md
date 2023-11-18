# 微信小程序

## 环境配置

- 申请小程序 APPID 和 APPSecret ，配置服务器合法域名

## 用户登录

![排序算法复杂度](/assets/img/wx.login.jpg)

## 生命周期

| 生命周期 | 描述                                                                                                                                                                           |
| -------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   onLoad | 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。                                                                                     |
|   onShow | 页面显示/切入前台时触发。                                                                                                                                                      |
|  onReady | 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。 注意：对界面内容进行设置的 API 如 wx.setNavigationBarTitle，请在 onReady 之后进行。 |
|   onHide | 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。                                                                                          |
| onUnload | 页面卸载时触发。如 redirectTo 或 navigateBack 到其他页面时。                                                                                                                   |

## 代码构成

### WXML

```html
<view class="userinfo">
	<button wx:if="{{!hasUserInfo && canIUse}}">获取头像昵称</button>
	<block wx:else>
		<image src="{{userInfo.avatarUrl}}" background-size="cover"></image>
		<text class="userinfo-nickname">{{userInfo.nickName}}</text>
	</block>
</view>
```

### WXSS

- 尺寸单位

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为 750rpx。如在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。

- 样式导入

使用@import 语句可以导入外联样式表，@import 后跟需要导入的外联样式表的相对路径，用;表示语句结束。

- 全局样式与局部样式

定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

- WXSS 仅支持部分 CSS 选择器，app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。

### JSON

- 小程序配置 app.json

app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。

- 工具配置 project.config.json

通常大家在使用一个工具的时候，都会针对各自喜好做一些个性化配置，例如界面颜色、编译配置等等，当你换了另外一台电脑重新安装工具的时候，你还要重新配置。
考虑到这点，小程序开发者工具在每个项目的根目录都会生成一个 project.config.json，你在工具上做的任何配置都会写入到这个文件，当你重新安装工具或者换电脑工作时，你只要载入同一个项目的代码包，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置，其中会包括编辑器的颜色、代码上传时自动压缩等等一系列选项。

- 页面配置 page.json

这里的 page.json 其实用来表示 pages/logs 目录下的 logs.json 这类和小程序页面相关的配置。
如果你整个小程序的风格是蓝色调，那么你可以在 app.json 里边声明顶部颜色是蓝色即可。实际情况可能不是这样，可能你小程序里边的每个页面都有不一样的色调来区分不同功能模块，因此我们提供了 page.json，让开发者可以独立定义每个页面的一些属性，例如刚刚说的顶部颜色、是否允许下拉刷新等等。

## 框架插件

- ec-canvas

ECharts 的微信小程序版本，为了兼容小程序 Canvas，我们提供了一个小程序的组件，用这种方式可以方便地使用 ECharts。

- mpvue

使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。

## 常见问题

- 用户登录获取用信息

```js
/** 用户登录
 * 第一步 wx.login() 获取code
 * 第二步 后端服务器调用 code2Session(APPID + APPSecret + code) 获取 openid + session_key + unionid
 */

//用户信息
//第一步 wx.getUserInfo(withCredentials) 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，此时返回的数据会包含 encryptedData, iv 等敏感信息；
wx.getUserInfo({
	// 必须是在用户已经授权的情况下调用
	success(res) {
		const userInfo = res.userInfo;
		const nickName = userInfo.nickName;
		const avatarUrl = userInfo.avatarUrl;
		const gender = userInfo.gender; // 性别 0：未知、1：男、2：女
		const province = userInfo.province;
		const city = userInfo.city;
		const country = userInfo.country;
	},
});
```
