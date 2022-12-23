import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseURL: string = "";

  constructor(private http: HttpClient) {
    this.baseURL = environment.apiUrl;
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseURL + `auth/login`, {
      username: username,
      password: password
    }, httpOptions);
  }


  //check Authentication
  public isLoggedIn(): Observable<any> {
    let isAuth: boolean = false;
    const token = localStorage.getItem('authToken');
    if (token != null || undefined) {
      isAuth = true;
    }
    return of(isAuth);
  }

  public logout() {
    localStorage.clear();
  }
}
