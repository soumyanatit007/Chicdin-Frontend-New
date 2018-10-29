import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgotPassword.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgotPassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NumberDirectiveModule } from '../directives/numberDirective.module.';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    imports: [
        ForgotPasswordRoutingModule,
        HttpModule,
        HttpClientModule,
        CommonModule,
        LaddaModule.forRoot({
            style: 'zoom-out',
            spinnerSize: 40,
            spinnerLines: 12
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        NumberDirectiveModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    providers: []
})
export class ForgotPasswordModule { }
