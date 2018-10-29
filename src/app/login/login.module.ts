import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.routing.module';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LaddaModule } from 'angular2-ladda';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from 'angular5-social-login';
import { CookieService } from 'ngx-cookie-service';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// Configs
export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('384550795398022')
            }
        ]
    );
    return config;
}
@NgModule({
    imports: [
        LoginRoutingModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        LaddaModule.forRoot({
            style: 'zoom-out',
            spinnerSize: 40,
            spinnerLines: 12
        }),
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SocialLoginModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: getAuthServiceConfigs
        },
        CookieService
    ]
})
export class LoginModule {
}
