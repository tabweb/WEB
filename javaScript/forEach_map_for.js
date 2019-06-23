// https://blog.csdn.net/u012841667/article/details/78375789
// map和forEach，for性能比较
/*

for–速度最快，forEach和for++次之相当，map慢
原因：从源码看出，map需要有回调函数的返回值，并且新建一个和遍历数组一样长度的数组作为返回，forEach则没有这些开销

注：map，forEach不能使用break跳出整个循环，不能使用continue跳出本次循环。使用retrun相当于for中的continue的作用，从源码可以看出，结束本次循环的回调函数

* */




// forEach
{
    Array.prototype.foreach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);//拿到变量的数组
        var len = O.length >>> 0;//右移的作用，所有非数值转换成0，所有大于等于0数取整数部分
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = thisArg;//如果存在第三个参数，表明this的指向
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) //k为属性名
                kValue = O[k];
            callback.call(T, kValue, k, O);
        }
        k++;
    }
}

// map
{
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (Object.prototype.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        A = new Array(len);
        k = 0;
        while(k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[ k ];
                mappedValue = callback.call(T, kValue, k, O);
                A[ k ] = mappedValue;
            }
            k++;
        }
        return A;//返回新的数组，长度和原数组一样
    };
}
