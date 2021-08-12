import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'', redirectTo:'/user/login', pathMatch:'full'
  },
  {
    path:'user', component:UserComponent,
    children:[
      { 
        path:'register', component:RegistrationComponent // we can access using => /user/register
      },
      { 
        path:'login', component:LoginComponent // we can access using => /user/login
      }  
    ]
  },
  {
    path:'home', component:HomeComponent, canActivate:[AuthGuard] //make route as secure or private
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
