## 默认参数

```js
let fun = (obj = {}) => {
	let params = {
		pageNum: obj.pageNum || 1,
		pageSize: obj.pageSize || 10
	};
	obj.cb && obj.cb();
};

fun({
	pageNum: 2,
	cb: function() {
		console.log('this : ', this);
		console.log('this.pageNum : ', this.pageNum);
	}
});
```

> [【ES6】函数默认参数与 rest 参数](https://www.jianshu.com/p/9078fdffd810)
