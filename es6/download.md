## download

-   [vue+axios 实现文件下载](https://blog.csdn.net/qq_32340877/article/details/79864462)

```js
// 第二步：修改axios请求的responseType为blob，以post请求为例：
// 复制代码

axios({
    method: 'post',
    url: 'api/user/',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    },
    responseType: 'blob'
}).then(response => {
    this.download(response)
}).catch((error) => {

})

// 第三步：请求成功，拿到response后，调用download函数（创建a标签，设置download属性，插入到文档中并click）

methods: {
    // 下载文件
    download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
    }
}
```
