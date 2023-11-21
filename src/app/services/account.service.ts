import { Account } from './../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSubject: BehaviorSubject<Account | null>;
  public user: Observable<Account | null>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  };

  public get userValue() {
    return this.userSubject.value;
  };

  public login(username: string, password: string) {
    const body = {
      jsonrpc: '2.0',
      params: {
        dbname: environment.dbName,
        email: username,
        password: password
      }
    };

    return this.http.post<Account>(`${environment.apiUrl}/users/authenticate`, body)
      .pipe(map(response => {
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  };

  register(user: Account) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.apiUrl}/users/update/${id}`, params)
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      }));
  }

  getAll() {
    return this.http.get<Account[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<Account>(`${environment.apiUrl}/users/${id}`);
  }
}
