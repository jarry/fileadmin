/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/tpl.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 模板文件
 * 用来临时创建页面
 * @author lichunping/jarry
 */

var HTMLTemplate = {
  createNewFolderHTML : 
	  '<div class="create-newfolder" id="CreateNewFolder">'
	 + '<form action="file" method="get" target="" onsubmit="return FileAction.createFolder(UPLOAD.uploadPath, this.name.value);" target="_blank">'
		+ '名称:&nbsp;&nbsp;<input type="text" size="30" name="name" id="NewFolderName"/><br/>'
		+ '<div class="tips" id="CreateNewFolerTips"></div>'
		+ '<input type="submit" value="提交" />'
		+ '&nbsp;&nbsp;<a href="javascript:FileAction.hideCreateFolder();" id="CreateNewFolderCancelButton" class="close-button">关闭</a>'
	 + '</form>'
	 + '</div>',

	uploadHTML : 
	'<div class="upload-area" id="UploadArea">'
	+ '上传路径：<span id="UploadPathTips"></span>'
	+ '	<div class="fieldset flash" id="fsUploadProgress">'
	+ '			<span class="legend">文件队列</span>'
	+ '	</div>'
	//+ '		<span id="divStatus">上传了 0 个文件</span>'
	+ '		<span id="divStatus">&nbsp;</span>'
	+ '	<div>'
	+ '		<span id="spanButtonPlaceHolder"></span>'
	+ '		<input id="btnCancel" type="file" multiple="multiple" value="选择文件" onchange="UploadAction.uploadStart(this.files);" />'
	// + '		<input id="btnCancel" type="button" value="停止上传" onClick="SWFUP.cancelQueue();" disabled="disabled"  />'
	+ '		&nbsp;<a href="javascript:UploadAction.hideUploadArea();" class="close-button" style="float:right;margin-right:5px;">关闭</a>'
	+ '	</div>'
	+ '</div>',

	editHTML : 
	''
/*	+ '<span><a href="javascript:FileAction.deleteFile(FileAction.tableListTr)">删除</a></span>'
	+ '<span><a href="javascript:FileAction.setRenameArea(FileAction.tableListTr)">更名</a></span>'
	+ '<span><a href="javascript:FileAction.copyFile(FileAction.tableListTr)">复制</a></span>',
*/
	+ '<span><a href="javascript:FileAction.deleteFile(FileAction.tableListTr)" class="edit-delete" title="删除">&nbsp;</a></span>'
	+ '<span><a href="javascript:FileAction.setRenameArea(FileAction.tableListTr)" class="edit-rename" title="重命名">&nbsp;</a></span>'
	+ '<span><a href="javascript:FileAction.copyFile(FileAction.tableListTr)" class="edit-copy" title="复制">&nbsp;</a></span>',

	renameHTML : 
	 '<input id="Rename" value="" size="30" />'
	+ '<span><a href="javascript:FileAction.renameFile(FileAction.tableListTr, g(\'Rename\').value)">确定</a></span>'
	+ '<span><a href="javascript:FileAction.hideRenameArea()">取消</a></span>',

	helpHTML : 
		'<div id="HelpContent" class="help-content">'
	+	'</div>'
	+   '<div class="help-close"><a href="javascript:HelpAction.close()">关闭</a></div>'

};