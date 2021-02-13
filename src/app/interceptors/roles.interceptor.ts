import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import {UserInterface, UserService} from '../services/user.service';
import jwtDecode from 'jwt-decode';
import {AuthService, DefaultService} from 'local-packages/banca-api';
import {catchError, retry, switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RolesInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private defaultService: DefaultService, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiToken = this.userService.getApiToken();

        if (!apiToken || req.url.indexOf('assets') !== -1){
          return next.handle(req);
        }
        const user: UserInterface = jwtDecode(apiToken);
        const expiredAt = user && user.exp * 1000;
        if (req.url.indexOf('api/auth/refresh-token') !== -1){
          // Is refreshing
          const refreshToken = this.userService.getRefreshToken();
          const customRequestRefresh = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + refreshToken) });
          return next.handle(customRequestRefresh).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                // localStorage.clear();
                // window.location.replace(window.location.origin);
                return throwError(error);
              }
              return throwError(error);
            })
          );
        }
        if (!(user && expiredAt > new Date().getTime())) {
          // EXPIRED
          return this.authService.authControllerGetToken().pipe(
            switchMap((data) => {
              const newToken = data.accessToken;
              localStorage.setItem('accessToken', newToken);
              const customRequestTryAgain = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + newToken) });
              return next.handle(customRequestTryAgain);
            }),
          );
        }
        const customRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + apiToken) });
        return next.handle(customRequest);
    }
}
