import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    data: any[] = [];

    constructor() {

        this.initData();
    }

    public getData(): Observable<any> {

        return of(this.data);
    }

    private initData() {
        this.data.push({ name: 'Arham', city: 'Bheda' });
        this.data.push({ name: 'Fatima', city: 'Bheda' });
        this.data.push({ name: 'Ammi', city: 'Bheda' });
        this.data.push({ name: 'Hapheej', city: 'Indore' });
        this.data.push({ name: 'Rafeek', city: 'Bheda' });
    }
}