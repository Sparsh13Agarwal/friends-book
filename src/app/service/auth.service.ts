import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  isloggedin$ = new BehaviorSubject(false)

  constructor() { }

  setToken(token: string) {
    this.authToken = token;
    console.log("token set",this.authToken)
  }

  getToken() {
    return this.authToken;
  }
}
