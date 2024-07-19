import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { HomeComponent } from './components/home/home.component';
  import { CartComponent } from './components/cart/cart.component';
  import { DetailComponent } from './components/detail/detail.component';
  import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { LoginComponent } from './components/login/login.component';
  import { JwtInterceptorInterceptor } from './services/interceptor/jwt-interceptor.interceptor';
import { ProductsComponent } from './components/products/products.component';

  @NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      CartComponent,
      DetailComponent,
      LoginComponent,
      ProductsComponent
    ],
    imports: [
      
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule
      
    
    ],
    providers: [{
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true
    },
  ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
