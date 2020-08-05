function encrypt(pwd, sessionkey) {
	var hash = CryptoJS.MD5(sessionkey);
	var key = hash.toString().substring(8, 24);
	key = CryptoJS.enc.Latin1.parse(key);
	var encrypted = CryptoJS.AES.encrypt(pwd, key, {
		iv : key,
		mode : CryptoJS.mode.CBC,
		padding : CryptoJS.pad.ZeroPadding
	});
	
	var verifyCode = CryptoJS.MD5(pwd).toString().substring(8, 24);
	return verifyCode + "|" + encrypted;
}

function smEncrypt(pwd) {
    var sm3Pass = sm3(pwd);
    var allPass = sm3Pass + '|' + pwd;
    var publicKey = $("#publickey").val();
    var encrypt_pass = sm2.doEncrypt(allPass, publicKey, 0);
    return '04'+encrypt_pass;
}