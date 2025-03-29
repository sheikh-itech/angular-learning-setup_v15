import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading = false;

    show(): void {
        this.loading = true;
    }

    hide(): void {
        this.loading = false;
    }
}
