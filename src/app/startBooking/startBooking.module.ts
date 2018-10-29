import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AccordionModule } from 'ngx-bootstrap';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule, TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { startBookingComponent } from './startBooking.component';
import { startBookingRoutingModule } from './startBooking.routing.module';
import { FullCalendarModule } from 'ng-fullcalendar';
import { LaddaModule } from 'angular2-ladda';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function getTimepickerConfig(): TimepickerConfig {
    return Object.assign(new TimepickerConfig(), {
        hourStep: 1,
        minuteStep: 10,
        showMeridian: false,
        readonlyInput: false,
        mousewheel: true,
        showMinutes: true,
        showSeconds: false
    });
}
@NgModule({
    imports: [
        startBookingRoutingModule,
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
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.wanderingCubes,
            backdropBackgroundColour: 'rgba(0,0,0,0.1)',
            backdropBorderRadius: '4px',
            primaryColour: '#ffffff',
            secondaryColour: '#ffffff',
            tertiaryColour: '#ffffff'
        }),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        FullCalendarModule,
        LaddaModule.forRoot({
            style: 'zoom-out',
            spinnerSize: 40,
            spinnerLines: 12
        })
    ],
    declarations: [
        startBookingComponent
    ],
    providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
// tslint:disable-next-line:class-name
export class startBookingModule { }
