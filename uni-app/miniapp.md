### input placeholder style color

```html
<input placeholder-class="xxx" placeholder-style="xxx" />
```

h5

```css
input::-webkit-input-placeholder {
	color: #ccc;
}
```

### showLoading ios bug

uni.showLoading 的 title 一定要有值 不然 ios 无法显示

```js
uni.showLoading({
	title: "　", // 全角空格
	mask: true, // 是否显示透明蒙层，防止触摸穿透，默认：false
});
```

### uniapp: request 竟然没有 timeout

-   [uniapp: request 竟然没有 timeout](https://ask.dcloud.net.cn/article/35067)
-   [networkTimeout 各类网络请求的超时时间，单位均为毫秒](https://uniapp.dcloud.io/collocation/manifest?id=networktimeout)

```js
let globalPostRequest = function (
	url,
	data,
	callback,
	isWait = true,
	isPost = true
) {
	if (isWait) {
		uni.showLoading({
			title: "正在加载",
		});
	}
	console.log("正在请求:xxxxxxxxx" + url);
	console.log("参数:" + JSON.stringify(data));
	let requestName = "requestTask" + JSON.stringify(url);
	let timeout = null;
	requestName = uni.request({
		url: "xxxxxxxxx" + url,
		data: data,
		method: isPost == true ? "POST" : "GET",
		dataType: "json",
		header: {
			"Accept-Language": "zh-CN,en-US;q=0.8",
		},
		success: (data, statusCode) => {
			console.log("请求成功:" + JSON.stringify(data.data));
			callback(data.data);
		},
		fail: () => {
			console.log("请求失败fail");
			const errordata = {
				status: false,
				code: 404,
				data: null,
				message: "网络繁忙",
			};
			callback(errordata);
		},
		complete: () => {
			uni.hideLoading();
			requestName = null;
			if (timeout != null) {
				clearTimeout(timeout);
				timeout = null;
			}
		},
	});
	//timeout
	timeout = setTimeout(() => {
		if (requestName != null) {
			requestName.abort();
			console.log("请求失败abort");
		}
	}, 20000);
};
```

### uni-app 动态获取元素高度等

-   [uni-app 动态获取元素高度等](https://www.cnblogs.com/lymconch/p/11286795.html)

```js
uni.getSystemInfo({
	success: (res) => {
		// res - 各种参数
		let view = uni.createSelectorQuery().in(this).select("#moveArea");
		view.boundingClientRect((data) => {
			console.log(data);
		}).exec();
	},
});
```
