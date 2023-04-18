import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  name: any;

  public initService(): void {
    this.name = "'Custom Service'";
  }

  public getData(): string {
    return this.name;
  }
}
