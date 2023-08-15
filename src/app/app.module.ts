import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr'; 
import { HomeComponent } from './home/home.component';
import { ContactuserComponent } from './contactuser/contactuser.component';
import { AboutuserComponent } from './aboutuser/aboutuser.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CharityComponent } from './charity/charity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactuserComponent,
    AboutuserComponent,
    CharityComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule ,
    AdminModule,
    ToastrModule.forRoot(), 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  
    providers: [{
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
