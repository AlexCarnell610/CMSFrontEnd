import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-performance-home',
  templateUrl: './performance-home.component.html',
  styleUrls: ['./performance-home.component.scss']
})
export class PerformanceHomeComponent implements OnInit {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  backToMain():void {
    this.router.navigate([PageURLs.MainMenu])
  }

  cullUpdate():void {
    this.router.navigate([PageURLs.CullUpdate], {relativeTo: this.route})
  }

  weightAnalysis(): void {
    this.router.navigate([PageURLs.WeightAnalysis], {relativeTo: this.route})
  }

}
