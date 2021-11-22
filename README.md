# Introduce

### This project build on 2010.
- It's main function is file upload to server for web

### Tech stack
    - structs2
    - javascript ES5
    - css2
    - ant
    - YUI compressor


# Installation


## Download code

[https://github.com/jarry/fileadmin](https://github.com/jarry/fileadmin)

## Environment prepare

### software
    - jdk1.5~jdk14.x
    - tomcat 5.x ~ tomcat 9.x
    - structs 2.x

### Context configure
<Context docBase="<path>/fileadmin" path="/fileadmin" reloadable="true" source="<path>/fileadmin"/>


### URIEncoding setting
    <Connector connectionTimeout="20000" port="8088" URIEncoding="ISO-8859-1" protocol="HTTP/1.1" redirectPort="8443"/>
    this project has covert ISO-8859-1 to UTF-8
    
### user and path setting
   /fieladmin/WEB-INF/classes/fileadmin.properties
   
    tomcat launcher need read&write the directory

### Source code directory
	- build
	- css-src
	- js-src
	- readme
	- src
	- tools
	- work
	- WEB-INF/src/

	these folders need not to publish.

### Running directory
	+ css
	+ error
	+ help
	+ img
	+ js
	+ swf
	+ WEB-INF

	these folders will be run in container.


### About migrate

- the project is Web System of  File Upload and Management
- the original version from google code since 2010
- please visit: http://code.google.com/p/fileadmin/
- move the project to github  since 2019
- This project is no longer maintained


### More
pls see readme directory.
