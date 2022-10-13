import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { HttpInterceptorInterceptor } from './core/Interceptors/http-interceptor.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/Interceptors/loading.interceptor';
import { JwtInterceptor } from './core/Interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
    HomeModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS ,useClass:HttpInterceptorInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS ,useClass:LoadingInterceptor , multi:true},
    {provide:HTTP_INTERCEPTORS ,useClass:JwtInterceptor , multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
