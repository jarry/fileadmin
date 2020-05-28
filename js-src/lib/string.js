
/*
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: string.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

///import Youngli.string;

Youngli.string = Youngli.string || {};

Youngli.string.trim = function (source) {
    return String(source)
            .replace(new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"), "");
};

/**
 * 将目标字符串进行驼峰化处理
 * 
 * @param {string} source 目标字符串
 * @return {string} 驼峰化处理后的字符串
 */
Youngli.string.toCamelCase = function (source) {
    return String(source).replace(/[-_]\D/g, function (match) {
                return match.charAt(1).toUpperCase();
            });
};

/**
 * 判断单双字节，返回字符长度
 * 1个汉字等于2个英文字母
 * @param {string} str 
 * @param {number} 长度
 */
Youngli.string.getCharLength = function(str) {
	if (!str || str.length <= 0)
		return str;
	var sin = 0;
	var dou = 0;
	var len = str.length;
	var c;
	while(len > 0) {
		var c = str.charCodeAt(len); 
		if (c > 0 && c < 128) {
			sin++;
		} else {
			dou += 2;
		}
		len--;
	}
	return sin + dou;
}

/**
 * 声明快捷方式
 */
var toCameCase = Youngli.string.toCamelCase;
var trim = Youngli.string.trim;
var string = Youngli.string;

