package com.youngli.fileadmin.act;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import com.youngli.fileadmin.common.ConfigProperties;
import com.youngli.fileadmin.common.FilePath;
import com.youngli.fileadmin.common.StringUtils;

/**
 * @author lichunping 2010-5
 *         jarryli@gmail.com 
 * 
 */
public class LoginAction {
	
	private String userName;
	private String passWord;
	private String validateCode;
	private String remember;
	private double random;	
	private String message;	
	private CookieAction cookie;
	
	// 存储在properties里面的用户信息列表
	private List<Hashtable<String, String>> userList;
	
	public LoginAction() {
		cookie = new CookieAction();
		userList = getUserList();
	}
	
	public String execute() {
		
		 // 给验证码加随机数防止图片被缓存
		setRandom(Math.random() * 1000);		
		
		if (userName == null || passWord == null || validateCode == null) {
			return "failed";
		}
		
		if (checkUserNameAndPassWord(userName, passWord) && checkValidateCode(validateCode)) {
			new SessionAction().setUserName(userName);
			setMessage("loginSuccess");
			// if selected remember user
			if (remember != null) {
				if (remember.equals("yes")) {
					setRememberUser();
				} else {
					removeRememberUser();
				}			
			}

			return "success";
		}
		setMessage("loginFailed");
		return "failed";
	}
	
	private void setRememberUser() {
		cookie.setCookie("userName", userName);
		cookie.setCookie("remember", remember);
	}
	
	private void removeRememberUser() {
		cookie.removeCookie("userName");
		cookie.removeCookie("remember");
	}
	
	public boolean checkUserName(String userName) {
//		for single user
//		if (userName != null) {	
//			String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
//			String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
//			ConfigProperties configProps = new ConfigProperties(propertiesPath);
//			String user = configProps.getValue("fileadmin.admin.username");			
//			return userName.toLowerCase().equals(user);
//		}	
			
		if (userName != null && userList != null) {
			Map<String, String> userMap = new HashMap<String, String>();			
			for (int i = 0; i < userList.size(); i++) {
				userMap = (Map<String, String>) userList.get(i);
				if (userMap.get("userName").equals(userName)) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * 
	 * checkUserNameAndPassWord:
	 *	根据用户名、密码查找uesrList里面的对应信息，如果确认一致则返回true
	 *
	 * @param userName
	 * @param passWord
	 * @return  密码是否正确    
	 * @since
	 */
	public boolean checkUserNameAndPassWord(String userName, String passWord) {
		if (userName != null && passWord != null && userList != null) {
			Map<String, String> userMap = new HashMap<String, String>();
			for (int i = 0; i < userList.size(); i++) {
				userMap = (Map<String, String>) userList.get(i);
				if (userMap.get("userName").equals(userName)
						&& userMap.get("passWord").equals( StringUtils.md5(passWord))
					) {
					return true;
				}
			}
		}
		return false;
	}
	
	/**
	 * getUserList:
	 *			根据fileadmin.properties文件里面的对应信息获取用户名、密码，用户的根目录等信息
	 *			这里没有使用数据库，使用临时的properties来存储用户与根目录信息，支持10个用户
	 * @return  userList 用户列表 List<Map<userName, passWord, String>>
	 * @since 1.0
	 */
	public List<Hashtable<String, String>> getUserList() {		
		String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
		String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
		ConfigProperties configProps = new ConfigProperties(propertiesPath);
		
		String userName;		// fileadmin.adminX.username
		String passWord;		// fileadmin.adminX.password
		String rootPath;
		Hashtable<String, String> userMap = new Hashtable<String, String>();
		List<Hashtable<String, String>> userList
										  = new ArrayList<Hashtable<String, String>>();
		for (int i = 1; i <= 10; i++) {
			userName = configProps.getValue("fileadmin.admin" + i + ".username");
			passWord = configProps.getValue("fileadmin.admin" + i + ".password");
			if (userName != null && !userName.isEmpty()
					&& passWord != null && !userName.isEmpty()
					) {
				rootPath = configProps.getValue("fileadmin." + userName + ".root.path");
				userMap.put("userName", userName);
				userMap.put("passWord", passWord);
				userMap.put("rootPath", rootPath);
				userList.add(userMap);
				userMap = new Hashtable<String, String>();
			}
		}
		return userList;
	}
	
	public boolean isLogon() {
		// 先检查cookie
		String userName;
		userName = cookie.getCookie("userName");
		String remember = cookie.getCookie("remember");
		if (remember != null && userName != null) {
			if (remember.equals("yes") && checkUserName(userName)) {
				// 同时把用户信息写入到session
				new SessionAction().setUserName(userName);
				return true;
			}
		}
		// 再检查session
		SessionAction sessionAction = new SessionAction();
		userName = sessionAction.getUserName();	
		if (userName != null && userName.length() > 0) {
			if (checkUserName(userName)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean logon() {
		return isLogon();
	}
	
	public boolean checkPassWord(String passWord) {
		if (passWord != null) {
			String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
			String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
			ConfigProperties configProps = new ConfigProperties(propertiesPath);
			String pass = configProps.getValue("fileadmin.admin.password");
			return StringUtils.md5(passWord).equals(pass);
		}
		return false;
	}
	
	public boolean checkValidateCode(String validateCode) {
		SessionAction sessionAction = new SessionAction();
		String randomNumber = sessionAction.getRandomNumber();
		if (validateCode != null && randomNumber != null)
			return validateCode.toLowerCase().equals(randomNumber.toLowerCase());
		
		return false;
	}	
	
	public double getRandom() {
		return random;
	}

	public void setRandom(double random) {
		this.random = random;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public String getMessage() {
		return message;
	}

	public String getRemember() {
		return remember;
	}

	public void setRemember(String remember) {
		this.remember = remember;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setUserList(List<Hashtable<String, String>> userList) {
		this.userList = userList;
	}	
	
}