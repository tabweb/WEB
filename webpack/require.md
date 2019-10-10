## webpack 自动化加载页面 require.context

```js
// *********************************
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./', true, /\.js$/);
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	// set './app.js' => 'app'
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	if (!modulePath.startsWith('./index')) {
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
const modulesFiles = require.context('./modules', true, /\.js$/);
const modulesRouter = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	const value = modulesFiles(modulePath);
	modules[moduleName] = value.default || value;
	return modules;
}, {});
```

-   [uni-app——想说爱你不容易之踩坑系列](https://www.cnblogs.com/qisi007/p/10701510.html)
