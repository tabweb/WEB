### :nth-of-type(2n)

-   [nth-of-type(an+b)](https://www.runoob.com/cssref/sel-nth-of-type.html)
    使用公式（an+b）.描述：a 代表一个循环的大小，N 是一个计数器（从 0 开始），以及 b 是偏移量。

```html
<!DOCTYPE html>
<html>
	<head>
		<style>
			p:nth-of-type(3n + 3) {
				background: #ff0000;
			}
		</style>
	</head>
	<body>
		<h1>这是标题</h1>
		<p>第一个段落。</p>
		<p>第二个段落。</p>
		<p>第三个段落。</p>
		<p>第四个段落。</p>
		<p>第五个段落。</p>
		<p>第5个段落。</p>
		<p>第7个段落。</p>
		<p>第8个段落。</p>
		<p>第9个段落。</p>
		<p>第10个段落。</p>
	</body>
</html>
```
