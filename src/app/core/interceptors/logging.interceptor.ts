import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  /*things that can be done here using interceptor 
  1) formatting request & response as per requirement
  2) manipulate headers
     -Authentication/authorization
  */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok: string;
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        (error: HttpErrorResponse) => (ok = `failed (  ${error.message})`)
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  }
}
