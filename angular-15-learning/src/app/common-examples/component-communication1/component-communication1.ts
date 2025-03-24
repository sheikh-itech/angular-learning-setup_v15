import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../data-sharing-service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'component-communication1',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './component-communication1.html',
    styleUrls: ['./component-communication1.css']
})
export class ComponentCommunication1 {

    receivedData: any = '';
    inputData: any = '';

    constructor(private dataService: DataSharingService) { }

    receiveData() {
        this.dataService.data$.subscribe(value => {
            this.receivedData = value;
        });
    }

    sendData() {
        this.dataService.updateData(this.inputData);
    }
}
