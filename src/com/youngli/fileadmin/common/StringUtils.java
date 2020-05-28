/*
 * Copyright (c) 2010, All Rights Reserved.
 */

package com.youngli.fileadmin.common;

import java.security.MessageDigest;

/**
 * ClassName:StringUtils
 * Function: TODO ADD FUNCTION
 *
 * @author   <a href="mailto:jarryli@gmail.com">Jarry</a>
 * @version  
 * @since    TODO
 * @Date	 2010	2010-5-9		上午07:27:08
 *
 * @see 	 
 */

public class StringUtils {
	/**
	 * 计算md5值
	 * 
	 * @author jarry
	 * @since 1.0.0
	 * @param source
	 * @return
	 */
	public static String md5(String source) {
		char hexChars[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		try {
			byte[] bytes = source.getBytes();
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(bytes);
			bytes = md.digest();
			int j = bytes.length;
			char[] chars = new char[j * 2];
			int k = 0;
			for (int i = 0; i < bytes.length; i++) {
				byte b = bytes[i];
				chars[k++] = hexChars[b >>> 4 & 0xf];
				chars[k++] = hexChars[b & 0xf];
			}
			return new String(chars);
		} catch (Exception e) {
			return null;
		}
	}
	
	public static void main(String[] argments) {
		String test = StringUtils.md5("ut");
		// b1a5d251fa4fe598cb947ffc42b9cbed
		// b1a5d251fa4fe598cb947ffc42b9cbed
		System.out.print(test);
	}
}
