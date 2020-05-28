package com.youngli.fileadmin.act;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import com.youngli.fileadmin.common.*;
import com.youngli.fileadmin.file.*;
import com.youngli.fileadmin.file.impl.FileEditImpl;
/**
 * 文件操作Action
 * @author lichunping 
 * 		   jarryli@gmail.com 2010-5  
 * @sinace 1.0
 */
public class FileEditAction extends DirAction {
	private String path, name, toPath, newName;
	// the path is absolute path
	public String del, mkdir, move, rename, copy;
	public Map<String, String> MESSAGE = new HashMap<String, String>();
	/*HasMap = {
		INFO, DELETE_RESULT, RENAME_RESULT, MKDIR_RESULT 
	}*/
	private FileEdit fileEdit;
	private String root;
	public FileEditAction() {
		root = FilePath.getRootPath();
	}
	
	/**
	 * 总的文件删除、改名、移动方法
	 * fileExecute:
	 *      
	 * @since
	 */
	public void fileExecute() {
		if (path == null || path.length() <= 0) {
			return;
		}
		
		path = FilePath.getFileRealPath(path);
		//FileEdit fileEdit = new FileEditImpl(path);
		fileEdit = new FileEditImpl(path);
		File file = fileEdit.getFile();	
		
		// for delete the file or directory
		if (del != null && del.equals("yes")) {
			if (!file.exists()) {
				setMessage("DELETE_RESULT", "failed");
				setMessage("INFO", file.getName() + " not exists.");
				return;
			}
			if (fileEdit.delete()) {
				setMessage("DELETE_RESULT", "success");
				setMessage("INFO", file.getName() + " has been removed.");
			} else {
				setMessage("DELETE_RESULT", "failed");
				setMessage("INFO", file.getName() + " can not be removed.");
			}
		}
		// for make new directory
		if (mkdir != null && mkdir.equals("yes")&& name != null) {
			//name = name.trim();
			name = CharacterCode.iso2utf8(name);
			fileEdit.setFile(path + name);
			file = fileEdit.getFile();
			if (!file.exists()) {
				if (fileEdit.mkdir()) {
					setMessage("MKDIR_RESULT", "success");
					setMessage("INFO", path + name + " the folder create successfully.");
				}
			} else {	
				setMessage("MKDIR_RESULT", "failed");
				setMessage("INFO", path + name + " Folder is exists.");
			}
		}
		
		// for rename		
		if (rename != null && rename.equals("yes") && name != null) {
			name = CharacterCode.iso2utf8(name);		
			if (fileEdit.renameTo(name)) {
				setMessage("RENAME_RESULT", "success");
				setMessage("INFO", name + " file rename successfully.");
			} else {
				setMessage("RENAME_RESULT", "failed");
				setMessage("INFO", name + " same name file exists or others reason. the file rename failed.");	
			}
		}
		
		// for copy		
		if (copy != null && copy.equals("yes")) {
			String toPath = fileEdit.getCopyNewPath("");
			if (fileEdit.copy(path, toPath)) {
				setMessage("COPY_RESULT", "success");
				setMessage("INFO", toPath + " copy successfully.");
			} else {
				setMessage("COPY_RESULT", "failed");
				setMessage("INFO", toPath + " copy failed.");	
			}			
		}

		
		// for move file to
		if (move != null && move.equals("yes") && toPath != null) {
			toPath = toPath.trim();
			toPath = CharacterCode.iso2utf8(toPath);
			toPath = FilePath.escapePath(toPath);
			if (isExists(toPath)) {
				if (fileEdit.moveTo(toPath)) {
					setMessage("MOVE_RESULT", "success");
					setMessage("INFO", toPath + " the file is moving successfully.");
				} else {
					setMessage("MOVE_RESULT", "failed");
					setMessage("INFO", toPath + " unknow reason.");
				}
			} else {
				setMessage("MOVE_RESULT", "failed");
				setMessage("INFO", toPath + " is not exists.");	
			}
		}
	
	}

	/**
	 * 重命名文件或文件夹
	 * rename:
	 *
	 * @return      
	 * @since
	 */
	public String rename() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}	
		if (path == null || path.length() <= 0) {
			return null;
		}
		path = FilePath.getFileRealPath(path);
		fileEdit = new FileEditImpl(path);
		
		name = CharacterCode.iso2utf8(name);		
		if (fileEdit.renameTo(name)) {
			setMessage("RENAME_RESULT", "success");
			setMessage("INFO", name + " file rename successfully.");
		} else {
			setMessage("RENAME_RESULT", "failed");
			setMessage("INFO", name + " same name file exists or others reason. the file rename failed.");	
		}
		return "success";
	}
	
	/**
	 * 创建文件夹的方法
	 * mkdir:
	 *
	 * @return      
	 * @since
	 */
	public String mkdir() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}	
		if (path == null || path.length() <= 0) {
			return null;
		}
		path = FilePath.getFileRealPath(path);
		fileEdit = new FileEditImpl(path);
		File file = fileEdit.getFile();	
		//name = name.trim();
		name = CharacterCode.iso2utf8(name);
		fileEdit.setFile(path + name);
		file = fileEdit.getFile();
		if (!file.exists()) {
			if (fileEdit.mkdir()) {
				setMessage("MKDIR_RESULT", "success");
				setMessage("INFO", path + name + " the folder create successfully.");
			}
		} else {	
			setMessage("MKDIR_RESULT", "failed");
			setMessage("INFO", path + name + " Folder is exists.");
		}
		return "success";
	}
	
	/**
	 * 复制文件或文件夹的方法
	 * copy:
	 *
	 * @return      
	 * @since
	 */
	public String copy() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}	
		if (path == null || path.length() <= 0) {
			return null;
		}	
		path = FilePath.getFileRealPath(path);
		fileEdit = new FileEditImpl(path);
		String toPath = fileEdit.getCopyNewPath("");
		if (fileEdit.copy(path, toPath)) {
			setMessage("COPY_RESULT", "success");
			setMessage("INFO", toPath + " copy successfully.");
		} else {
			setMessage("COPY_RESULT", "failed");
			setMessage("INFO", toPath + " copy failed.");	
		}	
		return "success";
	}
	
	/**
	 * 创建文件夹的方法
	 * delete:
	 *
	 * @return      
	 * @since
	 */
	public String delete() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}	
		if (path == null || path.length() <= 0) {
			return null;
		}	
		path = FilePath.getFileRealPath(path);
		fileEdit = new FileEditImpl(path);
		File file = fileEdit.getFile();	
		
		// for delete the file or directory
	
		if (!file.exists()) {
			setMessage("DELETE_RESULT", "failed");
			setMessage("INFO", file.getName() + " not exists.");
			return null;
		}
		if (fileEdit.delete()) {
			setMessage("DELETE_RESULT", "success");
			setMessage("INFO", file.getName() + " has been removed.");
		} else {
			setMessage("DELETE_RESULT", "failed");
			setMessage("INFO", file.getName() + " can not be removed.");
		}
		
		return "success";
	}

	
	public boolean isExists(String path) {
		if (path != null) {
			return new File(path).exists();
		}
		return false;
	}
	
	public void setMessage(String key, String value) {
		MESSAGE.put(key, value);
	}
	
	public String execute() {
		if (!new LoginAction().logon()) {
			return "not_logon";
		}
		fileExecute();
		return "success";
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getToPath() {
		return toPath;
	}

	public void setToPath(String toPath) {
		this.toPath = toPath;
	}

	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public Map<String, String> getMessage() {
		return MESSAGE;
	}

	public void setMessage(Map<String, String> message) {
		MESSAGE = message;
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}
	
	
}
