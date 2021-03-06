import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if ( localStorage.getItem('currentUser') ) {

        // logged in so return true

        console.log( JSON.parse(localStorage.getItem('currentUser')).username);

        return true;
    }

    // console.log( JSON.parse(localStorage.getItem('currentUser')).username);

    // not  logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
