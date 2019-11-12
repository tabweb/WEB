## props

-   [props => Object, Array](https://www.cnblogs.com/zhaobao1830/p/10939071.html)

原因：props default 数组／对象的默认值应当由一个工厂函数返回

```js
seller: {
   type: Object,
   default() {
      return {}
   }
}
```
