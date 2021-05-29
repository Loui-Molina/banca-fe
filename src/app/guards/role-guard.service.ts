import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {User} from '../../../local-packages/banca-api';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRoles: User.RoleEnum[] = route.data.requiredRoles;

    if (!requiredRoles || requiredRoles.length < 1) {
      console.log('No required roles');
      return true;
    }

    if (this.userService.checkRoles([...requiredRoles, User.RoleEnum.Sysadmin])) {
      return true;
    }

    this.router.navigate(['']);
    console.log('Missing required roles');
    return false;
  }
}
