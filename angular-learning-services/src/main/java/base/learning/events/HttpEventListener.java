package base.learning.events;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

@Service
public class HttpEventListener implements ApplicationListener<HttpEvent> {

	@Override
	public void onApplicationEvent(HttpEvent event) {
		
		System.out.println("Published event name: "+event.getName());
		System.out.println("Published event detail: "+event.getDetail());
	}
}
