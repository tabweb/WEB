## cookie

-   [request-promise 发送带 cookie 的请求](https://www.jianshu.com/p/0df2ff494bcb)

## js-cookie

-   [api](https://juejin.im/entry/5c1222a75188251595128976)

```js
import Cookies from 'js-cookie';

console.log('aa', Cookies.get('test')); // undefined || 取得值
console.log('aa', Cookies.getJSON('test')); // undefined || test=123; path=/
console.log('aa', Cookies.set('test', [1, 2, 3])); // test=123; path=/
console.log('aa', Cookies.remove('test')); // undefined

export const Cookie = {
	get(key, data) {
		return Cookies.get(key) || data;
	},
	getJSON(key, data) {
		return Cookies.getJSON(key) || data;
	},
	set(key, data) {
		return Cookies.set(key, data) && data;
	},
	remove(key, data) {
		return Cookies.remove(key) || data;
	}
};
```
