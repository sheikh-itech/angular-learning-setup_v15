package base.learning.api;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import base.learning.beans.City;
import base.learning.beans.Response;

@RestController
@RequestMapping("cities")
public class CityDataApi {

	private List<City> cities = new ArrayList<>();
	
	public CityDataApi() {
		initCities();
	}
	
	@RequestMapping(value="/all", method=RequestMethod.GET)
	public ResponseEntity<Response> getCities() {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(this.cities);
		res.setMessage("List of all available cities");
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/city/ids", method=RequestMethod.GET)
	public ResponseEntity<Response> getAllCityId() {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCityIds());
		res.setMessage("Ids of all available cities");
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}

	@RequestMapping(value="/city/{id}", method=RequestMethod.GET)
	public ResponseEntity<Response> getCityDetail(@PathVariable(required=false) Integer id) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCity(id!=0?id:1));
		res.setMessage("Detail of city having id: "+id);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	@RequestMapping(value="/city/name/{id}", method=RequestMethod.GET)
	public ResponseEntity<Response> getCityName(@PathVariable(required=false) Integer id) {
		
		Response res = new Response();
		res.setStatus(true);
		res.setData(getCityName(id!=0?id:1));
		res.setMessage("Name of city having id: "+id);
		return new ResponseEntity<Response>(res, HttpStatus.OK);
	}
	
	private City getCity(int id) {
		
		return this.cities.stream().filter(city->city.getId()==id).findAny().get();
	}
	
	private String getCityName(int id) {
		
		return this.cities.stream().filter(city->city.getId()==id).map(city->city.getName()).findFirst().get();
	}
	
	private List<Integer> getCityIds() {
		
		return this.cities.stream().map(city->city.getId()).collect(Collectors.toList());
	}
	
	private void initCities() {
		
		cities.add(new City(1, "Bhopal", 123));
		cities.add(new City(2, "Pune", 1234));
		cities.add(new City(3, "Mumbai", 1235));
		cities.add(new City(4, "Delhi", 1236));
		cities.add(new City(5, "Hyderabad", 1237));
	}
}
