package com.youngli.fileadmin.common;
/**
 * @author lichunping 2010-5 jarryli@gmail.com 
 * 
 */
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

public class CharacterCode {
	
	/**
	 * encodeCovert:
	 * 给字符转码
	 * 
	 * @author lichunping
	 * @param str  要编码的字符
	 * @param from 原来的编码。如: iso-8859-1
	 * @param to   转码后的编码。如:utf-8
	 * @return 转码后的字符串 
	 * @since 1.0
	 */
	public static String encodeCovert(String str, String from, String to) {
		try {
			String formStr = str;
			byte[] toStr   = formStr.getBytes(from);
			return  new String(toStr, to);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "null";
	}
	
	public static String iso2utf8(String str) {
		return encodeCovert(str, "iso-8859-1", "utf-8");
	}
	
	public static String iso2gbk(String str) {
		return encodeCovert(str, "iso-8859-1", "gbk");
	}
	
	public static String encode(String str) {
		try {
			str = URLEncoder.encode(str, "utf-8");
			//str = str.replaceAll("%2F", "/");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;		
	}
	
	public static String decode(String str) {
		try {
			str = URLDecoder.decode(str, "utf-8");
			//str = str.replaceAll("%2F", "/");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;		
	}
	
	/**
	 * html转义字符
	 * encodeHTML:
	 *
	 * @param html
	 * @return      
	 * @since
	 */
	public static String encodeHTML(String html) {
		html = html.replaceAll("&", "&amp;");
		html = html.replaceAll("'", "&#039;");
		// ' = &rsquo;  = &#039;
		html = html.replaceAll("\"", "&quot;");
		html = html.replaceAll("<", "&lt;");	
		html = html.replaceAll(">", "&gt;");				
		return html;
	}
}
