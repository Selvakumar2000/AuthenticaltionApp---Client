import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  contactForm;
  readonly baseURL='https://localhost:5001/api';
  constructor(public formBuilder: FormBuilder,public http:HttpClient) { 
    this.contactForm = this.formBuilder.group({
      UserName : ['',Validators.required],
      Email : ['',Validators.email],
      FullName : ['',Validators.required],
      Passwords:this.formBuilder.group({  //find a soln. for this
      //if more than one validators,use inside an array
      Password : ['',[Validators.required,Validators.minLength(5)]],
      ConfirmPassword : ['',Validators.required]
      },{validator:this.comparePasswords}
    )
  });
  }

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl?.errors == null || 'passwordMismatch' in confirmPswrdCtrl?.errors) {
      if (fb.get('Password')?.value != confirmPswrdCtrl?.value)
        confirmPswrdCtrl?.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl?.setErrors(null);
    }
  }

// circular dependency error --> https://angular.io/errors/NG0200
//Reactive form Design using formgroup and form control with validators
//https://www.tektutorialshub.com/angular/angular-formbuilder-in-reactive-forms/ 

  register()
  {
    var body= {
      UserName : this.contactForm.value.UserName,
      Email : this.contactForm.value.Email,
      FullName : this.contactForm.value.FullName,
      Password : this.contactForm.value.Passwords.Password
    };
    return this.http.post(this.baseURL+'/ApplicationUser/Register',body);
  }

  login(formData:any)
  {
    return this.http.post(this.baseURL+'/ApplicationUser/Login',formData);
  }

  getUserProfile()
  {
    var tokenHeader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.baseURL+'/UserProfile' ,{headers:tokenHeader} );
  }

  get UserName() {
    return this.contactForm.get('UserName');
  }
  get Email() {
    return this.contactForm.get('Email');
  }
  get FullName() {
    return this.contactForm.get('FullName');
  }
  get Password() {
    return this.contactForm.get('Passwords.Password');
  }
 
  get ConfirmPassword() {
    return this.contactForm.get('Passwords.ConfirmPassword');
  }
  
}
