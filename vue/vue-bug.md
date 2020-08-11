### debounce throttle 节流防抖

```html
<template>
	<div class="set-time" @click=" onAdd">{{ count }}</div>
</template>

<script>
	import { debounce } from "@/utils/debunce";
	export default {
		name: "set-time",
		data() {
	     return {
	     count: 0
	     }
		}，
		methods: {
	     onAdd: debounce ( function() {
	       this.count += 1;
	     }，3000)
	  }
	};
</script>
```

### [Vue 中自动获取 input 焦点](https://blog.csdn.net/weixin_40890907/article/details/82346042)

### vue :style computed

```html
<!-- :style="[xx,xx]" -->
<div :style="[sunsinWidth]"></div>

<script>
	computed: {
	  sunsinWidth() {
	    return {
	      width: this.width + 'rpx',
	      height: this.height + 'rpx',
	      lineHeight: this.height + 'rpx'
	    }
	  }
	}
</script>
```

### vue :class

```html
<script>
	 data: {
		isActive: true,
		errorClass: "text-danger"
	};
</script>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### v-for :key bug

v-for 动态添加数据，:key 不是唯一 id，媒体资源 不更新(为了性能优化,不更新媒体资源)

```vue
<template>
	<div v-for="(value, index) in arr" :key="value.id">
		<image :src="value.img" />
	</div>
</template>

<script>
export default {
	mixins: [],
	components: {},
	props: {
		value: {
			type: [String, Number],
			default: 0,
		},
	},
	data() {
		return {
			arr: [
				{
					id: 1,
					img: "https://img.xjh.me/desktop/img/61507525_p0.jpg",
				},
				{
					id: 2,
					img:
						"https://img.xjh.me/desktop/img/63957933_p0_master1200.jpg",
				},
			],
		};
	},
	computed: {},
	watch: {
		value(n) {
			console.log(n);
		},
	},
	methods: {},
	mounted() {},
};
</script>
```
