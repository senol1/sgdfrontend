import { Injectable } from '@angular/core';
import {Headers, Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private token: string;
  private url = 'http://api.sgdsystems.com/api/login_check';

  constructor(private http: Http) {
    // localStorage.removeItem('currentUser');
    if (localStorage.getItem('currentUser')) {
      const currentUser  = JSON.parse(localStorage.getItem['currentUser'] );
      this.token = currentUser && currentUser.token;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('content-type', 'application/x-www-from-urlencoded');
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);


    return this.http.post(this.url, body , {headers: headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

          // return true to indicate success login
          return true;
        }else {
          // return false to indicate failed login
          return false;
        }
      }).catch(this.handelError)
      ;
  }


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private handelError(error: Response) {
    return Observable.throw(error.json() || 'server error');
  }

}
