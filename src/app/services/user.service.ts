import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {User} from "../../../local-packages/banca-api";

@Injectable({providedIn: "root"})
export class MockUserService implements UserServiceI {

  getLoggedUser(): User {
    let user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : undefined;
  }

  checkRoles(requiredRoles: string[]): boolean {
    let loggedUser: User = this.getLoggedUser();
    return loggedUser ? requiredRoles.includes(loggedUser.role) : false;
  }

  isLogged(): Promise<boolean> {
    let loggedUser: User = this.getLoggedUser();
    return Promise.resolve(!!loggedUser);
  }

  login(username: string, password: string) {
    const actualUser = environment.users.find(value => value.username === username && value.password === password);
    if (actualUser) localStorage.setItem('loggedUser', JSON.stringify(actualUser));
  }

  logout(): boolean {
    localStorage.removeItem('loggedUser')
    let loggedUser = localStorage.getItem('loggedUser');
    return !!loggedUser;
  }
}

export abstract class UserServiceI {
  abstract logout(): boolean;

  abstract isLogged(): Promise<boolean>;

  abstract checkRoles(requiredRoles: string[]): boolean ;

  abstract login(username: string, password: string): void;
}
