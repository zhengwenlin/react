const pathToRegexp = require('path-to-regexp');
let reg = pathToRegexp('/home', [], {end: false})
console.log(reg) 
 
// end=true  /^\/home\/?$/i
// end=false  /^\/home\/?(?=\/|$)/i

console.log(reg.test('/home'))
console.log(reg.test('/home/'))
console.log(reg.test('/home//'))
console.log(reg.test('/home/aa'))
