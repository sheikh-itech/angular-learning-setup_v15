import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'root-app',
  templateUrl: './root-app.html',
  styleUrls: ['./root-app.css']
})
export class RootApp {

  engLang: boolean = true;

  constructor(private languageService: TranslateService) {
    this.languageService.setDefaultLang('en');
    this.languageService.use('en');
  }

  public changeLanguage(lang: boolean) {
    if (lang) {
      this.languageService.use('hi');
      this.engLang = false;
    } else {
      this.languageService.use('en');
      this.engLang = true;
    }
    //this.languageService.use(event.target.value);
  }
}
