import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'output-child',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './output-child.html',
    styleUrls: ['./output-child.css']
})
export class OutputChild {

    // Create a custom event named 'messageEvent'
    @Output() messageEvent = new EventEmitter<string>();

    sendMessage() {
        this.messageEvent.emit('Hello from Child!');
    }
}
