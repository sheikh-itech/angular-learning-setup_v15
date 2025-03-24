import { Routes } from "@angular/router";
import { Interpolation } from "./data-binding/interpolation/interpolation";
import { AttributeBinding } from "./data-binding/attribute-binding/attribute-binding";
import { PropertyBinding } from "./data-binding/property-binding/property-binding";
import { TwowayDataBinding } from "./data-binding/twoway-data-binding/twoway-data-binding";
import { EventBinding } from "./data-binding/event-binding/event-binding";


export const DATA_BINDING_ROUTES: Routes = [

    { path: 'interpolation', component: Interpolation },
    { path: 'attribute-binding', component: AttributeBinding },
    { path: 'property-binding', component: PropertyBinding },
    { path: 'twoway-binding', component: TwowayDataBinding },
    { path: 'event-binding', component: EventBinding }
];