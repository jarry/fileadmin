/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/dir.class.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 生成目录列表与文件列表的类
 * @param {object} 生成目录对象的类
 * @author lichunping/jarry
 * 
 */
function Directory(DIR) {
	this.DIR = DIR ? DIR : window.DIR;
	this.html = [];
	this.FileList = this.FileList ? this.FileList : g('FileList');
	this.FileListContent  = this.FileListContent ? this.FileListContent : g('FileListContent');
	this.FileListTitle  = this.FileListTitle ? this.FileListTitle : g('FileListTitle');	
	this.DirList   = this.DirList ? this.DirList : g('DirList'); 
	this.InfoPanel = this.InfoPanel ? this.InfoPanel : g('InfoPanel');	
}

/**
 * @private
 * @author jarryli@gmail.com
 * @param {array} html html数组
 */
Directory.prototype._setHTML = function(html) {
	this.html = html;
}
/**
 * @private
 * @author jarryli@gmail.com
 * @return {string} html串
 */
Directory.prototype._getHTML = function() {
	return this.html;
}

Directory.prototype.listDirTree = function() {	
	 function dirClick(id, text) {
		// UploadAction.setUploadPath(id);
	    DirAction.getDirJSON(id);
	}	
	
	Tree = new dhtmlXTreeObject("DirList", "100%", "100%", 0);	
	Tree.parentObject.style.overflow = 'auto';
	Tree.setSkin('dhx_skyblue');
	Tree.enableHighlighting(1);
	Tree.setImagePath("img/tree/");
	Tree.enableDragAndDrop(0);
	Tree.enableTreeLines(false);
	Tree.setEscapingMode('utf8')
	Tree.setImageArrays("plus", null, null, null, "plus_ar.gif");
	Tree.setImageArrays("minus", null, null, null, "minus_ar.gif");
	Tree.setStdImages("folderClosed.gif", "folderOpen.gif", "folderClosed.gif");
	Tree.setXMLAutoLoading("dir!getTree.action");
	Tree.setOnClickHandler(dirClick);
	Tree.loadXML("dir!getTree.action", function(){});
}

/**
 * 表格头与表格内容区分开，以将来滚动内容时使用
 * @return {string} 表格头信息
 */
Directory.prototype.getFileAndFolderTheadHTML = function() {
	return '<table class="file-table-head"><colgroup>'
         + '<col class="table-name"/>'
         + '<col class="table-size"/>'
         + '<col class="table-modified-date"/>'
         + '<col class="table-type"/>'
         + '<col class="table-blank"/>'
         + '</colgroup>'
         + '<tr><th>名称</th><th>大小</th><th>修改日期</th><th>类型</th><th>&nbsp;</th></tr></table>';	
}

/**
 * 获得文件与文件夹列表的table
 * @param {object} _DIR 传入的DIR对象
 * @return {string} 表格html
 */
Directory.prototype.getFileAndFolderListHTML = function(_DIR) {
	var DIR = _DIR ? _DIR : this.DIR;
	// 每次都更新下上传地址;
	var _uploadPath = _DIR.path ? _DIR.path : _DIR.absolutePath;
	UploadAction.setUploadPath(_uploadPath);
	var html = [];
	// if (DIR && DIR.Folders && DIR.Files) {
	if (DIR) {
		var filesList = DIR.FilesList;
		var filesListLen = 0;	
		var name = target = ext = '', href = '#', hrefClass = '';		
		
		/**
		 * 得到表格的colgroup，好设置列属性
		 */
		function getColgroupHTML() {
			return '<colgroup>'
                 + '<col class="table-name"/>'
                 + '<col class="table-size"/>'
                 + '<col class="table-modified-date"/>'
                 + '<col class="table-type"/>'
                 + '<col class="table-blank"/>'
                 + '</colgroup>';		
		}
		
		function getHrefClass(type) {
			return '' + getFileIconCss(type);
		}
		
		/**
		 * 得到table每行的内容
		 */
		function getFileTrHTML(obj) {
			var file = obj ? obj : null;
			if (file == null) return "";
			var name = file.name;
			var relationPath = DIR.relationPath + getSlash(DIR.relationPath);
			var ext = getExt(name);
			var hrefClass = getHrefClass(ext);
			var nameLink = '';
			var type = '&nbsp;';
			var href = '#';
			var target = '';
			// 文件夹链接
			if (file.type == 'folder') {			
				var _path = "";				
				
				// 重定向文件夹与直接打开文件夹
//				if (global.FIEL_WEB_ROOT_URL) {
//                    target = '_blank';
//					_path = decodeHTML(relationPath) + decodeHTML(name);
//					href = global.FIEL_WEB_ROOT_URL + encodeURL(_path);
//					// _path = decodeSpecial(_path);
//					// 若是重定向
//					if (global.OPEN_FILE_REDIRECT) {
//						href = 'redir?url=' + href;
//					}
//				}
				
				// 在窗口内打开文件夹
				if (!global.OPEN_FOLDER_NEW_WINDOW) {
					target = '';
					_path = decodeHTML(_uploadPath)  + getSlash(_uploadPath) + decodeHTML(name);
					href = 'javascript:DirAction.openFolder(\'' +  encodeforJS(_path) + '\');';
				}
				
				type = 'folder';
				hrefClass = getFolderIconCss();				
			} 
			
			// 文件链接
			if (file.type != 'folder') {			
				href = '#';
				if (global.FIEL_WEB_ROOT_URL) {
					var _path = decodeHTML(relationPath) + decodeHTML(name);
					
//					// 针对ut服务器单独设置web目录浏览，其他服务器没有这个目录可以注释掉
//					if (_DIR.root != "/home/work/www/") {
//						var _absolutePath = DIR.absolutePath;
//						if (_absolutePath.substr(0, 1) == '/') { 
//							_absolutePath = _absolutePath.substr(1);
//						}
//						_path = decodeHTML(_absolutePath) + decodeHTML(name);
//					}
					
					href = global.FIEL_WEB_ROOT_URL + encodeURL(_path);
				// 增加重定向	
					if (global.OPEN_FILE_REDIRECT) {
						href = 'redir?url=' + href;
					}
				} 
				
				// office在线阅读链接
				if (isOfficeFile(ext) && global.DOC_WEB_ROOT_URL) {
					// is office file read online
					href = global.DOC_WEB_ROOT_URL + '?file='+ encodeURIComponent(decodeHTML(DIR.absolutePath))
						 + encodeURIComponent(decodeHTML(name));
					// href = global.DOC_WEB_ROOT_URL + '?file='+ (decodeHTML(DIR.absolutePath))
					// + getSlash(relationPath) + (decodeHTML(name));
				}
				target = '_blank';
				type   = ext;
			}			
			nameLink = ('<a href="' + href + '" class="' + hrefClass +  '" target="' + target + '">' + name + '</a>');
			return '<tr><td>' + nameLink +  '</td><td>' + obj.length +  '</td><td>'
			       + obj.date +  '</td><td>' + type +  '</td><td>&nbsp;</td></tr>';		
		}

		html.push('<table class="file-table-list" id="FileTableList">');
		html.push(getColgroupHTML());
		for (var file in filesList) {
			filesListLen++;
			file = filesList[file];
			html.push(getFileTrHTML(file));
		}
		html.push("</table>");
		
	}
	this._setHTML(html);
	return html.join('');
}

