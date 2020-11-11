import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';
import { Store } from '@ngrx/store';
import { ImportDataService } from 'libs/services/services/src/importData.service';


@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly store: Store<{}>, private readonly router:Router, private readonly importService: ImportDataService) { }

  ngOnInit(): void {
  }

  handleSignIn(): void {
    this.router.navigate([PageURLs.MainMenu]);
    this.importService.importData();
    // this.store.dispatch(new LoadAnimalData())
  }

}
