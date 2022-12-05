import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'https://dummyjson.com/auth/login';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'login', {
      email: email,
      password: password
    }, httpOptions);
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(AUTH_API + 'register', {
      name: name,
      email: email,
      password: password
    })
  }
}
