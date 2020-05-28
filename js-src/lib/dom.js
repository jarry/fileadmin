
/**
 * 声明dom包
 */

Youngli.dom = Youngli.dom || {};

Youngli.dom.g = function (id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

var g = Youngli.dom.g;

/**
 * 添加目标元素的className
 * 使用者应保证提供的className合法性，不应包含不合法字符
 * className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html
 * 
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             className 要添加的class。允许同时添加多个class，中间使用空白符分隔
 * @return {string} 被操作的DOM元素
 */
Youngli.dom.addClass = function (element, className) {
    element = g(element);

    var classes = trim(className).split(/\s+/), 
        len = classes.length;
    className = element.className.split(/\s+/).join(" ");

    while (len--) {
        (new RegExp("(^| )" + classes[len] + "( |\x24)")).test(className)
            && classes.splice(len, 1);
    }

    element.className = trim(className + ' ' + classes.join(" "));
    return element;
};

/**
 * 获取目标元素的直接子元素列表
 * 
 * @param {HTMLElement|String} element 目标元素或目标元素的id
 * @return {Array} DOM元素列表
 */
Youngli.dom.children = function (element) {
    element = g(element);

    for (var children = [], tmpEl = element.firstChild; tmpEl; tmpEl = tmpEl.nextSibling) {
        if (tmpEl.nodeType == 1) {
            children.push(tmpEl);
        }
    }
    
    return children;    
};

/**
 * 获取目标元素所属的document对象
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {HTMLDocument} element所属的document对象
 */
Youngli.dom.getDocument = function (element) {
    element = Youngli.dom.g(element);
    return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};

/*
 * 获取目标元素元素相对于整个文档左上角的位置
 *
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @return {Object} 
 *   {
 *       left:xx,//{integer} 页面距离页面左上角的水平偏移量
 *       top:xx //{integer} 页面距离页面坐上角的垂直偏移量
 *   }
 */
Youngli.dom.getPosition = function (element) {
    var doc = Youngli.dom.getDocument(element);
       // browser = browser;

    element = Youngli.dom.g(element);

    // Gecko browsers normally use getBoxObjectFor to calculate the position.
    // When invoked for an element with an implicit absolute position though it
    // can be off by one. Therefor the recursive implementation is used in those
    // (relatively rare) cases.
    var BUGGY_GECKO_BOX_OBJECT = browser.isGecko > 0 && 
                                 doc.getBoxObjectFor &&
                                 Youngli.dom.getStyle(element, 'position') == 'absolute' &&
                                 (element.style.top === '' || element.style.left === '');

    // NOTE(arv): If element is hidden (display none or disconnected or any the
    // ancestors are hidden) we get (0,0) by default but we still do the
    // accumulation of scroll position.

    var pos = {"left":0,"top":0};

    var viewportElement = (browser.ie && !browser.isStrict) ? doc.body : doc.documentElement;
    
    if(element == viewportElement){
        // viewport is always at 0,0 as that defined the coordinate system for this
        // function - this avoids special case checks in the code below
        return pos;
    }

    var parent = null;
    var box;

    if(element.getBoundingClientRect){ // IE and Gecko 1.9+
        box = element.getBoundingClientRect();

        pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        pos.top  = Math.floor(box.top)  + Math.max(doc.documentElement.scrollTop,  doc.body.scrollTop);
	        
        // IE adds the HTML element's border, by default it is medium which is 2px
        // IE 6 and 7 quirks mode the border width is overwritable by the following css html { border: 0; }
        // IE 7 standards mode, the border is always 2px
        // This border/offset is typically represented by the clientLeft and clientTop properties
        // However, in IE6 and 7 quirks mode the clientLeft and clientTop properties are not updated when overwriting it via CSS
        // Therefore this method will be off by 2px in IE while in quirksmode
        pos.left -= doc.documentElement.clientLeft;
        pos.top  -= doc.documentElement.clientTop;

        if(browser.ie && !browser.isStrict){
            pos.left -= 2;
            pos.top  -= 2;
        }
    } else if (doc.getBoxObjectFor && !BUGGY_GECKO_BOX_OBJECT/* && !goog.style.BUGGY_CAMINO_*/){ // gecko
        // Gecko ignores the scroll values for ancestors, up to 1.9.  See:
        // https://bugzilla.mozilla.org/show_bug.cgi?id=328881 and
        // https://bugzilla.mozilla.org/show_bug.cgi?id=330619

        box = doc.getBoxObjectFor(element);
        var vpBox = doc.getBoxObjectFor(viewportElement);
        pos.left = box.screenX - vpBox.screenX;
        pos.top  = box.screenY - vpBox.screenY;
    } else { // safari/opera
        parent = element;

        do {
            pos.left += parent.offsetLeft;
            pos.top  += parent.offsetTop;
      
            // In Safari when hit a position fixed element the rest of the offsets
            // are not correct.
            if (browser.isWebkit > 0 && Youngli.dom.getStyle(parent, 'position') == 'fixed') {
                pos.left += doc.body.scrollLeft;
                pos.top  += doc.body.scrollTop;
                break;
            }
            
            parent = parent.offsetParent;
        } while (parent && parent != element);

        // opera & (safari absolute) incorrectly account for body offsetTop
        if(browser.opera > 0 || (browser.isWebkit > 0 && Youngli.dom.getStyle(element, 'position') == 'absolute')){
            pos.top  -= doc.body.offsetTop;
        }

        // accumulate the scroll positions for everything but the body element
        parent = element.offsetParent;
        while (parent && parent != doc.body) {
            pos.left -= parent.scrollLeft;
            // see https://bugs.opera.com/show_bug.cgi?id=249965
            if (!b.opera || parent.tagName != 'TR') {
                pos.top -= parent.scrollTop;
            }
            parent = parent.offsetParent;
        }
    }

    return pos;
};

/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFilter = Youngli.dom._styleFilter || [];

/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFilter[Youngli.dom._styleFilter.length] = {
    set: function (key, value) {
        if (value.constructor == Number 
            && !/zIndex|fontWeight|opacity|zoom|lineHeight/i.test(key)){
            value = value + "px";
        }

        return value;
    }
};

/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFixer = Youngli.dom._styleFixer || {};

/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFixer.display = browser.ie && browser.ie < 7 ? {
    set: function (element, value) {
        element = element.style;
        if (value == 'inline-block') {
            element.display = 'inline';
            element.zoom = 1;
        } else {
            element.display = value;
        }
    }
} : browser.firefox && browser.firefox < 3 ? {
    set: function (element, value) {
        element.style.display = value == 'inline-block' ? '-moz-inline-box' : value;
    }
} : null;


/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFixer["float"] = browser.ie ? "styleFloat" : "cssFloat";

/**
 * 提供给setStyle与getStyle使用
 */
Youngli.dom._styleFixer.opacity = browser.ie ? {
    get: function (element) {
        var filter = element.style.filter;
        filter && filter.indexOf("opacity=") >= 0 ? (parseFloat(filter.match(/opacity=([^)]*)/)[1]) / 100) + "" : "1";
    },

    set: function (element, value) {
        var style = element.style;
        // 只能Quirks Mode下面生效??
        style.filter = (style.filter || "").replace(/alpha\([^\)]*\)/gi, "") + (value == 1 ? "" : "alpha(opacity=" + value * 100 + ")");
        // IE filters only apply to elements with "layout."
        style.zoom = 1;
    }
} : null;


