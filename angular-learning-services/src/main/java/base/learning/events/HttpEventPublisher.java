package base.learning.events;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class HttpEventPublisher {

	private final ApplicationEventPublisher eventPublisher;
	
	public HttpEventPublisher(ApplicationEventPublisher eventPublisher) {
		this.eventPublisher = eventPublisher;
	}
	
	public void publishCustomEvent(String message, String detail) {
        HttpEvent event = new HttpEvent(this, message, detail);
        eventPublisher.publishEvent(event);
    }
}
