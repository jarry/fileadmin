/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/cookie.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * 声明Youngli.cookie包
 */
Youngli.cookie = Youngli.cookie || {};

/**
 * 验证字符串是否合法的cookie键名
 * 
 * @param {string} source 需要遍历的数组
 * @return {boolean} 是否合法的cookie键名
 */
Youngli.cookie._isValidKey = function (key) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string
    
    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>
        
    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

/**
 * 设置cookie的值，不对值进行编码
 * 
 * @param {string} key              需要获取Cookie的键名
 * @param {string} value            需要设置的Cookie值
 * @param {Object} options optional 设置Cookie的其他可选参数
 * @config {string}         path    cookie路径
 * @config {Date|number}    expires cookie过期时间. 如果类型是数字的话, 单位是毫秒
 * @config {string}         domain  cookie域名
 * @config {string}         secure  cookie是否安全传输
 */
Youngli.cookie.setRaw = function (key, value, options) {
    if (!Youngli.cookie._isValidKey(key)) {
        return;
    }
    
    options = options || {};
    //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
    //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的
    
    // 计算cookie过期时间
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }
    
    document.cookie =
        key + "=" + value
        + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "")
        + (options.secure ? "; secure" : ''); 
};

/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/cookie/getRaw.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */


/**
 * 获取cookie的值，不对值进行解码
 * 
 * @param {string} key 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值
 */
Youngli.cookie.getRaw = function (key) {
    if (Youngli.cookie._isValidKey(key)) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);
            
        if (result) {
            return result[2] || null;
        }
    }

    return null;
};


/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/cookie/get.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */


/**
 * 获取cookie的值，并进行decodeURIComponent解码
 * 
 * @param {string} key 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值
 */
Youngli.cookie.get = function (key) {
    var value = Youngli.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};

/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/cookie/set.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/**
 * 设置cookie的值，并进行encodeURIComponent编码
 * 
 * @param {string} key              需要获取Cookie的键名
 * @param {string} value            需要设置的Cookie值
 * @param {Object} options optional 设置Cookie的其他可选参数
 * @config {string}         path    cookie路径
 * @config {Date|number}    expires cookie过期时间. 如果类型是数字的话, 单位是毫秒
 * @config {string}         domain  cookie域名
 * @config {string}         secure  cookie是否安全传输
 */
Youngli.cookie.set = function (key, value, options) {
    Youngli.cookie.setRaw(key, encodeURIComponent(value), options);
};

/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/cookie/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

/**
 * 删除cookie的值
 * 
 * @param {string} key      需要删除Cookie的键名
 * @param {JSON}   options  cookie对应的 path domain expires 等值
 *
 * 20100402 meizz 在删除 cookie 的时候若指定删除的 cookie 的 domain path 
 * 等信息与原设定的 cookie 信息不致时，是无法删除这个 cookie 的。
 */
Youngli.cookie.remove = function (key, options) {
    options = options || {};
    options.expires = new Date(0);
    Youngli.cookie.setRaw(key, '', options);
};