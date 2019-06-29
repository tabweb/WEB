// Function

// new Function()
{
    new Function(); // 一个立即执行的匿名函数
    Function.prototype === new Function().__proto__; // true

    let fun = new Function();
    fun.prototype === new fun().__proto__; // true
}

{
    function Fun() {}
    Fun.prototype === new Fun().__proto__; // true

    // 模拟 Array
    function tempArray() {
    }
    tempArray.prototype === new aArray().__proto__; // true

    Array.prototype === new Array().__proto__; // true

}

