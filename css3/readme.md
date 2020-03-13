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

### 常见的移动端 H5 页面开发遇到的坑和解决办法

-   [bug 1](https://yq.aliyun.com/articles/587092)
-   [bug 2](https://blog.csdn.net/weixin_34310785/article/details/89726865)
-   [bug 3](https://www.open-open.com/lib/view/open1449325854077.html)
