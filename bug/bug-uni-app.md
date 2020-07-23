## uni-app

-   [uni-app 遇到的坑](https://www.baidu.com/s?wd=uni-app%20%E9%81%87%E5%88%B0%E7%9A%84%E5%9D%91)
-   [uni-app tabBar 踩坑](https://recomm.cnblogs.com/blogpost/11867235?page=1)
-   [uni-app 基础](https://www.cnblogs.com/mufc/p/11268181.html)
-   [入坑 uni-app 第一天](https://www.cnblogs.com/poyfx/p/11131494.html)
-   [uni-app 采坑记录](https://www.cnblogs.com/sky-chen/p/11084695.html)
-   [uni-app 开发踩坑记录](https://www.cnblogs.com/renhongwei/p/10464302.html)

### uni-app barBar bug

bug：
页面元素过多，快速切换 tabBar 页面空视图
onLoad onShow 没执行

解决方案：
添加默认 loading 页面
uni.showTabBar()
uni.hideTabBar()
