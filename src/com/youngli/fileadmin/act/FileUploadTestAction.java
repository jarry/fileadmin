package com.youngli.fileadmin.act;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 文件上传Action
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public class FileUploadTestAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;

	public String execute() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}			
		return "upload";
	}
	
	
}
