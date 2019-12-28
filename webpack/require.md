## 兼容 import export

```js
import Vue from "vue";

// 自动加载 global 目录下的 .js 结尾的文件
const componentsContext = require.context("./global", true, /\.js$/);

componentsContext.keys().forEach(component => {
	const componentConfig = componentsContext(component);
	/**
	 * 兼容 import export 和 require module.export 两种规范
	 */
	const ctrl = componentConfig.default || componentConfig;
	console.log("ctrl.name", ctrl.name);
	Vue.component(ctrl.name, ctrl);
});
```

```js
const requirePlugin = require.context(
	// 当前plugins目录
	"/",
	// 是否查询其子目录
	false,
	// 匹配当前plugins目录下的js文件
	/.+\.js$/
);
requirePlugin.keys().forEach(fileName => {
	requirePlugin(fileName);
});
```

## webpack 自动化加载页面 require.context

```js
// *********************************
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./", true, /\.js$/);
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
	const value = modulesFiles(modulePath);
	if (!modulePath.startsWith("./index")) {
		modules[moduleName] = value;
	}
	return modules;
}, {});
// *********************************
export default modules;
```

## vue router

```js
/* Router Modules */
const modulesFiles = require.context("./modules", true, /\.js$/);
const modulesRouter = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default || value;
	return modules;
}, {});
```

-   [uni-app——想说爱你不容易之踩坑系列](https://www.cnblogs.com/qisi007/p/10701510.html)

## [require.context](https://juejin.im/post/5ab8bcdb6fb9a028b77acdbd)

## uni-app

-   [使用 webpack 的`require.context`自动注册全局组件 app 端无效](https://ask.dcloud.net.cn/question/74824?item_id=110053&rf=false)

```
uni-app 无法解决
require.context
```
