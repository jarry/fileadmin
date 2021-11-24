
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.ajax;
///import Youngli.ajax.request;

/**
 * 将一个表单用ajax方式提交
 * 
 * @param {HTMLFormElement} form             需要提交的表单元素
 * @param {Object}          options optional 发送请求的选项参数
 * @config {boolean}  async      是否是异步请求。默认是异步请求
 * @config {string}   username   用户名
 * @config {string}   password   密码
 * @config {Object}   headers    要设置的request headers
 * @config {Function} replacer   对参数值特殊处理的函数
 * @config {Function} onsuccess  请求成功之后调用的函数。传递的参数是xhr对象
 * @config {Function} onfailure  请求失败之后调用的函数。传递的参数是xhr对象
 * @config {Function} onstatus   请求成功之后调用的函数。传递的参数是xhr对象和状态码
 * @config {Function} on状态码    如事件是on404时，如果返回码是404，调用这个函数
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */

Youngli.ajax = Youngli.ajax || {};

Youngli.ajax.form = function (form, options) {
    options = options || {};
    var elements    = form.elements,
        len         = elements.length,
        method      = form.getAttribute('method'),
        url         = form.getAttribute('action'),
        replacer    = options.replacer || function (value, name) {
            return value;
        },
        sendOptions = {},
        data = [],
        i, item, itemType, itemName, itemValue, 
        opts, oi, oLen, oItem;
        
    /**
     * 向缓冲区添加参数数据
     * @private
     */
    function addData(name, value) {
        data.push(name + '=' + value);
    }
    
    // 复制发送参数选项对象
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            sendOptions[i] = options[i];
        }
    }
    
    for (i = 0; i < len; i++) {
        item = elements[i];
        itemName = item.name;
        
        // 处理：可用并包含表单name的表单项
        if (!item.disabled && itemName) {
            itemType = item.type;
            itemValue = item.value;
        
            switch (itemType) {
            // radio和checkbox被选中时，拼装queryString数据
            case 'radio':
            case 'checkbox':
                if (!item.checked) {
                    break;
                }
                
            // 默认类型，拼装queryString数据
            case 'textarea':
            case 'text':
            case 'password':
            case 'hidden':
            case 'select-one':
                addData(itemName, replacer(itemValue, itemName));
                break;
                
            // 多行选中select，拼装所有选中的数据
            case 'select-multiple':
                opts = item.options;
                oLen = opts.length;
                for (oi = 0; oi < oLen; oi++) {
                    oItem = opts[oi];
                    if (oItem.selected) {
                        addData(itemName, replacer(oItem.value, itemName));
                    }
                }
                break;
            }
        }
    }
    
    // 完善发送请求的参数选项
    sendOptions.data = data.join('&');
    sendOptions.method = form.getAttribute('method') || 'POST';
    
    // 发送请求
    return Youngli.ajax.request(url, sendOptions);
};
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.ajax;
///import Youngli.ajax.request;

/**
 * 发送get请求的简单外观接口
 * 
 * @param {string}   url                需要发送请求的地址
 * @param {Function} onsuccess optional 请求成功之后调用的函数
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
Youngli.ajax.get = function (url, onsuccess) {
    return Youngli.ajax.request(url, {'onsuccess': onsuccess});
};
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.ajax;
///import Youngli.ajax.request;

/**
 * 发送post请求的简单外观接口
 * 
 * @param {string}   url                需要发送请求的地址
 * @param {string}   data               需要发送的数据
 * @param {Function} onsuccess optional 请求成功之后调用的函数。传递的参数是xhr对象
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
Youngli.ajax.post = function (url, data, onsuccess, onprogress) {
    return Youngli.ajax.request(
        url, 
        {
            'onsuccess': onsuccess,
            'onprogress': onprogress,
            'method': 'POST',
            'data': data
        }
    );
};
/*
 * 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import Youngli.ajax;

/**
 * 使用XMLHttpRequest对象发送请求
 * 
 * @param {String} url              需要发送请求的地址
 * @param {Object} options optional 发送请求的其他可选参数
 * @config {boolean}  async      是否是异步请求。默认是异步请求
 * @config {string}   data       需要发送的数据。如果是GET请求的话，不需要这个属性
 * @config {string}   username   用户名
 * @config {string}   password   密码
 * @config {string}   method     请求的类型，默认是GET
 * @config {Object}   headers    要设置的request headers
 * @config {Function} onsuccess  请求成功之后调用的函数。传递的参数是xhr对象
 * @config {Function} onfailure  请求失败之后调用的函数。传递的参数是xhr对象
 * @config {Function} onstatus   请求成功之后调用的函数。传递的参数是xhr对象和状态码
 * @config {Function} on状态码    如事件是on404时，如果返回码是404，调用这个函数
 * @return {XMLHttpRequest} 发送请求的xhr对象
 */
