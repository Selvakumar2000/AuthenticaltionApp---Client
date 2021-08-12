import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel=
  {
    UserName:'',
    Password:''

  }
  constructor(public service:UserService,public router:Router,public toastr:ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!=null)
      this.router.navigateByUrl('/home');
  }

  onSubmit(form:NgForm)
  {
    this.service.login(form.value).subscribe(

      (res:any)=>
      {
        localStorage.setItem('token',res.token);
        this.toastr.info('successfully login','Authentication system');
        this.router.navigateByUrl('/home');

      },
      err=>
      {
        if(err.status==400)
          this.toastr.error('incorrect username or password','Authentication error');
        else
          console.log(err);

      }
    );
  }
}
/*
For a registered user:
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiJlZWI3YTA1YS03MTEzLTQzOGItOGE2NC1iZGE1YjgzOWVlMGEiLCJuYmYiOjE2MjU0MjA4MjMsImV4cCI6MTYyNTUwNzIyMywiaWF0IjoxNjI1NDIwODIzfQ.XocDKG9YLTMWG6_rSdmjuv6ozxzOyY6S6EC7f-SH39w"
For an unregistered user:
    "message": "username or password is incorrect."
*/