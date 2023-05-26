package base.learning.beans;

import java.io.Serializable;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Products")
public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private String id;
	private String name;
	private float price;
	private String desc;
	private String code;
	
	public Product() {	
		this.id = UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	public Product(String name, float price, String desc, String code) {
		this.id = UUID.randomUUID().toString().replaceAll("-", "");
		this.name = name;
		this.price = price;
		this.desc = desc;
		this.code = code;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getCode() {
		return code;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setCode(String code) {
		this.code = code;
	}

	public String toString() {
		return "id:" + id + "##name:" + name + "##price:" + price + "##desc:" + desc + "##code:" + code;
	}
}
