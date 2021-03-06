import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../auth.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

  username: string;
  password: string;
  error: string;

  constructor(private router: Router, private authentifiationService: AuthService) { }

  ngOnInit() {
     this.authentifiationService.logout();
  }

  login(e) {


    e.preventDefault();

    this.authentifiationService.login(this.username, this.password)
      .subscribe( result => {

        if ( localStorage.getItem('currentUser') ) {

          console.log( JSON.parse(localStorage.getItem('currentUser')).token);

        }

        this.router.navigate(['/dashboard/default']);
      }, loginError => this.error = loginError.message +  ' : Vérifier votre nom d\'utilisateur ou votre mot de passe') ;
  }

}
