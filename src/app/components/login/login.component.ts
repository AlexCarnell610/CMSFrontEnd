import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';
import { Store } from '@ngrx/store';
import { RetrieveAnimalData } from 'libs/ngrx/src/lib/actions/src/animal.actions';


@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly store: Store<{}>, private readonly router:Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authenticated => {
      console.error("authenticated", authenticated)
      if (authenticated) {
        this.handleSignIn();
      }
    })
  }

  handleSignIn(): void {
    this.store.dispatch(new RetrieveAnimalData());
    this.router.navigate([PageURLs.MainMenu]);
    // this.importService.importAnimalData();
    
  }

  signOut(){
    this.authService.loginWithPopup();
   
  }

}
