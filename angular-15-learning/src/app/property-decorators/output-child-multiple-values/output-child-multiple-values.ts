import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'output-child-multiple-values',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './output-child-multiple-values.html',
    styleUrls: ['./output-child-multiple-values.css']
})
export class OutputChildMultipleValues {

    @Output() multipleValueEvent = new EventEmitter<{ name: string; age: number }>();

    sendMultiple() {
        this.multipleValueEvent.emit({ name: 'Arham', age: 3 });
    }
}
