package base.learning.beans;

public class City {
	
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
