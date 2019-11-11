## Vuex link

-   [Vuex 入门](https://www.jianshu.com/p/b014ff74bdb6)
-   [5 分钟带你入门 vuex（vue 状态管理）](https://baijiahao.baidu.com/s?id=1618794879569468435&wfr=spider&for=pc)
-   [Vue.js(六) 全局状态管理(Vuex)](https://blog.csdn.net/vbirdbest/article/details/85289630)
-   [Vue 的状态管理器：Vuex](https://blog.csdn.net/u011068996/article/details/82215838)
-   [12.Vuex 命名空间 namespaced](https://blog.csdn.net/lzb348110175/article/details/89387495)
-   [Vuex mapGetters,mapActions](https://www.cnblogs.com/yaowen/p/8927343.html)

```
1.全局状态管理
2.全局实例对象(Store)
3.设计模式中的“单例模式”
```

## vuex

```
Vuex 的 核心 是 Store（仓库），相当于是一个容器，一个 Store 实例中包含以下属性的方法：
state 定义属性（状态 、数据）
getters 用来获取属性
actions 定义方法（动作）
commit 提交变化，修改数据的唯一方式就是显示的提交 mutations
mutations 定义变化，处理状态（数据）的改变
mapGetters 用来获取属性（数据）
mapActions 用来获取方法（动作）
```

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 定义属性（数据）
var state = {
	count: 6
};

// 定义 getters
var getters = {
	count(state) {
		return state.count;
	}
};

// 定义 actions ，要执行的动作，如流程的判断、异步请求
const actions = {
	// ({commit,state}) 这种写法是 es6 中的对象解构
	increment({ commit, state }) {
		//提交一个名为 increment 的变化，名字可自定义，可以认为是类型名，与下方 mutations 中的 increment 对应
		//commit 提交变化，修改数据的唯一方式就是显式的提交 mutations
		commit('increment');
	}
};

// 定义 mutations ，处理状态（数据） 的改变
const mutations = {
	//与上方 commit 中的 ‘increment’ 相对应
	increment(state) {
		state.count++;
	}
};
// 创建 store 对象
const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
});

// 导出 store 对象
export default store;
```

vuex createNamespacedHelpers

```js
// xxx.vue中调用
// a、通过store直接调用：
    state：this.$store.state.home.initInfo
    getters: this.$store.getters['home/initInfo']
    mutations: this.$store.commit('home/updateInitInfo', 'set home init info')
    actions: this.$store.dispatch('home/getInfo')

// b、配合vuex的createNamespacedHelpers方法使用
    import { createNamespacedHelpers } from 'vuex'
    const { mapActions, mapState, mapMutations, mapGetters } = createNamespacedHelpers('home')
    computed: {
        ...mapState({
            initInfoState: state => state.initInfo
        }),
        ...mapGetters([
            'initInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'updateInitInfo'
        ]),
        ...mapActions([
            'getInfo'
        ])
    }

// c、使用原始的mapX方法
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    computed: {
        ...mapState({
            initInfoState: state => state.home.initInfo
        }),
        ...mapGetters('home', [
            'initInfo'
        ])
    }
    methods: {
        ...mapMutations('home', [
            'updateInitInfo'
        ]),
        ...mapActions('home', [
            'getInfo'
        ])
    }
```

## Vuex mapGetters,mapActions

https://www.cnblogs.com/yaowen/p/8927343.html
