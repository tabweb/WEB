# [浏览器是如何解析 html 的？](https://juejin.im/post/5c1dde33f265da61776bf49a)

```
当我们在浏览器地址栏输入一个合法的url时，浏览器首先进行DNS域名解析，拿到服务器IP地址后，浏览器给服务器发送GET请求，等到服务器正常返回后浏览器开始下载并解析html。这里仅总结浏览器解析html的过程。

# html页面主要由dom、css、javascript等部分构成


# html从第一行开始解析，遇到外联资源(外联css、外联javascript、image、iframe等)就会请求对应资源，那么请求过程是否会阻塞dom的解析过程呢

```

## ivideo

-   [ivideo](https://github.com/phobal/ivideo)

## input 默认打开数字键盘

```html
<!-- iOS点击输入框，默认打开数字键盘 -->
<input
	class="mui-input-clear"
	type="tel"
	maxlength="11"
	placeholder="请输入手机号"
/>
```

### <img/> img srcset sizes

-   [img 的 srcset、sizes 属性和 picture 元素](https://www.jianshu.com/p/607567e488fc)
-   [github 上值得关注的前端项目](https://segmentfault.com/a/1190000002804472)

```html
<img
	srcset="
		http://placehold.it/2000 2000w,
		http://placehold.it/1500 1500w,
		http://placehold.it/1000 1000w,
		http://placehold.it/500   500w
	"
	sizes="(max-width: 500px) 500px, (max-width: 1000px) 1000px, (max-width: 1500px) 1500px, 2000px"
	src="http://placehold.it/500/abc"
/>
```
