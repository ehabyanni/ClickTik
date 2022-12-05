import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  constructor(
    private http : HttpClient
  ) { }

  
  public _url = 'https://dummyjson.com/products/categories';


  //show all movies
  getAllCategories():Observable<any>{
    return this.http.get(this._url);
  }
}

