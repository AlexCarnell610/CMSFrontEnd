import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { Store } from '@ngrx/store';
import { LoadAnimalData } from 'libs/ngrx/src/lib/actions/src/animal.actions';


@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly store: Store<{}>, private readonly router:Router) { }

  ngOnInit(): void {
  }

  handleSignIn(): void {
    this.router.navigate([PageURLs.MainMenu]);
    this.store.dispatch(new LoadAnimalData);
  }

}
