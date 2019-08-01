## bundle-loader 实现按需加载

-   [webpack/webpack+bundle-loader/webpack+redux code splitting（按需加载）](https://blog.csdn.net/fay462298322/article/details/78559363)
-   [bundle-loader 实现按需加载](https://blog.csdn.net/chiuwingyan/article/details/80696360)

> react-router v4 中的代码拆分
> 首先需要一个异步加载的包装组件 Bundle。Bundle 的主要功能就是接收一个组件异步加载的方法，并返回相应的 react 组件：

```js
export default class Bundle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mod: null
		};
	}

	componentWillMount() {
		this.load(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.load !== this.props.load) {
			this.load(nextProps);
		}
	}

	load(props) {
		this.setState({
			mod: null
		});
		props.load(mod => {
			this.setState({
				mod: mod.default ? mod.default : mod
			});
		});
	}

	render() {
		return this.state.mod ? this.props.children(this.state.mod) : null;
	}
}
```
