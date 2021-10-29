import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let AUTH_TOKEN=localStorage.getItem('authToken');
    console.log('Setting header..AUTH_TOKEN',AUTH_TOKEN);
    if(AUTH_TOKEN==null)
    return next.handle(request);
    else
    return next.handle(request.clone({setHeaders:{AUTH_TOKEN}}));
  }
}
