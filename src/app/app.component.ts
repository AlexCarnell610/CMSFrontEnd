import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CMSFrontEnd';
  constructor(ngbConfig: NgbTooltipConfig, private router: Router, public auth: AuthService){
    // router.events.subscribe(event => console.error(event))
    auth.isLoading$.subscribe(loading => {
      console.warn(loading);
    })
    auth.error$.subscribe(error => {
      console.error("AUTTHTHTHTHTHHTHT", error);
      
    })
 }
}
