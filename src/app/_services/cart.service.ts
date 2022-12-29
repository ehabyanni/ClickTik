import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseURL: string = "";

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl;
  }

  getUserCart(userId:number):Observable<any>{
    return this.http.get(this.baseURL+`carts/user/${userId}`);
  }
}
