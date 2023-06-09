package base.learning.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import base.learning.beans.Product;
import base.learning.beans.ProductInfo;
import base.learning.beans.ProductQRInfo;
import base.learning.dao.ZXingQRCodeDao;

@Service
public class ZXingQRCodeGenerator {

	private static final Logger logger = LoggerFactory.getLogger(ZXingQRCodeGenerator.class);
	
	@Autowired
	private ZXingQRCodeDao qrCodeDao;
	private QRCodeWriter qrWriter;
	
	
	public Product generateQRCode(Product productInfo) throws Exception {
		
		validateProduct(productInfo);
		
		BufferedImage image =  generateZXingQRCode(productInfo.toString());
		
		//Convert/Write the image to a byte array
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "png", baos);
        byte[] imageBytes = baos.toByteArray();
        
        //Map<Object, String> docInfo = new HashMap<>();
        List<Object> docList = new ArrayList<>();
        docList.add(productInfo);
        docList.add(new ProductQRInfo(productInfo.getId(), imageBytes));
        qrCodeDao.saveTransObjects(docList);
        
        return productInfo;
	}
	
	private BufferedImage generateZXingQRCode(String qrCodeText) throws Exception {
		
		if(qrWriter==null)
			qrWriter = new QRCodeWriter();
		
	    BitMatrix bitMatrix = null;
		try {
			bitMatrix = qrWriter.encode(qrCodeText, BarcodeFormat.QR_CODE, 200, 200);
		} catch (WriterException ex) {
			logger.error("QR Code Generation error: "+ex.getMessage());
			throw new Exception("QR Code Generation error: "+ex.getMessage());
		}

	    return MatrixToImageWriter.toBufferedImage(bitMatrix);
	}
	
	public ProductQRInfo findQRCodeById(String id) {
		
		if(id==null || id.length()<10)
			return null;
		
		return qrCodeDao.findQRCodeById(id);
	}
	
	public ProductQRInfo findQRCodeByName(String name) {
		
		if(name==null || name.isEmpty())
			return null;
		
		return qrCodeDao.findQRCodeByName(name);
	}
	
	public List<ProductInfo> findAllQRCodeInfo() {
				
		return qrCodeDao.findALLQRCodeInfo();
	}
	
	private void validateProduct(Product productInfo) throws Exception {
		
		if(productInfo.getName()==null || productInfo.getName().isEmpty())
			throw new Exception("Invalid product name: "+productInfo.getName());
		
		if(productInfo.getPrice()<0.0f)
			throw new Exception("Invalid product price: "+productInfo.getPrice());
		
		if(productInfo.getId()==null || productInfo.getId().isEmpty())
			throw new Exception("Product Identification failed contact Tech Team");
	}
}
