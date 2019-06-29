// https://blog.csdn.net/liwenfei123/article/details/77978027
// https://www.cnblogs.com/yuanzhiguo/p/8109540.html

// 判断数据类型的四种方法
/*

    typeof
    instanceof
    constructor
    toString
*/

// instance n. 实例 vt. 举...为例


// typeof
{
    typeof ''; // string 有效
    typeof 1; // number 有效
    typeof Symbol(); // symbol 有效
    typeof true; //boolean 有效
    typeof undefined; //undefined 有效
    typeof null; //object 无效
    typeof [] ; //object 无效
    typeof new Function(); // function 有效
    typeof new Date(); //object 无效
    typeof new RegExp(); //object 无效

    // typeof 是一个操作符，其右侧跟一个一元表达式，并返回这个表达式的数据类型
    // 返回的结果用该类型的字符串(全小写字母)形式表示，
    // 包括以下 6 种：number、boolean、string、object、undefined、function
}



// instanceof
{
    function Fun() {
    }
    typeof Fun; // function
    new Fun() instanceof Fun; // true
    new Fun() instanceof Object; // true

    // instanceof 是用来判断 A 是否为 B 的实例，
    // 表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。
    // 注意：instanceof 检测的是原型 __proto__
}
