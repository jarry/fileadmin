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
<title>跳转-FileAdmin</title>
</head>
<body>
<pre>
url : ${url}
sysEncode : ${sysEncode}
sysLang　： ${sysLang}
urlGBK : ${urlGBK}
urlUTF8 : ${urlUTF8}
locale :${locale}
</pre>
	<c:set var="reURL" value="${url}"></c:set>
<c:if test="${sysLang == 'zh'}" >
	<c:set var="reURL" value="${urlGBK}"></c:set>
</c:if>
<c:if test="${sysLang != 'zh'}" >
	<c:set var="reURL" value="${urlUTF8}"></c:set>
</c:if>
<c:redirect url="${reURL}"/>
<script type="text/javascript">
var url = '${reURL}';
//var url = '${url}';
//window.location.replace(url);
</script>
</body>
</html>