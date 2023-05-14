import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AuthInterceptor } from './common/authinterceptor/auth-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { RootApp } from './root-app';
import { LifeCycleHooks } from './components/life-cycle/life-cycle-hooks';
import { AdvLifeCycle } from './components/life-cycle/adv-life-cycle';
import { TwoWayBinding } from './components/TwoWayBinding';
import { StructuralDerective } from './directives/StructuralDerective';
import { AttributeDirective } from './directives/AttributeDirective';
import { CustomPipe } from './pipes/CustomPipe';
import { PipesExample } from './pipes/PipesExample';
import { CustomService } from './services/CustomService';
import { HomeComponent } from './hierarchical-dependency/HomeComponent';
import { AdminComponent } from './hierarchical-dependency/AdminComponent';
import { UserNameService } from './hierarchical-dependency/UserNameService';
import { FullNameService } from './hierarchical-dependency/FullNameService';
import { TemplateDrivenForm1 } from './forms/template-driven-forms/template-driven-form1/template-driven-form1';
import { TemplateDrivenForm2 } from './forms/template-driven-forms/template-driven-form2/template-driven-form2';
import { TemplateDrivenForm3 } from './forms/template-driven-forms/template-driven-form3/template-driven-form3';
import { ReactiveForm1 } from './forms/reactive/reactive-form1/reactive-form1';
import { LoginPage } from './login-page/login-page';
import { AccessDenied } from './access-denied/access-denied';
import { NgChartsModule } from 'ng2-charts';
import { LineChart } from './chart-graph/ria-line-chart/line-chart';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ApexChartExample } from './chart-graph/apex-chart-example';
import { NgApexSplineChart } from './chart-graph/ng-apex-spline-chart/ng-apex-spline-chart';
import { StoreModule } from '@ngrx/store';
import { shoppingCartReducer } from './ng-rx/cart-reducer';
import { EncryptionComponent } from './encryption/encryption.component';
import { RedisJavaExample } from './server-concepts/redis-java/redis-java-example';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { LanguageLoaderService } from './i18n/language-loader-service';
import { FadeInExample } from './animations/fade-in-example/fade-in-example';
import { LineExample } from './animations/line-example/line-example';
import { LineExample1 } from './animations/line-example-1/line-example-1';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuaggaBarcodeReader } from './business-fundas/quagga-barcode-reader/quagga-barcode-reader';


@NgModule({
  declarations: [
    RootApp, LifeCycleHooks, AdvLifeCycle, TwoWayBinding, StructuralDerective,
    AttributeDirective, CustomPipe, PipesExample, HomeComponent, AdminComponent,
    TemplateDrivenForm1, TemplateDrivenForm2, TemplateDrivenForm3, ReactiveForm1, LoginPage,
    AccessDenied, LineChart, ApexChartExample, NgApexSplineChart, EncryptionComponent,
    RedisJavaExample, FadeInExample, LineExample, LineExample1, QuaggaBarcodeReader
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule, NgChartsModule, NgApexchartsModule, MaterialModule,
    BrowserAnimationsModule, NgbModule,

    StoreModule.forRoot({
      shoppingCart: shoppingCartReducer
    }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: LanguageLoaderService,
      },
    })
  ],
  providers: [CustomService, UserNameService, FullNameService, ChartComponent,
    ApexChartExample, NgApexSplineChart, DatePipe,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [CustomPipe, LineExample1],
  bootstrap: [RootApp]
})
export class AppModule { }
