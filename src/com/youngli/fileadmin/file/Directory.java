package com.youngli.fileadmin.file;

import java.util.*;

/**
 * Directory 对外的接口，把不需要提供的注释了
 * @author lichunping jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public interface Directory {
	
	/**
	 * 设置目录的路径
	 * @author lichunping
	 * @param path      
	 * @since 1.0
	 */
	public void setPath(String path);
	
	//public String getPath();

	//public List<File> getFileList();
	
	//public void setFileList();
	
	/**
	 * 添加硬盘大小到属性集合
	 * addHardSizeToProperties:
	 *
	 * @param file      
	 * @since
	 */
	//public void addHardSizeToProperties(File file) throws IOException;
	
	//public void addProperties(File file) throws IOException ;
	
	/**
	 * 获得文件与文件夹列表长度
	 * @author lichunping
	 * @return 数量    
	 * @since 1.0
	 */
	public int getListLength();
	
	/**
	 * 获得文件列表长度
	 * @author lichunping
	 * @return 数量    
	 * @since 1.0
	 */
	public int getFilesLength();
	
	/**
	 * 获得文件夹列表长度
	 * @author lichunping
	 * @return 数量    
	 * @since 1.0
	 */
	public int getFoldersLength();
	
	//public File getFile();


	//public void setFile(File file);

	//public void setFilesName(ArrayList<String> filesName);
	
	/**
	 * 获得文件名列表
	 * @author lichunping
	 * @return 文件名列表    
	 * @since 1.0
	 */
	public ArrayList<String> getFilesName();
	
	//public void setFoldersName(ArrayList<String> foldersName);
	
	/**
	 * 获得文件夹名列表
	 * @author lichunping
	 * @return 文件夹名列表    
	 * @since 1.0
	 */
	public ArrayList<String> getFoldersName();

	/**
	 * @return the file at array list
	 */
	//public File getFile(int index);
	
	//public void addPropertiesRow(Map<String, String> properties);

	/**
	 * 获得文件属性列表，这里主要用于获得硬盘尺寸空间信息
	 * @author lichunping
	 * @return 文件属性列表   
	 * @since 1.0
	 */
	public Map<String, String> getProperties();

	//public void setProperties(Map<String, String> properties);

	//public void setFileList(List<File> fileList);

	//public void setFileListMap(List<Map<String, String>> fileListMap);
	
	/**
	 * 获得文件详细信息
	 * @author lichunping
	 * @return 文详细信息Map
	 * @since 1.0
	 */
	public List<Map<String, String>> getFileListMap();
	
	/**
	 * 获得定义的属性名称
	 * @author lichunping
	 * @return 属性名数组
	 * @since 1.0
	 */
	public String[] getPropertiesName();
		
	//public void setPropertiesName(String[] propertiesName);

	//public void addProperty(String key, String value);
	
	//public void resetProperty();	

	/**
	 * 获得当前目录是否有子文件夹信息，含子文件夹数量
	 * @author lichunping
	 * @return 
	 * @since 1.0
	 */
	public List<Map<String, Integer>> getFoldersHasSubDir();

	//public void setFoldersHasSubDir(List<Map<String, Integer>> foldersHasSubDir);

}
