<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="common/taglibs.jsp" %>
<jsp:include page="common/header.jsp" flush="true" ></jsp:include>
<body>
<!-- <script type="text/javascript" src="dir?path=${path}"></script>-->
<div class="page" id="Page">
<div class="mask" id="mask">&nbsp;</div>
	<div class="hd">
	<div class="logo">
		<a href="./" title="FileAdmin Logo"> </a>
	</div>
	<div class="hd-panel">
		 <div id="ControlPanel" class="control-panel">操作区域：<a href="#" id="UploadFileLink">上传文件</a>
		&nbsp; |&nbsp; <a href="#" id="CreateNewFolderLink">新建文件夹</a> 

		 </div>
	</div>
		<div class="user-bar"><a href="javascript:HelpAction.show()">帮助</a> | 你好，<strong>${sessionScope.userName}</strong> | <a href="logout">退出</a></div>
	</div>
	<div class="main">
		<div class="dir-list" id="DirList"></div>
		<div class="drag-bar" id="DragBar"></div>
		<div class="file-list" id="FileList">
			<div class="file-list-title" id="FileListTitle">&nbsp;</div>
			<div class="file-list-content" id="FileListContent"><h2>&nbsp;&nbsp;Loading...&nbsp;&nbsp;<br/><br/><br/></h2></div>
		</div>
	<div class="line-bar">&nbsp;</div>
	<div class="info-panel" id="InfoPanel">&nbsp;</div>
	</div> 
<script type="text/javascript" src="js/fa.js"></script>
</div>
<jsp:include page="common/footer.jsp" flush="true"></jsp:include>
</body>
</html>
