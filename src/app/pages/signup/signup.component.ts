import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})

export class SignupComponent implements OnInit {
  constructor(
    private account: AccountService, 
    private router: Router,
    private message: MessageService,
    ) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.account.register(form.value.name, form.value.email, form.value.password, form.value.phone, form.value.address)
    .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.result.code === 200) {
            this.message.add({ 
              severity: 'success', 
              summary: 'Thông báo', 
              detail: `${response.result.message}` 
            });
            this.router.navigateByUrl("/login");
          } else {
            this.message.add({ 
              severity: 'error', 
              summary: `Message: Code ${response.result.code}`, 
              detail: `${response.result.message}` 
            });
          }
        },
        error: error => {
          this.message.add({ 
            severity: 'error', 
            summary: "Error", 
            detail: `${error}` 
          });
        }
      });
  }

  ngOnInit():void {
  }
}