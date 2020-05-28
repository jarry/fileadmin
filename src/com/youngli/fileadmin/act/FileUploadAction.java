package com.youngli.fileadmin.act;

import java.io.*;
import java.util.*;

import com.opensymphony.xwork2.ActionSupport;
import com.youngli.fileadmin.upload.*;
import com.youngli.fileadmin.upload.impl.FileUploadImpl;

/**
 * 文件上传Action
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public class FileUploadAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	// upload multi-files	
	private FileUpload fileUpload;
	private ArrayList<File> uploads;
	private ArrayList<Map<String, String>> uploadsList;
	private ArrayList<String> uploadsFileName;
	private ArrayList<String> uploadsContentType;
	private final String[] PROPERTIE_NAMES = {"name", "contentType", "size"};
	
	// upload single file
	private File uploadFile;
	private String uploadFileFileName;
	private String uploadFileContentType;

	public String path;
	public Map<String, String> MESSAGE = new HashMap<String, String>();
	public final long MAX_SIZE = 300 * 1024 * 1024;  
	
	public String execute() {
		
//     使用 swf控件时检测session无效，此处不做登录验证		
//		if (!new LoginAction().logon()) {
//			return "not_logon";
//		}
		try {
			if (uploads == null && uploadFile == null) {
				setMessage("INFO", " not select file.");
				return "input";
			}
			//path = FilePath.getDirRealPath(path);
			fileUpload = new FileUploadImpl();

			if (uploads != null) { 
				setUploadsList();
				saveFiles();
			}
			if (uploadFile != null) {
				saveFile();
			}
			return "success";
			
		} catch (Exception e) {
			e.printStackTrace();
			return "input";
		}
	}	
	
    public void setUploadsList() { 	
		try {
			for (int i = 0; i < uploadsFileName.size(); i++) {
				fileUpload.addProperty(PROPERTIE_NAMES[0], uploadsFileName.get(i));
				fileUpload.addProperty(PROPERTIE_NAMES[1], uploadsContentType.get(i));	
				fileUpload.addProperty(PROPERTIE_NAMES[2], String.valueOf(uploads.get(i).length() / 1024));
				fileUpload.addUploadsListRow(null);
				fileUpload.resetProperty();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		uploadsList = fileUpload.getUploadsList();
    }
	
	public void saveFile() {
		// for save the  upload single file
		if (path != null && uploadFile != null) {
			if (fileUpload.moveFileReplace(uploadFile, path + uploadFileFileName)) {
				setMessage("UPLOAD_RESULT", "success");
				setMessage("INFO", " upload file successfully.");
			} else {
				setMessage("UPLOAD_RESULT", "failed");
				setMessage("INFO", " can not upload file.");
			}
		} 	
	}
	
	public void saveFiles() {
		// for save the  upload multi-files
		if (path != null && uploads != null) {
			if (fileUpload.moveFiles(uploads, path)) {
				setMessage("UPLOAD_RESULT", "success");
				setMessage("INFO", " upload files successfully.");
			} else {
				setMessage("UPLOAD_RESULT", "failed");
				setMessage("INFO", " can not upload files.");
			}
		}	
	}
	
	public void setUploads(ArrayList<File> uploads) {
		this.uploads = uploads;
	}
	
	public ArrayList<File> getUploads() {
		return uploads;
	}
	
	public void setUploadsFileName(ArrayList<String> filesName) {
		uploadsFileName = filesName;
	}
	
	public ArrayList<String> getUploadsFileName() {
		return uploadsFileName;
	}
	
	public void setUploadsContentType(ArrayList<String> contentType) {
		uploadsContentType = contentType;
	}
	
	public ArrayList<String> getUploadsContentType() {
		return uploadsContentType;
	}
	
	public String getUploadFileFileName() {
		return uploadFileFileName;
	}
	public void setUploadFileFileName(String uploadFileFileName) {
		this.uploadFileFileName = uploadFileFileName;
	}
	
	public String getUploadFileContentType() {
		return uploadFileContentType;
	}
	public void setUploadFileContentType(String uploadFileContentType) {
		this.uploadFileContentType = uploadFileContentType;
	}

	public void setUploadFile(File uploadFile) {
		this.uploadFile = uploadFile;
	}
	
	public File getUploadFile() {
		return uploadFile;
	}
	
	public void setMessage(String key, String value) {
		MESSAGE.put(key, value);
	}
	
	public Map<String, String> getMessage() {
		return MESSAGE;
	}

	public FileUpload getFileUpload() {
		return fileUpload;
	}

	public void setFileUpload(FileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public ArrayList<Map<String, String>> getUploadsList() {
		return uploadsList;
	}

	public void setUploadsList(ArrayList<Map<String, String>> uploadsList) {
		this.uploadsList = uploadsList;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	
}
