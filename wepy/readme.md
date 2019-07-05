# wepy
[微信小程序组件化开发框架WePY官方文档](https://tencent.github.io/wepy/document.html)
[wepy目录结构](https://blog.yzgod.com/wepy-usage)
https://www.jianshu.com/p/c2549824dd5b


## $broadcast，emit，invoke  组件通讯$
https://www.jianshu.com/p/8afb6e0483e2
https://www.cnblogs.com/linghu-java/p/9237487.html
```
$broadcast
$emit
$invoke
```
```js
// 微信小程序Wepy框架的三个事件交互($broadcast，$emit，$invoke)
// $broadcast  父传子
this.$broadcast('eventName', param1,param2,param3,......)
//然后在子组件的events里面定义eventName接收事件就行了，如下：
events = {
    'eventName': (param1,param2......., $event:Event) => {

    }
}

// $emit       子传父
this.$emit('eventName', param1,param2,param3,......)
// 然后在父组件的events里面定义eventName接收事件就行了，如下：
events = {
    'eventName': (param1,param2......., $event:Event) => {

    }
}

// $invoke     兄弟通讯
this.$invoke('子组件，必须要单引号括起来', '子组件方法名称',  param1,param2,param3.......);
```

```
page 通讯 组件

props = {
    tempData: {
        type: String,
        default: '',
        twoWay: true
    }
}
```