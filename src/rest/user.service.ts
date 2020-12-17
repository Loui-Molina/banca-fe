import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {FetchService} from './FetchService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  _id?: string;
  name?: string;
  username?: string;
  password?: string;
  creationDate?: Date;
  creationUserId?: string;
  modificationDate?: Date;
  modificationUserId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements FetchService {
  constructor(private http: HttpClient) {
  }

  uri = environment.urlApi + 'users/';

  getAll(): Observable<any> {
    return  this.http.get<any>(this.uri + 'all');
  }

  get(id: string): Observable<User> {
    return  this.http.get<User>(this.uri + 'get/' + id);
  }

  getFiltered(q: string, value: any): Observable<User[]> {
    return this.http.get<User[]>(this.uri + `search?q=${q}&value=${value}`);
  }

  save(item: User): Observable<User> {
    return  this.http.post<User>(this.uri + 'save', item);
  }

  delete(id: string): Observable<Response> {
    return  this.http.delete<Response>(this.uri + 'delete/' + id);
  }
}
