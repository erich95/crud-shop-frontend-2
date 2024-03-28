import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const expirationTime = parseInt(localStorage.getItem('expirationTime')!)
    if (Date.now() > expirationTime) {
      localStorage.clear();
    }
    if (token !== null && token!.length > 0) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
          });
          return next.handle(authReq);
    }
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];