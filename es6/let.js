// let const
// let 声明的变量只在 let 命令所在的代码块内有效。
{
    let a = 0;
    console.log(a)  // a
    /*
    1.代码块内有效
    2.不能重复声明
    3.不存在声明提前
    */
}
// const 声明一个只读的常量，一旦声明，常量的值就不能改变。
{
    const A = 1;
    // A = 2;
    console.log(A);

}

// Object.defineProperty(obj, prop, descriptor)
// obj：必需。目标对象
// prop：必需。需定义或修改的属性的名字
// descriptor：必需。目标属性所拥有的特性
{
    let B = {};
    Object.defineProperty(B, 'name', {
        value: 'Jack',
        writable: true
    })
    B.name = 'rose'
    console.log(B.name);
}









