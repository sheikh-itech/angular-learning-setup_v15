package base.learning.api.redis;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.Response;
import base.learning.beans.User;
import base.learning.services.UserService;

@RestController
@RequestMapping("redis/user")
public class UserRedisApi {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value="/add", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Response> addUser(@RequestBody User user) {
		
		Response res = new Response();
		
		try {
			res.setData(userService.saveUser(user));
			res.setStatus(true);
			res.setMessage("success");
			res.setMessage("New User detail added");
			return new ResponseEntity<Response>(res, HttpStatus.CREATED);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setMessage("New User detail add error, "+ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/list/{id}", method=RequestMethod.GET)
	public ResponseEntity<Response> getUser(@PathVariable int id) {
		
		Response res = new Response();
		
		try {
			res.setData(userService.getUser(id));
			res.setStatus(true);
			res.setMessage("success");
			res.setMessage("User detail found");
			return new ResponseEntity<Response>(res, HttpStatus.OK);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setMessage("User detail search error, "+ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	public ResponseEntity<Response> getAllUsers() {
		
		Response res = new Response();
		
		try {
			res.setData(userService.getAllUsers());
			res.setStatus(true);
			res.setMessage("success");
			res.setMessage("All User detail found");
			return new ResponseEntity<Response>(res, HttpStatus.OK);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setMessage("All User detail search error, "+ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/delete/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<Response> deleteUser(@PathVariable int id,
			@RequestBody(required=false) Map<String, String> payload) {
		
		Response res = new Response();
		
		try {
			res.setData(userService.deleteUser(id));
			res.setStatus(true);
			res.setMessage("success");
			res.setMessage("User detail deleted, id:"+id);
			return new ResponseEntity<Response>(res, HttpStatus.OK);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setMessage("User detail delete error, id"+id+": "+ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value="/delete/all", method=RequestMethod.DELETE)
	public ResponseEntity<Response> deleteAllUsers() {
		
		Response res = new Response();
		
		try {
			res.setData(userService.deleteAllUsers());
			res.setStatus(true);
			res.setMessage("success");
			res.setMessage("All Users detail deleted");
			return new ResponseEntity<Response>(res, HttpStatus.OK);
		} catch(Exception ex) {
			res.setStatus(false);
			res.setMessage("failure");
			res.setMessage("All Users detail delete error: "+ex.getMessage());
			return new ResponseEntity<Response>(res, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
