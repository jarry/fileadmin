<%
request.setCharacterEncoding("utf-8");
response.setCharacterEncoding("utf-8");
response.setHeader("Pragma", "No-cache");
response.setHeader("Cache-Control", "no-store"); 
response.setHeader("Cache-Control", "no-cache");
response.setHeader("Cache-Control", "must-revalidate");
response.setDateHeader("Expires",0);
%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="char" uri="http://fileadmin.youngli.com/character" %>
<%@ taglib prefix="file" uri="http://fileadmin.youngli.com/filePath" %>