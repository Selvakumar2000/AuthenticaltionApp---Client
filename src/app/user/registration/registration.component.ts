import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,public toastr: ToastrService) {}

  onSubmit()
  {
    this.service.register()
    .subscribe(
      //we can define the form output here
     /* res =>
      {
        this.service.contactForm.reset();
        //Toastr is a JavaScript library which is used to create a notification popup.
        this.toastr.success('Submitted Successfully','User Registeration'); //pm.=?msg,title
      },
      err =>
      {
         console.log(err); 
      }
      */

      (res: any) => {
        if (res.Succeeded) {
          this.service.contactForm.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        }
         else {
          res.Errors.forEach((element: { code: any; description: string | undefined; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              //this.toastr.error(element.description,'Registration failed.');
                this.toastr.error('Username is already taken','Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
      

      );
  }
 
  ngOnInit(): void {
  }

}
/*
For successful registration:
ex:
{
    "UserName": "selva",
    "FullName": "Selvakumar",
    "Email": "selva312000@gmail.com",
    "Password":"selva"
}

{
    "Succeeded": true,
    "Errors": []
}

For unsuccesful registration:(if user uses an username which is already present)
{
    "Succeeded": false,
    "Errors": [
        {
            "Code": "DuplicateUserName",
            "Description": "User name 'skselva21' is already taken."
        }
    ]
}
*/