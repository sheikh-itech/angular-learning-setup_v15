/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { RootApp } from './app/root-app';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/route-config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageTranslateService } from './app/services/language-translate-service';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(RootApp, {

    providers: [
        provideHttpClient(/*withInterceptors([myInterceptor])*/),
        provideRouter(routes),
        TranslateService,
        importProvidersFrom( //Register TranslateModule globally for i18n
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useClass: LanguageTranslateService, //Custom Translation Loader
                    deps: [HttpClient],
                },
            })
        )
    ]
})
    .catch(err => console.error(err));
