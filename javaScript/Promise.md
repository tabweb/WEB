## Promise

```
https://segmentfault.com/a/1190000012646402
https://www.liaoxuefeng.com/wiki/1022910821149312/1023024413276544
https://segmentfault.com/a/1190000008486570 用 Promise 解决多个异步 Ajax 请求导致的代码嵌套问题
promise n. 许诺，允诺；希望
resolv n. 坚决；决定要做的事
reject n. 被弃之物或人；次品
在 JavaScript 的世界中，所有代码都是单线程执行的。
由于这个“缺陷”，导致 JavaScript 的所有网络操作，浏览器事件，都必须是异步执行。异步执行可以用回调函数实现：
Promise 对象有三种状态，他们分别是：
pending: 等待中，或者进行中，表示还没有得到结果
resolved(Fulfilled): 已经完成，表示得到了我们想要的结果，可以继续往下执行
rejected: 也表示得到结果，但是由于结果并非我们所愿，因此拒绝执行
```

## 这一次，彻底弄懂 Promise 原理

-   [这一次，彻底弄懂 Promise 原理](https://zhuanlan.zhihu.com/p/108439249)
    https://www.cnblogs.com/baiyunke/p/7749401.html
    https://es6.ruanyifeng.com/#docs/destructuring
    http://www.ruanyifeng.com/blog/2016/01/ecmascript-6-primer.html
    https://www.jianshu.com/p/063f7e490e9a
    https://zhuanlan.zhihu.com/p/108439249
    https://www.jianshu.com/p/6337bc7f24a5
    https://www.jianshu.com/p/1b63a13c2701

### Promise.try

-   [什么是 Promise.try，为什么它这么重要？](https://segmentfault.com/a/1190000018586947)
-   [Promise.try](https://www.jianshu.com/p/0669749eff8f)
    [JavaScript(ES6) - Promise 对象](https://www.jianshu.com/p/40fcedf84405)

Promise.try

```js
// 鉴于这是一个很常见的需求，所以现在有一个提案，提供Promise.try方法替代上面的写法。

function getUsername(userId) {
  return database.users.get({id: userId})
  .then(function(user) {
    return user.name;
  });
}
// 上面代码中，database.users.get()返回一个 Promise 对象，如果抛出异步错误，可以用catch方法捕获，就像下面这样写。

database.users.get({id: userId})
.then(...)
.catch(...)
// 但是database.users.get()可能还会抛出同步错误（比如数据库连接错误，具体要看实现方法），这时你就不得不用try...catch去捕获。

try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
// 上面这样的写法就很笨拙了，这时就可以统一用promise.catch()捕获所有同步和异步的错误。

Promise.try(database.users.get({id: userId}))
  .then(...)
  .catch(...)
// 事实上，Promise.try就是模拟try代码块，就像promise.catch模拟的是catch代码块。
```

## Promise eg

```js
{
	new Promise(function (resolve, reject) {
		let timeOut = Math.random() * 2;
		console.log("set timeout to:" + timeOut + "seconds");
		setTimeout(function () {
			if (timeOut < 1) {
				console.log("call resolve()...");
				resolve("200 OK");
			} else {
				console.log("call reject()...");
				reject(`timeout in ${timeOut} seconds.`);
			}
		}, timeOut * 1000);
	})
		.then(function (result) {
			console.log(`成功：${result}`);
		})
		.catch(function (reason) {
			console.log(`失败：${reason}`);
		});
}
```

## 模拟 ajax promise

```js
{
	import("https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js");
	let ajax = function (b) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: b.type ? b.type : "post",
				url: b.url,
				dataType: "json",
				data: b.data ? b.data : "",
				timeout: 15000,
				success: function (data) {
					if (typeof b.callBack == "function") {
						b.callBack(data);
						resolve(data);
					}
				},
				error: function (xhr, type) {
					reject();
				},
			});
		});
	};

	let url =
		"https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10";
	ajax({
		type: "get",
		url: url,
		callBack: function (data) {
			console.log("data1", data);
		},
	})
		.then(function () {
			ajax({
				type: "get",
				url: url,
				callBack: function (data) {
					console.log("data2:", data);
				},
			});
		})
		.then(function () {
			console.log("end");
		});

	// 输出
	// data1: {ret: 0, serverTime: 1561236658276, items: {}}
	// end
	// data2: {ret: 0, serverTime: 1561236658773, items: {}}
}

// eg
{
	let fn = function (num) {
		return new Promise(function (resolve, reject) {
			if (typeof num == "number") {
				resolve(num);
			} else {
				reject("TypeError");
			}
		});
	};

	fn(2)
		.then(function (num) {
			console.log("first: " + num);
			return num + 1;
		})
		.then(function (num) {
			console.log("second1: " + num);
			return num + 1;
		})
		.then(function (num) {
			console.log("third: " + num);
			return num + 1;
		});

	// 输出结果
	// first: 2
	// second: 3
	// third: 4
}

// promist 封装 ajax
{
	let url =
		"https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10";

	// 封装一个get请求的方法
	function getJSON(url) {
		return new Promise(function (resolve, reject) {
			var XHR = new XMLHttpRequest();
			XHR.open("GET", url, true);
			XHR.send();

			XHR.onreadystatechange = function () {
				if (XHR.readyState == 4) {
					if (XHR.status == 200) {
						try {
							var response = JSON.parse(XHR.responseText);
							resolve(response);
						} catch (e) {
							reject(e);
						}
					} else {
						reject(new Error(XHR.statusText));
					}
				}
			};
		});
	}

	// getJSON(url)
	//     .then(resp => {
	//         console.log(resp);
	//     })
}
```

## js promise 中如何取到[[PromiseValue]] ?

-   [js promise 中如何取到[[PromiseValue]] ?](https://segmentfault.com/q/1010000010670739)

```js
Promise {[[PromiseStatus]]: "resolved",
        [[PromiseValue]]: "http://dl.stream.qqmusic.qq.com/M8000046HRBd0FvKLm…C380C8F140044403EDC0124&guid=489780640&fromtag=30"
        }


var a = Promise.resolve('xx')
// Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: "xx"}
a.then(function (result) { console.log(result) })
```

## promise axios

-   [vue+axios+promise 实际开发用法](https://segmentfault.com/a/1190000016680014)
    https://www.cnblogs.com/lalalagq/p/9901185.html
-   [Promise 配合 axios 使用](https://www.cnblogs.com/ralapgao/p/10069677.html)
-   [ES6 Promise 用法讲解](https://www.cnblogs.com/whybxy/p/7645578.html)
-   [Vue- 应用 Promise 的 axios 请求封装](https://www.jianshu.com/p/8e0967785c3b?utm_source=oschina-app)
    https://www.jianshu.com/p/c40b34a74094
    https://www.jianshu.com/p/d51a161958e5
    https://segmentfault.com/a/1190000018586947
    https://www.jianshu.com/p/6f74c4da88e9

```es6
export default {
	fetchData(url, methods, datas) {
		return new Promise((resolve, reject) => {
			axios({
				url: url,
				method: methods,
				data: datas,
			})
				.then((res) => {
					resolve(res);
				})
				.catch(function (error) {
					reject(error);
					// console.log(error);
				});
		});
	},
};
```