/**
 * 得到文件列表，本系统中被getFileAndFolderListHTML()替代
 * @param {object} _DIR dir JSON 对象
 * @return {string} html 字符串
 */
Directory.prototype.getFileListHTML = function(_DIR) {
	var DIR = _DIR ? _DIR : this.DIR;
	var html = [];
	if (DIR) {
		var files = DIR.Files;
		var len = files.nameList.length;	
		var name, href, i;
		for (i = 0; i < len; i++) {
			name = files.nameList[i];
			href = global.FILE_PATH + '?path=' + encodeURIComponent(name);
			html.push('<a href="' + href + '">' + name + '</a><br/>');
		}
	}
	this._setHTML(html);
	return html.join('');
}

/**
 * 得到面板信息
 * @param {object} _DIR JSON 对象
 * @return {string} html 字符串
 */
Directory.prototype.getInfoPanelHTML = function(_DIR) {
	var DIR = _DIR ? _DIR : this.DIR;
	var html = [];
	if (DIR && DIR.Folders && DIR.Files) {
		var folderLen = DIR.Folders.nameList.length;
		var filesLen = DIR.Files.nameList.length;

		var len = folderLen + filesLen;	
		html.push('<dl><dt>共:  ' + len + ' 个项目</dt>');
		html.push('<dd>文件夹: ' + folderLen +  ' 个');
		html.push(' , 文件: ' + filesLen +  ' 个</dd></dl>');
		
		html.push('<dl class="hard-size"><dt>硬盘大小:  ' + DIR.hardPartition.totalSpace + ' </dt>');
		html.push('<dd>已用空间: ' + DIR.hardPartition.useableSpace +  ' ');
		html.push(' , 还剩: ' + DIR.hardPartition.freeSpace +  ' </dd></dl>');
		
	}
	this._setHTML(html);
	return html.join('');
}

Directory.prototype.setDirAndFileList = function(_DIR) {
	if (hasError()) return false; 
	var DIR = _DIR ? _DIR : this.DIR;
	this.listDirTree();
	this.setFileAndFolderList(DIR);
}

Directory.prototype.setDirList = function(_DIR) {
	this.DirList.innerHTML = this.getDirListHTML(_DIR);
}

Directory.prototype.setFileAndFolderList = function(_DIR) {
	if (hasError()) return false; 
	this.FileListTitle.innerHTML = this.getFileAndFolderTheadHTML(_DIR);
	this.FileListContent.innerHTML = this.getFileAndFolderListHTML(_DIR);
	if (browser.ie == 6) {
		DirAction.setPageHeight();
	}
}

Directory.prototype.setFileList = function(_DIR) {
	this.FileList.innerHTML = this.getFileListHTML(_DIR);
}

Directory.prototype.setInfoPanel = function(_DIR) {
	this.InfoPanel.innerHTML = this.getInfoPanelHTML(_DIR);
}

