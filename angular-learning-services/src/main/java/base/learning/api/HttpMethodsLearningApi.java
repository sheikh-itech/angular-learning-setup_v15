package base.learning.api;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.Response;

@RestController
@RequestMapping("methods/http")
public class HttpMethodsLearningApi {

	@RequestMapping(value="/get", method=RequestMethod.GET)
	public ResponseEntity<Response> httpGet(@RequestParam(required=false) String name) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData("Get data from server for "+name);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/post", method=RequestMethod.POST)
	public ResponseEntity<Response> httpPost(@RequestBody Map<String, Object> body, 
			@RequestParam(required=false) String name, 
			@RequestHeader(required=false) Map<String, String> headers) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setMessage("Post data from server");
		body.put("Param Data", name);
		body.put("headers", headers);
		res.setData(body);
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/put", method=RequestMethod.PUT)
	public ResponseEntity<Response> httpPut(@RequestBody Map<String, Object> body,
			@RequestParam(required=false) String name,
			@RequestHeader(required=false) Map<String, String> headers) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setMessage("Put data from server");
		body.put("Param Data", name);
		body.put("headers", headers);
		res.setData(body);
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/patch", method=RequestMethod.PATCH)
	public ResponseEntity<Response> httpPatch(@RequestBody Map<String, Object> body,
			@RequestParam(required=false) String name,
			@RequestHeader(required=false) Map<String, String> headers) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setMessage("Patch data from server");
		body.put("Param Data", name);
		body.put("headers", headers);
		res.setData(body);
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.DELETE)
	public ResponseEntity<Response> httpDelete(@RequestBody(required=false) Map<String, Object> body,
			@RequestParam(required=false) String name,
			@RequestHeader(required=false) Map<String, String> headers) {
		
		if(body==null)
			body = new HashMap<>();
		
		Response res = new Response();
		res.setStatus(true);
		res.setMessage("Delete data from server");
		body.put("Param Data", name);
		body.put("headers", headers);
		res.setData(body);
		return new ResponseEntity<Response>(res, HttpStatus.CREATED);
	}
}
