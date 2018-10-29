import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component';
const routes: Routes = [
    {
        path: '',
        component: DetailsComponent,
        data: {
            breadcrumb: ''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailsRoutingModule { }
