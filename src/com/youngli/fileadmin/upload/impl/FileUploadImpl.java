package com.youngli.fileadmin.upload.impl;

import java.io.*;
import java.util.*;
import com.youngli.fileadmin.file.*;
import com.youngli.fileadmin.file.impl.FileEditImpl;
import com.youngli.fileadmin.upload.FileUpload;

/**
 * 文件上传后对文件移动增删操作
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 *         
 * @sinace 1.0.1
 */
public class FileUploadImpl implements FileUpload {
	/**
	 * save upload files name and type
	 * @see FileUploadAction.java
	 */
	private ArrayList<Map<String, String>> uploadsList = new ArrayList<Map<String, String>>();
	private Map<String, String> properties = new HashMap<String, String>();
	FileEdit fileEdit;
	
    public FileUploadImpl() {
    	fileEdit = new FileEditImpl();
    }
     
    public ArrayList<Map<String, String>> getUploadsList() {
    	return uploadsList;
    }
    
	public void setUploadsList(ArrayList<Map<String, String>> uploadsList) {
		this.uploadsList = uploadsList;
	}
    
    public void addProperty(String key, String value) {
    	properties.put(key, value);
    }
    
    public void addUploadsListRow(Map<String, String> properties) {
		if (properties != null) {
			this.properties = properties;
		}
		uploadsList.add(this.properties);
    }
    
	public void resetProperty() {
		properties = new HashMap<String, String>();
	}
    
	/**
	 * 移动文件，如存在同名文件则不替换
	 * @param from 要移动的文件路径
	 * @param to 文件目标的路径
	 * @return 是否成功移动文件
	 */
	public boolean move(String from, String to) {
		try {
			File fromFile = new File(from);
			File toFile   = new File(to);
			
			if (!fromFile.exists()) {
				return false;
			}
		
			boolean moveSuccess = fromFile.renameTo(toFile);		
//			`renameTo` sometimes failed, add `copyFile`
			if (!moveSuccess) {
				moveSuccess = fileEdit.copyFile(from, to);
				fromFile.deleteOnExit();
			}
			return moveSuccess;

			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 移动文件，如存在同名文件则不替换
	 * @param fromFile 要移动的文件
	 * @param to 文件目标的路径
	 * @return 是否成功移动文件
	 */
	public boolean move(File fromFile, String to) {
		try {
			String toPath = to;
			File toFile   = new File(toPath);
			if (!fromFile.exists() ) {
				return false;
			}
			
			boolean moveSuccess = fromFile.renameTo(toFile);		
//			`renameTo` sometimes failed, add `copyFile`
			if (!moveSuccess) {
				moveSuccess = fileEdit.copyFile(fromFile.toString(), toPath);
				fromFile.deleteOnExit();
			}
			return moveSuccess;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 移动文件并替换同名文件
	 * @param fromFile 要移动的文件
	 * @param to 文件目标的路径
	 * @return 是否成功移动文件
	 */
	public boolean moveFileReplace(File fromFile, String to) {
		try {
			String toPath = to;
			File toFile   = new File(toPath);
			if (!fromFile.exists()) {
				return false;
			}
			if (toFile.exists()) {
				toFile.deleteOnExit();
			}	
			
			boolean moveSuccess = fromFile.renameTo(toFile);		
//			`renameTo` sometimes failed, add `copyFile`
			if (!moveSuccess) {
				moveSuccess = fileEdit.copyFile(fromFile.toString(), toPath);
				fromFile.deleteOnExit();
			}
			return moveSuccess;			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	/**
	 * 批量移动文件
	 * @param from 要移动的文件集合
	 * @param toPath 文件目标的路径
	 * @return 是否成功移动文件
	 */
	public boolean moveFiles(ArrayList<File> from, String toPath) {
		boolean moveSuccess = true;
		try {
			for (int i = 0; i < from.size(); i++) {
				File file = from.get(i);
				Map<String, String> uploadFile = uploadsList.get(i);
				if (!moveFileReplace(file, toPath + uploadFile.get("name"))) {
					moveSuccess = false;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return moveSuccess;
	}

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}
	
}
