/**
 * FileAdmin
 * Copyright 2010 Youngli Inc. All rights reserved.
 * 
 * path: js-src/fa/config.js
 * author: lichunping/jarry
 * version: 0.9
 * date: 2010/06/15
 */

/**
 * 文件管理配置文件
 * 合并js时config.js放置最前面
 * @author lichunping/jarry
 */
var global = {
	// 根目录
	DIR_ROOT  : '',
	// 目录操作的url
	DIR_PATH  : 'dir',
	// 文件操作的url
	FILE_PATH : 'file',
	// 上传操作的url
	UPLOAD_PATH : 'upload',
	
	// 如果有web访问地址，可以提供在线打开地址的功能
	FIEL_WEB_ROOT_URL : 'http://www.website.com/',
	// office文件可以在线阅读的地址，如果没有的就注释DOC_WEB_ROOT_URL，表示直接指向该文件
	// UT服务器上使用poi读取word文档，可以读取本地或网络文件
	DOC_WEB_ROOT_URL :  'http://www.website.com/ReadWord',
	
	// 登录指向的URL
	FA_LOGIN_URL : 'login',
	
	// 是否打开文件夹和文件时重定向链接
	// 默认给出的是utf-8链接，如果WEB地址是gbk的，需要重新定向
	OPEN_FILE_REDIRECT : false,
	
	// 打开文件夹时是否同步更新目录树
	OPEN_FOLDER_UPDATE_TREE : true,
	
	// 是否通过web service 的WEB目录浏览方式在新窗口打开文件夹
	OPEN_FOLDER_NEW_WINDOW : false

}