/**
 * 提供给setStyle与getStyle使用，在做textOverflow时会向element对象中添加,_Overflow, _HTML两个属性保存原始的innerHTML信息
 */
Youngli.dom._styleFixer.textOverflow = (function () {
    var fontSizeCache = {};

    function pop(list) {
        var o = list.length;
        if (o > 0) {
            o = list[o - 1];
            list.length--;
        } else {
            o = null;
        }
        return o;
    }

    function setText(element, text) {
        element[browser.firefox ? "textContent" : "innerText"] = text;
    }

    function count(element, width, ellipsis) {
        /* 计算cache的名称 */
        var o = browser.ie ? element.currentStyle || element.style : getComputedStyle(element, null),
            fontWeight = o.fontWeight,
            cacheName =
                "font-family:" + o.fontFamily + ";font-size:" + o.fontSize
                + ";word-spacing:" + o.wordSpacing + ";font-weight:" + ((parseInt(fontWeight) || 0) == 401 ? 700 : fontWeight)
                + ";font-style:" + o.fontStyle + ";font-variant:" + o.fontVariant,
            cache = fontSizeCache[cacheName];

        if (!cache) {
            o = element.appendChild(document.createElement("div"));

            o.style.cssText = "float:left;" + cacheName;
            cache = fontSizeCache[cacheName] = [];

            /* 计算ASCII字符的宽度cache */
            for (i = 0; i < 256; i++) {
                i == 32 ? (o.innerHTML = "&nbsp;") : setText(o, String.fromCharCode(i));
                cache[i] = o.offsetWidth;
            }

            /* 计算非ASCII字符的宽度、字符间距、省略号的宽度 */
            setText(o, "一");
            cache[256] = o.offsetWidth;
            setText(o, "一一");
            cache[257] = o.offsetWidth - cache[256] * 2;
            cache[258] = cache[".".charCodeAt(0)] * 3 + cache[257] * 3;

            element.removeChild(o);
        }

        for (
            /* wordWidth是每个字符或子节点计算之前的宽度序列 */
            var node = element.firstChild, charWidth = cache[256], wordSpacing = cache[257], ellipsisWidth = cache[258],
                wordWidth = [], ellipsis = ellipsis ? ellipsisWidth : 0;
            node;
            node = node.nextSibling
        ) {
            if (width < ellipsis) {
                element.removeChild(node);
            }
            else if (node.nodeType == 3) {
                for (var i = 0, text = node.nodeValue, length = text.length; i < length; i++) {
                    o = text.charCodeAt(i);
                    /* 计算增加字符后剩余的长度 */
                    wordWidth[wordWidth.length] = [width, node, i];
                    width -= (i ? wordSpacing : 0) + (o < 256 ? cache[o] : charWidth);
                    if (width < ellipsis) {
                        break;
                    }
                }
            }
            else {
                o = node.tagName;
                if (o == "IMG" || o == "TABLE") {
                    /* 特殊元素直接删除 */
                    o = node;
                    node = node.previousSibling;
                    element.removeChild(o);
                }
                else {
                    wordWidth[wordWidth.length] = [width, node];
                    width -= node.offsetWidth;
                }
            }
        }

        if (width < ellipsis) {
            /* 过滤直到能得到大于省略号宽度的位置 */
            while (o = pop(wordWidth)) {
                width = o[0];
                node = o[1];
                o = o[2];
                if (node.nodeType == 3) {
                    if (width >= ellipsisWidth) {
                        node.nodeValue = node.nodeValue.substring(0, o) + "...";
                        return true;
                    }
                    else if (!o) {
                        element.removeChild(node);
                    }
                }
                else if (count(node, width, true)) {
                    return true;
                }
                else {
                    element.removeChild(node);
                }
            }

            /* 能显示的宽度小于省略号的宽度，直接不显示 */
            element.innerHTML = "";
        }
    }

    return {
		get: function (element, style) {
            var browser = browser;
			return (browser.opera ? style.OTextOverflow : browser.firefox ? element._Overflow: style.textOverflow) || "clip";
		},

		set: function (element, value) {
            var browser = browser;
			if (element.tagName == "TD" || element.tagName == "TH" || browser.firefox) {
				element._HTML && (element.innerHTML = element._HTML);

				if (value == "ellipsis") {
					element._HTML = element.innerHTML;
					var o = document.createElement("div"), width = element.appendChild(o).offsetWidth;
					element.removeChild(o);
					count(element, width);
				}
				else {
					element._HTML = "";
				}
			}

			o = element.style;
			browser.opera ? (o.OTextOverflow = value) : browser.firefox ? (element._Overflow = value) : (o.textOverflow = value);
		}
    };
})();

