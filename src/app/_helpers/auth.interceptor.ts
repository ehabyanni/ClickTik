import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler):
    Observable<HttpEvent<any>> {
    {
      const token = localStorage.getItem('authToken');

      if (token != null) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });

      }
      console.log(request);
      return next.handle(request);
    }

  }
}
