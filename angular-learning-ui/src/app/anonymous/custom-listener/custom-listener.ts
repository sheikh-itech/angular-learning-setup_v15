import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-custom-listener',
  templateUrl: './custom-listener.html',
  styleUrls: ['./custom-listener.css']
})
export class CustomListenerExample implements OnInit, OnDestroy {

    ngOnInit() {
        // Subscribe to an event or set up any necessary listeners
        // For example, let's listen to a custom event emitted by another component
        document.addEventListener('customEvent', this.handleCustomEvent);
    }

    ngOnDestroy() {
        // Clean up the listeners when the component is destroyed
        document.removeEventListener('customEvent', this.handleCustomEvent);
    }

    onClick() {
        // Trigger a custom event
        //CustomEvent is typescript lib class
        const customEvent = new CustomEvent('customEvent', { detail: 'Button clicked!' });
        document.dispatchEvent(customEvent);
    }

    handleCustomEvent(event: Event) {
        // Handle the custom event
        const detail = (event as CustomEvent).detail;
        alert('Custom event received: '+detail);
    }
}
