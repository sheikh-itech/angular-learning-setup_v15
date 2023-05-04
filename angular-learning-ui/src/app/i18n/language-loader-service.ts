import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';


export class LanguageLoaderService implements TranslateLoader {

  public getTranslation(lang: string): Observable<any> {
    
    return of(require('src/assets/i18n/' + this.getLanguage(lang) +'-Mapping.json'));
  }

  private getLanguage(locale: string): string {

    switch (locale) {
      case 'en': return 'English';
      case 'hi': return 'Hindi';
      default: return 'English';
    }
  }
}
