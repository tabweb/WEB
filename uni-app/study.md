## uni-app study

-   [开发规范](https://uniapp.dcloud.io/frame)
-   [uni-app 创建的第一个应用](https://segmentfault.com/a/1190000017168549?utm_source=tag-newest)

```
┌─components            uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                存放本地网页的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─wxcomponents          存放小程序组件的目录，详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```

https://www.jianshu.com/p/b481b6c23cdd

## uni-app 动态绑定样式 uni.upx2px(750 / 2) + 'px';

```html
<template>
	<view>
		<view class="half-width" :style="{width: halfWidth}">
			半屏宽度
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			halfWidth() {
				return uni.upx2px(750 / 2) + "px";
			}
		}
	};
</script>
<style>
	.half-width {
		background-color: #ff3333;
	}
</style>
```

## uni-app images

-   [uniapp H5 打包时，静态资源文件指向不对](https://blog.csdn.net/weixin_44097578/article/details/95470898)

```html
<image :src="require('static/images/add.png')" />
<image :src="require('lib/icons/svg/close.svg')" />
```

## upx -> rpx

-   [rpx 兼容 upx](https://ask.dcloud.net.cn/article/36130)

## [微信小程序 - 分包加载](https://www.cnblogs.com/cisum/p/10190245.html)

## 获取当前页面地址

-   [uniapp 如何在页面中获取当前路径](https://ask.dcloud.net.cn/question/78381)

```
let pages = getCurrentPages();
let route = pages[pages.length - 1].route;
```

## [微信小程序从子页面退回父页面时的数据传递 wx.navigateBack()](https://www.cnblogs.com/caicaizi/p/6652103.html)

```js
var pages = getCurrentPages();
var currPage = pages[pages.length - 1]; //当前页面
var prevPage = pages[pages.length - 2]; //上一个页面
// 调用上一个页面的方法
prevPage.onLoad();
//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
prevPage.setData({
	mydata: { a: 1, b: 2 }
});
```

##  [uni-app 中 mounted 在 wx 小程序生命周期哪个阶段](https://blog.csdn.net/hbiao68/article/details/102960770)

## [微信小程序 onLoad、onShow、onHide、onUnload 区别](https://blog.csdn.net/ljy950914/article/details/91384311)
