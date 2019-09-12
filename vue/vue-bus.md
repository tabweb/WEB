## vue-bus

-   [vue-bus 组件之间的通信使用方法](https://www.jianshu.com/p/5b383e66c117)
-   [vue-bus: 一个 Vue.js 事件中心插件](https://segmentfault.com/a/1190000007443133)

npm install vue-bus

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装 vue-bus：
import Vue from 'vue';
import VueBus from 'vue-bus';
Vue.use(VueBus);
使用
监听事件
// header 组件

```html
<template>
	<div>
		<div>{{ addTodo }}，你好世界</div>
	</div>
</template>

<script>
	data () {
	   return {
	       addTodo:""
	   }
	},
	created() {
	   this.$bus.on('add-todo', (val) => {
	     this.addTodo = val
	   });
	},
</script>
触发事件 // footer组件
<template>
	<div>
		<div @click="“send”"></div>
	</div>
</template>
<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				userName: null,
				newTodoText: ''
			};
		},
		methods: {
			send() {
				this.newTodoText = 'hello world';
				this.$bus.emit('add-todo', this.newTodoText);
			}
		}
	};
</script>
```

## bus

-   [Vue 组件通信之 Bus 的具体使用](https://www.jb51.net/article/131726.htm)
-   [vue 2 使用 Bus.js 实现非父子组件通信](https://segmentfault.com/a/1190000010845885)
-   [Vue 组件通信之 Bus](https://juejin.im/post/5a4353766fb9a044fb080927)
