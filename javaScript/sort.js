// 排序算法
// https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95#.E7.A9.A9.E5.AE.9A.E6.80.A7
// .sort()
// https://www.cnblogs.com/huoxiao/p/10239284.html
// https://www.cnblogs.com/saifei/p/9043821.html
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort


// .sort()  => 改变原数组
{
    let arr = [1, 5, 4, 2];
    let compare = function (a, b) {
        console.count();
        console.log(a, b); // 51 45 45 41 24 21
        if (a < b) {           // 按某种排序标准进行比较, a 小于 b
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a must be equal to b
        return 0;
    };
    let compare1 = function{
        return a - b;
    };
    console.log(arr.sort(compare)); // [1, 2, 4, 5]
    console.log(arr); // [1, 2, 4, 5]

    // 最后，永远要记住一句话，凡是返回1或者大于0的正数的时候就要交换位置。（内部实现）
    // 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
    // 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。
    // 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
}
// .sort() 按照数组对象中某个属性值进行排序
{
    let arr = [
        {name: '张飞', age: 30},
        {name: '关羽', age: 34},
        {name: '刘备', age: 60},
    ];
    let compare = function (attr, rev) {
        if (rev == undefined) {
            rev = 1;
        } else {
            rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
            a = a[attr];
            b = b[attr];
            if (a < b) {
                return rev * -1;
            }
            if (a > b) {
                return rev * 1;
            }
            return 0;
        }
    };
    arr.sort(compare('age')); // 升序
    arr.sort(compare('age', false)); // 降序
}

// 冒泡排序
{
    Array.prototype.bubble_sort = function () {
        var i, j, temp;
        for (i = 0; i < this.length - 1; i++)
            for (j = 0; j < this.length - 1 - i; j++)
                if (this[j] > this[j + 1]) {
                    temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
        return this;
    };
    let num = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70];
    console.log(num.bubble_sort()); // [3, 5, 9, 22, 32, 34, 35, 37, 50, 55, 64, 70, 82, 89]
    /************************************/
    bubble = function (arr) {
        for (let i = 0; i <= arr.length; i++) {
            for (let j = 0; j <= arr.length - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let swap = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = swap;
                }
            }
        }
        return arr;
    };
    let a = [2, 3, 7, 9, 4, 2, 1, 4];
    console.log(bubble(a));  //[ 1, 2, 2, 3, 4, 4, 7, 9 ]

// 解析：1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。
// 　　　2.第一轮的时候最后一个元素应该是最大的一个。
// 　　　3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。
}

// 快速排序
{
    let quickSort = function (arr) {
        if (arr.length <= 1) {
            return arr;
        }
        let pivotIndex = Math.floor(arr.length / 2);
        let pivot = arr.splice(pivotIndex, 1)[0];
        let left = [];
        let rigth = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                rigth.push(arr[i]);
            }

        }
        return quickSort(left).concat([pivot], quickSort(rigth));
    };
    let a = [2, 3.1, 7, 9, 4, 2.1, 5, 4, 3.2, 1];
    console.log(quickSort(a));

    // 解析：快速排序是对冒泡排序的一种改进，第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。然后递归调用，在两边都实行快速排序。
}
