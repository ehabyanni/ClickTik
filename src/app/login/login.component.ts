import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  loginForm = this.formbuilder.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  //username property
  get USERNAME() {
    return this.loginForm.get('username');
  }

  //password property
  get PASSWORD() {
    return this.loginForm.get('password');
  }

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = "";

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
      this.router.navigate(['home']);
    }
  }

  onSubmit() {
    let userlogin = this.USERNAME?.value;
    let passlogin = this.PASSWORD?.value;

    if ((userlogin != null) && (passlogin != null)) {
      this.auth.login(userlogin, passlogin).subscribe(
        data => {
          localStorage.setItem('authToken', data.token);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.router.navigate(['home']);
        },
        error => {
          this.errorMessage = error.error.message || "Invalid User";
        }
      );

    }

  }

}
