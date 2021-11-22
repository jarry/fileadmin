<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../common/taglibs.jsp" %>
//var DIR = DIR || {};
DIR.listLength = ${listLength};
<c:set var="root" value="${char:encodeHTML(root)}"></c:set>
<c:set var="path" value="${char:encodeHTML(path)}"></c:set>
<c:set var="absolutePath" value="${char:encodeHTML(absolutePath)}"></c:set>
DIR.root = '${root}';
DIR.path = '${char:encodeCovert(path, "iso-8859-1", "utf-8")}';
DIR.absolutePath  = '${absolutePath}';
DIR.relationPath = '${file:getRelativePath(root, path)}${char:encodeHTML(name)}';
DIR.Folders = {
	<c:set var="count" value="0"/>
	nameList : [
	<c:forEach var="name" items="${foldersName}">
		<c:set var="name" value="${char:encodeHTML(name)}"></c:set>
		'<c:out value="${name}"/>'<c:set var="count" value="${count+1}"/><c:if test="${count != foldersLength}" >,</c:if>
	</c:forEach>]
};

DIR.Files = {
	nameList : [
	<c:set var="count" value="0"/>
	<c:forEach var="name" items="${filesName}">'<c:out value="${name}"/>'<c:set var="count" value="${count+1}"/><c:if test="${count != filesLength}" >,</c:if>
	</c:forEach>]
};
DIR.FilesList = {
	<c:set var="count" value="0"/>	
	<c:forEach var="item" items="${fileListMap}">
		<c:set var="count" value="${count+1}"/>
		'<c:out value="${item.name}"/>' : {			<%--
			<c:forEach var="propsName" items="${propertiesName}">
				"${propsName}" : ${item.propsName}
			</c:forEach>
			--%>
			'${propertiesName[0]}' : '${char:encodeHTML(item.name)}',
			'${propertiesName[1]}' : '${item.type}',
			'${propertiesName[2]}' : '${item.ext}',
			'${propertiesName[3]}' : '${item.date}',
			'${propertiesName[4]}' : '${item.length} KB',
			'${propertiesName[5]}' : '${item.readonly}',
			'${propertiesName[6]}' : '${item.hidden}'
		}<c:if test="${count != fileListMapLength}" >,</c:if>
		
	</c:forEach>
};
DIR.hardPartition = {
			'${propertiesName[7]}' : '${properties.totalSpace} GB',
			'${propertiesName[8]}' : '${properties.freeSpace} GB',
			'${propertiesName[9]}' : '${properties.useableSpace} GB'
};