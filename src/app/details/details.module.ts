import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DetailsRoutingModule } from './details.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AccordionModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgxGalleryModule } from 'ngx-gallery';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    imports: [
        AccordionModule.forRoot(),
        DetailsRoutingModule,
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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAf_l8aFF6j3XJgL4zH8V6huwEGZinG4rs'
        }),
        NgProgressModule,
        NgxGalleryModule
    ],
    declarations: [
        DetailsComponent
    ],
    providers: []
})
export class DetailsModule { }
