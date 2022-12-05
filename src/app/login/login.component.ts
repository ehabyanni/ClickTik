import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formbuilder:FormBuilder
  ) { }

  loginForm = this.formbuilder.group({
    username: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  //username property
  get USERNAME(){
    return this.loginForm.get('username');
  }

  //password property
  get PASSWORD(){
    return this.loginForm.get('password');
  }

  isLoggedIn    : boolean = false;
  isLoginFailed : boolean = false;
  errorMessage  : string  = '';

  ngOnInit(): void {
  }


  onSubmit(){
    console.log("login");
  }

}
