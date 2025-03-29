/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { RootApp } from './app/root-app';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/route-config';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageTranslateService } from './app/services/language-translate-service';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { ServiceOne, ServiceTwo, USER_TOKEN } from './app/parameter-decorators/inject-example/inject-example';
import { authInterceptor } from './app/common/interceptors/fn/auth-interceptor';
import { basicHttpInterceptor } from './app/common/interceptors/fn/basic-http-interceptor';
import { cacheInterceptor } from './app/common/interceptors/fn/cache-interceptor';
import { globalErrorInterceptor } from './app/common/interceptors/fn/global-error-interceptor';
import { loggerInterceptor } from './app/common/interceptors/fn/logger-interceptor';
import { spinnerInterceptor } from './app/common/interceptors/fn/spinner-interceptor';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(RootApp, {

    providers: [

        provideHttpClient(

            // Interceptors applied in defined order
            withInterceptors([
                basicHttpInterceptor, authInterceptor, cacheInterceptor, globalErrorInterceptor,
                loggerInterceptor, spinnerInterceptor
            ])),

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
        ),

        { provide: USER_TOKEN, useValue: { id: 1, name: 'Arham', email: 'arham@example.com' } },  // Providing the token globally

        { provide: 'MULTI_SERVICES', useClass: ServiceOne, multi: true }, //Provide Multiple Services
        { provide: 'MULTI_SERVICES', useClass: ServiceTwo, multi: true }
    ]
})
    .catch(err => console.error(err));
