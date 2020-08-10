// 手写实现一个数组的reducer
// 如果initval传了，则索引从0开始，acc是initval，cur是arr[0]
// 如果initval没有传，则索引从1开始，acc是arr[0]，cur是arr[1]
Array.prototype.myReduce = function (fn, initialState) {
    let index;
    if(initialState !== null && typeof initialState !== 'undefined'){
        //传了初始值，索引从0开始，初始值就是自己
        index = 0
    }else{
        //没传初始值，索引从1开始，初始值是第一个元素
        index = 1;
        initialState = this[0]
    }
    console.log('my')
    for (var i = index; i < this.length; i++) {
        initialState = fn(initialState, this[i], i, this)
    }

    return initialState
}

let arr = [1, 2, 3, 4]
let result = arr.myReduce((prev, current, index, arr) => {
    return prev += current
}, false)
console.log(result)
