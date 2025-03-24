import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SHARED_IMPORTS } from './shared-module-imports';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'root-app',
    templateUrl: './root-app.html',
    styleUrls: ['./root-app.css'],
    standalone: true,
    imports: [SHARED_IMPORTS]
})
export class RootApp implements OnInit {

    engLang: boolean = true;

    constructor(private languageService: TranslateService, private router: Router) {
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

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe((event: any) => {
                console.log('Navigation-Started: ', event.url);
            });
    }
}
