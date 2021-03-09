import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import jwtDecode from 'jwt-decode';
import {AuthService, SignInCredentialsDto, User} from '../../../local-packages/banca-api';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export interface UserInterface {
  username: string;
  role: User.RoleEnum;
  iat: number;
  exp: number;
}

@Injectable({providedIn: 'root'})
export class JWTUserService implements UserService {


  constructor(private authService: AuthService) {
  }

  getLoggedUser(): UserInterface {
    const accessToken = this.getApiToken();
    if (!accessToken) {
      return;
    }
    /*TODO CHECK WHY THIS CODE IS COMMENTED*/
    // const user: UserInterface = jwtDecode(accessToken);
    return jwtDecode(accessToken);
    // const expiredAt = user && user.exp * 1000;
    // if (user && expiredAt > new Date().getTime()) {
    //
    // } else {
    //   // EXPIRED
    //   this.logout();
    //   return;
    // }
  }

  getApiToken(): string {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  checkRoles(requiredRoles: User.RoleEnum[]): boolean {
    const loggedUser: UserInterface = this.getLoggedUser();
    return loggedUser ? requiredRoles.includes(loggedUser.role) : false;
  }

  isLogged(): boolean {
    const loggedUser: UserInterface = this.getLoggedUser();
    return !!loggedUser;
  }

  async login(username: string, password: string): Promise<Subscription> {
    const promise = await this.authService.authControllerSingIn({username, password} as SignInCredentialsDto)
      .toPromise()
      .catch(reason => {
        throw new HttpErrorResponse(reason);
      });
    if (promise && promise.accessToken) {
      localStorage.setItem('accessToken', promise.accessToken);
      localStorage.setItem('refreshToken', promise.refreshToken);
    }
    return promise;
  }

  logout(): void {
    localStorage.clear();
  }

}

export abstract class UserService {
  abstract logout(): void;

  abstract getLoggedUser(): UserInterface;

  abstract getApiToken(): string;

  abstract getRefreshToken(): string;

  abstract isLogged(): boolean;

  abstract checkRoles(requiredRoles: User.RoleEnum[]): boolean ;

  abstract login(username: string, password: string): Promise<Subscription>;
}
