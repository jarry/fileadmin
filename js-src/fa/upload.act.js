/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/upload.act.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 上传Action文件
 * 设置通用的上传路径
 * 绘制上传模板，执行上传事件
 * @author lichunping/jarry
 */
UploadAction = (function () {
	var uploadPath = "";
	
	var uploadClass = new Upload();
		
	var setSWFUploadPath = function(path) {
		uploadClass.setSWFUploadPath(path);
	}
	
	var setUploadPath = function(path) {
		path = path +  getSlash(path);
		UPLOAD.uploadPath = decodeHTML(path);
	 };

	var hideUploadArea = function() {
		g('UploadArea').style.display = 'none';
		toggleMask(null, 'none');
	};
	
	var setUploadHTML = function() {
		uploadClass.setUploadHTML();
		if (!g('UploadArea')) return; 
		var obj = g('UploadArea');
		
		if (obj.style.display == '') {
			// set position on first create
			var left = dom.getPosition(this).left;
			var top = dom.getPosition(this).top;
			uploadClass.setPosition(obj, left, top + 20);
		}
		
		// can not add the event for chrome blow.
		// Youngli.on(g('CreateNewFolderCancelButton'), 'onclick', FileAction.hideCreateFolder);
		// so added the event in tag A for g('CreateNewFolderCancelButton');
		_showOrHide(obj);
		g('UploadPathTips').innerHTML = UPLOAD.uploadPath;
		g('divStatus').innerHTML = '';
		toggleMask();
		
	};
	
	var _showOrHide = function(obj) {
		if ('object' != typeof obj) return;
		var isHide = ((obj.style.display == '' || obj.style.display == 'none'));
		obj.style.display = isHide ? 'block' : 'none';
	};
	
	var _uploadStart = function(files) {
		uploadClass.startUpload(files, function(response) {
			console.log('UploadAction.response:', response);
		});
	};

	var init = function() {
		Youngli.on(g('UploadFileLink'), "onclick", UploadAction.setUploadHTML);	  
	};
	
	return {
		init : init,
		setUploadPath : setUploadPath,
		setUploadHTML : setUploadHTML,
		hideUploadArea : hideUploadArea,
		setSWFUploadPath : setSWFUploadPath,
		uploadStart: _uploadStart
	};

})();
UploadAction.init();