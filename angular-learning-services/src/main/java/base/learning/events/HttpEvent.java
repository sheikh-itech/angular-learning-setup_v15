package base.learning.events;

import org.springframework.context.ApplicationEvent;

public class HttpEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;

	private String name;
	private String detail;
	
	public HttpEvent(Object source, String name, String detail) {
		super(source);
		this.name = name;
		this.detail = detail;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
}
