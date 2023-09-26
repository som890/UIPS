import {
  HttpErrorResponse,
HttpEvent,
HttpHandler,
HttpInterceptor,
HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(private userAuthService: UserAuthService,
  private router:Router) {}

intercept(
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {
  if (req.headers.get('No-Auth') === 'True') {
    return next.handle(req.clone());
  }

  const token = this.userAuthService.getToken();

  if(token)
  {
    req = this.addToken(req, token);
  }
  console.log(req);

  return next.handle(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Kiểm tra xem có status code không
        console.log(err.status);

        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
      } else {
        console.error('Lỗi không phải là HttpErrorResponse:', err);
      }

      return throwError("Some thing is wrong");
    })
  );
}


private addToken(request:HttpRequest<any>, token:string) {
    return request.clone(
        {
            setHeaders: {
                Authorization : `Bearer ${token}`
            }
        }
    );
}

}