### [Vue 随笔：Render()函数&JSX](https://www.jianshu.com/p/7353974795dd)

### render => vue react jsx vxe-table

### parent components

```jsx
<addList onSuccess="{this.btnReset}" d="{row}">
	<el-button size="mini" icon="el-icon-document-copy" />
</addList>
```

### child components

```html
<script>
export default {
  name: 'addList',
  props: {
    d: {
      type: Object,
      default() {
        return {
          prizeUrl: '', // 奖品图片
        }
      },
      // default: Object,
    }
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
    }
  },
  computed: {},
  methods: {
    successUpload(res) {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.addList().then(() => {
            this.$emit('success')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
  created() {},
  mounted() {}
}
```
