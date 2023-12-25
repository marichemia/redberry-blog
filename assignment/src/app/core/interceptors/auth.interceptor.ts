import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  accessToken: string = 'cab8ec890098f8bcff0285be980d55593c0213e50bf4d558ad558524c1b877bf';

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.accessToken}`)
    })

    return next.handle(authReq);

  }
}
