// 引用类型 -> 浅拷贝 深拷贝

// 对象（Object）是引用类型

//
{
    let a = { name: 'FE' };
    let b = a;
    b.name = 'EF';
    console.log(a.name) // EF
}
{
    // 浅拷贝
    // Object.assign , ...(展开运算符)
    let a = {
        age: 1
    }
    let b = Object.assign({}, a);
    a.age = 2;
    console.log(b.age) // 1
}
