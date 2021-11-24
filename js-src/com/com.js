
/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/com/com.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */
 
/**
 * FA使用的公共函数库
 * author: lichunping/jarry
 */
 
 /**
  * 得到文件名的后缀格式
  * 
  * @param {string} name 文件名
  * @return {string} ext 扩展名
  * @author jarry
  */
var getExt = function(name) {
	if (name && name.length > 0) {
		var ext;	
		var lastDotAt = name.lastIndexOf(".");
		if (lastDotAt != -1) {
			ext = name.substr(lastDotAt + 1);
		} else {
			ext = "";
		}
	}
	return ext
}	

var OFFICE_FILE_EXT = [
	'doc', 'ppt', 'xls', 'docx', 'pptx', 'xlsx'
];

var isOfficeFile = function(ext) {
	if (ext != null && ext.length > 0) {
		var  index = array.indexOf(OFFICE_FILE_EXT, ext.toLowerCase());
		if (index != -1) {
			return true;
		}
	}
	return false;
}

var getFolderIconCss = function() {
	return 'folder';
}

var	getFileIconCss = function(type) {
	if (type == 'folder') return 'folder';
	type = type.toLowerCase();		
	switch(type) {
		// 常用文档
		case 'doc' : 
				ext = 'doc'; break;
		case 'docx' : 
				ext = 'doc'; break;
		case 'xls' : 
				ext = 'xls'; break;
		case 'xlsx' : 
				ext = 'xls'; break;
		case 'ppt' : 
				ext = 'ppt'; break;
		case 'pptx' : 
				ext = 'ppt'; break;
		case 'pdf' : 
				ext = 'pdf'; break;
		case 'txt' : 
				ext = 'txt'; break;
		
		// 可执行文件		
		case 'exe' : 
				ext = 'exe'; break;
		
		// web文件		
		case 'html' : 
				ext = 'html'; break;
		case 'htm' : 
				ext = 'html'; break;
		case 'css' : 
				ext = 'css'; break;
		case 'js' : 
				ext = 'js'; break;	
		case 'swf' : 
				ext = 'swf'; break;	
		case 'fla' : 
				ext = 'swf'; break;		

		// 压缩				
		case 'zip' : 
				ext = 'zip'; break;
		case 'rar' : 
				ext = 'rar'; break;
		case 'gz' : 
				ext = 'rar'; break;
		case 'tar' : 
				ext = 'rar'; break;
				
		// 图片		
		case 'gif' : 		
				ext = 'gif'; break;
		case 'png' : 		
				ext = 'png'; break;
		case 'jpg' : 		
				ext = 'jpg'; break;		
				
		// 音乐		
		case 'mp3' : 		
				ext = 'mp3'; break;
		case 'wma' : 		
				ext = 'mp3'; break;
		case 'wav' : 		
				ext = 'mp3'; break;
		case 'rm' : 		
				ext = 'rm'; break;									
					
		default : 
				ext = 'file';				
	}			
	return ext;			
};

/**
 * 解开后台java encode html方法，解码字符包括 & ' " < >
 * @param {String} html 传入的html字符串
 * @return {String} 解码后的字符串
 * @author jarryli@gmail.com
 */
