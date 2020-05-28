package com.youngli.fileadmin.act;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;
import com.youngli.fileadmin.common.CharacterCode;

/**
 * 获取目录信息Action
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public class RedirectAction {
	
	private String url;
	private String sysLang;
	private String sysEncode;
	private String locale;
	
	private String urlGBK;
	private String urlUTF8;
	
	
	public String execute() {
		try {
			
//			url = CharacterCode.encodeCovert(url, "iso-8859-1", "gbk");
			url = CharacterCode.iso2utf8(url);
			sysLang   = System.getProperty("user.language");
			sysEncode = System.getProperty("file.encoding");
			locale = Locale.getDefault().toString();
			if (url != null) {
				urlUTF8 = URLEncoder.encode(url, "utf-8");
				urlUTF8 = decodePath(urlUTF8);
				
				urlGBK = URLEncoder.encode(url, "gbk");
				urlGBK = decodePath(urlGBK);

//				String strTmp = CharacterCode.encodeCovert(url, "iso8859-1", "gbk");
//				urlGBK = URLEncoder.encode(strTmp, "gbk");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "success";
	}
	
	public String decodePath(String path) {
		path = path.replaceAll("%3A", ":");
		path = path.replaceAll("%2F", "/");
		// encode 转义空格被转换为+号了
		path = path.replaceAll("\\+", "%20");
		return path;
	}
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public String getSysLang() {
		return sysLang;
	}

	public void setSysLang(String sysLang) {
		this.sysLang = sysLang;
	}
	
	public String getSysEncode() {
		return sysEncode;
	}

	public void setSysEncode(String sysEncode) {
		this.sysEncode = sysEncode;
	}	

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getUrlGBK() {
		return urlGBK;
	}

	public void setUrlGBK(String urlGBK) {
		this.urlGBK = urlGBK;
	}

	public String getUrlUTF8() {
		return urlUTF8;
	}
	
	public void setUrlUTF8(String urlUTF8) {
		this.urlUTF8 = urlUTF8;
	}	
}

