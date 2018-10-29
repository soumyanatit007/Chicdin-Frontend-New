import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { startBookingComponent } from './startBooking.component';
const routes: Routes = [
    {
        path: '',
        component: startBookingComponent,
        data: {
            breadcrumb: ''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

// tslint:disable-next-line:class-name
export class startBookingRoutingModule { }
