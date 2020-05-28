/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/file.class.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 文件夹、文件编辑操作类
 * 提供文件改名、复制、删除，鼠标移动事件等功能
 * @author lichunping/jarry
 */
function File() {
	this.path = '';
	this.relationPath = '';
	this.absolutePath = '';
	this.filePath  = global.FILE_PATH;
}

File.prototype = {
	
	setCreateFolderHTML : function() {
		if (!g('CreateNewFolder')) {
			try {
				var html = HTMLTemplate.createNewFolderHTML;
				var container = getTemplateHTMLContainer();
				var div = document.createElement('div');
				div.innerHTML = html;
				container.appendChild(div);
			} catch (ex) {
				alert(ex.toString());
			}
		}
	},
	
	getFolderJSON : function(path, name) {
		try {
			var path = path + getSlash(path);
				path = decodeHTML(path); 
			var url = this.filePath + '?mkdir=yes&path=' + encodeURIComponent(path) + '&name=' + encodeURIComponent(name);
			var xhr = ajax.get(url, FileAction.parseFolderJSON);
		} catch(ex) {
			alert(ex.toString());	
		}
	},
	
	setPosition : function(dom, left, top) {
		if (!dom) return;
		dom.style.left = left + 'px';
		dom.style.top  = top  + 'px';
	},
	
	insertRow : function(folder) {
		if (hasError()) return false; 
// 		需要改为动态dom操作，而非动态请求数据
//		FILE 作为传递过来的JSON数据，可以根据这个数据insertBefore到table的某行中
//		这样可以减少一次请求，有时间再升级
		DirAction.getDirJSON(decodeHTML(UPLOAD.uploadPath));
	},
	
	/**
	 * 创建编辑文件的HTML
	 */
	setFileEditHTML : function() {
		try {
			if (!g('FileEditBar')) {
				var html = HTMLTemplate.editHTML;
				var div = document.createElement('div');
				div.id = 'FileEditBar';
				div.innerHTML = html;
				document.body.appendChild(div);
				div.className = 'file-edit-bar';
			}
		} catch (ex) {
				alert(ex.toString());
		}
	},

	/**
	 * 重命名区域的HTML
	 */
	setRenameArea : function() {
		try {
			if (!g('FileRenameArea') || null == g('FileRenameArea')) {
				var html = HTMLTemplate.renameHTML;
				var div = document.createElement('div');
				div.id = 'FileRenameArea';
				div.innerHTML = html;
				div.className = 'file-rename-area';
				document.body.appendChild(div);
			}
		} catch (ex) {
				alert(ex.toString());
		}
	},
	
	/**
	 * 重命名文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * @param {string} newName 新名称
	 * 
	 */
	renameFile : function(trObj, newName) {
		if (typeof trObj != 'object' || newName == null){ 
			return ;
		}
		if(trim(newName).length == '') {
			alert('请输入名称');
			return ;
		}
		if(!isAvailableName(newName)) {
			alert('名字不能含有:' + SPECIAL_CHAR.join(', ') + ' 字符');
			return ;
		}		
		var nameTd = trObj.cells[0];
		var name = '';		
		if (!nameTd || !nameTd.firstChild) {
			return ;
		}
		name = nameTd.firstChild.innerHTML;
		if (name != newName) {
			try {
				var type   = trObj.cells[3].innerHTML;
				var path = (UPLOAD.uploadPath + decodeHTML(name));
				var url = global.FILE_PATH + '!rename.action?path=' + encodeURIComponent(path) + '&name=' + encodeURIComponent(newName);
				var xhr = ajax.get(url, FileAction.parseRenameJSON);
			} catch (ex) {
				alert(ex.toString());
			}
	 	}
	},	
	
	/**
	 * 复制文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * 
	 */
	copyFile : function(trObj) {
		if (typeof trObj != 'object') { 
			return;
		}
		try {
			var nameTd = trObj.cells[0];
			var name = '';		
			if (!nameTd || !nameTd.firstChild) {
				return;
			}
			name = nameTd.firstChild.innerHTML;
			var path = (UPLOAD.uploadPath + decodeHTML(name));
			var url = global.FILE_PATH + '!copy.action?path=' + encodeURIComponent(path);
			var xhr = ajax.get(url, FileAction.parseCopyJSON);
		} catch (ex) {
				alert(ex.toString());
		}
	},
	
	/**
	 * 删除文件(夹)
	 * @param {object} trObj 一个tr DOM对象
	 * 
	 */
	deleteFile : function(trObj) {
		if (typeof trObj != 'object'){ 
			return;
		}
		try {
			var nameTd = trObj.cells[0];
			var name = '';		
			if (!nameTd || !nameTd.firstChild) {
				return;
			}
			name = nameTd.firstChild.innerHTML;
			var type   = trObj.cells[3].innerHTML;
			var path = (UPLOAD.uploadPath + decodeHTML(name));
			var info = type == 'folder' ? '您确定要删除 ' + name + ' 文件夹吗？\r\n其全部子文件夹和文件将一同被删除。': 
							'您确定要删除 ' + name + ' 文件吗？';		
			if(confirm(info)) {
				var url = global.FILE_PATH + '!delete.action?path=' + encodeURIComponent(path);
				var xhr = ajax.get(url, FileAction.parseDeleteJSON);	
				g('FileEditBar').style.display = 'none';
				// 点击确认是同时关闭编辑框 for ie
				setTimeout('FileAction.hideFileEditBar()', 1);
			}
		} catch (ex) {
				alert(ex.toString());
		}
	},	
	
	/**
	 * 得到文件夹对象的tr的HTML，用于插入到table中
	 * @param {object} folder 文件夹对象
	 * @param {string} tr html
	 */
	_getFolderTr : function(folder) {
		var tr = "", target = '_blank', href = '';
		var relationPath = this.relationPath || DIR.relationPath;
		var hrefClass = getFolderIconCss();
		if (global.FIEL_WEB_ROOT_URL) {
			href = global.FIEL_WEB_ROOT_URL + encodeURIComponent(decodeHTML(relationPath)) + getSlash(relationPath) + encodeURIComponent(decodeHTML(folder.name));
		} 
		nameLink = ('<a href="' + href + '" class="' + hrefClass +  '" target="' + target + '">' + folder.name + '</a>');
		tr += '<tr><td>' + nameLink +  '</td><td>' + folder.length +  '</td><td>'
		       + folder.date +  '</td><td>' + folder.type +  '</td><td>&nbsp;</td></tr>';	
		       
	   return(tr);
	}
	
}