Youngli.ajax.request = function (url, options) {
    /**
     * readyState发生变更时调用
     * 
     * @ignore
     */
    function stateChangeHandler() {
        if (xhr.readyState == 4) {
            try {
                var stat = xhr.status;
            } catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('failure');
                return;
            }
            
            fire(stat);
            
            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout      
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable
            
            // IE error sometimes returns 1223 when it 
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat == 304
                || stat == 1223) {
                fire('success');
            } else {
                fire('failure');
            }
            
            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             * 
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             * 
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    // 避免内存泄露
                    xhr.onreadystatechange = new Function();
                    if (async) {
                        xhr = null;
                    }
                }, 0);
        }
    }
    
    /**
     * 获取XMLHttpRequest对象
     * 
     * @ignore
     * @return {XMLHttpRequest} XMLHttpRequest对象
     */
    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    
    /**
     * 触发事件
     * 
     * @ignore
     * @param {String} type 事件类型
     */
    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type],
            globelHandler = Youngli.ajax[type];
        
        // 不对事件类型进行验证
        if (handler) {
            if (type != 'onsuccess') {
                handler(xhr);
            } else {
                handler(xhr, xhr.responseText);
            }
        } else if (globelHandler) {
            //onsuccess不支持全局事件
            if (type == 'onsuccess') {
                return;
            }
            globelHandler(xhr);
        }
    }
    
    
    options = options || {};
    var data        = options.data || "",
        async       = !(options.async === false),
        username    = options.username || "",
        password    = options.password || "",
        method      = (options.method || "GET").toUpperCase(),
        headers     = options.headers || {},
        eventHandlers = {},
        key, xhr;
    
    for (key in options) {
        // 将options参数中的事件参数复制到eventHandlers对象中
        // 这里复制所有options的成员，eventHandlers有冗余
        // 但是不会产生任何影响，并且代码紧凑
        eventHandlers[key] = options[key];
    }
    
    headers['X-Request-By'] = 'ajax';
    
    
    try {
        xhr = getXHR();
        
        if (method == 'GET') {
            url += (url.indexOf('?') >= 0 ? '&' : '?');
            if (data) {
                url += data + '&';
                data = null;
            }
            url += 'b' + (new Date()).getTime() + '=1';
        }

        // add onprogress event by jarry
        if (xhr.upoload && xhreventHandlers['onprogress']) {
          xhr.upoload.onprogress = function(event) {
            eventHandlers['onprogress'].call(xhr, event);
          }
        }
        
        if (username) {
            xhr.open(method, url, async, username, password);
        } else {
            xhr.open(method, url, async);
        }
        
        if (async) {
            xhr.onreadystatechange = stateChangeHandler;
        }
        
        // 在open之后再进行http请求头设定
        if (method == 'POST') {
            if (!(data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
        }
        
        for (key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        
        fire('beforerequest');
        xhr.send(data);
        
        if (!async) {
            stateChangeHandler();
        }
    } catch (ex) {
        fire('failure');
    }
    
    return xhr;
};

var ajax = Youngli.ajax;