
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,private router: Router,private toastr:ToastrService) { }
  

  Register(Register: any): Observable<any>{

    return  this.http.post('https://localhost:7084/api/Auth/Register/',Register);
 
  }

  Login(username: any, password: any) {
    var Login = {
      username: username.value.toString(),
      password: password.value.toString(),
    };

    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    
    this.http.post('https://localhost:7084/api/Auth/Login/', Login, requestOptions).subscribe((res: any) => {
     sessionStorage.setItem('userid',res.userid);
    sessionStorage.setItem('roleId',res.roleid);
      const responce = { token: res.toString() }
      localStorage.setItem('token', responce.token);
      
      let data: any = jwt_decode(responce.token);
  
      localStorage.setItem('user', JSON.stringify(data));
  
      if (data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "1") {
        this.toastr.success('Welcome On Admin Dashboard');
        this.router.navigate(['dashboard']);
      } else if (data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "2") {
        this.toastr.success('Welcome On User Dashboard');
        this.router.navigate(['user/Profile']);
      } else {
        this.toastr.error('Something wrong!!');
        this.router.navigate(['']);
      }
    });
  }
  
 
  Forgotpassword(Forgotpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7084/api/Auth/Forgotpassword/',Forgotpassword);
 
  }

  Resetpassword(Resetpassword: any): Observable<any>{

    return  this.http.post('https://localhost:7084/api/Auth/Resetpassword/',Resetpassword);
 
  }


}


