## touchstar、touchmove、touchend、touchcancel

-   [触摸事件中 touchstar、touchmove、touchend、touchcancel 事件应用方法及实例](https://www.jxbh.cn/article/1861.html)
-   [touchstar、touchmove、touchend、touchcancel](https://www.cnblogs.com/kenshinobiy/p/10720151.html)
-   [触摸事件 touchstart、touchmove、touchend](https://blog.csdn.net/wangmx1993328/article/details/83270166)

```
前面我们介绍过移动设备中一些设备事件，例如手机旋转90度、倾斜等设置放置姿态变化的四大事件orientationchange事件、MozOrientation事件、deviceorientation事件、devicemotion事件，接下由南昌网站建设公司百恒网络前端开发工程师向大介绍在移动端的触摸事件。

iOS版 Safari为了向开发人员传达一些特殊信息，新增了一些专有事件。因为 iOS设备既没有鼠标 也没有键盘，所以在为移动 Safari开发交互性网页时，常规的鼠标和键盘事件本不够用。随着 Android 中的 WebKit 的加入，很多这样的专有事件变成了事实标准，导致 W3C开始制定 Touch Events规范（参 见 https://dvcs.w3.org/hg/webeventsraw-file/tip/touchevents.html）。以下介绍的事件只针对触摸设备。

触摸事件包含 iOS 2.0软件的 iPhone 3G发布时，也包含了一个新版本的 Safari浏览器。这款新的移动 Safari 提供了一些与触摸（touch）操作相关的新事件。后来，Android的浏览器也实现了相同的事件。触摸 事件会在用户手指放在屏幕上面时、在屏幕上滑动时或从屏幕上移开时触发。具体来说，有以下几个触 摸事件。

touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间，调用preventDefault() 可以阻止滚动。
touchend：当手指从屏幕上移开时触发。
touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。

上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在 DOM规范中定义，但它们却 是以兼容 DOM的方式实现的。因此，每个触摸事件的 event 对象都提供了在鼠标件中常见的属性： bubbles、cancelable、view、clientX、clientY、screenX、screenY、detail、altKey、shiftKey、 ctrlKey 和 metaKey。
除了常见的 DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。
touches：表示当前跟踪的触摸操作的 Touch 对象的数组。
targetTouchs：特定于事件目标的 Touch 对象的数组。
changeTouches：表示自上次触摸以来发生了什么改变的 Touch 对象的数组。 每个 Touch 对象包含下列属性。
clientX：触摸目标在视口中的 x坐标。
clientY：触摸目标在视口中的 y坐标。
identifier：标识触摸的唯一 ID。 
pageX：触摸目标在页面中的 x坐标。
pageY：触摸目标在页面中的 y坐标。
screenX：触摸目标在屏幕中的 x坐标。
screenY：触摸目标在屏幕中的 y坐标。
target：触摸的 DOM节点目标。 使用这些属性可以跟踪用户对屏幕的触摸操作。来看下面的例子。
```

## longpress

-   [longpress 删除 longtap](https://uniapp.dcloud.io/use?id=%e4%ba%8b%e4%bb%b6%e5%a4%84%e7%90%86%e5%99%a8)
