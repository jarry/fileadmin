package com.youngli.fileadmin.file.impl;

import java.io.*;
import java.text.*;
import java.util.*;
import com.youngli.fileadmin.file.Directory;

/**
 * @author lichunping 2010-5 jarryli@gmail.com 
 * @sinace 1.0
 */
public class DirectoryImpl implements Directory {
	// the directory path
	private String path;
	private File file; 
	// read the directory to get the file array
	private List<File> fileList =  new ArrayList<File>();
	// files and folders list table;
	private List<Map<String, String>> fileListMap = new ArrayList<Map<String, String>>();
	// file properties for fileListMap
	private Map<String, String> properties = new HashMap<String, String>();
	private String[] propertiesName = {"name", "type", "ext", "date", "length", 
										"readonly", "hidden", "totalSpace",
										"freeSpace", "useableSpace"};
	
	// get the all file name by directory
	private ArrayList<String> filesName =  new ArrayList<String>();
	private ArrayList<String> foldersName =  new ArrayList<String>();
	
	// <Map<文件夹名称><子文件夹数量>>
	private List<Map<String, Integer>> foldersHasSubDir = new ArrayList<Map<String, Integer>>();
	
	public DirectoryImpl() {

	}
	
	public DirectoryImpl(String path) {
		setPath(path);
		setFileList();
	}
	
	public void setPath(String path) {
	    this.path = path;
	}
	
	public String getPath() {
		return path;
	}

	public List<File> getFileList() {
		return fileList;
	}
	
	public void setFileList() {
		if (path == null) return;
		file = new File(path);
		if (file == null || !file.exists()) {
		        System.out.println(this.path +" the folder not exists");
		        return;
		}
		
		File fileArray[] = file.listFiles();
		try {
			for (int i = 0; i < fileArray.length; i++) {
				File file = fileArray[i];
				fileList.add(file);
				String name = file.getName();
				//name = CharacterCode.iso2utf8(name);
				if (file.isDirectory()) {
					foldersName.add(name);	
					// added sub directory info
					Map<String, Integer> hasSubDirList = new HashMap<String, Integer>();
					hasSubDirList.put(name, hasSubDir(file));
					foldersHasSubDir.add(hasSubDirList);
				} else if(file.isFile()){
					filesName.add(name);
				}
				
				// set fileListMap
				addProperties(file);
				addPropertiesRow(null);
				resetProperty();
				//set empty
			}
			
			// 添加硬盘大小信息
			addHardSizeToProperties(file);
			//resetProperty();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private int hasSubDir(File folder) {
		int count = 0;		
		try {
			if (folder != null && folder.isDirectory()) {
				File fileArray[] = folder.listFiles();
				for (int i = 0; i < fileArray.length; i++) {
					File file = fileArray[i];
					if (file.isDirectory()) {
						count ++;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
	/**
	 * 添加硬盘大小到属性集合
	 * addHardSizeToProperties:
	 *
	 * @param file      
	 * @since
	 */
	public void addHardSizeToProperties(File file)
		throws IOException {
		// 换算大小
		DecimalFormat numFormat = new DecimalFormat("#0.00");		
		double size;
		size = (double)file.length() / (double)1024;
		//size  = Double.valueOf(len);
		size  = (double)file.getTotalSpace() / 1024 / 1024 / 1024;
		String totalSpace = numFormat.format(size);		
		size  = (double)file.getUsableSpace() / 1024 / 1024 / 1024;
		String freeSpace = numFormat.format(size);
		
		//size  = (double)file.getFreeSpace() / 1024 / 1024 / 1024;
		//String freeSpace  = numFormat.format(size);	
		double useableSize = Double.valueOf(totalSpace) - Double.valueOf(freeSpace);
		String useableSpace    = numFormat.format(useableSize);
		
		addProperty(propertiesName[7], String.valueOf(totalSpace));
		addProperty(propertiesName[8], String.valueOf(freeSpace));
		addProperty(propertiesName[9], String.valueOf(useableSpace));
	}
	
	public void addProperties(File file) 
		throws IOException {
		addProperty(propertiesName[0], file.getName());
		addProperty(propertiesName[1], file.isDirectory() ? "folder" : "file");
		addProperty(propertiesName[2], file.isFile() ? getExt(file.getName()) : null);
		//Date date = new Date(file.lastModified());
		String date = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(file.lastModified());
		addProperty(propertiesName[3], String.valueOf(date));
		// 格式
		DecimalFormat numFormat = new DecimalFormat("#0.00");		
		double size;
		size = (double)file.length() / (double)1024;
		String len = numFormat.format(size);
		addProperty(propertiesName[4], String.valueOf(len));
		addProperty(propertiesName[5], String.valueOf(file.canRead()));	
		addProperty(propertiesName[6], String.valueOf(file.isHidden()));
		//addHardSizeToProperties(file);
	}
	
	public int getListLength() {
		return filesName.size() + foldersName.size();
	}
	
	public int getFilesLength() {
		return filesName.size();
	}
	
	public int getFoldersLength() {
		return foldersName.size();
	}
	
	private String getExt(String fileName) {
		try {
			if (fileName != null && fileName.length() > 0) {
				int lastDotAt = fileName.lastIndexOf(".");
				if (lastDotAt != -1) {
					fileName = fileName.substring(lastDotAt + 1, fileName.length());
				} else {
					fileName = null;
				}
			}
		} catch(Exception e) {
	        System.out.println(e.getMessage());
		}
		return fileName;
	}
	
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}	

	public void setFilesName(ArrayList<String> filesName) {
		this.filesName = filesName;
	}
	
	/**
	 * @return file list Name
	 */
	public ArrayList<String> getFilesName() {
		return filesName;
	}
	
	public void setFoldersName(ArrayList<String> foldersName) {
		this.foldersName = foldersName;
	}
	
	public ArrayList<String> getFoldersName() {
		return foldersName;
	}

	/**
	 * @return the file at array list
	 */
	public File getFile(int index) {
		return fileList.get(index);
	}
	
	public void addPropertiesRow(Map<String, String> properties) {
		if (properties != null) {
			this.properties = properties;
		}
		fileListMap.add(this.properties);
	}	

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}

	public void setFileList(List<File> fileList) {
		this.fileList = fileList;
	}

	public void setFileListMap(List<Map<String, String>> fileListMap) {
		this.fileListMap = fileListMap;
	}
	
	public List<Map<String, String>> getFileListMap() {
		return fileListMap;
	}
	
	public String[] getPropertiesName() {
		return propertiesName;
	}
		
	public void setPropertiesName(String[] propertiesName) {
		this.propertiesName = propertiesName;
	}

	public void addProperty(String key, String value) {
		properties.put(key, value);
	}
	
	public void resetProperty() {
		properties = new HashMap<String, String>();
	}
	

	public List<Map<String, Integer>> getFoldersHasSubDir() {
		return foldersHasSubDir;
	}

	public void setFoldersHasSubDir(List<Map<String, Integer>> foldersHasSubDir) {
		this.foldersHasSubDir = foldersHasSubDir;
	}

}
