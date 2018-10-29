import { SignupComponent } from './signup.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SignUpRoutingModule } from './signup.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LaddaModule } from 'angular2-ladda';
import { NumberDirectiveModule } from '../directives/numberDirective.module.';
import { TextMaskModule } from 'angular2-text-mask';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    imports: [
        SignUpRoutingModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LaddaModule.forRoot({
            style: 'zoom-out',
            spinnerSize: 40,
            spinnerLines: 12
        }),
        BsDatepickerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NumberDirectiveModule,
        TextMaskModule
    ],
    declarations: [
        SignupComponent
    ],
    providers: []
})
export class SignupModule {
 }
