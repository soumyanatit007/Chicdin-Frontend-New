import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorySearchComponent } from './categorySearch.component';
const routes: Routes = [
    {
        path: '',
        component: CategorySearchComponent,
        data: {
            breadcrumb: ''
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategorySearchRoutingModule { }
