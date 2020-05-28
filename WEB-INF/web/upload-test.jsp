<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<% 
request.setCharacterEncoding("utf-8");
response.setCharacterEncoding("utf-8");
%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="char" uri="http://fileadmin.youngli.com/character" %>
<%@ taglib prefix="file" uri="http://fileadmin.youngli.com/filePath" %>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>列表-FileAdmin</title>
</head>
<body style="overflow:auto">

<div style="width:90%;padding-left:5%">
<h2>FileAdmin 系统文件上传测试</h2>

<div style="border:2px solid red;padding:10px">
<c:set var="root" value="e:/ut/"></c:set><!-- 改成能上传的测试目录 -->
<c:set var="path" value="${root}tmp/"></c:set>

<c:forEach var="item" items="${fileListMap}">   
${item}
<!-- <pre>${item.name} | ${item.type} | ${item.ext} | ${item.length} <br></pre>-->
 </c:forEach>

目录：<s:property value="path"/>  文件数量：<c:out value="${listLength}"></c:out>
上传目标路径：${root}tmp/
<h3>文件上传</h3>
<form action="upload" method ="post" enctype ="multipart/form-data"> 
单个文件上传 uploadFile: <input type="file" name="uploadFile"/><br/>
<br/>多文件上传：<br/>
file1: <input type="file" name="uploads"/><br/>
file2: <input type="file" name="uploads"/><br/>
file3: <input type="file" name="uploads"/><br/>
<input type="hidden" name="path" value="${path}"/>
<input type="submit" name="Submit" value="上传">
</form>

</div>
<br/><br/>
<div style="border:2px solid blue;padding:10px">
SWF 文件上传:
<script type="text/javascript" src="js/fa.js"></script>
<!--
<script type="text/javascript" src="/js-src/util/upload/swfupload.js"></script>
<script type="text/javascript" src="/js-src/util/upload/swfupload.queue.js"></script>
<script type="text/javascript" src="/js-src/util/upload/fileprogress.js"></script>
<script type="text/javascript" src="/js-src/util/upload/handlers.js"></script>
-->
<link href="css/fa.css" rel="stylesheet" type="text/css" />

<span id="spanButtonPlaceHolder"></span>
<div id="QueueBox"  style="display:">
	<div class="fieldset flash" id="fsUploadProgress">
		<span class="legend">上传文件列表</span>
	</div>	
	<input id="btnCancel" type="button" value="取消上传" onclick="swfu.cancelQueue();" disabled="disabled" />
	&nbsp;&nbsp;
	<span id="divStatus">0 个文件已经上传</span>
</div>


<script>
var swfu;	
window.onload = function () {
	var settings = {
		upload_url : "upload",
		flash_url : "swf/swfupload.swf",
		file_post_name : "uploads",
		file_size_limit : "1073741824",
		file_types : "*.*",
		file_types_description : "All Files",
		file_upload_limit : "100",
		file_queue_limit : "0",

		// Event Handler Settings (all my handlers are in the Handler.js file)
		file_queued_handler : fileQueued,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,
		queue_complete_handler : queueComplete,	// Queue plugin event	

		custom_settings : {
					progressTarget : "fsUploadProgress",
					queueBox       : "QueueBox",
					cancelButtonId : "btnCancel"
				},

		post_params: {"path" : "${path}"},

		button_image_url: "img/upload-button.png",
		button_width: "90",
		button_height: "24",
		button_placeholder_id : "spanButtonPlaceHolder",
		// Debug Settings
		debug: true
	};
	
	swfu = new SWFUpload(settings);
};
</script>
</div>



<c:if test="${previousPath != '' && path != root}" >
<a href="?path=<s:property value="previousPath"/>">上一级</a>
</c:if>

<br/><br/>
<div style="border:2px solid yellow;padding:10px">

<h3>新建文件夹</h3>
 <c:forEach var="name" items="${foldersName}">   
 <c:set var="folderRealPath" value="${path}${name}/"/>
<a href="?path=${folderRealPath}"><c:out value="${name}"/></a> | <a href="file?path=${folderRealPath}&del=yes">删除</a>
<br>
 </c:forEach> 

 <form action="file">
<input type="hidden" name="path" value="${path}"/>
 <input type="hidden" name="mkdir" value="yes"/>
 <input type="text" name="name" value="new folder" size="10"/>
 <input type="submit"  value="提交"/>
 </form>


<br/><br/>
 <h3>文件</h3>
 <c:forEach var="name" items="${filesName}">

    <c:set var="fileRealPath" value="${path}${name}"/>
    <c:set var="ext" value="${file:getExt(name)}"/>    
    <c:choose>
    <c:when test="${file:isOfficeExt(ext)}">
    	<c:set var="fileLink" value="/ut/servlet/ReadWordLocal?file=${fileRealPath}"/>
    </c:when>
   <c:otherwise>   
    	<c:set var="fileLink" value="/ut/${file:getRelativePath(root, path)}${name}"/>
   </c:otherwise>
   </c:choose>   
<a href="${fileLink}">${name}</a> | <a href="file?path=${fileRealPath}&del=yes">删除</a>
 <form action="file">
  <b>文件重命名</b><input type="hidden" name="path" value="${fileRealPath}"/>
 <input type="hidden" name="rename" value="yes"/>
 <input type="text" name="name" value="" size="10"/>
 <input type="submit" value="提交"/>
 </form>
 <form action="file">
  <b>文件移动到</b><input type="hidden" name="path" value="${fileRealPath}"/>
 <input type="hidden" name="move" value="yes"/>
 <input type="text" name="toPath" value="" size="10"/>
 <input type="submit" value="提交"/>
 </form>

<br>
 </c:forEach> 

</div>

</div>
<br>
<br>
</body>
</html>