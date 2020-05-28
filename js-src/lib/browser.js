
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * 声明browser包
 */
Youngli.browser = Youngli.browser || {};

/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/chrome.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/24
 */

///import Youngli.browser;

/**
 * 判断是否为safari浏览器
 */
if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
    Youngli.browser.chrome = parseFloat(RegExp['\x241']);
}
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/firefox.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为firefox浏览器
 */
if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
    Youngli.browser.firefox = parseFloat(RegExp['\x241']);
}
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/ie.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为ie浏览器
 */
if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
    ie = Youngli.browser.ie = parseFloat(RegExp['\x241']);
}

/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/isGecko.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为isGecko
 */
Youngli.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/isStrict.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为标准模式
 */
Youngli.browser.isStrict = document.compatMode == "CSS1Compat";
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/isWebkit.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为isWebkit
 */
Youngli.browser.isWebkit = /webkit/i.test(navigator.userAgent);
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/maxthon.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为maxthon浏览器
 */
try {
    if (/(\d+\.\d)/.test(external.max_version)) {
        Youngli.browser.maxthon = parseFloat(RegExp['\x241']);
    }
} catch (e) {}
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/opera.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为opera浏览器
 */
if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
    Youngli.browser.opera = parseFloat(RegExp['\x241']);
}
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: browser/safari.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */

///import Youngli.browser;

/**
 * 判断是否为safari浏览器
 */
if ((/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent))) {
    Youngli.browser.safari = parseFloat(RegExp['\x241']);
}
 
var browser = Youngli.browser || {};
