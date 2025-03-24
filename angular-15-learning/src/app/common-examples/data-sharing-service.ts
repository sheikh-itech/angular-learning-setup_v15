import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {

    private dataSubject = new BehaviorSubject<string>('Initial Value');
    data$ = this.dataSubject.asObservable();

    updateData(newValue: string) {
        this.dataSubject.next(newValue);
    }
}
