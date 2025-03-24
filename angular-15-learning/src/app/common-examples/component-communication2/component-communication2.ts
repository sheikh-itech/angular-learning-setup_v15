import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../data-sharing-service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'component-communication2',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './component-communication2.html',
    styleUrls: ['./component-communication2.css']
})
export class ComponentCommunication2 {

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
