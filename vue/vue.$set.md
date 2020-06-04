## this.\$set(obj, key, value)

-   [this.\$set 的正确使用](https://blog.csdn.net/hhkongbai/article/details/101022019)
-   [Vue2.0 \$set()的正确使用方式](https://blog.csdn.net/panyang01/article/details/76665448)
-   [vue 中 this.\$set 的用法](https://www.jianshu.com/p/6f28f5abee08)
-   [从 vue 源码解析 Vue.set()和 this.\$set()](https://www.jb51.net/article/146580.htm)

### this.\$set 的正确使用

this.#set(obj, key, value)
我们在项目开发的过程中，经常会遇到这种情况：为 data 中的某一个对象添加一个属性

```html
<template>
	<div class="hello">
		<button @click="setMessage">添加属性</button>
		{{ student.name }}
		<input type="text" v-model="student.age" />
	</div>
</template>
```

```html
<script>
	export default {
		data() {
			return {
				student: {
					name: "张三",
				},
			};
		},
		methods: {
			setMessage() {
				this.student.age = 15;
				console.log(this.student);
			},
		},
	};
</script>
```

当我们点击按钮，为 student 添加一个 age 属性，看看视图层是否能够更新

![](https://img-blog.csdnimg.cn/2019091914300756.png)
![](https://img-blog.csdnimg.cn/20190919143036128.png)

在这里我们发现虽然这个对象身上已经有了该属性，但是视图层并没有更新该数据，是什么造成的呢？由于受 JavaScript 的限制，vue.js 不能监听对象属性的添加和删除，因为在 vue 组件初始化的过程中，会调用 getter 和 setter 方法，所以该属性必须是存在在 data 中，视图层才会响应该数据的变化

那么，我们该如何解决这个问题呢
解决这个问题的方法大体有两种：

> 使用 this.\$set(obj, key, value)/vue.set(obj, key, value)

```html
<script>
	export default {
		data() {
			return {
				student: {
					name: "张三",
				},
			};
		},
		methods: {
			setMessage() {
				this.$set(this.student, "age", 15);
				console.log(this.student);
			},
		},
	};
</script>
```

> 通过 Object.assign(target, sources)方法

```html
<script>
	export default {
		data() {
			return {
				student: {
					name: "张三",
				},
			};
		},
		methods: {
			setMessage() {
				this.student.age = 15;
				this.student = Object.assign({}, this.student);
				console.log(this.student);
			},
		},
	};
</script>
```

我们发现，通过这两种方式为对象添加属性之后，他的对象身上多了 get 和 set 方法，所以，此时我们再次操作该属性的时候，就会引起视图的更新啦

![](https://img-blog.csdnimg.cn/20190919145704977.png)
