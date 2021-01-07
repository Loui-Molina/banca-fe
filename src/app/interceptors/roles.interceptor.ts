import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserInterface, UserService} from '../services/user.service';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class RolesInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiToken = this.userService.getApiToken();
        if (!apiToken){
          return next.handle(req);
        }
        const user: UserInterface = jwtDecode(apiToken);
        const expiredAt = user && user.exp * 1000;
        if (!(user && expiredAt > new Date().getTime())) {
          // EXPIRED
          localStorage.clear();
          window.location.reload();
          return;
        }
        const customRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + apiToken) });
        return next.handle(customRequest);
    }
}
