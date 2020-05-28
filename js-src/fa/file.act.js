/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/file.act.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */
var isDeleting = isDeleting || 'null';
/**
 * 文件Action
 * 提供文件改名、复制、删除，鼠标移动事件等功能
 * @author lichunping/jarry
 */
FileAction = (function() {	
	
	var fileClass = new File();
	var filePath  = global.FILE_PATH;
	
	var tableListTr;
	var tableListTrIndex;
	
	var isEditing = false;

	var init = function () {
		Youngli.on(g('CreateNewFolderLink'), "onclick", FileAction.setCreateFolderHTML);
		Youngli.on(g('FileListContent'), "onscroll", function() {
			_hideFileEditBar();
			_hideRenameArea();
//			dom.removeClass(FileAction.tableListTr, 'tr-over');
            removeBgColor(FileAction.tableListTr);
		});	
	}
	
	/**
	 * 鼠标移出了FileTableList区域时
	 * @param {object} event事件
	 */
	var outFileListContent = function(e) {
		e = window.event || e;
		var x, y;
		if(!document.all) {
      		x = e.clientX; y = e.clientY;
     	} else {
        	x = e.x; y = e.y;
	  	}
	  	if (!_isInFileTableList(x, y)) {
	  		_hideFileEditBar();
	  		_hideRenameArea();
	  	}
	}
	
	/**
	 * 判断x,y坐标是否在FileTableList区域
	 * @param {number} x
	 * @param {number} y
	 * @return {boolean} ture || false
	 */
	var _isInFileTableList = function(x, y) {
		if (!x || !y || x <= 0 || y <= 0) return false;
		var top = dom.getPosition(g('FileTableList')).top;
		var left = dom.getPosition(g('FileTableList')).left;
		var width = g('FileTableList').offsetWidth;
		// var height = g('FileTableList').offsetHeight;
		var bottom = dom.getPosition(g('InfoPanel')).top;
		var right = left + width;	
		if ( (x < left || x > right) || 
			 (y < top || y > bottom) 	
			) {
			return false;
		} else {
			return true;
		}
	}
	
	var hideCreateFolder = function() {
		if (g('CreateNewFolder'))
			_hide(g('CreateNewFolder'));
		toggleMask();
	}
	
	/**
	 * 生成创建文件夹的HTML
	 */	
	var setCreateFolderHTML = function () {
		fileClass.setCreateFolderHTML();
		if (g('CreateNewFolder')) {
			try {
				var left = dom.getPosition(this).left;
				var top = dom.getPosition(this).top + 20;
				fileClass.setPosition(g('CreateNewFolder'), left, top);
				_showOrHide(g('CreateNewFolder'));
				_setNewFolderNameInputStatus();
				toggleMask();
			} catch (ex) {
				alert(ex.toString());
			}
		}
	}
	
	var _setNewFolderNameInputStatus = function() {
		if (g('CreateNewFolder').style.display != 'none'
				&& g('NewFolderName')) {
			g('NewFolderName').focus();
			if (g('NewFolderName').value== "" ) _setTips(null, '');
		}
	}
	
	var _setTips = function(id, str) {
		var obj = g(id) || g('CreateNewFolerTips');
		obj.innerHTML = str;
		g('NewFolderName').focus();
	}
	
	/**
	 * 给文件列表的每行添加事件
	 */
	var initTableListRowEvent = function() {
		var tableList = g('FileTableList');
		var len = tableList.rows.length;
		
		for (var i = 0; i < len; i++) {
			var obj = {};
			obj.tr = tableList.rows[i];
			Youngli.on(tableList.rows[i], 'onmouseover', FileAction.setTrOver, obj);
			Youngli.on(tableList.rows[i], 'onmouseout', FileAction.setTrOut);
		}
	}
	
	/**
	 * 给tr增加背景色或去掉背景色
	 * 原来用addClass的className的方式在IE6下存在鼠标移上td后宽度增加而略微跳动的情况(应是IE6的问题)
	 * 因此增加改变背景的专门改变背景色的函数
	 */
	var addBgColor = function(trObj, color) {
		if (!trObj || 'object' != typeof trObj)
		    return;
		color = color || '#edf7fd';
		trObj.style.backgroundColor = color;
	}
	
	/**
	 * 移除背景色也改为直接赋值，而不采用removeClass里className的方式
	 */
	var removeBgColor = function(trObj) {
		if (!trObj || 'object' != typeof trObj)
		    return;
		trObj.style.backgroundColor = '';
	}
	
	/**
	 * 表格tr对象鼠标移上的事件，显示编辑bar
	 * @param {object} obj DOM Element || MouseEvent
	 * 			适用两种不同传值方式，ie、ff或者chrome可以传值不一样
	 */
	var setTrOver = function(obj) {
		if (isEditing) return;
		// it's DOM or mouse event
		// when use Youngli.on() type to add event this.tr is obj.tr
		var trObj = (typeof (obj.tagName) == 'string') ? obj : this.tr;
//		dom.addClass(trObj, 'tr-over');
        addBgColor(trObj);
		setFileEditHTML(trObj);
	}
	
	/**
	 * 创建编辑文件的HTML区域
	 * @param {object} trObj tr对象
	 */
	var setFileEditHTML = function(trObj) {
		FileAction.tableListTrIndex = (_getTableListTrIndex(trObj));
		FileAction.tableListTr = trObj;
		fileClass.setFileEditHTML();
		try {
			// set events for edit area 
			g('FileEditBar').onmouseover = function() {
//				dom.addClass(trObj, 'tr-over');
                addBgColor(trObj);
				_showFileEditBar();
			}
			g('FileEditBar').onmouseout = function() {
				// 鼠标移开去掉tr的背景色
				if(!isEditing) 
				   removeBgColor(trObj);
//   		       dom.removeClass(trObj, 'tr-over');
				// 隐藏编辑区域
				_hideFileEditBar();
			}
			var left = dom.getPosition(trObj).left;
			var top = dom.getPosition(trObj).top;
			var fileNameWidth = trObj.cells[0].firstChild.offsetWidth;
			left += browser.ie ? fileNameWidth + 8 : fileNameWidth + 5;
			fileClass.setPosition(g('FileEditBar'), left, top);      
			_showFileEditBar();
		} catch (ex) {
				alert(ex.toString());
		}
	}
	/**
	 * 表格tr对象鼠标移上的事件，显示编辑bar
	 * @param {object} obj DOM Element || MouseEvent
	 * 			适用两种不同传值方式，ie、ff或者chrome可以传值不一样
	 */	
	var setTrOut = function(obj) {
		if (isEditing) return;
		// it's DOM or mouse event
		// when use Youngli.on() type to add event
		// 'this' for Youngli.on() method
		var trObj = (typeof (obj.tagName) == 'string') ? obj : this;
//		dom.removeClass(trObj, 'tr-over');
        removeBgColor(trObj);
		_hideFileEditBar();
	}
	
	/**
	 * 重命名区域的HTML
	 * @param {object} trObj DOM Element
	 */
	var setRenameArea = function(trObj) {
		fileClass.setRenameArea();
		try {
			if (g('FileRenameArea') && trObj.cells[0]) {
				//var left = dom.getPosition(g('FileEditBar')).left - trObj.cells[0].offsetWidth + 30;
			    var fileNameWidth = trObj.cells[0].firstChild.offsetWidth;
			    var left = dom.getPosition(g('FileEditBar')).left - fileNameWidth + 18;
				var top = dom.getPosition(g('FileEditBar')).top;
				fileClass.setPosition(g('FileRenameArea'), left, top);				
				g('FileRenameArea').style.width = trObj.offsetWidth - 45 + 'px';
				// 鼠标在重命名区域。0不在，1在
				var mouseoverFileRenameArea = 0;
				Youngli.on(g('FileRenameArea'), 'onmouseout', function() {
					mouseoverFileRenameArea = 0;
				});
				Youngli.on(g('FileRenameArea'), 'onmouseover', function() {
					mouseoverFileRenameArea = 1;
					_showRenameArea();
				});
				// 如果鼠标不在重名名区域点击则关闭编辑区域
				Youngli.on(document, 'onclick', function() {
					if (mouseoverFileRenameArea != 1) {
						_hideRenameArea();
//						dom.removeClass(trObj, 'tr-over');
                        removeBgColor(trObj);
					}
				});
				// add `return` keyboard event
				if (g('Rename') != null) {
					g('Rename').value = decodeHTML(trObj.cells[0].firstChild.innerHTML);
					g('Rename').style.width = fileNameWidth + 'px';
                    g('Rename').onkeyup = function(e) {
						e = window.event || e;
						if (e.keyCode == 13)
							renameFile(trObj, this.value);
					}					
				}
//				dom.addClass(trObj, 'tr-over');
                addBgColor(trObj);
				_showRenameArea();
			}
		} catch (ex) {
				alert(ex.toString());
		}
	}
	
	/**
	 * 根据当前dom对象，获得当前tr在table里面的序号
	 * @param {obj} trObj tr对象
	 * @param {obj} table table对象,无参数时默认为g('FileTableList')
	 * @return {number} 位置序号，若无则返回-1
	 * 
	 */
	var _getTableListTrIndex = function(trObj, table) {
		var table = table || g('FileTableList');
		var len = table.rows.length;
		for (var i = 0; i < len; i++) {
			if (table.rows[i] == trObj) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * 根据当前位置，获得当前tr
	 * @param {object} index 位置number
	 * @param {object} table table对象,无参数时默认为g('FileTableList')
	 * @return {HTMLElement} tr对象
	 * 
	 */
	var _getTableTrByIndex = function(index, table) {
		var table = table || g('FileTableList');
		if (table.rows[index]) {
			return table.rows[index];
		}
		return null;
	}

	/**
	 * 重命名文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * @param {string} newName 新名称
	 * 
	 */
	var renameFile = function(trObj, newName) {
		fileClass.renameFile(trObj, newName);
		_hideRenameArea();
	}
	
	/**
	 * 当新建、删除、复制、更改目录名后刷新左侧导航树目录
	 * 
	 */
	var _refreshDirTree = function() {
		try {
			var state = Tree.getOpenState(UPLOAD.uploadPath);
			Tree.refreshItem(decodeHTML(UPLOAD.uploadPath));
			if (state != 1) {
				// 如果之前的状态不是打开就关闭item
				Tree.closeItem(UPLOAD.uploadPath);
				window.setTimeout(function(){Tree.closeItem(UPLOAD.uploadPath)}, 50); 
			}
		} catch (ex) {
			alert(ex.toString());
		}		
	}
	
	/**
	 * tableListTr获得文件的type
	 */
	var _getType = function() {
		var type;
		if ('object' == typeof FileAction.tableListTr.cells
				&& FileAction.tableListTr.cells[3]
				) {			
			type = (FileAction.tableListTr.cells[3].innerHTML);
		}
		return type;
	}
	
	var parseRenameJSON = function(xhr, responseText) {
		eval(responseText);
		if (MESSAGE['1'] == 'RENAME_RESULT=success') {
			DirAction.getDirJSON(decodeHTML(UPLOAD.uploadPath));
			if (FileAction.tableListTr.cells[3].innerHTML == 'folder') {
				_refreshDirTree();
			}
		} else {
			getReNameError(MESSAGE);
		}
	}
	
	/**
	 * 复制文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * 
	 */
	var copyFile = function(trObj) {
		fileClass.copyFile(trObj);
		_hideFileEditBar();
	}
	
	var parseCopyJSON = function(xhr, responseText) {
		eval(responseText);
		if (MESSAGE['2'] == 'COPY_RESULT=success') {
			DirAction.getDirJSON(decodeHTML(UPLOAD.uploadPath));
			_refreshDirTree();
		} else {
			getCopyFileError(MESSAGE);
		}
	}

	/**
	 * 删除文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * @param {number} trIndex tr所属位置
	 * 
	 */
	var deleteFile = function(trObj) {
		_hideFileEditBar();
		// 根据位置重新来得到对象
		trObj = _getTableTrByIndex(FileAction.tableListTrIndex);
		if(!trObj || 'object' != typeof trObj)
			return;
		FileAction.tableListTr = trObj;
		fileClass.deleteFile(trObj);
	} 
	
	var parseDeleteJSON = function(xhr, responseText) {
		eval(responseText);
		if (MESSAGE) {
			if (MESSAGE['1'] == 'DELETE_RESULT=success') {
				// refreshItem when delete the folder
				if (FileAction.tableListTr.cells[3]
					&& FileAction.tableListTr.cells[3].innerHTML == 'folder') {
					_refreshDirTree();
				}
				// 可以使用DOM删除与再次加载数据的方式生成表格
//				g('FileTableList').deleteRow(FileAction.tableListTrIndex);
//				g('FileTableList').childNodes[1].removeChild(FileAction.tableListTr);
// 				// 重新加载数据
				DirAction.getDirJSON(decodeHTML(UPLOAD.uploadPath));		
			} else {
				getDeleteFileError(MESSAGE);
			}			
		}
	}
		
	var createFolder = function(path, name) {
		if(name == null || trim(name).length == '') {
			_setTips(null, '请输入文件夹名称');
			return false;
		}
		if(!isAvailableName(name)) {
			_setTips(null, '名字不能含有:' + SPECIAL_CHAR.join(', ') + ' 字符');
			return false;
		}
		if (isAvailableName(name)) {
			fileClass.getFolderJSON(path, name);
		}
		return false;
	}
	
	var parseFolderJSON = function(xhr, responseText) {
//		FILE 作为传递过来的JSON数据，可以根据这个数据insertBefore到table的某行中
//		类似删除文件时的DOM操作，这样可以减少一次请求，等有时间再升级
//      返回JSON串
//		var FILE = {
//			newFolder : {
//				name : 'lichunping',
//				length : '10',
//				date : '20100506',
//				type : '文件夹'
//			}
//		}
		eval(responseText);
		if (MESSAGE) {
			if (MESSAGE['1'] == 'MKDIR_RESULT=failed') {
				getCreateNewFolderError(MESSAGE);
				return;
			}			
		}
		// 重新加载一边table list，或者根据返回的json插入一行
		fileClass.insertRow(FILE.newFolder);
		hideCreateFolder();
		// 新建文件夹后刷新目录树
		_refreshDirTree();
	}
	
	var _showOrHide = function(obj) {
		if ('object' != typeof obj) return;
		var isHide = ((obj.style.display == '' || obj.style.display == 'none'));
		obj.style.display = isHide ? 'block' : 'none';
	}
	
	var _show = function(obj) {
		if ('object' != typeof obj) return;
		obj.style.display = 'block';
	}
	
	var _hide = function(obj) {
		if ('object' == typeof obj) {
			obj.style.display = 'none';
		}
	}
	
	var _showFileEditBar = function() {
		if (g('FileEditBar'))
			_show(g('FileEditBar'));
	}
	
	var _showRenameArea = function() {
		if (g('FileRenameArea'))
			_show(g('FileRenameArea'));
		isEditing = true;
	}
	
	var _hideFileEditBar = function() {
		if (g('FileEditBar'))
			_hide(g('FileEditBar'));
	}
	
	var hideRenameArea = function() {
		if (g('FileRenameArea')) {
			_hideRenameArea();	
		}
	}

	var _hideRenameArea = function() {
		if (g('FileRenameArea')) {
			_hide(g('FileRenameArea'));
		}		
		isEditing = false;
	}	

	var hideFileEditBar = function() {
		_hideFileEditBar();	
	}
	
	var getReNameError = function(message) {
			alert('重命名失败。可能没有权限或者已存在同名文件(夹)。谢谢！');
	}
	
	var getCopyFileError = function(message) {
			alert('复制失败。可能没有权限或者文件(夹)不存在。谢谢！');
	}
	
	var getDeleteFileError = function(message) {
			alert('删除失败。可能没有权限或者文件(夹)不存在。谢谢！');
	}
	
	var getCreateNewFolderError = function(message) {
			alert('新建文件夹失败。请检查是否重名或者没有权限。谢谢！');
	}
	
	return {
		init : init,
		outFileListContent : outFileListContent,
		createFolder : createFolder,
		setCreateFolderHTML : setCreateFolderHTML,
		hideCreateFolder : hideCreateFolder,
		parseFolderJSON : parseFolderJSON,
		parseDeleteJSON : parseDeleteJSON,
		parseRenameJSON : parseRenameJSON,
		parseCopyJSON   : parseCopyJSON,
		initTableListRowEvent :　initTableListRowEvent,
		setTrOver : setTrOver,
		setTrOut : setTrOut,
		renameFile : renameFile,
		copyFile : copyFile,
		deleteFile : deleteFile,
		tableListTr : tableListTr,
		tableListTrIndex : tableListTrIndex,
		hideFileEditBar : hideFileEditBar,
		setRenameArea : setRenameArea,
		hideRenameArea  : hideRenameArea,
		isEditing       : isEditing
	}
})();

FileAction.init();