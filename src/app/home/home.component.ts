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
    private router: Router,
    private categoryService: AllCategoriesService,
    private productService: AllProductsService
  ) { }

  allCategories: any = [];
  allProducts: any = [];

  //products that will be displayed
  displayProducts: any = [];

  //for category selection result
  productsOfCategory: any = [];


  //pagination variables
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;


  ngOnInit(): void {
    //check if the user authenticated or not
    var token = localStorage.getItem('authToken');
    if (token == null || undefined) {
      this.router.navigate(['login']);
    }

    //get categories
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.allCategories = data;
      }
    )

    //get products
    this.getProducts();
  }


  //get all products function
  getProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.allProducts = data.products;
        this.displayProducts = this.allProducts;
      }
    )
  }

  //show by category
  showCategory(event: any) {
    var categorySelected = event.target.value;
    var checkboxStatus = document.getElementById('catName') as HTMLInputElement;

    console.log(categorySelected);

    if (checkboxStatus.checked) {
      console.log('checked');
      console.log(checkboxStatus.checked);
    }
    else {
      console.log('unChecked')
      console.log(checkboxStatus.checked)
    }



    // if(categorySelected){
    //   this.productService.getProductsByCategory(categorySelected).subscribe(
    //     data => {
    //       this.allProducts = data.products;
    //       this.displayProducts = this.allProducts;
    //     }
    //   )
    // }
    // else{
    //   this.getProducts();
    // }
  }



  //pagination functions
  onTableDataChange(event: any) {
    this.page = event;
    this.getProducts();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProducts();
  }
}
