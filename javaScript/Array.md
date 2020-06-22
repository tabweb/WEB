### Array

```js
/*
*** => 代表改变原数组
.concat()	      -连接数组 => 连接两个或更多的数组，并返回一个数组副本结果
.join("连接符")	  -数组转字符串 => 把数组中的所有元素放入一个字符串
.slice(start,end) -截取数组/字符串 => end=index-1"不包括该元素" => 返回现有数组的一个子数组（或提取字符串的某个部分，并以新的字符串返回被提取的部分）.
.reverse()	      - *** 倒转数组 => 颠倒数组中元素的顺序
.splice(index,count,item1,...,itemX)  - *** 删除/插入/替换数组 => 从数组中删除一部分并添加另一部分，然后返回被删除的项目
.sort(sortby)	  - *** PK unicode排序 => 默认将所有元素转为字符串排序(有小到大) => sortby 可选。规定排序顺序。必须是函数。
.push()			  - *** 将 值 压入数组末尾 => 向数组的末尾添加一个或多个元素，并返回新的长度
.shift()          - *** 从数组 开头 弹出第1个元素 => 把数组的第一个元素从其中删除，并返回第一个元素的值
.unshift()        - *** 将 值 插入到开头 => 向数组的开头添加一个或更多元素，并返回新的长度
.pop()	          - *** 从数组 末尾 弹出1个元素 => 删除并返回数组的最后一个元素
.toString()	      -获取数组字符串	=> 把数组转换为字符串，并返回结果
.toLocaleString() -把数组转换为本地数组，并返回结果。
.valueOf() 		  -返回数组对象的原始值
.toSource() 	  -返回该对象的源代码。 Firefox支持该方法
*/

// array 改变数组
{
	// .reverse()   arrayObject.reverse()
	let arr1 = [1, 2, 3];
	console.log(arr1.reverse()); // [3,2,1]
	console.log(arr1); // [3,2,1]

	// .splice()
	let arr2 = [1, 2, 3];
	console.log(arr2.splice(1, 1)); // [2]
	console.log(arr2); // [1,3]
	let arr3 = [1, 2, 3];
	console.log(arr3.splice(1, 1, 4, 5)); // [2]
	console.log(arr3); // [1, 4, 5, 3]
	let arr4 = [1, 2, 3];
	console.log(arr4.splice(1, 1, 4, [5, 6])); // [2]
	console.log(arr4); // [1, 4, [5, 6], 3]

	// .sort() => PK unicode排序
	let arr5 = [3, "b", 1, "a", 2];
	console.log(arr5.sort()); // [1, 2, 3, "a", "b"]
	console.log(arr5); // [1, 2, 3, "a", "b"]
	let arr6 = [4, "3", "1", 1, 2, "2", "0.1", "-0.3"];
	console.log(
		arr6.sort(function (a, b) {
			return a - b;
		})
	); // ["-0.3", "0.1", "1", 1, 2, "2", "3", 4]
	console.log(arr6); // ["-0.3", "0.1", "1", 1, 2, "2", "3", 4]

	// .push()
	let arr7 = [1, 2, 3];
	arr7.push(4, [5]); // 5  => 数组的长度
	console.log(arr7); // [1, 2, 3, 4, [5]]
	// .shift()
	let arr8 = [1, 2, 3];
	arr8.shift(); // 1
	console.log(arr8); // [2, 3]
	// .unshift()
	let arr9 = [1, 2, 3];
	arr9.unshift(4, [5]); // 5  => 数组的长度
	console.log(arr9); // [4, [5], 1, 2, 3]
	// .pop()
	let arr10 = [1, 2, 3];
	arr10.pop(); // 3
	console.log(arr10); // [1, 2]

	// FIFO=>先进先出  队列: 只能从一端进入，从另一端出
}

// array 返回新数组
{
	let arr = [1, 2, 3];
	// .concat()
	console.log(arr.concat(4, [5])); // [1, 2, 3, 4, 5]
	console.log(arr); // [1,2,3]
	// .join()
	console.log(arr.join(",")); // 1,2,3
	console.log(arr); // [1,2,3]
	// .slice(start,end)
	console.log(arr.slice(1, 2)); // [2]
	console.log(arr); // [1,2,3]

	// .toString()
	console.log(arr.toString()); // 1,2,3
	console.log(arr); // [1,2,3]
	// .toLocaleString()
	console.log(arr.toLocaleString()); // 1,2,3
	console.log(arr); // [1,2,3]
	let time = new Date();
	console.log(time.toLocaleString()); // 2019/6/23 下午11:58:09
	console.log(time); // Sun Jun 23 2019 23:58:09 GMT+0800 (中国标准时间)
}

// String 返回新字符串
{
	let str = "123";
	console.log(str.slice(1, 2)); // 2
	console.log(str); // 123
}
```

### concat ...[] 区别

```js
// [].concat([1,2,[3]]) 和 [...[1,2,[3]] 区别哦

let arr = [1, 2, 3];
// .concat()
console.log(arr.concat(4, [5])); // [1, 2, 3, 4, 5]
console.log(arr); // [1,2,3]
// [...[]]
console.log([...arr, ...[4, [5]]]); // [1, 2, 3, 4, [5]]
```
