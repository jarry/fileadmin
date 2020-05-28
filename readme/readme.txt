	
	一个基于Web的文件管理系统

## 介绍：
----------------------------------
	一个基于Java与JS的开源Web文件管理系统，可以方便的管理自己服务器上的文件。
	通过Ajax提升交互体验，文件数据通过JSON格式传输。


## 系统架构
----------------------------------
*	后台基于Java，采用Struts2架构，前端利用JavaScript绘制，通过Ajax传输数据
* 
*	前后端MVC模型
*
*     	       | V * HTML/CSS，	样式与表现分离
*     	前端 - | C * JS behavior/JS action， 每个页面都有唯一JS对象调用JS类库、组件、功能处理事件与展现逻辑
*     	       | M * JS类库、组件，页面功能
*
*              | V * JSP模板/HTML/CSS/JS Control层
*       后端 - | C * Struts2 action，拦截请求，调用Java Bean处理与展现相关的业务逻辑
*              | M * Java Bean，各种Java对象，封装接口
*
*
*              | V * JSP模板/HTML/CSS/JS Control层
*     前后端 - | C * Struts2 action，JS action与类库
*              | M * Java Bean，各种Java对象，封装接口
* 
*     根据情况适当把业务逻辑交由JS处理，减少Action负担。
*
*

## 基本功能列表
----------------------------------
	- 支持目录文件浏览
	- 多文件上传
	- 下载
	- 文件名修改
	- 文件删除、移动


## 更多功能列表
----------------------------------
	- 文本、文档与图片查看
	- 排序
	- 列表查看
	- 拖拽操作
	- 图片icon


## 开发运行环境版本
----------------------------------
	1. jdk 1.6.x
	2. tomcat 6.0.18
	3. Struts 2.1.8
	4. eclipse 3.4.x


## 目录结构
----------------------------------
	+ build    编译文件夹
	 - contactfile.xml  合并js与css
	 - copyfile.xml     copy 目录与文件
	 - compress.xml     压缩js与css

	+ css      css文件夹，统一压缩后
	  - module1.css
	  - default.css
	+ css-src  css源文件

	+ error   出错文件夹
	+ help    帮助指南文件夹
	+ img     图片文件夹
	+ js      JS文件夹
	+ js-src  JS源码文件夹
	+ readme  配置说明与开发手册
	+ src     Java源码文件夹，与WEB-INF/src相同，选一个
	+ swf     flash文件
	+ tools   一些辅助工具文件夹


	+ WEB-INF 编译后程序文件夹
	  + classes  Java运行程序
	  + lib      用户的Jar包
	  + src      Java源码
	  + web      Struts映射指向页面，外部不可访问
	  web.xml    项目配置文件
	  *.tld      JSTL 配置函数
	  *.properties Java配置文件


	+ work    Web Server 工作路径，一般在Tomcat里配置，本处work无用

	.classpath Java编译路径文件，供eclipse使用
	.#webclasspath Java用户项目编译包，供eclipse使用
	.tomcatplugin  Tomcat补丁文件，供eclipse使用

	upload.jsp 上传测试文件


## 要上线的文件夹列表
----------------------------------
	+ css
	+ error
	+ help
	+ img
	+ js
	+ swf
	+ WEB-INF 


## 不需要上线的文件夹列表
----------------------------------
	- build
	- css-src
	- js-src
	- readme
	- src
	- tools
	- work
	- WEB-INF/src/
	以及相关编译路径文件


## 下载
----------------------------------
	主页:http://fileadmin.googlecode.com
	下载地址:


## 联系：
----------------------------------
	Author: Jarry Li (lichunping)
	Contact: jarryli@gmail.com || lichunping@baidu.com
	date : 2010-5-15
