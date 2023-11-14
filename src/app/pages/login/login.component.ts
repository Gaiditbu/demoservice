import { Component } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showLogin = true;
  showSignup = false;

  showSignupForm() {
    this.showLogin = false;
    this.showSignup = true;
  }
}
