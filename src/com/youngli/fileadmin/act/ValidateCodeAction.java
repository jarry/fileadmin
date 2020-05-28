package com.youngli.fileadmin.act;

import java.io.*;
import java.util.Map;
import javax.imageio.*;
import javax.imageio.stream.ImageOutputStream;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import com.youngli.fileadmin.common.*;

public class ValidateCodeAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	private String randomNumber;
	private ByteArrayInputStream inputStream;
	/**
	 * @author lichunping
	 * servlet 输出验证码图片
	 * @return 
	 * @throws IOException 
	 */
	public String execute() throws Exception {		
	  
		ValidateCode vc = new ValidateCode();
		randomNumber    = vc.getRandomNumber();
		  	
		//HttpSession session = (HttpSession) ActionContext.getContext().getSession();		
		// session.removeAttribute("random");
		//session.setAttribute("random", String.valueOf(randomNumber));
		
		Map<String, Object> session = ActionContext.getContext().getSession();
		session.put("randomNumber", randomNumber);

	    ByteArrayOutputStream output = new ByteArrayOutputStream();
		ImageOutputStream imageOut = ImageIO.createImageOutputStream(output);
		ImageIO.write(vc.getImage(), "JPEG", imageOut);
		imageOut.close();
		ByteArrayInputStream input = new ByteArrayInputStream(output.toByteArray());
		this.setInputStream(input);  

		return "success";
	}
	
    public void setInputStream(ByteArrayInputStream inputStream) {
        this.inputStream = inputStream;     
    }     
    public ByteArrayInputStream getInputStream() {     
        return inputStream;     
    }  

}
