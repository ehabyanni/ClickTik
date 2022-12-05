import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllCategoriesService } from '../_services/all-categories.service';
import { AllProductsService } from '../_services/all-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router : Router,
    private categoryService : AllCategoriesService,
    private productService : AllProductsService
  ) { }

  allCategories : any = [];
  allProducts : any = [];

  ngOnInit(): void {
     //check if the user authenticated or not
     var token = localStorage.getItem('authToken');
     if (token == null || undefined) {
       this.router.navigate(['login']);
     }

     this.categoryService.getAllCategories().subscribe(
      data => {
        this.allCategories = data;
        console.log(data);
      }
     )

     this.productService.getAllProducts().subscribe(
      data => {
        this.allProducts = data.products;
        console.log(this.allProducts);
      }
     )


  }

}
