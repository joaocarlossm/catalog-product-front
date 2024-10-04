import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export function AuthInterceptor(authService: AuthService, router: Router): HttpInterceptorFn {
  return (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
    const token = authService.getToken();
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned).pipe(
        tap(() => {
          router.navigate(['products']);
        })
      );
    } else {
      return next(req);
    }
  };
}
