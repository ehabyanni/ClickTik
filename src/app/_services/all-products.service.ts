import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../_interfaces/IProduct';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AllProductsService {

  baseURL: string = "";

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl;
  }


  productsURL: string = "products";
  categoryURL: string = "category"


  //show all products
  getAllProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseURL + `${this.productsURL}`);
  }

  getOneProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.baseURL + `${this.productsURL}/${id}`).pipe(
      catchError(
        (err) => {
          return throwError(() => err.statusText || "Internal Server Error")
        }
      )
    )
  }

  getAllProductslimit(limit: number, skip: number): Observable<any> {
    return this.http.get(this.baseURL + `${this.productsURL}?limit=${limit}&skip=${skip}`);
  }


  getProductsByCategory(categoryName: string): Observable<any> {
    return this.http.get(this.baseURL + `${this.productsURL}/${this.categoryURL}/${categoryName}`);
  }
}
