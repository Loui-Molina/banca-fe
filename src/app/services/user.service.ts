import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {User, UserRole} from '../../../local-packages/banca-api';



@Injectable({providedIn: 'root'})
export class MockUserService implements UserServiceI {

  getLoggedUser(): User {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(atob(user)) : undefined;
  }

  checkRoles(requiredRoles: UserRole[]): boolean {
    const loggedUser: User = this.getLoggedUser();
    return loggedUser ? requiredRoles.includes(loggedUser.role) : false;
  }

  isLogged(): boolean {
    const loggedUser: User = this.getLoggedUser();
    return !!loggedUser;
  }

  login(username: string, password: string): void {
    const actualUser = environment.users.find(value => value.username === username && value.password === password);
    if (actualUser) {
      localStorage.setItem('loggedUser', btoa(JSON.stringify(actualUser)));
    }
  }

  logout(): void {
    localStorage.clear();
  }
}

export abstract class UserServiceI {
  abstract logout(): void;

  abstract isLogged(): boolean;

  abstract checkRoles(requiredRoles: UserRole[]): boolean ;

  abstract login(username: string, password: string): void;
}
