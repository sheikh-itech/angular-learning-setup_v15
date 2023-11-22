import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private sharedData: any;

  setSharedData(data: any): void {
    this.sharedData = data;
  }

  getSharedData(): any {
    return this.sharedData;
  }
}
