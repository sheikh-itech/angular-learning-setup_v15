import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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


@NgModule({
  declarations: [
    RootApp, LifeCycleHooks, AdvLifeCycle, TwoWayBinding, StructuralDerective,
    AttributeDirective, CustomPipe, PipesExample, HomeComponent, AdminComponent,
    TemplateDrivenForm1, TemplateDrivenForm2, TemplateDrivenForm3, ReactiveForm1, LoginPage,
    AccessDenied, LineChart, ApexChartExample, NgApexSplineChart, EncryptionComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule, NgChartsModule, NgApexchartsModule,


    StoreModule.forRoot({
      shoppingCart: shoppingCartReducer
    })
  ],
  providers: [CustomService, UserNameService, FullNameService, ChartComponent,
    ApexChartExample, NgApexSplineChart,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [CustomPipe],
  bootstrap: [RootApp]
})
export class AppModule { }
