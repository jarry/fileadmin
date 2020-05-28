package com.youngli.fileadmin.act;

import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import com.youngli.fileadmin.common.*;

/**
 * 提供session操作方法
 * @author lichunping 2010-5
 *         jarryli@gmail.com 
 * 
 */
public class SessionAction {
	
	Map<String, Object> session;
	
	public SessionAction() {
		session = ActionContext.getContext().getSession();
	}
	/**
	 * 
	 * 删除session名称
	 *
	 * @param sessionName      
	 * @since
	 */
	public void remove(String sessionName) {
		if (getUserName() != null)
			session.remove(sessionName);	
	}
	
	/**
	 * 添加session对象
	 * add:
	 *
	 * @param key
	 * @param value      
	 * @since
	 */
	public void add(String key, String value) {
		session.put(key, value);
	}
	
	/**
	 * 删除session中的用户名
	 * removeUserName:
	 *      
	 * @since
	 */
	public void removeUserName() {
		session.remove(ConstantSession.USER_NAME);	
	}
	
	/**
	 * 删除session中的用户密码
	 * removePassWord:
	 *      
	 * @since
	 */
	public void removePassWord() {
		session.remove(ConstantSession.PASS_WORD);	
	}
	
	public String getUserName() {
		return (String)session.get(ConstantSession.USER_NAME);
	}
	
	public String getPassWord() {
		return (String)session.get(ConstantSession.PASS_WORD);
	}
	
	public String getRandomNumber() {
		return (String)session.get(ConstantSession.RANDOM_NUMBER);
	}

	public void setPassWord(String passWord) {
		session.put(ConstantSession.PASS_WORD, passWord);
	}

	public void setRandomNumber(String randomNumber) {
		session.put(ConstantSession.RANDOM_NUMBER, randomNumber);
	}

	public void setUserName(String userName) {
		session.put(ConstantSession.USER_NAME, userName);
	}	
}
