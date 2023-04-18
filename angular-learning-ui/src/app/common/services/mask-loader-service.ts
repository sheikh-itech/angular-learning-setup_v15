import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MaskLoaderService {

  private maskElement: HTMLDivElement;
  
  constructor() {
    this.maskElement = <HTMLDivElement>document.getElementById('mask-loader');
  }

  public updateMask(maskStatus: boolean): void {
    if (maskStatus)
      this.maskElement.setAttribute('class', 'show-loader');
    else
      this.maskElement.setAttribute('class', 'display-none');
  }
}
