{
    // 冒泡排序
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

{
    // 快速排序
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
