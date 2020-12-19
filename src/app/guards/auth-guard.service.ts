import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {MockUserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: MockUserService) {
  }

  // TODO REFACTOR INTO ACTUAL USER AFTER PROTO IS DONE
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService
      .isLogged()
      .then(isLogged => {
        if (isLogged) {
          console.log('User logged in')
          return true
        } else {
          console.log('User not logged in')
          this.router.navigate(['login'])
          return false;
        }
      })
      .catch(reason => {
        console.log(reason);
        return false;
      })
  }

}
