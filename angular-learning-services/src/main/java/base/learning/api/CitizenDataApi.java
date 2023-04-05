package base.learning.api;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.Person;
import base.learning.beans.Response;

@RestController
@RequestMapping("citizens")
public class CitizenDataApi {

	private List<Person> citizens = new ArrayList<>();
	
	public CitizenDataApi() {
		initCitizens();
	}

	@RequestMapping(value="/all", method=RequestMethod.GET)
	public ResponseEntity<Response> getCitizens() {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(this.citizens);
		res.setMessage("List of all available citizens");
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/citizen/ids", method=RequestMethod.GET)
	public ResponseEntity<Response> getAllCitizenId() {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCityIds());
		res.setMessage("Ids of all available citizens");
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}

	@RequestMapping(value="/citizen/{id}", method=RequestMethod.GET)
	public ResponseEntity<Response> getCitizenDetail(@PathVariable(required=false) Integer id) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCity(id!=0?id:1));
		res.setMessage("Detail of citizen having id: "+id);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/citizen/name/{id}", method=RequestMethod.GET)
	public ResponseEntity<Response> getCitizenName(@PathVariable(required=false) Integer id) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCityName(id!=0?id:1));
		res.setMessage("Name of citizen having id: "+id);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/citizen/new", method=RequestMethod.POST)
	public ResponseEntity<Response> addCitizen(@RequestBody Person person) {
		
		this.citizens.add(person);
		Response res = new Response();
		res.setStatus(true);
		res.setData(person);
		res.setMessage("Name of citizen added successfully");
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	private Person getCity(int id) {
		
		return this.citizens.stream().filter(citizen->citizen.getId()==id).findAny().get();
	}
	
	private String getCityName(int id) {
		
		return this.citizens.stream().filter(citizen->citizen.getId()==id).map(citizen->citizen.getName()).findFirst().get();
	}
	
	private List<Integer> getCityIds() {
		
		return this.citizens.stream().map(citizen->citizen.getId()).collect(Collectors.toList());
	}
	
	private void initCitizens() {
		this.citizens.add(new Person(1, "Arham", "Bhopal"));
		this.citizens.add(new Person(2, "Hapheej", "Bhopal"));
		this.citizens.add(new Person(3, "Aastana", "Bhopal"));
		this.citizens.add(new Person(4, "Test1", "Bhopal"));
		this.citizens.add(new Person(5, "Test2", "Bhopal"));
	}
}
