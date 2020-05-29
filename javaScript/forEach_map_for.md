### map, some, every, forEach, includes, find, findeIndex

-   [JS 判断数组中是否包含某个值](https://www.cnblogs.com/zaijin-yang/p/12196811.html)

```js
// https://blog.csdn.net/u012841667/article/details/78375789
// map和forEach，for性能比较
/*

for–速度最快，forEach和for++次之相当，map慢
原因：从源码看出，map需要有回调函数的返回值，并且新建一个和遍历数组一样长度的数组作为返回，forEach则没有这些开销

注：map，forEach不能使用break跳出整个循环，不能使用continue跳出本次循环。使用retrun相当于for中的continue的作用，从源码可以看出，结束本次循环的回调函数

* */
/*
JS中的 map, some, every, forEach 用法总结， 跳出循环 return false break不起作用
https://blog.csdn.net/weixin_36934930/article/details/81061063
*/

/*
JS中some(), every(), forEach(), map(), filter() 区别及使用案例
https://blog.csdn.net/xiasohuai/article/details/81981294
-----------------
map(): 返回一个新的Array， 每个元素为调用func的结果（ 并没有改变原数组）
filter(): 返回一个符合func条件的元素数组（ 并没有改变原数组）
some(): 返回一个boolean， 判断是否有元素是否符合func条件(有一个就行)（ 并没有改变原数组）
every(): 返回一个boolean， 判断每个元素是否符合func条件（ 所有都判断）（ 并没有改变原数组）
forEach(): 没有返回值， 只是针对每个元素调用func（ 没有返回值， 如果里面有操作方法就会改变原数组）
*/

// some
{
	// some 当内部return true时跳出整个循环
	let list3 = [1, 2, 3, 4, 5];
	list3.some((value, index) => {
		if (value === 3) {
			return true; //当内部return true时跳出整个循环
		}
		console.log(value); // 1 2
	});
}

// every
{
	//every()当内部return false时跳出整个循环
	let list = [1, 2, 3, 4, 5];
	list.every((value, index) => {
		if (value > 3) {
			console.log(value); // 4
			return false;
		} else {
			console.log(value); // 1 2 3
			return true;
		}
	});
	list.every((value, index) => {
		if (value > 3) {
			console.log(value);
			return false;
		} else {
			console.log(value); // 1
			// return true;
			// 如果没有返回值true 的话，也会跳出循环
		}
	});
	// every 当内部return false时跳出整个循环（return true;也是需要写）
}

// forEach
{
	Array.prototype.foreach = function (callback, thisArg) {
		var T, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this); //拿到变量的数组
		var len = O.length >>> 0; //右移的作用，所有非数值转换成0，所有大于等于0数取整数部分
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}
		if (arguments.length > 1) {
			T = thisArg; //如果存在第三个参数，表明this的指向
		}
		k = 0;
		while (k < len) {
			var kValue;
			if (k in O)
				//k为属性名
				kValue = O[k];
			callback.call(T, kValue, k, O);
		}
		k++;
	};
}

// map
{
	Array.prototype.map = function (callback, thisArg) {
		var T, A, k;
		if (this == null) {
			throw new TypeError(" this is null or not defined");
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if (Object.prototype.toString.call(callback) != "[object Function]") {
			throw new TypeError(callback + " is not a function");
		}
		if (thisArg) {
			T = thisArg;
		}
		A = new Array(len);
		k = 0;
		while (k < len) {
			var kValue, mappedValue;
			if (k in O) {
				kValue = O[k];
				mappedValue = callback.call(T, kValue, k, O);
				A[k] = mappedValue;
			}
			k++;
		}
		return A; //返回新的数组，长度和原数组一样
	};
}
```
