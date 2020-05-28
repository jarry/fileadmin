package com.youngli.fileadmin.act;

import com.youngli.fileadmin.common.ConstantSession;


/**
 * @author lichunping 2010-5
 *         jarryli@gmail.com 
 * 
 */
public class LogoutAction {
	
	String userName;
	private CookieAction cookie;
	private SessionAction sessionAction;
	
	public String execute() {
		cookie = new CookieAction();
		sessionAction = new SessionAction();
		removeSessionUser();
		removeRememberUser();
		return "success";
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void removeSessionUser() {
		sessionAction.removeUserName();
		sessionAction.remove(ConstantSession.RANDOM_NUMBER);
	}
	
	private void removeRememberUser() {
		cookie.removeCookie("userName");
		cookie.removeCookie("remember");
	}
}