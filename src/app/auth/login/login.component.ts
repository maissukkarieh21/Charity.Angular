import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  constructor(private authService: AuthService,private router: Router) {

  }
  username:FormControl = new FormControl('',[Validators.required,Validators.email]);
  password:FormControl= new FormControl('',[Validators.required,Validators.minLength(8)])
  
  
  login() {

    this.authService.Login(this.username,this.password); 

}

  toRegister(){
    this.router.navigate(['auth/register']);
  }
  toForgotPassword(){
    this.router.navigate(['auth/ForgotPassword']);
  }
}
