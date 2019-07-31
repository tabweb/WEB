##  OPTIONS 预检请求
* [解决跨域引起的两次请求](https://blog.csdn.net/joefany/article/details/79065879)
* [options预检请求](https://blog.csdn.net/weixin_33885253/article/details/90989762)
* [OPTIONS理解](https://www.cnblogs.com/heioray/p/9392533.html)
* [一次ajax调用，发送了两次请求（一次为请求方法为option，一次为正常请求）](https://blog.csdn.net/weixin_38958405/article/details/81016246)
* [http预请求options](https://blog.csdn.net/kahhy/article/details/81563063)
* [spring设置Access-Control-Max-Age 来缓存 CORS 配置无效](https://my.oschina.net/mobinchao/blog/908834)
* [OPTIONS - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)
```
CORS 中的预检请求  OPTIONS 预检请求

后台设置缓存时间
Access-Control-Max-Age
```


## [预请求触发的几种方式](https://blog.csdn.net/weixin_42204698/article/details/93631856)
```
1.使用了PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH方法
2.人为设置了非规定内的其他首部字段，参考上面简单请求的安全字段集合，还要特别注意Content-Type的类型
3.XMLHttpRequestUpload 对象注册了任何事件监听器
4.请求中使用了ReadableStream对象
```