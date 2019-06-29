// https://www.cnblogs.com/duyingxuan/p/6474163.html
// https://www.jianshu.com/p/b81813f31517
// https://www.cnblogs.com/az96/p/6014621.html
// https://blog.csdn.net/liaozhongping/article/details/51138783
// https://www.jianshu.com/p/b81813f31517

// constructor n. 构造函数；构造器；建造者

/*
    prototype
    __proto__
    constructor
    Function
    Object
    new
*/

// 内置对象？ 还是 内置函数？  __proto__
{
    Boolean.__proto__ === Function.prototype  // true
    Number.__proto__ === Function.prototype;  // true
    String.__proto__ === Function.prototype;   // true
    Object.__proto__ === Function.prototype;   // true
    Function.__proto__ === Function.prototype; // true
    Array.__proto__ === Function.prototype;   // true
    RegExp.__proto__ === Function.prototype;  // true
    Date.__proto__ === Function.prototype;    // true
    Error.__proto__ === Function.prototype;   // true

    // 所有构造器/函数的__proto__都指向Function.prototype
    // 它是一个空函数（Empty function）
}
// 内置对象？
{
    Math.__proto__ === Object.prototype; // true
    JSON.__proto__ === Object.prototype; // true

    // JavaScript中有内置(build-in)构造器/对象共计12个（ES5中新加了JSON），这里列举了可访问的9个构造器。
    // 剩下如Global不能直接访问，Arguments仅在函数调用时由JS引擎创建，
    // Math，JSON是以对象形式存在的，无需new。它们的__proto__是Object.prototype。
}


// prototype __proto__   myself read
{
    function Fun() {
    }

    Fun.prototype === new Fun().__proto__; // true
    Fun.__proto__ === Function.prototype;  // true

    Array.prototype == new Array().__proto__; // true

    let fn = new Fun();
    fn.__proto__ === Fun.prototype; // true

    Fun.prototype.__proto__ === Function.prototype.__proto__; // true
    Array.prototype.__proto__ === Function.prototype.__proto__; // true
    Function.prototype.__proto__ === Object.prototype; // true


    let obj = {};
    obj.__proto__ === Object.prototype; // true
    Object.prototype.__proto__ === null; // true

    // 函数是一种对象 => 对象是通过函数创建的，而函数又是一种对象
    // 函数都有 prototype __proto__
    // 对象都有 __proto__
    // new Fun() 出来是实例化对象 实例没有原型，是个P类型的。

    // 总结：
    // (1)所有构造器/函数的__proto__都指向Function.prototype
    // (2)所有对象的__proto__都指向其构造器的prototype
}


// 原型 原型链 https://github.com/KieSun/Dream/issues/2

// 每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。

// 每个对象都有 __proto__ 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]] 是内部属性，我们并不能访问到，所以使用 _proto_ 来访问。

// 对象可以通过 __proto__ 来寻找不属于该对象的属性，__proto__ 将对象连接起来组成了原型链。

// extend vi. 延伸；扩大


// 原型链继承
{
    function Parent() {
        this.name = 'kevin';
    }

    Parent.prototype.getName = function () {
        console.log(this.name);
    };

    function Child() {

    }

    Child.prototype = new Parent();

    let child1 = new Child();
    console.log('1', child1.getName()); // kevin
}

// 组合继承
{
    function Parent1(name) {
        this.name = name;
        this.color = ['red', 'bule'];
    }

    Parent1.prototype.getName = function () {
        console.log(this.name);
    };

    function Child1(name, age) {
        Parent1.call(this, name);
        this.age = age;
    }

    Child1.prototype = new Parent1();
    let child1 = new Child1('tom', 18);
    child1.color.push('block');
    console.log(child1.name, child1.color); //

    let child2 = new Child1('dasy', 20);
    console.log(child2.name, child2.color);
}
