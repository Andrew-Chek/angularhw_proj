import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

interface HttpInterceptor {
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
}

export class AuthInterceptorService implements HttpInterceptor {
    constructor() {} 
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
  
    const token = window.localStorage.getItem('jwt_token')
     if (token) {
       // If we have a token, we set it to the header
       request = request.clone({
          headers: request.headers.set("Authorization", `Bearer ${token}`)
       });
    }
  
    return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
              // redirect user to the logout page
           }
        }
        return throwError(() => err);
      })
     )
    }
  }
