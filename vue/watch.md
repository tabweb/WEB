## vue watch

-   [watch 的 immediate 使用](https://blog.csdn.net/MCQq123321/article/details/84100961)

```js
export default {
	data(){
		return {
			sarchValue:""
		}
	},
	created():{
	},
	methods:{
		getList(){
			server.getList({
				serachValue:this.searchValue
			})
		}
	},
	watch:{
		serachValue:{
			//使用watch值是对象的第三种情况
			handler:"getList"
			//getList里面通过searchValue去搜索数据库
			immediate:true
		}
	}
}

```
