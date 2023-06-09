package base.learning.beans;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ProductsQRInfo")
public class ProductQRInfo implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private byte[] qrBytes;
	
	public ProductQRInfo() {	}
	
	public ProductQRInfo(String id, byte[] bytes) {
		this.id = id;
		this.qrBytes = bytes;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public byte[] getQrBytes() {
		return qrBytes;
	}
	public void setQrBytes(byte[] qrBytes) {
		this.qrBytes = qrBytes;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
