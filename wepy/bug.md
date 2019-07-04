# bug
# 滚动穿透
```
https://blog.csdn.net/jerryman_ghj/article/details/79232324
https://segmentfault.com/q/1010000011134345
微信小程序中遮罩层的滚动穿透问题
1, <view catchtouchmove="emptyMove"></view>  emptyMove -> 空方法
2, 如果不使用该方法，使用楼下说的给最外层添加height:100%;overflow:hidden;的话，会有一个弹窗出现时页面返回顶部的情况，这种交互很不友好，暂时还没找到很好的解决方法；
3, 如果在mpvue中使用catchtouchmove="touchmoveHandler"的话，会导致监听不到touchmoveHandler方法，小程序会一直报警，暂未找到解决方法。
```















