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
import { HttpGetExample } from './http-calls/http-get-example';
import { HttpPostExample } from './http-calls/http-post-example';
import { HttpPutExample } from './http-calls/http-put-example';
import { HttpPatchExample } from './http-calls/http-patch-example';
import { HttpDeleteExample } from './http-calls/http-delete-example';
import { ObservableExample } from './observables-subscribe/observable-example';
import { SubscribeExample } from './observables-subscribe/subscribe-example';
import { ObservableFlatMapChain } from './observables-subscribe/observable-flat-map-chain';
import { MapOperator } from './observables-subscribe/obsvables-operators/map-operator';
import { FlatMapOperator } from './observables-subscribe/obsvables-operators/flat-map-operator';
import { CatchErrorOperator } from './observables-subscribe/obsvables-operators/catch-error-operator';
import { TapapOperator } from './observables-subscribe/obsvables-operators/tap-operator';
import { FilterOperator } from './observables-subscribe/obsvables-operators/filter-operator';
import { MergeMapOperator } from './observables-subscribe/obsvables-operators/merge-map-operator';
import { LineChart } from './chart-graph/ria-line-chart/line-chart';
import { ApexChartExample } from './chart-graph/apex-chart-example';
import { ShareRelayCachExample } from './request-caching/share-replay-cach/share-relay-cach-example';
import { CustomCachExample } from './request-caching/custom-cach/custom-cach-example';
import { ShareRelayWithTiming } from './request-caching/share-replay-timing/share-relay-with-timing';
import { ErrorHadnling } from './retry-on-error/error-handling';
import { RetryOnError } from './retry-on-error/retry-on-error';

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
  { path: 'httpDelete', component: HttpDeleteExample },
  { path: 'observable', component: ObservableExample },
  { path: 'subscribe', component: SubscribeExample },
  { path: 'flatMapChain', component: ObservableFlatMapChain },
  { path: 'mapOperator', component: MapOperator },
  { path: 'filterOperator', component: FilterOperator },
  { path: 'tapOperator', component: TapapOperator },
  { path: 'catchErrorOperator', component: CatchErrorOperator },
  { path: 'flatMapOperator', component: FlatMapOperator },
  { path: 'mergedMapOperator', component: MergeMapOperator },
  { path: 'shareRelayCach', component: ShareRelayCachExample },
  { path: 'shareRelayTimedCach', component: ShareRelayWithTiming },
  { path: 'customCach', component: CustomCachExample },
  { path: 'lineChart', component: LineChart },
  { path: 'apexChart', component: ApexChartExample },
  { path: 'handleError', component: ErrorHadnling },
  { path: 'retryRequest', component: RetryOnError }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
