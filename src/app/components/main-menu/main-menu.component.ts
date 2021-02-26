import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { PageURLs } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getMaleOver36Months } from '@cms-ngrx/animal';
import { LoadingPaneService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
})
export class MainMenuComponent implements OnInit {
  public $oldMales: Observable<Animal[]>;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private route: ActivatedRoute,
    private readonly store: Store<RootState>,
    private loadingService: LoadingPaneService
  ) {}

  ngOnInit() {
    this.$oldMales = this.store.pipe(select(getMaleOver36Months));
  }

  public weightScreen(): void {
    this.router.navigate([PageURLs.Weight], { relativeTo: this.route });
  }

  public animalScreen(): void {
    this.router.navigate([PageURLs.Animals], { relativeTo: this.route });
  }

  public birthScreen(): void {
    this.router.navigate([PageURLs.Births], { relativeTo: this.route });
  }

  public logout(): void {
    this.auth.logout({
      returnTo: 'https://' + document.location.host + '/' + PageURLs.Login,
    });
    // this.router.navigate([PageURLs.Logout])
  }

  public get loading() {
    return this.loadingService.currentLoadingState;
  }
}
