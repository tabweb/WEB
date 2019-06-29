// https://segmentfault.com/a/1190000011467723
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#%E5%80%BC%E5%B1%9E%E6%80%A7

// https://www.cnblogs.com/mengfangui/p/10468866.html

// {}  new Object()
{
    let Obj = function() {};

    let a = {};
    let b = new Object();
    let c = new Obj();
    console.log(a,b,c);
    // c最快，a次之，b最慢

    // {} 这个叫做对象字面量
}

// js的内置对象/函数/构造器/构造函数
/*
    Boolean
    Number
    String
    Object
    Function
    Array
    Date
    RegExp
    Error
*/


