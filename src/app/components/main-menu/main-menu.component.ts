import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    
  }

  public weightScreen(): void{
    this.router.navigate([PageURLs.Weight]);
  }

}
