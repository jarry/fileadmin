package com.youngli.fileadmin.act;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;


/**
 * 提供session操作方法
 * @author lichunping 2010-5
 *         jarryli@gmail.com 
 * 
 */
public class CookieAction {
	private HttpServletResponse response;
	private HttpServletRequest request;
	public CookieAction() {
		response = ServletActionContext.getResponse();
		request = ServletActionContext.getRequest();
	}
	
	/**
	 * 添加cookie对象
	 * setCookie:
	 *
	 * @param cookieName
	 * @param cookieValue      
	 * @since 1.0
	 */
	public void setCookie(String cookieName, String cookieValue) {
		if (cookieName == null) return;
	    Cookie cookie = new Cookie(cookieName, cookieValue);
		cookie.setMaxAge(365 * 24 * 60 * 60);		// cookie存取一年有效
		response.addCookie(cookie);
	}
	
	/**
	 * 根据cookie名获得cookie value;
	 * getCookie:
	 *
	 * @param cookieName
	 * @since 1.0
	 * @return cookieValue
	 */
	public String getCookie(String cookieName) {
		if (cookieName == null) return null;
		Cookie[] cookies = request.getCookies();
		String cookieValue = "";
		if (cookies != null) {
	        for (int i = 0; i < cookies.length; i++) {
	            Cookie c = cookies[i];
	            String name = c.getName();
	            String value = c.getValue();
	            if (name.equals(cookieName)) {
	            	return value;
	            }
	        }
		}
        return cookieValue;
	}
	
	/**
	 * 根据cookie名获得cookie list对象;
	 * getCookie:
	 *
	 * @param cookieName
	 * @since 1.0
	 * @return Map(cookieName, cookieValue)
	 */
	public List<Map<String, String>> getCookie() {
		Map<String, String> cookieMap;
		List<Map<String, String>> cookieMapList = new ArrayList<Map<String, String>>();
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
	        for (int i = 0; i < cookies.length; i++) {
	        	cookieMap = new HashMap<String, String>();
	            Cookie c = cookies[i];
	            String name = c.getName();
	            String value = c.getValue();
	            cookieMap.put(name, value);
	            cookieMapList.add(cookieMap);
	        }
		}
        return cookieMapList;
	}
	
	/**
	 * 删除cookie对象
	 * removeCookie:
	 *
	 * @param cookieName  
	 * @since 1.0
	 */
	public void removeCookie(String cookieName) {	
		if (cookieName == null) return;
		Cookie cookie = new Cookie(cookieName, null); 
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}
	
	/**
	 * 根据cookie值删除cookie的所有拥有该值的cookie对象
	 * removeCookiesByValue:
	 * @param cookieValue      
	 * @since 1.0
	 */
	public void removeCookiesByValue(String cookieValue) {
		if (cookieValue == null) return;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
	        for (int i = 0; i < cookies.length; i++) {
	            Cookie c = cookies[i];
	            String value = c.getValue();
	            if (value.equals(cookieValue)) {
	            	cookies[i].setValue(null);
	            	cookies[i].setMaxAge(0);
	            	response.addCookie(cookies[i]);
	            }
	        }
		}
	}
	
	/**
	 * 根据cookie的名称删除cookie对象
	 * removeCookieByName:
	 * @param cookieValue      
	 * @since 1.0
	 */
	public void removeCookieByName(String cookieName) {
		if (cookieName == null) return;
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
	        for (int i = 0; i < cookies.length; i++) {
	            Cookie c = cookies[i];
	            String name = c.getName();
	            if (name.equals(cookieName)) {
	            	cookies[i].setValue(null);
	            	cookies[i].setMaxAge(0);
	            	response.addCookie(cookies[i]);
	            }
	        }
		}
	}
	
}
	