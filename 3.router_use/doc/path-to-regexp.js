const pathToRegexp = require('path-to-regexp');
let reg = pathToRegexp('/home', [], {end: false})
console.log(reg) // /^\/home\/?$/i

console.log(reg.test('/home'))
console.log(reg.test('/home/'))
console.log(reg.test('/home//'))
console.log(reg.test('/home/aa'))
