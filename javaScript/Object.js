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





/*
1、使用ES6提供的 Object.keys(obj) 方法
Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

Object.keys(obj).length === 0 && obj.constructor === Object  // true表示为空对象，false为非空对象
缺点： 部分浏览器不支持，需要通过 babel 类插件转为 ES5

2、遍历对象，通过对象的 hasOwnProperty() 方法判断
function isEmptyObject( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
3、jQuery.isEmptyObject()，源码见上方；
*/




/*
js对象及空对象或数组及空数组的判断与比较
https://www.cnblogs.com/xiangsj/p/8298864.html
*/
{
    // 判断是不是对象：
    let obj = {};
    Object.prototype.toString.call(obj) == "[object Object]"; //true

    // 判断是不是数组：
    let array = [];
    Object.prototype.toString.call(array) == "[object Array]"; //true

    // 判断是不是字符串：
    let str = '';
    Object.prototype.toString.call(str) == "[object String]"; //true

    // 判断是不是数字：
    let num = 1;
    Object.prototype.toString.call(num) == "[object Number]"; //true

    // 判断是不是布尔：
    let boolean = false;
    Object.prototype.toString.call(boolean) == "[object Boolean]"; //true

    // 判断是否有效：
    let data;
    Object.prototype.toString.call(data) != "[object Null]" && Object.prototype.toString.call(data) != "[object Undefined]"; //false
}

/*

 判断数组是否为空：
 let arr = [];
 arr.length == 0; //true
 var aa = ['', '', '', '']
 aa.join('') === ''; //true

 对象转数组：
 let obj = {
 	1: 'a',
 	2: 'b',
 	3: 'c'
 }
 Object.keys(obj); //[1, 2, 3]
 Object.values(obj); //['a', 'b', 'c']

 判断对象是否为空：

 let obj = {}

 Object.keys(obj).length == 0 //true
 var abc = {
 	1: '',
 	2: '',
 	3: ''
 }
 Object.values(abc).join('') !== ''; //true

 比较2个数组是否相等（ 忽略每项的类型）
 let arr1 = ["1", 2];
 let arr2 = [1, 2];
 arr1.toString() == arr2.toString(); //true

*/











