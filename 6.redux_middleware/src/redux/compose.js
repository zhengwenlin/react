export default function compose(...fns) {
    // 如果没有传入参数，就是自己
    if (fns.length === 0) {
        return x => x;
    }
    // 传入一个参数，就是传入的那个参数
    if (fns.length === 1) {
        return fns[0]
    }
    // reduce返回组装后的函数
    return fns.reduce((a, b) => {
        return function (...args) {
            return a(b(...args))
        }
    })
}