import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'host-listener-example',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './host-listener-example.html',
    styleUrls: ['./host-listener-example.css']
})
export class HostListenerExample {

    @HostListener('window:resize', ['$event'])
    onResize(event: UIEvent) {
        console.log('Window resized!', event);
    }
}
