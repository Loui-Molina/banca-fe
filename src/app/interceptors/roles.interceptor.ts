import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {UserService} from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class RolesInterceptor implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiToken = this.userService.getApiToken();
        const customRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + apiToken) });
        return next.handle(customRequest);
    }
}
