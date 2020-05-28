package com.youngli.fileadmin.act;

import java.util.*;
import com.youngli.fileadmin.common.*;
import com.youngli.fileadmin.file.*;
import com.youngli.fileadmin.file.impl.DirectoryImpl;

/**
 * 获取目录信息Action
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public class DirAction {

	private String root, path, previousPath, absolutePath;
	private String id;
	private List<Map<String, String>> fileListMap;
	private ArrayList<String> filesName; 
	private ArrayList<String> foldersName; 
	
	private String[] propertiesName;
	private Map<String, String> properties = new HashMap<String, String>();

	private int listLength;
	private int filesLength, foldersLength, fileListMapLength;
	private List<Map<String, Integer>> foldersHasSubDir = new ArrayList<Map<String, Integer>>();
	
	private Directory dir;
	
	public void setFiles() {
		try {
		absolutePath = FilePath.getDirRealPath(path);
		root = FilePath.getRootPath();
		previousPath = FilePath.getPreviousPath(absolutePath);
		//DirectoryImpl dir = new DirectoryImpl(absolutePath);
		dir = new DirectoryImpl(absolutePath);
//		dir.setPath(absolutePath);
		filesName = dir.getFilesName();
		foldersName = dir.getFoldersName();
		
		listLength = dir.getListLength();
		filesLength = dir.getFilesLength();
		foldersLength = dir.getFoldersLength();
		foldersHasSubDir = dir.getFoldersHasSubDir();		
		
		propertiesName = dir.getPropertiesName(); 
		properties     = dir.getProperties();
		fileListMap    = dir.getFileListMap();
		fileListMapLength = fileListMap.size();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * getTree: 返回tree
	 * @author lichunping
	 * @return      
	 * @since
	 */
	public String getTree() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}
		if (id != null) {
			path = id;
			id = CharacterCode.iso2utf8(id);

		}
		setFiles();
		return "tree";

	}
	
	
	public String execute() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}
		
		setFiles();
		return "success";
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getPreviousPath() {
		return previousPath;
	}

	public void setPreviousPath(String previousPath) {
		this.previousPath = previousPath;
	}
	
	public String getAbsolutePath() {
		return absolutePath;
	}

	public void setAbsolutePath(String absolutePath) {
		this.absolutePath = absolutePath;
	}

	public List<Map<String, String>> getFileListMap() {
		return fileListMap;
	}

	public void setFileListMap(List<Map<String, String>> fileListMap) {
		this.fileListMap = fileListMap;
	}

	public ArrayList<String> getFilesName() {
		return filesName;
	}

	public void setFilesName(ArrayList<String> filesName) {
		this.filesName = filesName;
	}

	public ArrayList<String> getFoldersName() {
		return foldersName;
	}

	public void setFoldersName(ArrayList<String> foldersName) {
		this.foldersName = foldersName;
	}

	public String[] getPropertiesName() {
		return propertiesName;
	}

	public void setPropertiesName(String[] propertiesName) {
		this.propertiesName = propertiesName;
	}

	public Map<String, String> getProperties() {
		return properties;
	}

	public void setProperties(Map<String, String> properties) {
		this.properties = properties;
	}

	public int getListLength() {
		return listLength;
	}

	public void setListLength(int listLength) {
		this.listLength = listLength;
	}

	public int getFilesLength() {
		return filesLength;
	}

	public void setFilesLength(int filesLength) {
		this.filesLength = filesLength;
	}
	

	public int getFileListMapLength() {
		return fileListMapLength;
	}

	public void setFileListMapLength(int fileListMapLength) {
		this.fileListMapLength = fileListMapLength;
	}

	public int getFoldersLength() {
		return foldersLength;
	}

	public void setFoldersLength(int foldersLength) {
		this.foldersLength = foldersLength;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public List<Map<String, Integer>> getFoldersHasSubDir() {
		return foldersHasSubDir;
	}

	public void setFoldersHasSubDir(List<Map<String, Integer>> foldersHasSubDir) {
		this.foldersHasSubDir = foldersHasSubDir;
	}
}
