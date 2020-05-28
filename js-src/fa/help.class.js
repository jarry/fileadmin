/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/help.class.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 帮助类
 * @author lichunping/jarry
 * 
 */
function Help() {
	this.helpElement = this.helpElement || null;
}

Help.prototype = {
		
		/**
		 * 生成帮助信息的html
		 */
		setHelpHTML : function(content) {
			try {
				// 创建帮助区域内容
				if (!this.helpElement) {
					var html = HTMLTemplate.helpHTML;
					var container = getTemplateHTMLContainer();
					var div = document.createElement('div');
					div.innerHTML = html;
					div.id = 'HelpArea';
					div.className = 'help-area';
					document.body.appendChild(div);
					this.helpElement = div;
					// 填充帮助信息内容
					if (g('HelpContent')) 
						g('HelpContent').innerHTML = content;
				} else {
					// 直接填充帮助信息内容
					if (g('HelpContent')) 
						g('HelpContent').innerHTML = content;
				}
				// 设置居中显示
				this.setPosition(this.helpElement, null, null);				
			} catch (ex) {
				alert(ex.toString());
			}
		},
		
		/**
		 * 设置帮助信息对象的尺寸
		 * @param {object HTMLDivElement} dom 对象
		 * @param {number}  x 纵坐标
		 * @param {number}  y 横坐标
		 * @author lichunping
		 * @version 0.9 
		 */
		setPosition : function(dom, x, y) {
			if(!dom || typeof dom == 'undefined') return;
			
			var windowWidth = document.body.offsetWidth;
			var windowHeight = document.body.offsetHeight;
			var width = 600;
			var height = 400;
			if (!x)
				x = windowWidth > width ? (windowWidth -  width) / 2 : 0;
			if (!y)
				y = windowHeight > height ? (windowHeight -  height) / 2 - 20: 0;
			
			dom.style.left = x + 'px';
			dom.style.top  = y + 'px';
		},
		
	  showHelpElement : function() {
		   if (this.helpElement) {
			   this.helpElement.style.display = '';
		   }
	  },
	  
	  hideHelpElement : function() {
		if (this.helpElement) {
			this.helpElement.style.display = 'none';
		}		
		
	}
	
}