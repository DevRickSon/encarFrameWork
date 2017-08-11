exports.getSubString = function(str, start, end){
    return str.substring(start, end);
};

exports.replaceString = function(str, a, b){
    return str.replace(a, b);
};

exports.commify = function(n) {
	var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	n += '';                          // 숫자를 문자열로 변환

	while (reg.test(n))
	n = n.replace(reg, '$1' + ',' + '$2');

	return n;
};
