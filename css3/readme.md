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

### css 文字不换行

-   [css 处理文字不换行、换行截断、溢出省略号](https://www.cnblogs.com/nanyang520/p/11358623.html)

```
1、使文字不换行
white-space: nowrap;

normal	默认。空白会被浏览器忽略。
pre	空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。
nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
pre-wrap	保留空白符序列，但是正常地进行换行。
pre-line	合并空白符序列，但是保留换行符。
inherit	规定应该从父元素继承 white-space 属性的值。


2、允许长单词换行
word-wrap:break-word;

normal	只在允许的断字点换行（浏览器保持默认处理）。
break-word	在长单词或 URL 地址内部进行换行。


3、换行不截断单词
word-break:break-all;
normal	使用浏览器默认的换行规则。
break-all	允许在单词内换行。
keep-all	只能在半角空格或连字符处换行。


4、单行文字超出显示省略号

overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

5、多行文字超出显示省略号

overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```
