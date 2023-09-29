import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Modals, PageURLs } from '@cms-enums';
import { IAnimal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getMaleOver36Months, getUnregisteredCalves } from '@cms-ngrx/animal';
import { LoadingPaneService } from '@cms-services';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cms-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, AfterViewInit {
  public $oldMales: Observable<IAnimal[]>;
  public $allUnregCalves: Observable<{ overdue: IAnimal[]; unreg: IAnimal[] }>;
  public selectedAnimal: IAnimal;

  private $unregCalves: Observable<IAnimal[]>;
  private $overdueUnregCalves: Observable<IAnimal[]>;

  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly store: Store<RootState>,
    private readonly loadingService: LoadingPaneService,
    private readonly modalService: NgxSmartModalService
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {
    this.$oldMales = this.store.pipe(select(getMaleOver36Months));
    this.$unregCalves = this.store.pipe(select(getUnregisteredCalves)).pipe(
      map((animals) =>
        animals.filter((animal) => {
          return moment().diff(animal.birthDate, 'days') < 27;
        })
      )
    );

    this.$overdueUnregCalves = this.store
      .pipe(select(getUnregisteredCalves))
      .pipe(
        map((animals) =>
          animals.filter((animal) => {
            return moment().diff(animal.birthDate, 'days') >= 27;
          })
        )
      );

    this.$allUnregCalves = combineLatest([
      this.$unregCalves,
      this.$overdueUnregCalves,
    ]).pipe(
      map(([unreg, overdue]: [IAnimal[], IAnimal[]]) => {
        return { overdue, unreg };
      })
    );
  }

  public openWeightModal(animal: IAnimal) {
    this.selectedAnimal = animal;
    this.modalService.get(Modals.Weight).open();
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
      returnTo: `https://${window.location.host}/CMSFrontEnd/${PageURLs.Login}`,
    });
  }

  public registrationScreen(): void {
    this.router.navigate([PageURLs.Registration], { relativeTo: this.route });
  }

  public performance(): void {
    this.router.navigate([PageURLs.Performance], { relativeTo: this.route });
  }

  public medicationScreen(): void {
    this.router.navigate([PageURLs.Medication], { relativeTo: this.route });
  }

  public get loading() {
    return this.loadingService.currentLoadingState;
  }
}
