// https://yuchengkai.cn/docs/frontend/#call-apply-bind-%E5%8C%BA%E5%88%AB
// https://blog.csdn.net/mandyucan/article/details/80820139

// call, apply, bind 区别
// call 和 apply 都是为了解决改变 this 的指向。作用都是相同的，只是传参的方式不同。
//
// 除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。

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
