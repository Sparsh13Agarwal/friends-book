import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  isloggedInUser: boolean;
  constructor( public router: Router, private authService: AuthService, ) {
    this.authService.isloggedin$.subscribe(res => {
      if (res) {
        console.log("auth",res)
        if (res == true) { this.isloggedInUser = true; }
        else if (res == false) { this.isloggedInUser = false; }
      }
    });

  }
  canActivate(): boolean {
    if (!this.isloggedInUser) {
      this.router.navigate(['landing'])
      return false;
    }
    return true;
  }
}