///import Youngli.dom._styleFilter;

/**
 * 为获取和设置样式的过滤器
 * @private
 */
Youngli.dom._styleFilter.filter = function (key, value, method) {
    for (var i = 0, filters = Youngli.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
            value = filter(key, value);
        }
    }

    return value;
};

/*
 * 
 *  Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: dom/getStyle.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/18
 */

///import Youngli.dom.g;
///import Youngli.dom._styleFixer;
///import Youngli.dom._styleFilter.filter;
///import Youngli.string.toCamelCase;

/**
 * 获取DOM元素的样式值
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string}             key     要获取的样式名
 * @return {string} 要获取的样式值
 */
Youngli.dom.getStyle = function (element, key) {
   var dom = Youngli.dom;

    element = dom.g(element);
    key = Youngli.string.toCamelCase(key);

    var value = element.style[key];
    
    // 在取不到值的时候，用fixer进行修正
    if (!value) {
        var fixer = dom._styleFixer[key],
        	/* 在IE下，Element没有在文档树上时，没有currentStyle属性 */
    	    style = element.currentStyle || (browser.ie ? element.style : getComputedStyle(element, null));
            
        if ('string' == typeof fixer) {
            value = style[fixer];
        } else if (fixer && fixer.get) {
            value = fixer.get(element, style);
        } else {
            value = style[key];
        }
    }
    
    /* 检查结果过滤器 */
    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'get');
    }

    return value;
};

