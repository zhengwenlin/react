function add1(str) {
    return str + '1'
}
function add2(str) {
    return str + '2'
}
function add3(str) {
    return str + '3'
}
// let result = add3(add2(add1('zhufeng')))

// function compose(...fns) {
//     return function (...args) {

//         for (var i = fns.length- 1; i >= 0; i--) {
//             args = fns[i](args)
//         }
//         return args
//     }
// }
function compose(...fns) {
    // add3 add2
    /**
     * 返回：prev= (...args) => {
            return add3(add2(...args))
        }
     */
    // prev add1
    /*
        (...args) => {
            return prev(add1(...args))
        }
    */
    /*
    // let result = add3(add2(add1('zhufeng')))
    (add1(...args)) => {
             return add3(add2(add1(...args)))
         }
    */
    return fns.reduce((prev, current) => {
        return (...args) => {
            return prev(current(...args))
        }
    })
}

let result = compose(add3, add2, add1).toString()
console.log(result)

