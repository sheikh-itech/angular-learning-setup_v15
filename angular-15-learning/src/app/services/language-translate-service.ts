import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';


export class LanguageTranslateService implements TranslateLoader {

    constructor(private http: HttpClient) { }

    public getTranslation(lang: string): Observable<any> {

        const filePath = './assets/i18n/' + this.getLanguage(lang) + '-Mapping.json';
        return this.http.get(filePath); //Load JSON file using HttpClient
    }

    private getLanguage(locale: string): string {

        switch (locale) {
            case 'en': return 'English';
            case 'hi': return 'Hindi';
            default: return 'English';
        }
    }
}
