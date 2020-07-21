## class

-   [理解 es6 class 中 constructor 方法 和 super 的作用](https://www.jianshu.com/p/fc79756b1dc0)

首先，ES6 的 class 属于一种“语法糖”，所以只是写法更加优雅，更加像面对对象的编程，其思想和 ES5 是一致的。

```es6
function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.toString = function () {
	return "(" + this.x + "," + this.y + ")";
};
```

等同于

```es6
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return "(" + this.x + "," + this.y + ")";
	}
}
```

其中 constructor 方法是类的构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个默认的 consructor 方法会被默认添加。所以即使你没有添加构造函数，也是会有一个默认的构造函数的。一般 constructor 方法返回实例对象 this ，但是也可以指定 constructor 方法返回一个全新的对象，让返回的实例对象不是该类的实例。
