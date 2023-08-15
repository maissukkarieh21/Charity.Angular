import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { UserRoutingModule } from './user-routing.module';
import { CharitiesComponent } from './charities/charities.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { DonationsComponent } from './donations/donations.component';
import { ProfileComponent } from './profile/profile.component';
import { IssuesComponent } from './issues/issues.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    CharitiesComponent,
    TestimonialComponent,
    DonationsComponent,
    ProfileComponent,
    IssuesComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
