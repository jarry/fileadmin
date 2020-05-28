<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/xml; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../common/taglibs.jsp" %>
<c:if test="${id == null  || fn:length(id) <= 0}" >
<tree id='0'>
<c:set var="root" value="${char:encodeHTML(root)}"></c:set>
<item child='1' id='${root}' text='${root}'  select='' open='1' im0='base.gif' im1='base.gif'  im2='base.gif'>
		<c:forEach var="name" items="${foldersName}">
			<c:set var="subDirLenth" value="${file:getSubDirLength(name, foldersHasSubDir)}"></c:set>				
			<c:set var="name" value="${char:encodeHTML(name)}"></c:set>	
			<c:set var="itemPath" value="${root}${file:getSlash(root)}${name}/"></c:set>
			<item child='${subDirLenth}' id='${itemPath}' text='${name}'></item>
		</c:forEach>
</item>
</tree>
</c:if>

<c:if test="${id != null && fn:length(id) > 0}" >
	<c:set var="count" value="0"/>
	<c:set var="id" value="${char:encodeHTML(id)}"></c:set>
	<tree id='${id}'>
		<c:forEach var="name" items="${foldersName}">	
			<c:set var="subDirLenth" value="${file:getSubDirLength(name, foldersHasSubDir)}"></c:set>
			<c:set var="name" value="${char:encodeHTML(name)}"></c:set>	
			<c:set var="itemPath" value="${id}${file:getSlash(id)}${name}/"></c:set>
			<item child='${subDirLenth}' id='${itemPath}' text='${name}'>
			</item>
		</c:forEach>
	</tree>
</c:if>