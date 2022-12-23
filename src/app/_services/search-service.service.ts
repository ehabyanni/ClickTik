import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  baseURL:string = "";

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl;
   }

  //show all movies
  searchProducts(prodName: any): Observable<any> {
    return this.http.get(this.baseURL + `products/search?q=${prodName}`);
  }
}
