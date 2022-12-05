import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllProductsService {

  constructor(
    private http : HttpClient
  ) { }


  public _url = 'https://dummyjson.com/products';


  //show all movies
  getAllProducts():Observable<any>{
    return this.http.get(this._url);
  }
}
