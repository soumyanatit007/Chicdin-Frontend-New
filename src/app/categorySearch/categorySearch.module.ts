import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CategorySearchRoutingModule } from './categorySearch.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { CategorySearchComponent } from './categorySearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AccordionModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { NgProgressModule } from 'ngx-progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    imports: [
        CategorySearchRoutingModule,
        HttpModule,
        HttpClientModule,
        IonRangeSliderModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        AccordionModule.forRoot(),
        PaginationModule.forRoot(),
        NgProgressModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        CategorySearchComponent
    ],
    providers: []
})
export class CategorySearchModule { }
