import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { DonationComponent } from './donation/donation.component';
import { CategoriesComponent } from './categories/categories.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { IssuesComponent } from './issues/issues.component';
import { ContactComponent } from './contact/contact.component';

import { CharitiesComponent } from './charities/charities.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'users', component:UsersComponent},

   {path:'dashboard', component:DashboardComponent},
   {path:'about',component:AboutComponent},
   {path:'donation',component:DonationComponent},
   {path:'categories',component:CategoriesComponent},
   {path:'testimonial',component:TestimonialComponent},
   {path:'issue',component:IssuesComponent},
   {path:'charities',component:CharitiesComponent},
   {path:'home',component:HomeComponent},
   {path:'contact',component:ContactComponent},



];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
