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

@NgModule({
  declarations: [
    RootApp, LifeCycleHooks, AdvLifeCycle, TwoWayBinding, StructuralDerective,
    AttributeDirective, CustomPipe, PipesExample, HomeComponent, AdminComponent,
    TemplateDrivenForm1, TemplateDrivenForm2, TemplateDrivenForm3, ReactiveForm1, LoginPage,
    AccessDenied
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [CustomService, UserNameService, FullNameService,

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [CustomPipe],
  bootstrap: [RootApp]
})
export class AppModule { }
