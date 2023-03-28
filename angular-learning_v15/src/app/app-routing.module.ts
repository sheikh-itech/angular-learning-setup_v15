import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventBinding } from './components/EventBinding';
import { Interpolation } from './components/Interpolation';
import { AdvLifeCycle } from './components/life-cycle/adv-life-cycle';
import { LifeCycleHooks } from './components/life-cycle/life-cycle-hooks';
import { PropertyBinding } from './components/PropertyBinding';
import { TwoWayBinding } from './components/TwoWayBinding';
import { AttributeDirective } from './directives/AttributeDirective';
import { StructuralDerective } from './directives/StructuralDerective';
import { ReactiveForm1 } from './forms/reactive/reactive-form1/reactive-form1';
import { TemplateDrivenForm1 } from './forms/template-driven-forms/template-driven-form1/template-driven-form1';
import { TemplateDrivenForm2 } from './forms/template-driven-forms/template-driven-form2/template-driven-form2';
import { TemplateDrivenForm3 } from './forms/template-driven-forms/template-driven-form3/template-driven-form3';
import { AdminComponent } from './hierarchical-dependency/AdminComponent';
import { HomeComponent } from './hierarchical-dependency/HomeComponent';
import { LoginPage } from './login-page/login-page';
import { PipesExample } from './pipes/PipesExample';
import { AuthGuard } from './routing-navigation/auth-guard';
import { CustomServiceUsage } from './services/CustomServiceUsage';
import { AccessDenied } from './access-denied/access-denied';
import { HttpGetExample } from './http-observables/http-get-example';
import { HttpPostExample } from './http-observables/http-post-example';
import { HttpPutExample } from './http-observables/http-put-example';
import { HttpPatchExample } from './http-observables/http-patch-example';
import { HttpDeleteExample } from './http-observables/http-delete-example';

const routes: Routes = [

  { path: 'login', component: LoginPage },
  { path: 'accessDenied', component: AccessDenied },
  { path: 'lifeCycle', component: LifeCycleHooks, canActivate: [AuthGuard] },
  { path: 'advLifeCycle', component: AdvLifeCycle, canActivate: [AuthGuard] },
  { path: 'interpolation/:routeData', component: Interpolation, canActivate: [AuthGuard] },
  { path: 'propertyBinding', component: PropertyBinding, canActivate: [AuthGuard] },
  { path: 'eventBinding', component: EventBinding, canActivate: [AuthGuard] },
  { path: 'twoWayBinding', component: TwoWayBinding, canActivate: [AuthGuard] },
  { path: 'structuralDerective', component: StructuralDerective },
  { path: 'attributeDirective', component: AttributeDirective },
  { path: 'customPipe', component: PipesExample },
  { path: 'customService', component: CustomServiceUsage },
  { path: 'injection', component: HomeComponent },
  { path: 'heirarchicalInjection', component: AdminComponent },
  { path: 'templateDriven1', component: TemplateDrivenForm1 },
  { path: 'templateDriven2', component: TemplateDrivenForm2 },
  { path: 'templateDriven3', component: TemplateDrivenForm3 },
  { path: 'reactiveForm1', component: ReactiveForm1 },
  { path: 'httpGet', component: HttpGetExample },
  { path: 'httpPost', component: HttpPostExample },
  { path: 'httpPut', component: HttpPutExample },
  { path: 'httpPatch', component: HttpPatchExample },
  { path: 'httpDelete', component: HttpDeleteExample }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
