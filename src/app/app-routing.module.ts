import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { NetworkComponent } from './network/network.component';
import { ChangePassowrdComponent } from './pages/change-passowrd/change-passowrd.component';
import { ForgotPassowrdComponent } from './pages/forgot-passowrd/forgot-passowrd.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service'
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  { path: 'forgot-password', component: ForgotPassowrdComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'change-password', component: ChangePassowrdComponent},
  { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard]},
  { path: 'network', component: NetworkComponent,canActivate: [AuthGuard]},
  { path: 'friends', component: FriendsComponent,canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard]},

  { path: 'landing', component: LandingComponent},
  { path: 'page-not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'page-not-found' },



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
