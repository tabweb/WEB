### debounce

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
