import { Component, OnInit } from '@angular/core';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-view-treatments',
  templateUrl: './view-treatments.component.html',
  styleUrls: ['./view-treatments.component.css'],
})
export class ViewTreatmentsComponent implements OnInit {
  constructor() {}

  public backPath = [PageURLs.MainMenu, PageURLs.Treatment];
  public backText = 'Treatments';

  ngOnInit(): void {}

  public hello() {
    console.warn('HELLO');
  }
}
