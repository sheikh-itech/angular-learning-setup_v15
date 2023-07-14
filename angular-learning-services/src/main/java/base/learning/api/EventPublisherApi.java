package base.learning.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import base.learning.events.HttpEventPublisher;

@RestController
@RequestMapping("events")
public class EventPublisherApi {

	@Autowired
	private HttpEventPublisher eventPublisher;
	
	@GetMapping("/http-event")
    public void publishCustomEvent() {
		
        eventPublisher.publishCustomEvent("Http Event", "This event triggered from UI/Api");
    }
}
