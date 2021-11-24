/*
 * 本文件仅作开发调试时用，这个文件与ant的合并脚本里对应
 * 当有新的需要include进来的文件时增加
 * 同时合并ant脚本也增加相应的文件
 *
 * 此文件主要是当执行ant文件合并压缩后，恢复到开发时的状态
 */
 (
 function() {
	var Contact_JS_List = [
        //core  
	  './js-src/lib/youngli.js',      
	  './js-src/lib/string.js', 
		'./js-src/lib/browser.js',
	  './js-src/lib/dom.js',
		'./js-src/lib/ajax.js',
		'./js-src/lib/event.js',
		'./js-src/lib/array.js',
		'./js-src/lib/page.js',
		'./js-src/lib/cookie.js',
		'./js-src/lib/drag.js',
		
		'./js-src/util/tree/dhtmlxcommon.js',
		'./js-src/util/tree/dhtmlxtree.js',		
		
		// utility component
		'./js-src/util/upload/swfupload.js',
		'./js-src/util/upload/swfupload.queue.js',
		'./js-src/util/upload/fileprogress.js',
		'./js-src/util/upload/handlers.js',
	    
		// fileadmin
		'./js-src/fa/tpl.js',
		'./js-src/fa/config.js',
		'./js-src/com/com.js',
		'./js-src/fa/action.js',
		'./js-src/fa/upload.class.js',
		'./js-src/fa/upload.act.js',
		'./js-src/fa/dir.class.js',
		'./js-src/fa/dir.act.js',
		'./js-src/fa/file.class.js',
		'./js-src/fa/file.act.js',
		'./js-src/fa/help.class.js',
		'./js-src/fa/help.act.js'
	];

	var jsCount = Contact_JS_List.length - 1;
	var currentIndex = 0;
	function loadJS(currentIndex) {
		if (currentIndex >= jsCount) {
			if (currentIndex === jsCount) {
				console.log('js files load done.');
				if (DirAction) {
					DirAction.pageInit();
				}
			}
			return;
		}
		var js = document.createElement('script');
	   	js.src = Contact_JS_List[currentIndex];
	   	js.addEventListener('load', function() {
//	   		console.log(Contact_JS_List[currentIndex] + ' loaded.');
	   		loadJS(currentIndex + 1);
	   	});
	    document.head.appendChild(js);
	}
	window.FA_JS_ASYNC_LOAD = true;
	loadJS(0)
	
	/*
	function syncloadJS() {
		for (var i = 0; i < Contact_JS_List.length; i++) {
			document.write('<script src="' + Contact_JS_List[i] + '" type="text/javascript"></script>');
		}
	}
	syncloadJS()
	*/

 }
)();