var decodeHTML = function(html) {
	if (!html || html.length <= 0) return html;
	html = html.replace(/&amp;/g, "&");
	html = html.replace(/&#039;/g, "'");
	html = html.replace(/&quot;/g, "\"");
	html = html.replace(/&lt;/g, "<");
	html = html.replace(/&gt;/g, ">");
	return html;
} 

var encodeURLCharForFlash = function(url) {
	url = url.replace(/&/g, '&amp;');
	return url;
}

/**
 * 解开前端为了进过html字符编码的字串
 * @param {String} str 传入的字符串
 * @return {String} 解码后的字符串
 * @author jarryli@gmail.com
 */
var decodeSpecial = function(str) {
	if (!str || str.length <= 0) return str;
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/'/g, '&#039;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	return str;
}

/**
 * 根据路径名是否需要增加斜杠
 * @param {String} path 路径
 * @return {String} slash 斜杠或者空字符串
 * @author jarryli@gmail.com
 */
var getSlash = function(path) {
	if (path === null || path === undefined || path.length <= 0) return path;
	var last = path.substring(path.length - 1);
	//alert(path + " | " + last);
	if (last == '/' || last == '\\') {
		return '';
	}
	return '/';
}

/**
 * 若最后一个字符是斜杠或反斜杠，就删除斜杠
 * @param {String} path 路径, 长度不小于1
 * @param {String} path 新路径
 */
var removeLastSlash = function(path) {
	if (path == null || path.length <= 1) return path;
	var last = path.substring(path.length - 1);
	if (last == '/' || last == '\\') {
		return path.substr(0, path.length - 1);
	}
	return path;
}

/**
 * 根据路径名返回上一级目录
 * @param {String} path 路径
 * @return {String} slash 新路径
 * @author jarryli@gmail.com
 */
var	getParentPath = function(path) {
	if (path == null || path.length <= 0) return path;
	var parentPath = path;
	parentPath = removeLastSlash(parentPath);
	parentPath = replaceSlash(parentPath);
	// 若最后一位是斜杠，则先移除最后一个字符
	// 把反斜杠(\)替换成斜杠(/)
	var lastSlash = parentPath.lastIndexOf("/");
	if (lastSlash != -1 ) {
		return parentPath.substr(0, lastSlash + 1);
	}
	return path;
}

/**
 * 给JS加上转义字符，仅包含单引号与双引号
 */
var encodeJS = function (str) {
	str = str.replace(/'/g, '\'');
	str = str.replace(/"/g, '\"');
	return str;
}

/**
 * 给JS加上转义字符，仅包含单引号与双引号
 * 因为用作js传递参数，需要给\再转义
 * 在dir.class.js在窗口内打开文件夹用到
 */
var encodeforJS = function(str) {
	str = str.replace(/'/g, '\\\'');
	str = str.replace(/"/g, '\\\"');
	return str;	
}

// 特殊字符，含不允许单引号
//var SPECIAL_CHAR = ['\\', '/', ':', '*', '?', '"', '<', '>', '|', '\''];
var SPECIAL_CHAR = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];

/**
 * 校验文件名是否合法，不能含有的字符见 SPECIAL_CHAR
 * @param {String} name
 * @return {Boolean} true || false
 */
var isAvailableName = function(name) {
	if (name == null || name.length < 0) return false;
	var regexp = /[\\\/:*?\"<>|]+/g;
	// var regexp = /[\\\/:*?\"<>|\']+/g; // 不允许单引号
	return !regexp.test(name);
}

/**
 * 斜杠替换反斜杠
 * @param path {String}
 * @param path {String}
 *
 */ 
var replaceSlash = function(str) {
	if (str == null || str.length <= 0) return str;
	str = str.replace(/\\/g, "/");
	return str;
}

/**
 * encodeURIComponent路径，但是斜杠除外
 * @param path {String}
 * @param path {String}
 *
 */ 
var encodeURL = function(str) {
	if (str == null || str.length <= 0) return str;
	var newStr = str;
	
	// 过滤http://
	var httpStr = 'http://';
	var hasHttpStr = false;
	if (str.substr(0, 7) == httpStr) {
		hasHttpStr = true;
		str = (str.substr(7));
	}
	
	if (str.indexOf("\\") != -1) {
		str = replaceSlash(str);
	}
	
	if (str.indexOf("/") != -1) {
		var tmpArr = [];
		tmpArr = str.split("/");		

		var len = tmpArr.length;
		for (var i = 0; i < len; i++) {
			tmpArr[i] = encodeURIComponent(tmpArr[i]);
		}		
		
		newStr = tmpArr.join("/");
		// 加上http://
		if (hasHttpStr) {
			newStr = httpStr + tmpArr.join("/");
		}
		return newStr;
	}
	
	return encodeURIComponent(newStr);	
}

/**
 * 创建装html模板的容器，装载在页面中
 *
 */ 
var createTemplateHTMLContainer = function() {
	if (!g('TemplateHTMLContainer')) {
		var div = document.createElement('div');
		div.id = 'TemplateHTMLContainer';
		document.body.appendChild(div);
	}
}

/**
 * 创建装html模板的容器，装载在页面中
 * @param obj {HTMLDivElement}
 */ 
var getTemplateHTMLContainer = function() {
	if (g('TemplateHTMLContainer')) {
		return g('TemplateHTMLContainer');
	} else {
		createTemplateHTMLContainer();
		return g('TemplateHTMLContainer');
	}
}

/**
 * 开关遮罩层
 * @param obj {HTMLDivElement}，无obj时默认id为mask 
 * @param act {String} hide | show ，无act时，根据当前状态开关
 * 
 */ 
var toggleMask = function(obj, act) {
	var mask = (obj && typeof obj == 'object') ? obj : g('mask'); 
	if (act != null && act.length > 0) {
		mask.style.display = act;
	} else {
		var isHide = (mask.style.display == '' || mask.style.display == 'none');
		mask.style.display = isHide ? 'block' : 'none';
	}
}


/**
 * action文件的出错信息处理
 * 主要用在无权限访问页面时
 */
function hasError() {
 	
 	this.showTips = function(ErrorMessage) {
 		var str = [];
 		var len = 0;
 		for (var item in ErrorMessage) {
 			str.push(ErrorMessage[item] + '\r\n');
 			len ++;
 		}
 		
 		if (len > 0) {
			alert(str.join(''));
			//delete ErrorMessage;
			ErrorMessage = {};
			gotoUrl();
			return true;
 		}
 		// 错误提示小于0，表示空，可返回true
 		return false;
 	}
 	
 	this.gotoUrl = function() {
 		window.location.replace(global.FA_LOGIN_URL);
 	}
 
 	return showTips(ErrorMessage);

 }

//  function httpRequest(options) {
// 	options = options || {};
// 	var type = options.type || 'GET';
// 	var url = options.url;
// 	if (!url) {
// 			logger.error('ajax:, url is not correct.', options);
// 			return;
// 	}
// 	var contentType = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
// 	var dataType = options.dataType || 'JSON';
// 	type = type.toUpperCase();
// 	dataType = dataType.toUpperCase();
// 	var cache = options.cache || false;
// 	var async = options.async || true;
// 	var _getXHR = function() {
// 			return new XMLHttpRequest() ||
// 					new ActiveXObject('Msxml2.XMLHTTP') ||
// 					new ActiveXObject('Microsoft.XMLHTTP');
// 	};
// 	var xhr = _getXHR();
// 	var data = '', value = '';
// 	if (typeof options.data == 'string') {
// 			data = options.data;
// 	} else {
// 			for (var item in options.data) {
// 					value = (type == 'GET') ? encodeURIComponent(options.data[item]) : options.data[item];
// 					data += (item + '=' + value + '&');
// 			}
// 			if (data.length > 0 && data[data.length - 1] == '&') {
// 					data = data.substring(0, data.length - 1);
// 			}
// 	}

// 	if (type == 'GET' && (data !== '' || !cache) ) {
// 			var flag = url.indexOf('?') != -1 ? '&' : '?';
// 			url = url + flag;
// 	}
// 	if (type == 'GET' && 'string' == typeof data) {
// 			url += data;
// 	}
// 	if (type == 'GET' && !cache) {
// 			if (url.indexOf('?') != -1) {
// 					url += '&';
// 			}
// 			url += '_=' + new Date().getTime();
// 	}

// 	xhr.open(type, url, async);
// 	xhr.setRequestHeader('Content-Type', contentType);
// 	for (var key in options.headers) {
// 			xhr.setRequestHeader(key, options.headers[key]);
// 	}
// 	xhr.upload.onprogress = function(e) {
// 			if ('function' == typeof options.progress) {
// 					options.progress.apply(xhr, e);
// 			}
// 	};
// 	xhr.onreadystatechange = function() {
// 			var data = xhr.responseText || xhr.responseXML;
// 			if (data && dataType == 'JSON') {
// 					data = _.parseJSON(data);
// 			}
// 			if (xhr.readyState == 4) {
// 					var stat = xhr.status;
// 					if ((stat >= 200 && stat < 300) || stat == 304 ||
// 							stat == 1223 || stat === 0) {
// 							if (options.success) {
// 									options.success.call(xhr, data);
// 							}
// 					} else {
// 							if (options.error) {
// 									options.error.call(xhr, data);
// 							}
// 					}
// 			}
// 	};
// 	xhr.send(data || null);
// 	return xhr;
// }


