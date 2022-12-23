import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../_interfaces/ICategory';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {

  baseURL: string = "";

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl
  }


  //show all movies
  getAllCategories(): Observable<ICategory> {
    return this.http.get<ICategory>(this.baseURL + 'products/categories');
  }
}

