import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showLogin = false;
  showSignup = true;

  showLoginForm() {
    this.showLogin = true;
    this.showSignup = false;
  }
}
