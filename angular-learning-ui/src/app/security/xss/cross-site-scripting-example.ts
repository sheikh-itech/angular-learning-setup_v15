import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**   XSS-> Stands for Cross Site Scripting
 *   
 *  XSS is a security vulnerability that allows attackers to inject
 *  client-side scripts into web pages viewed by other users.
 *  Can use- DomSanitizer, DOMPurify to handle this
 *  [DOMPurify- third party library]
 */
@Component({
  selector: 'xss-app',
  template: '<div [innerHtml]="data1">Replaced With Variable Value</div>' +
    '<div [innerHtml]="data2">Replaced With Variable Value</div>',
})
export class CrossSiteScriptingExample {

  data1: any;
  data2: any;

  constructor(private sanitizer: DomSanitizer) {
    this.data1 = this.sanitizer.bypassSecurityTrustHtml('<script>alert("XSS attack!");</script>');
    this.data2 = this.sanitizer.bypassSecurityTrustHtml('alert("XSS attack!");');
  }
}
