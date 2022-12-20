import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService:AuthService ,
    private router : Router
  ) { }

  @Output() headerSearchToHome = new EventEmitter();

  @Input() cartProductsLength = 0;

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.isLoggedIn = false;
    }
    else{
      this.isLoggedIn = true;
    }
  }


  signOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }


  //search function
  search(event:any){
    var word = event.target.value;
    this.headerSearchToHome.emit(word);
  }


}
