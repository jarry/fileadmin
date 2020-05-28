/*
 * Copyright 2009 Youngli Inc. All rights reserved.
 *
 * path: drag.js
 * author: lichunping/jarryli
 * version: 1.0.0
 * date: 2009/12/16
 */


/**
 * 拖动类
 * @param {DOM object} obj dom 对象
 * @param {Array object} range 区域对象 {minX, minY, maxX, maxY}
 * 
 */
function Drag(obj, range) {
	// 要拖动的对象
	this.obj    = obj || this.obj;
	// 存储鼠标相对于对象的位置以及对象的top与left
	this.position = {};	
	this.mousePosition = {};
	this.mozUserSelect = null;
	this.selectStart = null;
	// 鼠标移动的函数
	this.onmousemove = this.onmousemove || null;

	// 拖动区域
	this.range = range || this.range;
	if (range) {
		this.range = {
				minX : range.minX || null,
				minY : range.minY || null,
				maxX : range.maxX || null,
				maxY : range.maxY || null
		};
	};
	// 开始
	if (this.obj)
		this.init();

 }
Drag.prototype = {
	/**
	 * 函数初始化执行mousedown事件
	 */
	init : function() {
		var drag = this;
		this.obj.onmousedown = function(e) {
			drag.start(e);
		}
	},
	
/**	
	page : function() {
		getScrollLeft : function () {
			var d = document;
			return d.documentElement.scrollLeft || d.body.scrollLeft;
		},
		getScrollTop : function () {
			var d = document;
			return d.documentElement.scrollTop || d.body.scrollTop;
		}
	},
*/

	/**
	 * 获得鼠标坐标的私有函数
	 * @param {event} e 
	 * @param {object} {x : number, y : number}
	 */
	getMousePosition : function(e) {
		e = window.event || e;
        return {
            x : page.getScrollLeft() + e.clientX,
            y : page.getScrollTop() + e.clientY
        };
	},

	_selectOn : function() {
		document.body.style.MozUserSelect = this.mozUserSelect;
		document.onselectstart = function(e) {
			return true
		}; 
	},

	_selectOff : function() {
		this.mozUserSelect = document.body.style.MozUserSelect;
		document.body.style.MozUserSelect = "none";
		document.onselectstart = function(e) {
			return false
		};
	},

	preventEvent : function(e) {
		Youngli.event.preventDefault(e);
	},

	/**
	 * 通过mousedown事件，得到鼠标相对于拖动对象的位置
	 * 再分别挂载document的鼠标移动与释放事件
	 * @param {event} e 
	 */
	start : function(e) {
		var drag = this;
		var obj  = this.obj;
		var mousePos = drag.getMousePosition(e);
		var pos  = dom.getPosition(obj);
		var left = pos.left;
		var top  = pos.top;
	    // 保存鼠标x、y轴减去对象的左边距与上边距信息
		this.position.x = mousePos.x - left;
		this.position.y = mousePos.y - top;
		this.position.left = pos.left;
		this.position.top  = pos.top;
		this._selectOff();
//		Youngli.on(document, "mousemove", drag.move, this);
//		Youngli.on(document, "mousemove", drag.move);
//		Youngli.on(document, "mouseup", drag.end);
		document.onmousemove = function(e) {
			drag.move(e);
		};
		document.onmouseup = function() {			
			drag.end();
		};
		this.preventEvent(e);
	},
	/**
	 * 当鼠标在文档内移动时，重设对象的left与top
	 * 对象的新位置为鼠标坐标减去(原鼠标座标相对于对象的位置)
	 * @param {event} e 
	 */
	move : function(e) {
		try {
			var mousePos = this.getMousePosition(e);			
			this.mousePosition = mousePos;
			var ex = mousePos.x;
			var ey = mousePos.y;
			var obj  = this.obj;
			var left = ex - this.position.x;
			var top  = ey - this.position.y;
			left = left > 0 ? left : 0;
			top  = top  > 0 ? top  : 0;
			// 设定区域
			var range = this.range;
			if ('object' == typeof range) {
				left = Math.max(range.minX, left);
				left = Math.min(range.maxX - this.obj.offsetWidth, left);
				top  = Math.max(range.minY, top);
				top  = Math.min(range.maxY - this.obj.offsetHeight, top);
			}
			obj.style.left = left + 'px';
			obj.style.top  = top + 'px';
			this.position.left = left;
			this.position.top  = top;

			// 鼠标移动时外调的函数
			if ('function' == typeof this.onmousemove) {
				this.onmousemove.call(this);
			}

		} catch(ex) {
			window.status = ex.toString();
		}
	},

	end : function() {
		// 鼠标停止时外调的函数
		if ('function' == typeof this.onmousestop) {
				this.onmousestop.call(this);
		}
		var drag = this;
		var obj = drag.obj;
        if (obj.releaseCapture) {
            obj.releaseCapture();
        } else if (window.captureEvents) {
//           window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
//  Youngli.un(document, "mousemove", drag.move);
		document.onmousemove = null;
		this._selectOn();
	}

};