import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../_interfaces/IUser';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss']
})
export class UserCartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  userData: any = {};
  cartDetails : any ;
  cartDeatilsArrayObj:any = {};

  ngOnInit(): void {
    let data = localStorage.getItem("userToken");
    if (data != null || data != undefined) {
      this.userData = JSON.parse(data);
      console.log(this.userData);
    }

    this.cartService.getUserCart(this.userData.id).subscribe(
      dataCart =>{
        this.cartDetails = dataCart;
        this.cartDeatilsArrayObj = dataCart.carts[0];
        console.log(this.cartDetails);
        // console.log(this.cartDetails.carts[0].products);
        console.log(this.cartDeatilsArrayObj);
      }
    )
  }



}
