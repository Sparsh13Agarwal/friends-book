import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/service/endpoint.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: EndpointService) { }

  ngOnInit() {
    this.initalizeForm()
    console.log("before",this.registerForm)


  }

  initalizeForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        dob: [null, [Validators.required]],
        email: [null, [Validators.required,Validators.email]],
        gender: ['Male',[Validators.required]],
        password: [null, [Validators.required,Validators.minLength(6)]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        pincode: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.minLength(10)]],

      }
    );
  }

  onlogin() {
    this.router.navigateByUrl('/login')
  }

  onSubmit() {
    console.log("after",this.registerForm)

    this.submitted = true;
    if(this.registerForm.valid) {
      console.log("form is valid",this.registerForm.value)
      this.service.registerUser(this.registerForm.value)
    }
  }

  get f() { return this.registerForm.controls; }

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;


}
