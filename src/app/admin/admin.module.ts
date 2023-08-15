import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationComponent } from './donation/donation.component';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from '../shared/shared.module';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { IssuesComponent } from './issues/issues.component';
import { CharitiesComponent } from './charities/charities.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    SidebarComponent,
    AboutComponent,
    DonationComponent,
    CategoriesComponent,
    TestimonialComponent,
    IssuesComponent,
    CharitiesComponent,
    HomeComponent,
    ContactComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ] 


})
export class AdminModule { }
