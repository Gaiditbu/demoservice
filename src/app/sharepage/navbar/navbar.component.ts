import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  avatar: any = null;
  private avatarSource = new BehaviorSubject<string>(this.avatar);
  currentAvatar = this.avatarSource.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private account: AccountService
  ) { }

  ngOnInit(): void {
    this.user = this.account.userValue;
    
    if (!this.user) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }

  logout(): void {
    this.account.logout();
  }
}
