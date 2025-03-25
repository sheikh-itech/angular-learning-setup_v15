import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'output-child-async',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './output-child-async.html',
    styleUrls: ['./output-child-async.css']
})
export class OutputChildAsync {

    @Output() asyncEvent = new EventEmitter<string>();

    sendAsync() {
        setTimeout(() => {
            this.asyncEvent.emit('Delayed Event!');
        }, 2000);
    }
}
