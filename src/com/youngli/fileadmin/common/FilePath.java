package com.youngli.fileadmin.common;
import java.io.File;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.youngli.fileadmin.act.SessionAction;

/**
 * @author lichunping 2010-5 jarryli@gmail.com 
 * 
 */
public class FilePath {
	
	public static String ROOT_PATH;
	
	public FilePath() {
		ROOT_PATH = getRootPath();
	}
	
	/**
	 * 根据用户名来获取用户名对应的根目录信息
	 * getRootPath:
	 *
	 * @return      
	 * @since
	 */
	public static String getRootPath() {
		String path = "";
		try {
			String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
			String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
			ConfigProperties configProps = new ConfigProperties(propertiesPath);		
			String userName = new SessionAction().getUserName();
			if (userName != null) {
				path = configProps.getValue("fileadmin." + userName + ".root.path");
			}
			return path;				
		} catch (Exception e) {
			e.printStackTrace();
		}
	return path;
}
	
//	public static String getRootPath() {
//		try {
//			String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
//			String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
//			ConfigProperties configProps = new ConfigProperties(propertiesPath);
//			return configProps.getValue("fileadmin.root.path");				
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return "";
//	}
	
	/**
	 * set default root path, if it has not root path, add root path for the path;
	 * @param path
	 * @return
	 */
	public static String getPath (String path) {
		ROOT_PATH = getRootPath();
		if (path == null) return ROOT_PATH;
		try {
			int rootLen = ROOT_PATH.length();
			String startPath = "";
				if (path.indexOf(ROOT_PATH) != -1)
					startPath = path.substring(0, rootLen);
				
				if (!startPath.equals(ROOT_PATH)) {
					path = ROOT_PATH + path;
				}
			
			} catch (Exception e) {
				e.printStackTrace();
		}
		return path;
	}
	
	public static String getDirRealPath(String path) {
		ROOT_PATH = getRootPath();
		if (path == null || path.trim().equals("")) path = ROOT_PATH;
		int len = path.length();
		String lastChar = path.substring(len - 1, len);
		path = CharacterCode.iso2utf8(path);
		path = escapePath(path);
		if (!lastChar.equals("/")) {
			path += "/";
		}
		//CharacterCode.encodeHTML(path)
		path = getPath(path);  // check root path
		return path;
	}
	
	public static String getFileRealPath(String path) {
		if (path == null || path.equals(""))return null;
		path = CharacterCode.iso2utf8(path);
		path = escapePath(path);
		path = getPath(path);  // check root path
		return path;
	}
	
	public static String getRelativePath(String root, String path) {
		String relativePath = null;
		try {
			path = CharacterCode.iso2utf8(path);
			int rootLen = root.length();
			String lastChar = root.substring(rootLen - 1, rootLen);
			if (!lastChar.equals("/")) {
				root += "/";
			}
			
			relativePath = path.replaceFirst(root, "");
	   } catch(Exception e) {
		   e.printStackTrace();
	   }
		return relativePath;
	}
	
	public static String escapePath(String path) {
		if (path != null && path.length() > 1) {
			path = path.replaceAll("\\\\", "/");
		}
		return path;
	}
	
	/**
	 * get previous path, find last slash
	 * @param path local path /home/work/ 
	 * @return
	 */
	public static String getPreviousPath(String path) {
		int last;
		if (path != null && path.length() > 1) {
			last = path.lastIndexOf("/");
			path = path.substring(0, last);
			last = path.lastIndexOf("/");
			path = path.substring(0, last + 1);
		}
		return path;
	}
	
	/**
	 * according last dot get extension by file name
	 * @param fileName
	 * @return extension or null;
	 */
	public static String getExt(String fileName) {
		try {
			if (fileName != null && fileName.length() > 0) {
				int lastDotAt = fileName.lastIndexOf(".");
				if (lastDotAt != -1) {
					fileName = fileName.substring(lastDotAt + 1, fileName.length());
				} else {
					fileName = "";
				}
			}
		} catch(Exception e) {
	        System.out.println(e.getMessage());
		}
		return fileName;
	}
	/**
	 * get name no extension
	 * @param fileName
	 * @return
	 */	
	public static String getRealName(String fileName) {
		try {
			if (fileName != null && fileName.length() > 0) {
				String ext = getExt(fileName);
				int extAt = fileName.length();
				if (ext.length() > 0) {
					extAt = fileName.lastIndexOf(ext) - 1;
				}
				fileName = fileName.substring(0, extAt);
			}
		} catch(Exception e) {
	        System.out.println(e.getMessage());
		}
		return fileName;
	}
	
