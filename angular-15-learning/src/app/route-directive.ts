import { Routes } from "@angular/router";
import { ComponentDirective } from "./directives/custom/component-directive";
import { Demo1 } from "./directives/custom/demo1";
import { Demo2 } from "./directives/custom/demo2";
import { AttributeDirectives } from "./directives/attribute-directives/attribute-directives";
import { StructuralDirectives } from "./directives/structural-directives/structural-directives";
import { CombinedDirectivesDemo } from "./directives/combined-directives-demo/combined-directives-demo";
import { OtherDirectives } from "./directives/other-directives/other-directives";


export const DIRECTIVE_ROUTES: Routes = [

    { path: 'attribute', component: AttributeDirectives },
    { path: 'structural', component: StructuralDirectives },

    { path: 'component-directive', component: ComponentDirective },
    { path: 'structural-directive', component: Demo1 },
    { path: 'attribute-directive', component: Demo2 },
    { path: 'combined-directive', component: CombinedDirectivesDemo },
    { path: 'directive-examples', component: OtherDirectives }

];