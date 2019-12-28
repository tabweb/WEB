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
