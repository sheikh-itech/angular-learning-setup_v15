/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})*/

/* Can register using providedIn OR in providers[] array of Root/Main Module
 */
export class UserNameService {

  private name: any;

  constructor() {
    this.name = "Arham";
  }

  public getName(): string {
    return this.name;
  }
}
