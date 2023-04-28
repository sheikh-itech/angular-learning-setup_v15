package base.learning.beans;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cities")
public class City implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	private String name;
	private int zipcode;
	
	public City(int id, String name, int code) {
		this.id = id;
		this.name = name;
		this.zipcode = code;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getZipcode() {
		return zipcode;
	}
	public void setZipcode(int zipcode) {
		this.zipcode = zipcode;
	}
}
