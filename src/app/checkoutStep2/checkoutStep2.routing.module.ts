import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { checkoutStep2Component } from './checkoutStep2.component';
const routes: Routes = [
    {
        path: '',
        component: checkoutStep2Component,
        data: {
            breadcrumb: ''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class checkoutStep2RoutingModule { }
