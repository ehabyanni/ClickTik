import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(
    private http: HttpClient
  ) { }



  public _url = 'https://dummyjson.com/products/search?q=';


  //show all movies
  searchProducts(prodName: any): Observable<any> {
    return this.http.get(this._url + prodName);
  }
}
