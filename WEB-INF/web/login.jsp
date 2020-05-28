<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="common/taglibs.jsp" %>
<jsp:include page="common/header.jsp" flush="true" ></jsp:include>
<body class="login">
<div class="page">
	<div class="hd">
	<div class="logo"><a href="#"> </a></div>
	</div>
	<div class="main">
	<div class="login-form">
	<div class="info-panel">&nbsp;</div>
	<form acion="/login.action" method="post">
	<div class="login-tit">欢迎使用 <strong><span>F</span>ile<span>A</span>dmin</strong> Web文件管理系统<br/></div><br/>

	<c:set var="validateCodeURL" value="validateCode"/>
	<ol>
		<li class="login-txt">用户名：</li><li><input name="userName" size="10" type="text" /></li>
		<li class="login-txt">密&nbsp;&nbsp;&nbsp;&nbsp;码：</li><li><input name="passWord" size="10" type="password" /></li>
		<li class="login-txt">验证码：</li>
		<li><input type="text" name="validateCode" size="6" maxlength="4"><img src="${validateCodeURL}?d=${random}" style="cursor:pointer;vertical-align:middle" title="点击刷新图片" align="middle" onclick="this.src+='?d='+new Date();"></li>
		<li class="login-txt">&nbsp;</li><li><font class="validate-tips">请输入验证码，不区分大小写。</font></li>
		<label>
		<input type="checkbox" name="remember" style="margin:5px 0 0 0;" value="yes" id="RememberUser">
		&nbsp;记住用户密码
		</label>
		<li class="login-txt">&nbsp;</li>
		<li>
		<button type="submit" style="margin-top:10px;padding:5px;width:60px"> 登 录 </button>
		</li>
	</ol>	
		<div class="login-tips">
		<c:if test="${userName == '' || passWord == ''}">
			<li>请输入用户名和密码</li>
		</c:if>
		<c:if test="${validateCode == ''}">
			<li>请输入验证码</li>
		</c:if>
		<c:if test="${message == 'loginFailed' && userName != '' && passWord != '' && validateCode != ''}">
			<li>用户名、密码或验证码错误，请重新输入</li>
		</c:if>	
		</div>
	</form>		
	</div>
	<br/><br/>
	<div class="line-bar">&nbsp;</div>
	<div class="login-info-panel">&nbsp;</div>
	</div> 
</div>
<jsp:include page="common/footer.jsp" flush="true"></jsp:include>
</body>
</html>