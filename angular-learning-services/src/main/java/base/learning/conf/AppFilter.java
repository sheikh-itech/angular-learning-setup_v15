package base.learning.conf;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

@Service
public class AppFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
	        throws ServletException, IOException {
	
		if(request.getMethod().equalsIgnoreCase("OPTIONS")) {
			
	    	response.addHeader("Access-Control-Allow-Origin", "*");
	    	response.addHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
	    	response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
	    	return;
	    	//response.sendError(HttpStatus.UNAUTHORIZED.value(), "Incorrect info");
	    }
		chain.doFilter(request, response);
	}
}
