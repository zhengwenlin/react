let sm2 =require('./sm2')
let sm3 =require('./sm3')
console.log(sm2)
console.log(sm3.toString())
console.log(sm3('1178747250if.A'))


function smEncrypt(pwd) {
    var sm3Pass = sm3(pwd);
    var allPass = sm3Pass + '|' + pwd;
    var publicKey = $("#publickey").val();
    var encrypt_pass = sm2.doEncrypt(allPass, publicKey, 0);
    return '04'+encrypt_pass;
}