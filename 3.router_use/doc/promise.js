/**
 * all方法
 * @param {*} promises promise的数组
 */
Promise.all = function (promises) {
    console.log('my')
    if (!Array.isArray(promises)) {
        throw new Error('第一个参数必须为数组')
    }

    let count = promises.length;
    let result = []
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            promise = promise instanceof Promise ? promise : Promise.resolve(promise)

            promise.then(res => {
                result.push(res)
                if (--count === 0) {
                    resolve(result)
                }
            }, reject)
        })
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
    }, 4000)
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2000)
    }, 2000)
})

// Promise.all([p1, p2]).then(res => { console.log(res) })

/**
 * reace方法
 * @param {*} promises promise的数组
 */
Promise.race = function (promises) {
    console.log('my')
    return new Promise((resolve, jeject) => {
        promises.forEach(promise => {
            promise.then(resolve, jeject)
        })
    })
}

Promise.race([p1, p2]).then(res => { console.log(res) })