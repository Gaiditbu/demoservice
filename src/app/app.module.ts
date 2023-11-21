import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MenupageComponent } from './pages/menupage/menupage.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzDemoAvatarTypeComponent } from './ng-zero/nz-demo-avatar-type/nz-demo-avatar-type.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ToastModule } from 'primeng/toast';
import { PersonalComponent } from './pages/personal/personal.component';
import { ImageModule } from 'primeng/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    AboutComponent,
    ContactComponent,
    MenupageComponent,
    SignupComponent,
    LoginComponent,
    NzDemoAvatarTypeComponent,
    PersonalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzAvatarModule,
    ToastModule,
    ImageModule,
    NzInputModule,
    NzIconModule,
    ButtonModule,
    RouterModule
  ],
  providers: [
    NavbarComponent,
    { provide: NZ_I18N, useValue: en_US, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
