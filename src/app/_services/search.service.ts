import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http : HttpClient
  ) { }


  public _url = 'https://dummyjson.com/products/search?q=phone';


  //show all movies
  getAllProducts():Observable<any>{
    return this.http.get(this._url);
  }
}
