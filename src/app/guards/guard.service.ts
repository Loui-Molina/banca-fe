import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {MockUserService} from "../services/user.service";

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private userService: MockUserService) {
  }

  // TODO REFACTOR INTO ACTUAL USER AFTER PROTO IS DONE
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles: string[] = route.data.requiredRoles;

    return this.userService
      .isLogged()
      .then(isLogged => (isLogged && (!requiredRoles || requiredRoles.length < 1 || this.userService.checkRoles(requiredRoles))))
      .catch(reason => {
        console.log(reason);
        return false;
      })
  }


}
