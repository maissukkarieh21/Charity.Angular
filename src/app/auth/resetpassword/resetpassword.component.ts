import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit{

  constructor( private router: Router, private authService: AuthService,private toastr: ToastrService) {}
 
  resetForm :FormGroup = new FormGroup({
    verificationcode : new FormControl('',Validators.required),
    newpassword:new FormControl  ('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)]),
  })

 




  resetpassword() {

    this.authService.Resetpassword(this.resetForm.value).subscribe((resp:any)=>{

      this.toastr.success('Password reseted successfully.', 'Success');

    },err=>{
      
      this.toastr.error('Something went wrong !!', 'error');

    });
  }
 

  ngOnInit(): void {
   
    }

  
  toLogin(){
    this.router.navigate(['auth/login']);
  }

}

