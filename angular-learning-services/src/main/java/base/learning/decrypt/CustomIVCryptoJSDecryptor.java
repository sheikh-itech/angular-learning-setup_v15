package base.learning.decrypt;

import java.lang.reflect.Field;
import java.security.Security;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CustomIVCryptoJSDecryptor {

	private static final Logger logger = LoggerFactory.getLogger(CustomIVCryptoJSDecryptor.class);
	
	private String password;	//18 length
    private Cipher cipher;
	private String encKey;
	
	public CustomIVCryptoJSDecryptor() {
		// Add the Bouncy Castle provider
		Security.addProvider(new BouncyCastleProvider());
	}	
	
	public void init(String password, String encKey) {
		try {
			if(this.cipher!=null && this.encKey!=null && this.encKey.equals(encKey)
					&& this.password!=null && this.password.equals(password))
				return;
			
			this.encKey = encKey;
			this.password = password;
	
			// Decode the hexadecimal IV string
			byte[] ivBytes = DatatypeConverter.parseHexBinary(encKey);
			
			PBEKeySpec pbeKeySpec = new PBEKeySpec(password.toCharArray(), "salt".getBytes(), 1000, 256);
	        SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512", "BC");
	        byte[] keyBytes = secretKeyFactory.generateSecret(pbeKeySpec).getEncoded();
	        SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
	
	        // Decrypt the data using AES-256 with a custom IV
	        this.cipher = Cipher.getInstance("AES/CBC/PKCS5Padding", "BC");
	     
	        this.cipher.init(Cipher.DECRYPT_MODE, keySpec, new javax.crypto.spec.IvParameterSpec(ivBytes));
		} catch(Exception ex) {
			logger.error("Cipher initialization error, "+ex.getMessage());
			ex.printStackTrace();
		}
	}
	
	public Object decryptObjectFields(Object bean) {
		
		if(bean==null)
			return null;
		
		try {
			Field[] fields = bean.getClass().getDeclaredFields();
			for (Field field : fields) {
				
				field.setAccessible(true);
				String original = decryptKey(field.get(bean));
				
				switch(field.getType().toString().replace("class ", "")) {
				
					case "java.lang.String":
						field.set(bean, original);
						break;
					case "byte":
					field.setByte(bean, Byte.parseByte(original!=null?original:"0"));
						break;
					case "short":
						field.setShort(bean, Short.parseShort(original!=null?original:"0"));
						break;
					case "int":
						field.setInt(bean, Integer.parseInt(original!=null?original:"0"));
						break;
					case "long":
						field.setLong(bean, Long.parseLong(original!=null?original:"0"));
						break;
					case "float":
						field.setFloat(bean, Float.parseFloat(original!=null?original:"0"));
						break;
					case "double":
						field.setDouble(bean, Double.parseDouble(original!=null?original:"0"));
						break;
					case "char":
						field.setChar(bean, original!=null?original.charAt(0):null);
						break;
					case "boolean":
						field.setBoolean(bean, Boolean.getBoolean(original!=null?original:"false"));
						break;
					default: logger.error("Data type not matched for: "+field.getName());;
				}
				field.setAccessible(false);
			}
		} catch (Exception ex) {
			logger.error("Bean decryption issue, "+ex.getMessage());
			ex.printStackTrace();
		}

		return bean;		
	}
	
	private String decryptKey(Object encryptedText) throws Exception {
		
		if(encryptedText==null)
			return null;
		
		// Decode the Base64-encoded encrypted data
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText.toString());
        
        byte[] decryptedBytes = this.cipher.doFinal(encryptedBytes);

        // return decrypted data
        return new String(decryptedBytes, "UTF-8");
	}
}
