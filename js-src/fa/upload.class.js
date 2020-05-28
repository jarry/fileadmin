/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/upload.class.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 上传文件类
 * @author lichunping/jarry
 */
function Upload() {
}

Upload.prototype = {
		
	setSWFUploadPath : function(path) {
		var path = path || UPLOAD.uploadPath;
		if (SWFUP && 'function' == typeof SWFUP.setPostParams) {
			try {
				SWFUP.setPostParams ({"path" : path});
			} catch (ex) {
				alert(ex.toString());
			}
//				var post = SWFUP.getSetting('post_params'); 
//				alert(' |\r\n　' + UPLOAD.uploadPath +  ' |\r\n　' 
//				+ (this.uploadPath) + ' |\r\n　' 
//				+  SWFUP +  ' |\r\n　' 
//				+ post['path']);
//				if (browser.ie) {
//					SWFUP.setPostParams ({"path" : UPLOAD.uploadPath});
//					在firefox/chrome下更改参数失效，重新实例化对
//					只能改成iframe，每次都调用新页面来传递上传路径
//					报错：Call to SetPostParams failed
//	              最后改为：在handlers.js里面的fileDialogComplete(numFilesSelected, numFilesQueued)方法
//					在swfupload对象加载完成后再更新路径
//	 				UploadAction.setSWFUploadPath();
//				} else {
//					try {
//					SWFUP.setPostParams ({"path" : UPLOAD.uploadPath});
//					} catch (ex) {
//						alert(ex.toString());
//					}			
//				}			
		} 
	},

	SWFUPsetting : function() {
		var settings = {
			flash_url : "swf/swfupload.swf",
			upload_url: global.UPLOAD_PATH,
			file_post_name : "uploads",
			post_params: {"path" : (UPLOAD.uploadPath)},
			file_size_limit : "1024 MB",
			file_types : "*.*",
			file_types_description : "All Files",
			file_upload_limit : 100,
			file_queue_limit : 0,
			custom_settings : {
				progressTarget : "fsUploadProgress",
				cancelButtonId : "btnCancel"
			},
			// debug: true,
			debug: false,
			// Button settings
			button_image_url: "img/upload-button.png",
			button_width: "90",
			button_height: "24",
			button_placeholder_id: "spanButtonPlaceHolder",
			
			// The event handler functions are defined in handlers.js
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete	// Queue plugin event
		};
		SWFUP = new SWFUpload(settings);	
		// alert(UPLOAD.uploadPath +  ' |　' + (this.uploadPath) + SWFUP.setPostParams + SWFUP.getSetting);	
	 },
	 
	setPosition : function(dom, left, top) {
		if (!dom) return;
		dom.style.left = left + 'px';
		dom.style.top  = top  + 'px';
	},
	 
	setUploadHTML : function() {
		if (!g('UploadArea')) {
			try {
				var html = HTMLTemplate.uploadHTML;
				var container = getTemplateHTMLContainer();
				var div = document.createElement('div');
				div.innerHTML = html;
				container.appendChild(div);
				this.SWFUPsetting();
			} catch (ex) {
				alert(ex.toString());
			}
		}
	}
}