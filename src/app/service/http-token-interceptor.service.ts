import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class HttpTokenInterceptorService implements HttpInterceptor {

constructor(private authService: AuthService) { }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // All HTTP requests are going to go through this method
       const authToken = this.authService.getToken();
       if (authToken) {
         request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + authToken)});
         
       }

       if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json')});
       }
      //  const pdfFlag = this.authService.getPDFFlag();
      //  if(pdfFlag) {
      //   request = request.clone({ headers: request.headers.set('Accept', 'application/pdf')});
      //  } else {
      //   request = request.clone({ headers: request.headers.set('Accept', 'application/json')});
      //  }
       return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }));
    }
}

