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
```

### 小程序支付 回调

-   [小程序 服务端 支付](https://q.qq.com/wiki/develop/miniprogram/server/virtual-payment/mini_pay.html)

```

前端只要调起支付界面
支付成功后
回调是后台完成的
```
