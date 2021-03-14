import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';
import { Store } from '@ngrx/store';


@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      if (authenticated) {
        this.handleSignIn();
      }
    })
  }

  handleSignIn(): void {
    this.router.navigate([PageURLs.MainMenu]);
    
  }

  signOut(){
    this.authService.loginWithPopup();
    // this.authService.loginWithRedirect({redirect_uri: `https://${window.location.host}/${PageURLs.Login}`});
  }

}
