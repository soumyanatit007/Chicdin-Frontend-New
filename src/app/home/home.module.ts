
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing.module';
import { CommonModule } from '@angular/common';
import { AlertModule, CarouselModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule,
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        CarouselModule.forRoot(),
        HttpModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        FormsModule,
        ReactiveFormsModule,
        Ng4GeoautocompleteModule.forRoot()
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule {
    noPause = true;
    showIndicator = false;
}
