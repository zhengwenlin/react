
/**
 * 如何中断一个promise
 * @param {*} promise 
 */
function wrap(promise) {
    let abort;

    let p = new Promise((resolve, reject) => {
        abort = reject
    })

    let resultP = Promise.race([p, promise])
    resultP.abort = abort

    return resultP;
}

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
    }, 3000)
})

let p1 = wrap(p)

p1.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err + 'hehe')
})

setTimeout(() => {
    p1.abort('超时')
}, 4000)