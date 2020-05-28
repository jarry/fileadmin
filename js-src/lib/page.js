/**
 * 声明Youngli.page包
 */
Youngli.page = Youngli.page || {};

/**
 * 获取页面高度
 * 
 * @return {number} 页面高度
 */
Youngli.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/loadCssFile.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 动态在页面上加载一个外部css文件
 * 
 * @param {String} path css文件路径
 */
Youngli.page.loadCssFile = function (path) {
    var element = document.createElement("link");
    
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", path);

    document.getElementsByTagName("head")[0].appendChild(element);        
};
/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/getScrollLeft.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取横向滚动量
 * 
 * @return {number} 横向滚动量
 */
Youngli.page.getScrollLeft = function () {
    var d = document;
    return d.documentElement.scrollLeft || d.body.scrollLeft;
};
/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/getViewWidth.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 获取页面视觉区域宽度
 * 
 * @return {number} 页面视觉区域宽度
 */
Youngli.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/loadJsFile.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 动态在页面上加载一个外部js文件
 * 
 * @param {String} path js文件路径
 */
Youngli.page.loadJsFile = function (path) {
    var element = document.createElement('script');

    element.setAttribute('type', 'text/javascript');
    element.setAttribute('src', path);
    element.setAttribute('defer', 'defer');

    document.getElementsByTagName("head")[0].appendChild(element);    
};/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/getWidth.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/03
 */



/**
 * 获取页面宽度
 * 
 * @return {number} 页面宽度
 */
Youngli.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/getScrollTop.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 获取纵向滚动量
 * 
 * @return {number} 纵向滚动量
 */
Youngli.page.getScrollTop = function () {
    var d = document;
    return d.documentElement.scrollTop || d.body.scrollTop;
};
/*
 * 
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: youngli/page/getViewHeight.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * 获取页面视觉区域高度
 * 
 * @return {number} 页面视觉区域高度
 */
Youngli.page.getViewHeight = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};

// 声明快捷方式
var page = Youngli.page;