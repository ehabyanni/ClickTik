import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { isAuthenticatedGaurd } from '../_gaurds/isAuthenticated.guard';
import { SharedSearchWordService } from '../_services/shared-search-word.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private sharedSearchWordService: SharedSearchWordService
  ) { }

  // @Output() headerSearchToHome = new EventEmitter();

  @Input() cartProductsLength = 0;

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.isLoggedIn = false;
    }
    else {
      this.isLoggedIn = true;
    }

  }

  //logout function
  signOut() {
    this.authService.logout();
  }


  //search function
  search(event: any) {
    var word = event.target.value;
    // this.headerSearchToHome.emit(word);

    ////// using behavior subject to set the data which will be shared among all components 
    // this.sharedSearchWordService.setSearchWord(word);


    ///// Using signals to set the data which will be shared among all components.
    // this.sharedSearchWordService.setSearchWord(word);

  }

}
