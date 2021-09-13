import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { EndpointService } from 'src/app/service/endpoint.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  isregistersuccess = false;
  isinCredential: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: EndpointService,
    private authService: AuthService) {
      this.service.isregistersuccess$.subscribe(res => {
         this.isregistersuccess =res;
      })
     }

  ngOnInit() {
    this.initalizeForm()


  }
  close() {
    this.isregistersuccess = false;
  }
  closee() {
    this.isinCredential = false;
  }

  initalizeForm() {
    this.loginForm = this.formBuilder.group(
      {
        password: [null, [Validators.required]],
        email: [null, [Validators.required]]


      }
    );
  }

  onlogin() {
    
    this.router.navigateByUrl('/register')
  }

  onSubmit() {
    this.service.isregistersuccess$.next(false);
    this.submitted = true;
    if(this.loginForm.valid) {
      console.log("form is valid")
      this.service.getlogin(this.loginForm.value).subscribe(res => {
        console.log("rr",res)
        if(res.error && res.error.message == 'Username or password is incorrect') {
          this.isinCredential = true;
        }

        if(res.token) {
          this.authService.isloggedin$.next(true)
          this.authService.setToken(res.token)
          this.service.userid = res._id;
          this.service.isAdmin$.next(res.isAdmin);
          this.service.fisrtName = res.firstName;
          this.service.lastName = res.lastname;
          this.service.gender = res.gender;
          this.service.city = res.city;
          this.service.country = res.country;
          this.service.state = res.state;
          this.service.photoId = res.photoId;
          this.service.pincode = res.pincode;
          this.service.pone = res.phone;
          this.service.username =  res.firstName + " " + res.lastName;
          this.service.age = this.age(res.dob)
          this.router.navigateByUrl('/home')
        }
        
      })
    }
  }

  get f() { return this.loginForm.controls; }
  
  age(dob) {
    var dob_year = new Date(dob).getFullYear()
    var current_year = new Date().getFullYear()
    return (current_year - dob_year)
  }

  focus;
  focus1;
  focus2;
  focus3;


}
