import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {FetchService} from './FetchService';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Account {
  id?: string;
  name?: string;
  balance?: number;
  address?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService implements FetchService {
  constructor(private http: HttpClient) {
  }

  uri = 'https://run.mocky.io/v3/2b395aaa-494c-4df2-98f6-1d1259c8d5fb';

  getAll(): Observable<Account[]> {
    return  this.http.get<Account[]>(this.uri);
  }

  get(id: string): Observable<Account> {
    return  this.http.get<Account>(this.uri + '/' + id);
  }

  save(item: Account): Observable<Account> {
    return  this.http.post<Account>(this.uri, item);
  }

  delete(id: string): Observable<Response> {
    return  this.http.delete<Response>(this.uri + '/' + id);
  }
}
