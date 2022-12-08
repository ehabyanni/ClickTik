import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AllCategoriesService } from '../_services/all-categories.service';
import { AllProductsService } from '../_services/all-products.service';
import { SearchServiceService } from '../_services/search-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private categoryService: AllCategoriesService,
    private productService: AllProductsService,
    private searchService : SearchServiceService
  ) { }


  @ViewChild(HeaderComponent) searchFunc!: HeaderComponent;

  allCategories: any = [];
  allProducts: any = [];

  //products that will be displayed
  displayProducts: any = [];

  //for category selection result
  productsOfCategory: any = [];

  //search word
  searchWord: any;
  notSearching:boolean = true;


  //pagination variables
  currentPage: number = 1;
  total: number = 1;
  skip: number = 0;
  limit: number = 30;
  totalPages: number = 1;
  totalPagesArray: any = [];


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

  //after header component to be loaded completely
  ngAfterViewInit() {
    this.searchFunc.headerSearchToHome.subscribe(
      data => {
        this.searchWord = data;
        if (this.searchWord != null || this.searchWord != undefined || this.searchWord.length > 0) {
          // this.productService.getAllProducts().subscribe(
          //   dataCollection => {
          //     console.log(this.searchWord);
          //     this.allProducts = dataCollection.products.filter((p: any) => {
          //       return p.title.toLowerCase().includes(this.searchWord.toLowerCase());
          //     });
          //     this.displayProducts = this.allProducts;
          //   }
          // )
          this.searchService.searchProducts(this.searchWord).subscribe(
            dataCollection => {
              this.allProducts = dataCollection.products;
              this.displayProducts = this.allProducts;
            }
          )
        }
        else {
          console.log("test test asfoury test test");
          this.getProducts();
        }
      }
    );
  }



  //get all products function
  getProducts() {
    this.productService.getAllProductslimit(this.limit, this.skip).subscribe(
      data => {
        this.limit = data.limit;
        this.total = data.total;
        this.skip = data.skip;
        this.totalPages = Math.ceil(this.total / this.limit);
        let newSkip = 30;
        for (let i = 1; i <= this.totalPages; i++) {
          this.totalPagesArray.push({
            page: i,
            skip: this.skip
          });

          this.skip = this.skip + newSkip;
        }
        this.allProducts = data.products;
        this.displayProducts = this.allProducts;
      }
    )
  }

  //pagination
  getPageProducts(pageValue: any, skipValue: any) {
    this.currentPage = pageValue;
    window.scrollTo({top:0 , behavior: 'smooth'});
    this.productService.getAllProductslimit(this.limit, skipValue).subscribe(
      data => {
        this.allProducts = data.products;
        this.displayProducts = this.allProducts;
      }
    )
  }


  categoriesCheckBoxes: any = [];
  categoriesProducts: any = [];

  //show products by category

  showCategory(event: any) {
    //get the category has been selected
    var categorySelected = event.target.value;
    //check if category name exists in array or not
    //if not exists
    if (this.categoriesCheckBoxes.includes(categorySelected) == false) {
      this.categoriesCheckBoxes.push(categorySelected);
      //loop on array to send the category name to the method and store its products
      for (let i = 0; i < this.categoriesCheckBoxes.length; i++) {
        var name = this.categoriesCheckBoxes[i];
        //empty the array for the iteration
        this.categoriesProducts = [];
        //get the products
        this.productService.getProductsByCategory(name).subscribe(
          data => {
            this.categoriesProducts = [...this.categoriesProducts, ...data.products];
            this.displayProducts = this.categoriesProducts;
          }
        )
      }
    }
    //if exists
    else {
      //get the index of the category name
      var eleIndex = this.categoriesCheckBoxes.indexOf(categorySelected);
      //delete this category name
      this.categoriesCheckBoxes.splice(eleIndex, 1);
      console.log(this.categoriesCheckBoxes.length);
      //if checkboxes nothing checked
      if (this.categoriesCheckBoxes.length == 0) {
        this.categoriesProducts = [];
        this.currentPage = 1;
        this.total = 1;
        this.skip = 0;
        this.totalPages = 1;
        this.totalPagesArray = [];
        this.getProducts();
      }
      //if checkboxes still checked
      else {
        //loop on array to send the category name to the method and store its products
        for (let i = 0; i < this.categoriesCheckBoxes.length; i++) {
          var name = this.categoriesCheckBoxes[i];
          //empty the array for the iteration
          this.categoriesProducts = [];
          //get the products
          this.productService.getProductsByCategory(name).subscribe(
            data => {
              this.categoriesProducts = [...this.categoriesProducts, ...data.products];
              this.displayProducts = this.categoriesProducts;
            }
          )
        }
      }

    }

  }
}
