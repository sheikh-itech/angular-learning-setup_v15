package base.learning.conf;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import base.learning.beans.Person;
import base.learning.util.JsonUtility;

@Service
public class AppFilter extends OncePerRequestFilter {

	@Autowired
	private JsonUtility util;
	@Autowired
	private ObjectMapper mapper;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
	        throws ServletException, IOException {
	
		if(request.getMethod().equalsIgnoreCase("OPTIONS")) {
			
	    	response.addHeader("Access-Control-Allow-Origin", "*");
	    	response.addHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
	    	response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
	    	//chain.doFilter(request, response);
	    	return;
	    }
		if (request.getRequestURI().indexOf("citizens/citizen/new") > 0) {

			RequestWrapper wrappedRequest = new RequestWrapper((HttpServletRequest) request);
			
			// 1. For key value pairs
			List<String> keys = new ArrayList<>();
			util.resolveKeys(wrappedRequest.getBody(), keys, new ObjectMapper());
			
			if (keys.size() > 0){
				//Process data
			}
			
			// 2. Using Object Style
			
			if(mapper==null)
				mapper = new ObjectMapper();
			
			String body = wrappedRequest.getBody();
			
			Person person = mapper.readValue(body, Person.class);
			person.setLocation(person.getLocation()+", Modifiled location");
			wrappedRequest.setBody(mapper.writeValueAsString(person));

			chain.doFilter(wrappedRequest, response);
		} else
			chain.doFilter(request, response);
	}
}
