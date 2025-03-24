import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'event-binding',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './event-binding.html',
    styleUrls: ['./event-binding.css']
})
export class EventBinding {

    message = '';
    name = '';

    showMessage() {
        this.message = 'Button clicked! Event binding works!';
    }

    updateName(event: Event) {
        this.name = (event.target as HTMLInputElement).value;
    }
}
