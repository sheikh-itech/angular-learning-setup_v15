package base.learning.beans;

public class Response {

	private boolean status;
	private String message;
	private String error;
	private long timestamp;
	private Object data;
	
	public Response() {
		this.timestamp = System.currentTimeMillis();
	}
	
	public Response(boolean status, Object data, String error, String message) {
		super();
		this.status = status;
		this.data = data;
		this.error = error;
		this.message = message;
	}

	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public boolean getStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
}
