
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']

})
export class ForgotpasswordComponent implements OnInit{


  constructor( private router: Router, private authService: AuthService,private toastr: ToastrService) {}
   
  emailForm :FormGroup = new FormGroup({
    email:new FormControl ('',[Validators.required,Validators.email]),
  })

 
  ngOnInit(): void {

    
  }
  forgotpassword() {

    this.authService.Forgotpassword(this.emailForm.value).subscribe((resp:any)=>{

      this.toastr.success('check your email please.', 'Success');

    },err=>{
      
      this.toastr.error('Something went wrong !!', 'error');

    });
  }
  toLogin(){
    this.router.navigate(['auth/login']);
  }

}




