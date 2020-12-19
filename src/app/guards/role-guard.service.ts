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

    if (!requiredRoles || requiredRoles.length < 1) {
      console.log('No required roles')
      return true;
    }

    if (this.userService.checkRoles(requiredRoles)) {
      console.log('Has required roles')
      return true;
    }
    console.log('Missing required roles')
    return false;
  }


}
