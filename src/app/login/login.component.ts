import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Route, Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userSerive: UserService, private userAuthServie: UserAuthService, private router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userSerive.login(loginForm.value).subscribe(
      (response:any) => {
       // console.log(response);
        this.userAuthServie.setRoles(response.user.role);
        this.userAuthServie.setToken(response.jwtToken);

        const role = response.user.role[0].roleName
        if(role ==  'Admin') {
          this.router.navigate(['/admin'])
        }else {
          this.router.navigate(['/user'])
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
  register() {
    this.router.navigate(['/register'])
  }

}
