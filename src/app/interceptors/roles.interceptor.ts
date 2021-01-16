import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserInterface, UserService} from '../services/user.service';
import jwtDecode from 'jwt-decode';
import {DefaultService} from '../../../local-packages/banca-api';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RolesInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private defaultService: DefaultService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiToken = this.userService.getApiToken();
        const isLogged = this.userService.isLogged();

        if (!apiToken || !isLogged){
          return next.handle(req);
        }
        const user: UserInterface = jwtDecode(apiToken);
        const expiredAt = user && user.exp * 1000;
        if (req.url.indexOf('api/auth/refreshToken') !== -1){
          // Is refreshing
          const refreshToken = this.userService.getRefreshToken();
          const customRequestRefresh = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + refreshToken) });
          return next.handle(customRequestRefresh);
        }
        if (!(user && expiredAt > new Date().getTime())) {
          // EXPIRED
          return this.defaultService.authControllerGetToken().pipe(
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
