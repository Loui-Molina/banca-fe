import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import {User} from '@banca-api/model/user';

export interface UserInterface {
  username: string;
  role: User.RoleEnum;
  iat: number;
  exp: number;
}

@Injectable({providedIn: 'root'})
export class MockUserService implements UserService {

  getLoggedUser(): UserInterface {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : undefined;
  }

  getApiToken(): string {
    return localStorage.getItem('loggedUser');
  }

  getRefreshToken(): string {
    return localStorage.getItem('loggedUser');
  }

  checkRoles(requiredRoles: User.RoleEnum[]): boolean {
    const loggedUser: UserInterface = this.getLoggedUser();
    return loggedUser ? requiredRoles.includes(loggedUser.role) : false;
  }

  isLogged(): boolean {
    const loggedUser: UserInterface = this.getLoggedUser();
    return !!loggedUser;
  }

  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const actualUser = environment.users.find(value => value.username === username && value.password === password);
      if (actualUser) {
        const exp = new Date().getTime() + 3000;
        const userInterface: UserInterface = {
          username: actualUser.username,
          exp,
          iat: exp + 300,
          role: actualUser.role
        };
        localStorage.setItem('loggedUser', JSON.stringify(userInterface));
        resolve(JSON.stringify(userInterface));
      } else {
        reject('Invalid username or password');
      }
    });

  }

  logout(): void {
    localStorage.clear();
  }
}


@Injectable({providedIn: 'root'})
export class JWTUserService implements UserService {

  getLoggedUser(): UserInterface {
    const accessToken = this.getApiToken();
    if (!accessToken){
      return;
    }
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

  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = environment.urlApi + '/api/auth/sign-in';
      const myHeaders = new Headers({
        'Content-Type': 'application/json'
      });
      const myInit = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({username, password})
      };
      const myRequest = new Request(url, myInit);

      fetch(myRequest).then(response => response.json())
        .then(data => {
          if (data && data.accessToken){
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            resolve(data.accessToken);
          }
          reject(data.message);
        });
    });
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

  abstract login(username: string, password: string): Promise<string>;
}
