import { Account } from './../model/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';



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

  register(name: string, email: string, password: string, phone: string, address: string) {
    const body = {
      jsonrpc: '2.0',
      params: {
        values: {
          name: name,
          login: email,
          password: password,
          phone: phone,
          address: address
        }
      }
    };
    return this.http.post(`${environment.apiUrl}/users/register`, body)
      .pipe(map(response => {
        return response;
      }));
  }

  update(id: string, values: any) {
    const body = {
      jsonrpc: '2.0',
      params: {
        user_id: id,
        values: values
      }
    };
    return this.http.post(`${environment.apiUrl}/users/update/${id}`, body)
      .pipe(map(response => {
        return response
      }));
  }

  getAll() {
    return this.http.get<Account[]>(`${environment.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<Account>(`${environment.apiUrl}/users/${id}`);
  }
}