/**
 * 从DOM树上移除目标元素
 * 
 * @param {Element|String} element 必需，目标元素或目标元素的id
 * @return {Element} 被操作的DOM元素
 */
Youngli.dom.remove = function (element) {
    element = Youngli.dom.g(element);

    if ("HTML BODY HEAD".indexOf(element.nodeName) == -1) {
        if (browser.ie) {
            var tmpEl = document.createElement('DIV');
            tmpEl.appendChild(element);
            tmpEl.innerHTML = '';
        } else {
            (tmpEl = element.parentNode) && tmpEl.removeChild(element);
        }
    }
};

/**
 * 移除目标元素的className
 * 使用者应保证提供的className合法性，不应包含不合法字符
 * className合法字符参考：http://www.w3.org/TR/CSS2/syndata.html
 * 
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             className 要移除的class，允许同时移除多个class，中间使用空白符分隔
 * @return {HTMLElement} 被操作的DOM元素
 */
Youngli.dom.removeClass = function (element, className) {
    element = Youngli.dom.g(element);
    var trim = string.trim;

    element.className =
        trim(element.className.split(/\s+/).join("  ")
                .replace(
                    new RegExp("(^| )(" 
                        + trim(className).split(/\s+/).join("|") 
                        + ")( |\x24)", "g"), 
                    " ")
                .replace(/\s+/g, ' '));

    return element;
};

/**
 * 设置DOM元素的样式值
 * 
 * @param {HTMLElement|string}  element 目标元素或目标元素的id
 * @param {string}              key     要设置的样式名
 * @param {string}              value   要设置的样式值
 * @return {HTMLElement} 被操作的DOM元素
 */
Youngli.dom.setStyle = function (element, key, value) {
    var dom = Youngli.dom;
    var fixer;
    
    // 放弃了对firefox 0.9的opacity的支持
    element = dom.g(element);
    key = string.toCamelCase(key);

    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'set');
    }

    fixer = dom._styleFixer[key];
    (fixer && fixer.set) ? fixer.set(element, value) : (element.style[fixer || key] = value);

    return element;
};

/**
 * 批量设置DOM元素的样式值
 * 
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Object}             styles  要设置的样式集合
 * @return {HTMLElement} 被操作的DOM元素
 */
Youngli.dom.setStyles = function (element, styles) {
    element = Youngli.dom.g(element);

    for (var key in styles) {
        Youngli.dom.setStyle(element, key, styles[key]);
    }

    return element;
};

var dom = Youngli.dom || {};