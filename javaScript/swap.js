// 赋值交互
{
    //整数变量
    let x = 1, y = 2;
    x = x ^ y;
    y = x ^ y;
    x = x ^ y;
    console.log(x, y); // 2,1
}
{
    // 两个Number变量  交换值
    let x = 1.23, y = 2;
    x = x + y;
    y = x - y;
    x = x - y;
    console.log(x, y);  // 2,1.23
}
{
    let x = 1, y = 2;
    let temp = x;
    x = y;
    y = temp;
    console.log(x, y);
}
{
    // https://www.cnblogs.com/tangjiao/p/9131993.html
    // es6 数组的结构赋值
    let x = 2, y = "string";
    [x, y,] = [y, x,];
    console.log(x, y)
}
