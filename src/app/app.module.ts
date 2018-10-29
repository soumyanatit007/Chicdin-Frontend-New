import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AppHeader } from './containers/app-header';
import { AppFooter } from './containers/app-footer';
import { Layout } from './containers/layout';
import { ModalModule } from 'ngx-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { Broadcaster } from './providers/eventEmitter';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BsDropdownModule } from 'ngx-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    Layout,
    AppHeader,
    AppFooter,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'chicdin' }),
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    HomeModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true
    })
  ],
  providers: [Broadcaster],
  bootstrap: [AppComponent]
})
export class AppModule { }
