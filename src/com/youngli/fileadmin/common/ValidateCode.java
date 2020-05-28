package com.youngli.fileadmin.common;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

/**
 * 验证码类
 */
public class ValidateCode {	

	private static final long serialVersionUID = 1L;

	private String randomNumber;
	private BufferedImage image;
	
	private int width  = 80, height = 24;
	
	public ValidateCode() {
		setRandomNumber();
		setImage();
	}	
	public void setRandomNumber() {
		String chose   = "0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
		char display[] = { '0', ' ', '0', ' ', '0', ' ', '0'};
		char ran[]     = {'0', '0', '0', '0' };
		int numLength = 4;
		char temp;
		Random rand = new Random();
		for (int i = 0; i < numLength; i++) {
			temp = chose.charAt(rand.nextInt(chose.length()));
			display[i * 2] = temp;
			ran[i] = temp;
		}
		randomNumber = String.valueOf(ran); 
	}
	
	public String getRandomNumber() {		
		return randomNumber;
	}
	
	public void drawLine(Graphics g) {
		Random rand = new Random();
		g.setColor(Color.RED);
		// 画随机线
		for (int i = 0; i < 5; i++) {
			int x = rand.nextInt(width - 1);
			int y = rand.nextInt(height - 1);
			int xl = rand.nextInt(6) + 1;
			int yl = rand.nextInt(20) + 1;
			g.drawLine(x, y, x + xl, y + yl);
		}
		// 从另一方向画随机线
		for (int i = 0; i < 5; i++) {
			int x = rand.nextInt(width - 1);
			int y = rand.nextInt(height - 1);
			int xl = rand.nextInt(20) + 1;
			int yl = rand.nextInt(6) + 1;
			g.drawLine(x, y, x - xl, y - yl);
		}  
	}
	
	public void setImage() {
		
		image     = new BufferedImage(width, height,
				BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
	    //以下填充背景颜色
		g.setColor(Color.BLUE);
		g.fillRect(0, 0, width, height);
		//设置字体颜色
		g.setColor(Color.WHITE);
		Font font = new Font("Arial", Font.PLAIN, 24);
		g.setFont(font);
		//g.drawString(randomNumber,5,14);
		g.drawString(randomNumber, 6, 20);
		
		drawLine(g);	
		
		g.dispose();
	}
	
	public BufferedImage getImage() {
		return image;
	}	
	

}
