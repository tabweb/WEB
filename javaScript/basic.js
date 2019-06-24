// https://blog.csdn.net/tabweb/article/details/93480335

// 内置类型
{
    // 基本类型
    let a = null;
    let b = undefined;
    let c = true;
    let d = 123;  // 这只是字面量，不是 number 类型
    let e = '2';
    d.toString(); // 使用时候才会转换为对象类型
    let temp = d;
    temp = 111;
    console.log(temp, d); // 111,123
    // only ourself address

    // 引用类型
    let obj = {a: 1};
    let new_obj = obj;
    new_obj.a = 2;
    console.log(obj); // {a: 2}
    // 赋值操作后，两个变量都保存了同一个对象地址

    // 总结：
    // js 内置类型 有六种
    // null，undefined，boolean，number，string，symbol
    // 其中 JS 的数字类型是浮点类型的，没有整型。并且浮点类型基于 IEEE 754标准实现，在使用中会遇到某些 Bug。NaN 也属于 number 类型，并且 NaN 不等于自身。
}

// Typeof
{
    // typeof 对于基本类型，除了 null 都可以显示正确的类型
    typeof 1 // 'number'
    typeof '1' // 'string'
    typeof undefined // 'undefined'
    typeof true // 'boolean'
    typeof Symbol() // 'symbol'
    typeof b // b 没有声明，但是还会显示 undefined
    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'
    typeof null // 'object'

    // typeof 对于对象，除了函数都会显示 object
    // 对于 null 来说，虽然它是基本类型，但是会显示 object，这是一个存在很久了的 Bug
}


