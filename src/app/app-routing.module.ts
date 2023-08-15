import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutherizationGuard } from './autherization.guard';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

import { HomeComponent } from './home/home.component';
import { ContactuserComponent } from './contactuser/contactuser.component';
import { AboutuserComponent } from './aboutuser/aboutuser.component';
import { UserModule } from './user/user.module';
import { CharityComponent } from './charity/charity.component';

const routes: Routes = [

  {path:'admin', loadChildren:()=>AdminModule, canActivate:[AutherizationGuard]},
  {path:'user', loadChildren:()=>UserModule,canActivate:[AutherizationGuard]},

  {path:'auth', loadChildren:()=>AuthModule},
  
  { path:'',  component:HomeComponent},
  {
    path:'contactuser',
    component:ContactuserComponent
  },
  { path:'',  component:HomeComponent},
  { path:'charity',  component:CharityComponent},

  {
    path:'aboutuser',
    component:AboutuserComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
