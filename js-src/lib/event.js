/* 
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: event.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

///import Youngli.event;

/**
 * 事件监听对象
 */
Youngli.event = Youngli.event || {};
Youngli.event._listeners = Youngli.event._listeners || [];

/**
 * 为目标元素添加事件监听器
 * 
 * @param {HTMLElement|string|window} element  目标元素或目标元素id
 * @param {string}                    type     事件类型
 * @param {Function}                  listener 事件监听器
 * @return {HTMLElement} 目标元素
 */

//Youngli.event.on = function (element, type, listener) {
Youngli.event.on = function (element, type, listener, args) {
    type = type.replace(/^on/i, '');
    if ('string' == typeof element) {
        element = g(element);
    }

//    var fn = function (ev) {
//        // 这里不支持EventArgument
//        // 原因是跨frame的时间挂载
//        listener.call(element, ev);
//    };
	
	// 挂载参数 modified by jarry
	if (typeof args != 'undefined') {
		var fn = function(ev) {
			listener.call(args, ev, element);
		};
	} else {
	    var fn = function (ev) {
	      listener.call(element, ev);
	  };
	}
    
    var lis = Youngli.event._listeners;
    
    // 将监听器存储到数组中
    lis[lis.length] = [element, type, listener, fn];
    
    // 事件监听器挂载
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn);
    } 
    
    return element;
};


/*
 * Copyright 2009 Young li Inc. All rights reserved.
 * 
 * path: event/_unload.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */

///import Youngli.event;

/**
 * 卸载所有事件监听器
 * @private
 */
Youngli.event._unload = function () {
    var lis = Youngli.event._listeners,
        len = lis.length,
        standard = !!window.removeEventListener,
        item, el;
        
    while (len--) {
        item = lis[len];
        el = item[0];
        if (el.removeEventListener) {
            el.removeEventListener(item[1], item[3], false);
        } else if (el.detachEvent){
            el.detachEvent('on' + item[1], item[3]);
        }
    }
    
    if (standard) {
        window.removeEventListener('unload', Youngli.event._unload, false);
    } else {
        window.detachEvent('onunload', Youngli.event._unload);
    }
};

/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 * 
 * path: event/un.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/16
 */


/**
 * 为目标元素移除事件监听器
 * 
 * @param {HTMLElement|string|window} element  目标元素或目标元素id
 * @param {string}                    type     事件类型
 * @param {Function}                  listener 事件监听器
 * @return {HTMLElement} 目标元素
 */
Youngli.event.un = function (element, type, listener) {
    if ('string' == typeof element) {
        element = dom.g(element);
    }
    type = type.replace(/^on/i, '');
    
    var lis = Youngli.event._listeners, 
        len = lis.length,
        isRemoveAll = !listener,
        item;
    
    while (len--) {
        item = lis[len];
        
        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[1] === type
            && item[0] === element
            && (isRemoveAll || item[2] === listener)) {
            if (element.removeEventListener) {
                element.removeEventListener(type, item[3], false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, item[3]);
            }
            lis.splice(len, 1);
        }
    }
    
    return element;
};



// 在页面卸载的时候，将所有事件监听器移除
if (window.attachEvent) {
    window.attachEvent('onunload', Youngli.event._unload);
} else {
    window.addEventListener('unload', Youngli.event._unload, false);
}


/**
 * 停止事件的传播
 * 
 * @param {Event} event 事件对象
 */
Youngli.event.stopPropagation = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};



/**
 * 阻止事件的默认行为
 * 
 * @param {Event} event 事件对象
 */
Youngli.event.preventDefault = function (event) {
	 if (event) { 
	 	 if (event.preventDefault) {
	       event.preventDefault();
	   } else {
	       event.returnValue = false;
	   }
  }
};

/**
 * 停止事件
 * 
 * @param {Event} event 事件对象
 */
Youngli.event.stop = function (event) {
    var e = Youngli.event;
    e.stopPropagation(event);
    e.preventDefault(event);
};


/**
 * 获取事件的触发元素
 * 
 * @param {Event} event 事件对象
 * @return {HTMLElement} 事件的触发元素
 */
Youngli.event.getTarget = function (event) {
    return event.target || event.srcElement;
};


/**
 * 声明快捷方式
 */
Youngli.on = Youngli.event.on;
Youngli.un = Youngli.event.un;

/**
 * 
 * 事件包装类
 * @public
 * @param {event} event EventArgument
 */
function Event(event) {
   event = event || window.event;
   this.target = event.target || event.srcElement;
//   _extend(this, event);
   this.keyCode = event.which ? event.which : event.keyCode;
   this.rightClick = (event.which == 3) || (event.button == 2);
}

/**
 * 
 * 为页面元素添加事件监听器
 * @param {HTMLElement} element 页面元素
 * @param {String} eventType 监听的事件类型
 * @param {Function} listener 监听器
 */
Event.add = function (element, eventType, listener) {
   if (window.addEventListener) {
       element.addEventListener(eventType, listener, false);
   } else {
       element.attachEvent('on' + eventType, listener);
   }
};

/**
 * 为页面元素移除事件监听器
 * @param {HTMLElement} element 页面元素
 * @param {String} eventType 监听的事件类型
 * @param {Function} listener 监听器
 */
Event.remove = function (element, eventType, listener) {
   if (window.removeEventListener) {
       element.removeEventListener(eventType, listener, false);
   } else {
       element.detachEvent('on' + eventType, listener);
   }
};
