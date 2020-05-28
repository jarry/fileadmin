/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/dir.act.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 目录Action
 * 目录显示功能事件
 * @author lichunping/jarry
 */

DirAction = function() {

	var dirClass = new Directory();
	var page     = g('Page');

	var DIR      = dirClass.DIR; // 与directory类相同
	var dirPath  = global.DIR_PATH;
	var FileListContent = dirClass.FileListContent; 
	var DirList = dirClass.DirList;
	var FileList = dirClass.FileList;
	
	var dragBar = dragBar || g('DragBar');
	/**
	 * 设置页面高度
	 */ 
	var setPageHeight = function() {
		var h = document.body.offsetHeight ;
		h = h > 200 ? h : 200;
		var height = h - 180;
		if(browser.ie <= 6){
			height = h - 200;
		}
		dom.setStyle(FileListContent, "height", height);
		dom.setStyle(DirList, "height", height + 41);
		dom.setStyle(dragBar, "height", height + 41);
	};
	
	/**
	 * 拖动改变左右列宽度
	 */
	function dragColumn() {
			if ('undefined' == typeof dragBar) return;
			var dragSide = new Drag();
			dragSide.obj = dragBar;			
			// 定义拖拽区域，限定横向拖拽，且左右最小距离为50,200
			dragSide.range = {
					minX : 50, 
					minY : dom.getPosition(dragBar).top, 
					maxX : document.body.offsetWidth - 200,
					maxY : dom.getPosition(dragBar).top + dragBar.offsetHeight	
			};
			var DirList = DirList || g('DirList');
			var FileList = FileList || g('FileList');
			// 加载拖拽事件,实时更改侧栏宽度
			var process = 0;
			dragSide.onmousemove = function() {
				var ex = dragSide.mousePosition.x;
				var ey = dragSide.mousePosition.y;
				process = this.position.left - this.range.minX;
//              var percent  = process / (this.range.maxX - this.obj.offsetWidth - this.range.minX) * 100;				
				var DirListWidth = DirList.offsetWidth;
				var marginLeft = parseInt(FileList.style.paddingLeft);
				DirList.style.width = process + 55 + 'px';					
				FileList.style.marginLeft = process - 162 + 'px';			
			}
			// 写入进度到Cookie中
			dragSide.onmousestop = function() {
				Youngli.cookie.set('dragColumn.process', process, {
							path    : '',
							expires : 60 * 60 * 24 * 365,
							domain  : '',
							secure  : '' 
						}
				);	
			}
			dragSide.init();	
	}
	
	/**
	 * 从cookie中取出进度值，回填到DirList与FileList中
	 */
	var setDragColumnProcess = function() {
			var process = Youngli.cookie.get('dragColumn.process');
			if (process) {
				var process = parseInt(process);
				dragBar.style.left        = process + 50  + 'px';
				FileList.style.marginLeft = process - 162 + 'px';			
				DirList.style.width	      = process + 55  + 'px';
			}
	}

	/**
	 * 初始化函数
	 */
	var pageInit = function() {
		setDragColumnProcess();
		getDirJSON('');			//	初始化传入空路径
		dirClass.setDirAndFileList();		
		setPageHeight();
	}
	
	var getDirJSON = function(path) {
		var url = dirPath + '?path=' + encodeURIComponent(path);
		var xhr = ajax.get(url, _parseDirJSON);
		// 每次重新加载文件夹列表时关闭编辑区域'FileEditBar'
		if(FileAction && FileAction.hideFileEditBar) {
			FileAction.hideFileEditBar();
		}
	}

	/**
	 * Ajax的回调函数
	 * @param {object} xhr对象
	 * @param {String} xhr获得的结果
	 */
	var _parseDirJSON = function(xhr, responseText) {
		eval(responseText);
		dirClass.setFileAndFolderList(DIR);
		dirClass.setInfoPanel(DIR);
		FileAction.initTableListRowEvent();		// 初始化table里面的tr，增加事件
	}

	/**
	 * 点击文件夹，load相应目录树 
	 * @param {String} path 路径
	 */
	var openFolder = function(path) {
		// 找到tree里面的节点，刷新相应节点的数据，做到同步响应		
		if (global.OPEN_FOLDER_UPDATE_TREE) {
//          loadXML and refresh dir tree;
//		    var id = encodeURL(path);		
			var id = decodeHTML(path) + getSlash(path);
			var sn = (new Date()).valueOf();	
			var parentPath = getParentPath(id);
			var dirUrl = "dir!getTree.action?id=" + id;
			dirUrl = dirUrl + "&uid=" + sn;
			if (Tree.getOpenState(parentPath) != 1 && Tree.getOpenState(id) != 1) {
			  // 如果不是打开状态则加载内容并打开
				Tree.openItem(parentPath);
			  // 有openItem可以不再重新load Tree
//			Tree.loadXML(dirUrl, Tree.selectItem(id));
//			Tree.focusItem(id);
			  // 打开item后要超时再选择子item
				window.setTimeout(function(){Tree.selectItem(id)}, 100);
			} else {
				Tree.selectItem(id);
			}
		}
		getDirJSON(path);
	}
	
	return {
		pageInit      : pageInit,            //  初始化页面
		setPageHeight : setPageHeight,       //  设置页面高度
		getDirJSON    : getDirJSON,          //  得到dir的JSON数据
		openFolder    : openFolder,
		dragColumn    : dragColumn
	}
	
}();
 
DirAction.pageInit();
Youngli.on(window, "onresize", DirAction.setPageHeight);
Youngli.on(window, "onload", DirAction.dragColumn);


