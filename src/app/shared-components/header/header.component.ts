import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PageURLs } from '@cms-enums';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  @Input() path: PageURLs[] = [PageURLs.MainMenu];
  @Input() tooltipLabel = 'Main Menu';

  constructor(private readonly router: Router) {}

  public backToMain(): void {
    this.router.navigate(this.path);
  }
}
