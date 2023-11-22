import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing-service';

@Component({
    selector: 'app-first-page',
    templateUrl: './first-page.html',
    styleUrls: ['./first-page.css']
})
export class FirstPage {

    sharedData: any;
    message: any;
    constructor(private dataService: DataSharingService) {

    }

    shareData(): void {
        this.dataService.setSharedData(this.sharedData);
        this.message = "Data has been shared...";
    }
}
