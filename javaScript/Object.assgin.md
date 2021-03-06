### Object.assgin

-   [js 将多个对象合并成一个对象 assign 方法。ES6 新特性有哪些](https://blog.csdn.net/qq_41387882/article/details/82468384)

### 展开运算符 和 object.assign()的区别

Object.assign ...{}

```
Object.assign({},{x:1})

{...{x:1}}
```

```js
// 1.接下来介绍一下ES6在Object新加的方法  assign()
// 1.作用：将多个对象{}  合并成一个独立对象。
// 2.使用方式: Object.assign(合并的对象，传入合并中的对象....)

let user = { name: "无敌人", age: 19 };
let page = { pageSize: 10, currentPage: 1 };
let newObj = {};
Object.assign(newObj, user, page);
```

### Object.assgin 引用类型 -> 浅拷贝 深拷贝

```js
// 引用类型 -> 浅拷贝 深拷贝

// 对象（Object）是引用类型

// arr
/*
let new_arr = arr.concat();
let new_arr = arr.slice();

var new_arr = JSON.parse(JSON.stringify(arr));
*/

{
	function shllow(obj) {
		if (typeof obj !== "object") return;
		var newObj = obj instanceof Array ? [] : {};
		for (key in obj) {
			console.log(key);
			if (obj.hasOwnProperty(key)) {
				newObj[key] = obj[key];
			}
		}
		return newObj;
	}

	let obj = {
		a: 1,
		b: {
			x: 2,
			c: {
				y: 3,
			},
		},
	};
	let newObj = shllow(obj);
	newObj.a = "a";
	newObj.b.x = "x";
	newObj.b.c.y = "z";
	console.log(obj);
	console.log(newObj);
}
//
{
	let a = {
		name: "FE",
	};
	let b = a;
	b.name = "EF";
	console.log(a.name); // EF
}

// Object.assign 浅拷贝还是深拷贝
// https://blog.csdn.net/IH1107/article/details/79208860

{
	// 浅拷贝
	// Object.assign , ...(展开运算符)
	let a = {
		age: 1,
	};
	let b = Object.assign({}, a);
	a.age = 2;
	console.log(b.age); // 1

	// so copy
	// object.assign
	const target = {
		a: 1,
	};
	const source1 = {
		b: 2,
	};
	const source2 = {
		c: 3,
	};
	Object.assign(target, source1, source2);
	console.log(target); // {a: 1, b: 2, c: 3}
}

// https://github.com/nearxu/have-fun-js/blob/master/es5/type.js
// https://www.cnblogs.com/60late/p/9626336.html
// 浅赋值 深赋值
{
	// deepCopy
	const deepCopy = (obj) => {
		var newobj = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof key === "object") {
					newobj[key] = deepCopy(obj[key]);
				} else {
					newobj[key] = obj[key];
				}
			}
		}
		return newobj;
	};
	const ab = {
		name: "tom",
	};
	const cd = deepCopy(ab);
	cd.name = "marry";
	console.log(ab);

	// solute2
	const deepKeys = (obj) => {
		let clone = Object.assign({}, obj);
		Object.keys(clone).forEach(
			(k) =>
				(clone[k] =
					typeof obj[k] === "object" ? deepKeys(obj[k]) : obj[k])
		);
		return clone;
	};
	const ef = deepKeys(cd);
	ef.name = "near";
	console.log(cd);
}

// 对象数组的深拷贝
// https://www.cnblogs.com/jiangzilong/p/6513552.html
{
	var obj = [
		{ a: { a1: ["a11", "a12"], a2: 1 }, b: 2 },
		["c", { d: 4, e: 5 }],
	];
	var objDeepCopy = function (source) {
		var sourceCopy = source instanceof Array ? [] : {};
		for (var item in source) {
			sourceCopy[item] =
				typeof source[item] === "object"
					? objDeepCopy(source[item])
					: source[item];
		}
		return sourceCopy;
	};
	var objCopy = objDeepCopy(obj);
	objCopy[0].a.a1[1] = "a13";
	objCopy[1][1].e = "6";
	obj; // => [{ "a": { "a1": ["a11", "a12"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 5 }]]
	objCopy; // => [{ "a": { "a1": ["a11", "a13"], "a2": 1 }, "b": 2 }, ["c", { "d": 4, "e": 6 }]]
}
```

### js 对顶赋值 concat

```js
let _userInfo = { name: "测试", age: "10" };
let userData = { age: "18", sex: "男" };
const params = {
	..._userInfo,
	...userData,
};
// {name: "测试", age: "18", sex: "男"}

let obj = {
	...{ x: 1, y: 2, z: 3 },
	...{ x: 9 },
	...[1, 2, 3],
	...{ x: "xxx" },
};
// {0: 1, 1: 2, 2: 3, x: "xxx", y: 2, z: 3}
```

### arr-flatten

-   [arr-flatten](https://www.npmjs.com/package/arr-flatten)

```js
function flat(arr, res) {
	var i = 0,
		cur;
	var len = arr.length;
	for (; i < len; i++) {
		cur = arr[i];
		Array.isArray(cur) ? flat(cur, res) : res.push(cur);
	}
	return res;
}

flat(["a", ["b", ["c"]], "d", ["e"]], []);
// ['a', 'b', 'c', 'd', 'e']
```
