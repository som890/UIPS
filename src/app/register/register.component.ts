import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
  }
  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login'])
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    )
  }

}
