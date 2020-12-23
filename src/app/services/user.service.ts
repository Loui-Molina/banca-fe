import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {User} from "../../../local-packages/banca-api";

@Injectable({providedIn: "root"})
export class MockUserService implements UserServiceI {

  checkRoles(requiredRoles: string[]): boolean {
    let loggedUser: User = localStorage.getItem('loggedUser') as unknown as User;
    return loggedUser ? requiredRoles.includes(loggedUser.role) : false;
  }

  isLogged(): Promise<boolean> {
    let loggedUser = localStorage.getItem('loggedUser');
    return Promise.resolve(!!loggedUser);
  }

  login(username: string, password: string) {
    const actualUser = environment.users.find(value => value.username === username && value.password === password);
    if (actualUser) localStorage.setItem('loggedUser', actualUser.toString());
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
