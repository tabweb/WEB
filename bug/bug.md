## bug 总汇 ios bug

### 华为 图片长按时间 bug

```scss
// 禁止图片当初事件触发
.event-none {
	pointer-events: none;
}
```

### ios 向下滑动失效

```scss
.ios-min-height {
	min-height: 101vh;
	overflow: scroll;
}
```

### canvas 的 disable-scroll 属性 bug

-   [canvas 的 disable-scroll 属性 bug](https://developers.weixin.qq.com/community/develop/doc/0004c6f94685a8b42f17669605d800)
-   [disable-scroll="true"](https://www.zhihu.com/question/52852717)

```html
目前此BUG只在IOS中出现。
且动态设置canvas中的disable-scroll属性不生效。整个page的滑动亦被禁止。
<canvas :disable-scroll="false"></canvas>
<canvas :disable-scroll="true"></canvas>

<!-- :disable-scroll="false" -->
Android 无法滑动屏幕

<!-- :disable-scroll="true" -->
ios 无法向下滑动
```

### 小程序支付 回调

-   [小程序 服务端 支付](https://q.qq.com/wiki/develop/miniprogram/server/virtual-payment/mini_pay.html)

```

前端只要调起支付界面
支付成功后
回调是后台完成的
```

### canvas fixed 定位会引起 barTab 消失

```js
// 退出页面之前关掉 固定 定位页面
  beforeDestroy() {
    this.$refs.avatar.fClose()
  }
```

### andriod 小程序 font-size:20rpx bug 向上偏移

-   [解决安卓字体偏移：页面整体缩放](https://www.cnblogs.com/yangshifu/p/9766584.html)

(font-size 小于 20rpx)
(font-size 小于 12px)

```
andriod 小程序
font-size:20rpx bug 去掉 line-height

h5 font-size:12px
```

### rpx 转 px 取整数 4rpx => 1px

```css
/*
 荣耀
width: 360
height: 746
*/

.pa {
	position: absolute;
	top: 4rpx;
	left: 4rpx;
}
.pa {
	/* 转 ==> */
	position: absolute;
	top: 1rpx;
	left: 1rpx;
}
```

### ios bug

dis-flex-list 做列表
子元素 自动 排序
子元素的子元素 ios 无法自动 bg-back 撑开

```html
<div style="width:338rpx;height:527rpx" class="pa bg-back dis-flex-list sudoku">
	<div
		v-for="(value,index) in [1,2,3,4,5,6,7,8,9]"
		:key="index"
		class="width1-3 pr"
	>
		<div class="ce bg-back-red"></div>
	</div>
</div>

<style>
	.dis-flex-list {
		display: flex;
		flex-wrap: wrap;
		text-align: justify;
		justify-content: space-between;
	}
	.width1-3 {
		width: calc(100% / 3);
	}
</style>
```

### ios 禁止屏幕滚动

-   [小程序 disablescroll ios 上下禁止滑动](https://blog.csdn.net/tabweb/article/details/106649153)
-   [解决 disableScroll 无法禁止小程序下拉的问题](https://blog.csdn.net/KevinsCSDN/article/details/82421507)

```scss
.section {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow-y: auto;
}
```

### oppo 手机 text line-height 文字溢出 overflow 字体隐藏

```html
<view></view>
```

### position: fixed 或 absolute 设置高度

```scss
/*固定高度*/
.mescroll {
	position: fixed;
	top: 44px;
	bottom: 0;
	height: auto; /*如设置bottom:50px,则需height:auto才能生效*/
}
```

### uni-app