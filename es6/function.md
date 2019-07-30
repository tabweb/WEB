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
		console.log(this); // {pageNum: 2, cb: ƒ}
		console.log(this.pageNum); // 2
	}
});
```

> [【ES6】函数默认参数与 rest 参数](https://www.jianshu.com/p/9078fdffd810)

## 不定参数

```js
function f(...values) {
	console.log(values);
	console.log(values.length);
}
f(1, 2); //[1,2]  //2
f(1, 2, 3, 4); //[1,2,3,4] //4
```
