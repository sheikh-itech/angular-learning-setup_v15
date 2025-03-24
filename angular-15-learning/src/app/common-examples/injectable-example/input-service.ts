import { Injectable, OnInit } from '@angular/core';
import { DataService } from 'src/app/common/data-service';

@Injectable({ providedIn: 'root' })
export class InputService {

    
    constructor(private service: DataService) {}

    public getdata() {

        let res;
        
        this.service.getData().subscribe(data => {
            res = data;
        });

        return res;
    }
}