	/**
	 * check the file extension is contained by the extensions;
	 * @param ext
	 * @param exts
	 * @return true or false
	 */
	public static boolean isContainExt(String ext, String[] exts) {
		if (ext == null || exts == null) return false;
		int i = 0, extsLen = exts.length;
			while (i < extsLen) {
				if (exts[i].equals(ext)) 
					return true;
				i++;
			}
		return false;
	}
	
	public static boolean isOfficeExt(String ext) {
		String[] exts = {"doc", "xls", "ppt", "docx", "xlsx", "pptx"};
		return isContainExt(ext, exts);
	}	
	
	public static int getSubDirLength(String name, List<Map<String, Integer>> list) {
		int len = 0;
		if (name == "") return len;
		for (Map<String, Integer> item : list) {
			if (item.containsKey(name)) {
				len = item.get(name);
			}
		}
		/*
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).containsKey(name)) {
				len = list.get(i).get(name);
			}
		}*/
		return len;
	}

	/**
	 * 根据路径名是否需要增加斜杠
	 * 若路径最后字符不是斜杠(/或者\),就返回一个斜杠
	 * @param path 路径
	 * @return 返回斜杠或空字符 
	 */
	public static String getSlash(String path) {
		if (path == null || path.trim().equals("")) return "";
		int len = path.length();
		String last = path.substring(len - 1, len);
		if (last.equals("/") || last.equals("\\")) {
			return "";
		}
		return "/"; 
	}
	
	/**
	 * path Test Program
	 * main:
	 *
	 * @param args
	 * @throws Exception      
	 * @since
	 */
	public static void main(String[] args) throws Exception {

		
		List<Map<String, Integer>> list = new ArrayList<Map<String, Integer>>();
		Map<String, Integer> o = new HashMap<String, Integer>();
		o.put("a", 10);
		//o = new HashMap();
		o.put("b", 3);
		//o = new HashMap();
		o.put("c", 1);
		list.add(o);
		System.out.println(getSubDirLength("b", list));
		
		
		
		System.out.println(Thread.currentThread().getContextClassLoader().getResource(""));
		//System.out.println(Class.class.getClassLoader().getResource("/"));
		System.out.println(ClassLoader.getSystemResource(""));
		System.out.println(Class.class.getResource("/"));
		System.out.println(Class.class.getResource("/"));
		
		String webAppPath = Class.class.getClass().getResource("/").getPath();
		//int len = webAppPath.length();
		int lastIdx = webAppPath.indexOf("work") != -1 ? webAppPath.indexOf("work") : webAppPath.length();
		webAppPath = webAppPath.substring(0, lastIdx);
		
		System.out.println(webAppPath + "WEB-INF/classes/fileadmin.properties");
		//webAppPath = webAppPath + "WEB-INF/classes/fileadmin.properties";
		webAppPath = System.getProperty("user.dir")+ "/WEB-INF/classes/fileadmin.properties";
		File f = new File(webAppPath);
		if (f.isFile()) {
			System.out.println(f.length());
		} 
		
		
		String webinfPath = new File(FilePath.class.getResource("/").getPath()).getParent()+"/WEB-INF/";
		System.out.println(webinfPath);
		
		/*
		String root = new ConfigProperties(webAppPath).getValue("fileadmin.root.path");
		System.out.println(root);
		System.out.println(ROOT_PATH);
		
		
		//Class
		System.out.println(new File("/").getAbsolutePath());
		System.out.println(System.getProperty("user.dir")); 
		System.out.println("物理路径分割符是： " + System.getProperty("file.separator") );
		*/
		
		System.out.println("====:");
		String webInfPath = new File(FilePath.class.getResource("/").getPath()).getParent();
		String propertiesPath = webInfPath + "/classes/fileadmin.properties";			
		ConfigProperties configProps = new ConfigProperties(propertiesPath);
		System.out.println(configProps.getPropertie().elements());
		
		
		Enumeration<Object> e =  configProps.getPropertie().elements();	
		while (e.hasMoreElements()) {
		    String key = (String)e.nextElement();
		    System.out.println(key);
		}
		
//		configProps.getPropertie().list(System.out);		
//		String s = configProps.getValue("ileadmin.admin.username", "ileadmin.admin.username");
//		System.out.print(s);
		
		
		String local   =   Locale.getDefault().toString();
		String sysLang   = System.getProperty("user.language");
		String sysEncode = System.getProperty("file.encoding");
		System.out.println(local);
		System.out.println(sysLang);
		System.out.println(sysEncode);
	}

}
