import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/model/user.model';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  styles: [
    `
      i {
        cursor: pointer;
      }
    `
  ]
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
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.isEdit = false;
    const user: any = localStorage.getItem("user") || null;
    this.user = JSON.parse(user);
    if (this.user !== null) {
      this.avatar = this.user.avatar;
      this.name = this.user.name;
      this.email = this.user.email;
      this.address = this.user.address;
      this.phone = this.user.phone;
    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }

  onEditProfile(): void {
    this.isEdit = true;
  }
  
  onUpdateProfile(): void {
    this.isEdit = false;
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

}
