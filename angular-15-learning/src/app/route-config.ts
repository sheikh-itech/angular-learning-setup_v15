import { Routes } from "@angular/router";
import { AngularDefaultHomePage } from "./default-home/default-home";
import { PipesExample } from "./pipes/pipes-example/pipes-example";
import { CustomPipesExample } from "./pipes/custom-pipes-example/custom-pipes-example";
import { KidzChoice } from "./kidz-choice/kidz-choice";
import { NotFound } from "./not-found/not-found";
import { DATA_BINDING_ROUTES } from "./route-data-binding";
import { DIRECTIVE_ROUTES } from "./route-directive";
import { ParentComponent } from "./route-example/parent-component/parent-component";
import { ChildComponent } from "./route-example/child-component/child-component";
import { LoginForm } from "./different-forms/login-form/login-form";
import { authGuard, canActivateChildGuard, canMatchGuard, confirmLeaveGuard, httpResolve } from "./config/auth-guard-fn";
import { ResolverExample } from "./route-example/resolver-example/resolver-example";
import { InjectableExample } from "./common-examples/injectable-example/injectable-example";
import { ModuleDesc } from "./common-examples/module-desc/module-desc";
import { HostListenerExample } from "./common-examples/host-listener-example/host-listener-example";
import { Renderer2Example } from "./common-examples/renderer2-example/renderer2-example";
import { ComponentCommunication1 } from "./common-examples/component-communication1/component-communication1";
import { ComponentCommunication2 } from "./common-examples/component-communication2/component-communication2";
import { InputExample } from "./property-decorators/input-example/input-example";
import { InputChildExample } from "./property-decorators/input-child-example/input-child-example";
import { OutputParent } from "./property-decorators/output-parent/output-parent";
import { ParentView } from "./property-decorators/ViewChild/parent-view/parent-view";
import { ParentViewChildren } from "./property-decorators/ViewChildren/parent-view/parent-view-children";
import { ContentChildParent } from "./property-decorators/ContentChild/content-child-parent/content-child-parent";
import { TabContainerExample } from "./property-decorators/ContentChildren/tab-container-example/tab-container-example";
import { HostBindingExample } from "./property-decorators/HostBinding/host-binding-example/host-binding-example";



export const routes: Routes = [

    ...DATA_BINDING_ROUTES,
    ...DIRECTIVE_ROUTES,

    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route

    { path: 'login', component: LoginForm, canDeactivate: [confirmLeaveGuard] },
    { path: 'default', component: AngularDefaultHomePage },

    { path: 'builtin-pipes', component: PipesExample, canActivate: [authGuard] },
    { path: 'custom-pipes', component: CustomPipesExample, canMatch: [canMatchGuard] },

    { path: 'kidzChoice', component: KidzChoice },
    { path: 'injectable', component: InjectableExample },
    { path: 'moduleDesc', component: ModuleDesc },
    { path: 'hostListenerExample', component: HostListenerExample },
    { path: 'renderer2Example', component: Renderer2Example },
    { path: 'inputExample/:title/:count', component: InputExample },
    { path: 'inputChildExample/:title/:count', component: InputChildExample },
    { path: 'componentCommunication1', component: ComponentCommunication1 },
    { path: 'componentCommunication2', component: ComponentCommunication2 },
    
    { path: 'outputDecorator', component: OutputParent },
    { path: 'viewChildDecorator', component: ParentView },
    { path: 'viewChildrenDecorator', component: ParentViewChildren },
    { path: 'contentChildDecorator', component: ContentChildParent },
    { path: 'contentChildrenDecorator', component: TabContainerExample },
    { path: 'hostBindingExample', component: HostBindingExample },

    { path: 'resolveHttp', component: ResolverExample,
        resolve: {
            resolveHttp: httpResolve // Resolver gets data before route activation
        }
     },

    {
        path: 'parent/:id', component: ParentComponent, canActivateChild: [canActivateChildGuard],
        children: [
            { path: 'child/:childId', component: ChildComponent }
        ]
    },

];

routes.push({ path: '**', component: NotFound });
//routes.push({ path: '**', redirectTo: 'not-found', pathMatch: 'full' }); // 404 redirect)
//** is a wildcard that matches any undefined route