import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public loginDisable = false;
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.authService.isAuthenticated$.subscribe((authenticated) => {
        if (authenticated) {
          this.handleSignIn();
        } else {
          this.loginDisable = false;
        }
      })
    );
  }

  handleSignIn(): void {
    this.loginDisable = true;
    this.router.navigate([PageURLs.MainMenu]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
