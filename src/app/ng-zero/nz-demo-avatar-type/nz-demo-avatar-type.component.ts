import { Component } from '@angular/core';

@Component({
  selector: 'account-avatar',
  template: `
    <nz-avatar nzIcon="user"></nz-avatar>
    <nz-avatar nzText="U"></nz-avatar>
    <nz-avatar nzText="USER"></nz-avatar>
    <nz-avatar nzIcon="user" nzSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></nz-avatar>
    <nz-avatar nzText="U" style="color:#f56a00; background-color:#fde3cf;"></nz-avatar>
    <nz-avatar nzIcon="user" style="background-color:#87d068;"></nz-avatar>
  `,
  styles: [
    
  ]
})
export class NzDemoAvatarTypeComponent {}