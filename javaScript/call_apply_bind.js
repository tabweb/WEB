// https://yuchengkai.cn/docs/frontend/#call-apply-bind-%E5%8C%BA%E5%88%AB
// https://blog.csdn.net/mandyucan/article/details/80820139

// call, apply, bind 区别
// 每个函数都包含两个非继承而来的方法：apply()和call()。；
//
// call与apply都属于Function.prototype的一个方法，所以每个function实例都有call、apply属性；
//
// 改变函数运行时上下文,返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined
//
// 作用
// call（）方法和apply（）方法的作用相同：改变this指向。
//
// 区别
// 他们的区别在于接收`参数`的方式不同：
//
// call（）：第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。在使用call（）方法时，传递给函数的参数必须逐个列举出来。
//
// apply（）：传递给函数的是参数数组


// call
{
    let a = {
        value: 1
    };

    function getValue(name, age) {
        console.log(name);
        console.log(age);
        console.log(this.value, 'value');
    }

    getValue('vic', 21);
    getValue.call(a, 'vic', 22);
    getValue.apply(a, ['vic', 23]);
}

// 模拟实现 call 和 apply
// 不传入第一个参数，那么默认为 window
// 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

// call
{
    Function.prototype.myCall = function (context) {
        var context = context || window
        // 给 context 添加一个属性
        // getValue.call(a, 'yck', '24') => a.fn = getValue
        context.fn = this
        // 将 context 后面的参数取出来
        var args = [...arguments].slice(1)
        // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
        var result = context.fn(...args)
        // 删除 fn
        delete context.fn
        return result
    }
}
// apply
{
    Function.prototype.myApply = function (context) {
        var context = context || window
        context.fn = this

        var result
        // 需要判断是否存储第二个参数
        // 如果存在，就将第二个参数展开
        if (arguments[1]) {
            result = context.fn(...arguments[1])
        } else {
            result = context.fn()
        }

        delete context.fn
        return result
    }
}
// bind
{
    Function.prototype.myBind = function (context) {
        if (typeof this !== 'function') {
            throw new TypeError('Error')
        }
        var _this = this
        var args = [...arguments].slice(1)
        // 返回一个函数
        return function F() {
            // 因为返回了一个函数，我们可以 new F()，所以需要判断
            if (this instanceof F) {
                return new _this(...args, ...arguments)
            }
            return _this.apply(context, args.concat(...arguments))
        }
    }
}
