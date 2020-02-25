### vue computed

-   [关于 vue computed 修改 data 数据的问题](https://blog.csdn.net/sunshine08_07/article/details/79898837)

```js
// 最近在做项目的时候遇见一个问题，computed修改data数据的时候会报错。报错的大概意思是，不可以修改data数据的属性值。查了一些答案，最终解决办法是需要用到set和get。看代码：

data () {
   return {
     fold: false
  }
}
// 我想修改fold的值，如果不用get和set就会报错！！！
computed:{
    listShow: {
       get: function () {
            if (!this.totalCount) {
              return false
            }
            return this.fold
          },
       set: function () {
            if (!this.totalCount) {
            this.fold = false
            return false
        }
    }
}
// get里面的值可以在页面加载或者数据改变的时候实时更新，但是set方法里面的如果想起作用，你需要调用listShow才会起作用。看代码：

methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.listShow = false//这里需要调用一下
      this.fold = !this.fold
    },
}
// 如果不调用的情况下，逻辑都写到get里面，就可以实时更新了。
```
