import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit { 
  loading = false;
  submitted = false;
  

  constructor(
    private account: AccountService, 
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    ) { }
  
  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }

    this.account.login(form.value.username, form.value.password)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.result.code === 200) {
            const avatar: string = `data:image/png;base64, ${response.result.partner.avatar}`
            const account: Account = {
              id: response.result.partner.id,
              name: response.result.partner.name,
              avatar: avatar,
              address: response.result.partner.street,
              phone: response.result.partner.phone,
              email: response.result.partner.email
            }
            this.account.triggerUserUpdate();
            localStorage.setItem('user', JSON.stringify(account));
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          } else {
            this.messageService.add({ 
              severity: 'error', 
              summary: `Message: Code ${response.result.code}`, 
              detail: `Hello ${response.result.message}` 
            });
          }
        },
        error: error => {
          this.messageService.add({ 
            severity: 'error', 
            summary: "Error", 
            detail: `Hello ${error}` 
          });
          this.loading = false;
        }
      });
  }

  ngOnInit():void {
  }
}
