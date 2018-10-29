import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsetComponent } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NumberDirectiveModule } from '../directives/numberDirective.module.';
import { LaddaModule } from 'angular2-ladda';
import { CookieService } from 'ngx-cookie-service';
import { TextMaskModule } from 'angular2-text-mask';

import {ImageCropperModule} from 'ng2-img-cropper';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
@NgModule({
    imports: [
        ProfileRoutingModule,
        HttpModule,
        TabsModule.forRoot(),
        HttpClientModule,
        CommonModule,
        BsDatepickerModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        NumberDirectiveModule,
        LaddaModule.forRoot({
            style: 'zoom-out',
            spinnerSize: 40,
            spinnerLines: 12
        }),
        TextMaskModule,
        ImageCropperModule
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [CookieService]
})
export class ProfileModule {}
