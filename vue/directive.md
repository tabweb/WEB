### directive

-   [Vue.directive()的用法和实例](https://blog.csdn.net/qq_36242361/article/details/74641403)
-   [vue 中 directives 的用法](https://blog.csdn.net/qq_31837621/article/details/80819126)
-   [Vue.directive( id, [definition] ) 注册或获取全局指令。](https://cn.vuejs.org/v2/api/#Vue-directive)

指令定义函数提供了几个钩子函数（可选）：
bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
unbind: 只调用一次， 指令与元素解绑时调用。

```html
<div id="app">
	<input type="text" v-focus />
</div>
<script>
	// 注册一个全局自定义指令 v-focus
	Vue.directive("focus", {
		// 当绑定元素插入到 DOM 中。
		inserted: function (el, binding) {
			// 聚焦元素
			el.focus();
		},
	});

	new Vue({
		el: "#app",
	});
</script>
```

```js
Vue.directive("drag", {
	inserted: function (el) {
		el.οnmοusedοwn = function (e) {
			let l = e.clientX - el.offsetLeft;
			let t = e.clientY - el.offsetTop;
			document.οnmοusemοve = function (e) {
				el.style.left = e.clientX - l + "px";
				el.style.top = e.clientY - t + "px";
			};
			el.οnmοuseup = function () {
				document.οnmοusemοve = null;
				el.οnmοuseup = null;
			};
		};
	},
});
new Vue({
	el: "#app",
});
```

```js
// 注册
Vue.directive("my-directive", {
	bind: function () {},
	inserted: function () {},
	update: function () {},
	componentUpdated: function () {},
	unbind: function () {},
});

// 注册 (指令函数)
Vue.directive("my-directive", function () {
	// 这里将会被 `bind` 和 `update` 调用
});

// getter，返回已注册的指令
var myDirective = Vue.directive("my-directive");
```
