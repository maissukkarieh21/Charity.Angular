import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutherizationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token');
    console.log(state);
    if (token) {
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');

        if (user) {
          user = JSON.parse(user);
          
          if (user.role == '1') {
            // this.toaster.success('Welcome in admin pages ');
            return true;
          } else {
            //this.toaster.warning('this page for admin and');
            return false;
          }
        } else {
          //this.toaster.warning('you are not user from db');
          return false;
        }
      }
    
      return true;
    } else {
      this.router.navigate(['']);
      //this.toaster.warning('you are not autherize !!')
      return false;
    }
  }
}
