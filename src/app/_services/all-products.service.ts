import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../_interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService {

  constructor(
    private http : HttpClient
  ) { }


  public _url = 'https://dummyjson.com/products';

  public _urlProduct = 'https://dummyjson.com/products/';

  public _urlcatProducts = 'https://dummyjson.com/products/category/';


  //show all products
  getAllProducts():Observable<IProduct>{
    return this.http.get<IProduct>(this._url);
  }

  getOneProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(this._urlProduct + `${id}`);
  }

  getAllProductslimit(limit:number , skip : number):Observable<any>{
    return this.http.get(this._url + `?limit=${limit}&skip=${skip}`);
  }


  getProductsByCategory(categoryName:string):Observable<any>{
    return this.http.get(this._urlcatProducts + `${categoryName}`);
  }
}
