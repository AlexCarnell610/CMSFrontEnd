import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
  }

  handleSignIn(): void {
    this.router.navigate([]);
  }

}
