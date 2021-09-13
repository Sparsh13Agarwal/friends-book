import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/service/endpoint.service';
import { MustMatch } from 'src/app/shared/must-match.validators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  focus: any;
  focus1: any;
  registerForm: FormGroup;
  submitted: boolean = false;
  data: any;
  isEditProfile: boolean =false;
  passwordForm: FormGroup;
  isChangePassword = false;
  userId: any;
  isProfileSuccess: boolean;
  isPasswordSuccess: boolean;
  submittedd: boolean;
 

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private service: EndpointService) { }

  ngOnInit() {
    this.getData()
    this.initalizeForm()
    this.registerForm.disable()


  }

  getData() {
    this.service.getUserId().subscribe(res =>{
      this.data = res
      this.userId = res._id
      console.log("ress->", res)
      this.setformValue(res)
    })

  }
  initalizeForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        dob: [null, [Validators.required]],
        email: [null, [Validators.required,Validators.email]],
        gender: ['Male',[Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        pincode: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.minLength(10)]],

      }
    );
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  setformValue(res){
    var form_value = res;
    var form = this.registerForm.controls
    var date = new Date(form_value.dob)
    let dob =this.datepipe.transform(date, 'yyyy-MM-dd');
    form.firstName.setValue(form_value.firstName);
    form.lastName.setValue(form_value.lastName);
    form.dob.setValue(dob);
    form.email.setValue(form_value.email);
    form.city.setValue(form_value.city);
    form.gender.setValue(form_value.gender.toLowerCase());
    form.state.setValue(form_value.state);
    form.country.setValue(form_value.country);
    form.pincode.setValue(form_value.pincode);
    form.phone.setValue(form_value.phone);
  }

  onEditProfile() {
    this.isChangePassword = false;
    this.isEditProfile = !this.isEditProfile;
    if(this,this.isEditProfile == true) {
      this.registerForm.enable();
    }
    else {
      this.registerForm.disable();
    }
  }

  chnagepassword() {
    this.isChangePassword = !this.isChangePassword
  }
  onpasswordUpdate() {
    this.submittedd = true;
    if(this.passwordForm.valid) {
      this.service.updatePassword(this.passwordForm.value,this.userId).subscribe(res => {
        this.isPasswordSuccess = true;
      })
    }
  }

  onSubmit() {

    this.submitted = true;
    if(this.registerForm.valid) {
      console.log("form is valid",this.registerForm.value)
      this.sendPayload()
    }
  }

  sendPayload() {
    this.service.updateProfile(this.registerForm.value,this.userId).subscribe(res => {
      this.isProfileSuccess = true;
    })
    this.getData();
    this.isEditProfile = false;
    window.scrollTo(0,0)


  }

  get f() { return this.registerForm.controls; }

  get ff() { return this.passwordForm.controls; }


  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;


}
