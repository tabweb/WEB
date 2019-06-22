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
    console.log('1',child1.getName()); // kevin
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
    console.log(child1.name , child1.color); //

    let child2 = new Child1('dasy',20);
    console.log(child2.name , child2.color);
}
