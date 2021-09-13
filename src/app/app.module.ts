import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPassowrdComponent } from './pages/forgot-passowrd/forgot-passowrd.component';
import { ChangePassowrdComponent } from './pages/change-passowrd/change-passowrd.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptorService } from './service/http-token-interceptor.service';
import { HeaderComponent } from './common/header/header.component';
import { DatePipe } from '@angular/common';
import { NetworkComponent } from './network/network.component';
import { FriendsComponent } from './friends/friends.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassowrdComponent,
    ChangePassowrdComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent,
    NetworkComponent,
    FriendsComponent,
    LandingComponent,
    UsersComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpTokenInterceptorService,
    multi: true
  },
  
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
