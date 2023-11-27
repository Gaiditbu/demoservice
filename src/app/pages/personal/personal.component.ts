import { AccountService } from 'src/app/services/account.service';
import { Account } from './../../model/user.model';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  styles: [],
  providers: [MessageService]
})
export class PersonalComponent implements OnInit {
  user: Account;
  avatar: any = "//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
  passwordVisible = false;
  name?: string;
  password?: string;
  phone?: string;
  email?: string;
  address?: string;
  isEdit: boolean;

  @ViewChild('uploadInput', { static: false }) uploadInput: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private accountService: AccountService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.isEdit = false;
    const currentUser: any = this.accountService.userValue;
    // const user: any = localStorage.getItem("user") || null;
    // this.user = JSON.parse(user);
    if (currentUser !== null) {
      this.avatar = currentUser.avatar;
      this.name = currentUser.name;
      this.email = currentUser.email;
      this.address = currentUser.address;
      this.phone = currentUser.phone;
    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }

  onEditProfile(): void {
    this.isEdit = true;
  }
  

  onChangeAvatar(event: any): void {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.avatar = URL.createObjectURL(file);
      
    }
  }

  openFileInput(): void {
    // Kích hoạt sự kiện click trên input file
    this.renderer.selectRootElement(this.uploadInput.nativeElement).click();
  }

  onSubmit(form: NgForm): void {
    this.isEdit = false;
    
    const currentUser = this.accountService.userValue;
    const userID: any = currentUser?.id;
    const values: any = {
      name: form.value.name,
      phone: form.value.phone,
      street: form.value.address
    };
    this.accountService.update(userID, values) 
    .pipe(first())
    .subscribe({
      next: (responese: any) => {
        if (responese.result.code === 200) {
          const userData = responese.result.data;
          console.log(responese)
          const account: Account = {
            id: userID,
            name: userData.name,
            avatar: currentUser?.avatar,
            address: userData.street,
            phone: userData.phone,
            email: currentUser?.email
          }
          localStorage.setItem('user', JSON.stringify(account));
          this.messageService.add({ 
            severity: 'success', 
            summary: `Message: Code ${responese.result.code}`, 
            detail: `${responese.result.message}` 
          });
        } else{
          this.messageService.add({ 
            severity: 'error', 
            summary: `Message: Code ${responese.result.code}`, 
            detail: `${responese.result.message}` 
          });
        }
      },
      error: error => {
        this.messageService.add({ 
          severity: 'error', 
          summary: "Error", 
          detail: `${error}` 
        });
      }
    })
  }
}
