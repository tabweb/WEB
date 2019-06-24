// 引用类型 -> 浅拷贝 深拷贝

// 对象（Object）是引用类型

// arr
/*

let new_arr = arr.concat();
let new_arr = arr.slice();

var new_arr = JSON.parse(JSON.stringify(arr));

*/

{
    function shllow(obj) {
        if (typeof obj !== 'object') return;
        var newObj = obj instanceof Array ? [] : {};
        for (key in obj) {
            console.log(key)
            if (obj.hasOwnProperty(key)) {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }

    let obj = {a: 1, b: {x: 2, c: {y: 3}}}
    let newObj = shllow(obj);
    newObj.a = 'a'
    newObj.b.x = 'x';
    newObj.b.c.y = 'z';
    console.log(obj);
    console.log(newObj);
}
//
{
    let a = {name: 'FE'};
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
