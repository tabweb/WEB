# webpack

http://vuejs-templates.github.io/webpac

## scss

-   [](https://segmentfault.com/a/1190000013227410)

```html
<style lang="scss" scoped>
	.components {
	  /deep/ .childComponents{
	    width: 50px;
	}
</style>
```

## image 下空白 3px

```css
.font-size0 {
	font-size: 0;
}
```

## ellipsis 子元素 font-size0 无 ...

```xml
<div class="font-size0">
	<div class="ellipsis font-size18">
		<span>新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐</span>
	</div>
</div>

<!-- error -->
<div class="font-size0">
	<div class="ellipsis">
		<span class="font-size18">新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐新疆-乌木木齐</span>
	</div>
</div>
```

### outline

-   [css outline:none; 去除 input 获取焦点时的边](https://blog.csdn.net/Caroline_Yang/article/details/80435994)
