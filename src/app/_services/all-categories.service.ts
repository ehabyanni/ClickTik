import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../_interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  constructor(
    private http : HttpClient
  ) { }

  
  public _url = 'https://dummyjson.com/products/categories';


  //show all movies
  getAllCategories():Observable<ICategory>{
    return this.http.get<ICategory>(this._url);
  }
}

