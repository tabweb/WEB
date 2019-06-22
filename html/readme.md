
# [浏览器是如何解析html的？](https://juejin.im/post/5c1dde33f265da61776bf49a)


```
当我们在浏览器地址栏输入一个合法的url时，浏览器首先进行DNS域名解析，拿到服务器IP地址后，浏览器给服务器发送GET请求，等到服务器正常返回后浏览器开始下载并解析html。这里仅总结浏览器解析html的过程。

# html页面主要由dom、css、javascript等部分构成


# html从第一行开始解析，遇到外联资源(外联css、外联javascript、image、iframe等)就会请求对应资源，那么请求过程是否会阻塞dom的解析过程呢

```
