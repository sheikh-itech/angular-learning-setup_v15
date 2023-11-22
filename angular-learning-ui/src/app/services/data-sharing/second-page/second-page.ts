import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing-service';

@Component({
    selector: 'app-second-page',
    templateUrl: './second-page.html',
    styleUrls: ['./second-page.css']
})
export class SecondPage {

    sharedData: string;

    constructor(private dataService: DataSharingService) {
        this.sharedData = this.dataService.getSharedData();
    }
}
