import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {

  constructor(private readonly router: Router, private readonly auth: AuthService, private route: ActivatedRoute) { }

  public weightScreen(): void{
    this.router.navigate([PageURLs.Weight], {relativeTo: this.route});
  }

  public logout(): void{
    this.auth.logout({returnTo: "http://" + document.location.host + '/' + PageURLs.Login});
    // this.router.navigate([PageURLs.Logout])
  }

}
