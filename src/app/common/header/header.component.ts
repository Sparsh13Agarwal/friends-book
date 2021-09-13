import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EndpointService } from 'src/app/service/endpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isloggedin: boolean = false;
  isAdmin: boolean = false;;

  constructor(private router: Router,
    private service: EndpointService,
    private auth: AuthService) {
      this.auth.isloggedin$.subscribe(res => {
        this.isloggedin = res
      })
      this.service.isAdmin$.subscribe(res => {
        this.isAdmin = res;
      })
     }

  ngOnInit(): void {
  }

  onSetting() {
    this.router.navigateByUrl('/settings')
  }

  onFriends() {
    this.router.navigateByUrl('/friends')
  }

  onHome() {
    this.router.navigateByUrl('/home')
  }

  onNetwork() {
    this.router.navigateByUrl('/network')
  }
  onlogin() {
    this.router.navigateByUrl('/login')
  }

  onregister() {
    this.router.navigateByUrl('/register')
  }

  onlogout() {
    this.auth.isloggedin$.next(false)
    this.router.navigateByUrl('/')
  }

  onUsers() {
    this.router.navigateByUrl('/users')
  }

}
