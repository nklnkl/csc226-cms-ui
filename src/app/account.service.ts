import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Account } from './account';

interface iAccount {
  id?: string;
  created?: number;
  updated?: number;
  status?: number;
  role?: number;
  email?: string;
  password?: string;
  username?: string;
  bio?: string;
  location?: string;
}

@Injectable()
export class AccountService {

  private url: string = 'http://45.55.65.220:10010/api/account';

  constructor(private http: HttpClient) { }

  /*
    success:
      0
    failure
      1: user input error
      2: duplicate error
      3: server error
  */
  public register (email: string, username: string, password: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url;
      let body: any = {
        email: email,
        username: username,
        password: password
      }
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type','application/json');
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.post<iAccount>(url, body, httpOptions)
      .subscribe(
        (res: HttpResponse<iAccount>) => {
          resolve(0)
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 422:
              reject(1);
              break;
            case 409:
              reject(2);
              break;
            default:
              reject(3);
          }
        }
      );

    });
  }

  /*
    success:
      account
    failure
      1: account not found
      2: account inactive, and not admin.
      3: server error
  */
  public retrieve (id: string) : Promise<Account> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.get<iAccount>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iAccount>) => {
          resolve(new Account(res.body));
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 200:
              break;
            case 404:
              reject(1);
              break;
            case 410:
              reject(2);
              break;
            default:
              reject(3);
          }
        }
      );

    });
  }

  /*
    success:
      0
    failure
      1: unauthorized
      2: no permission
      3: duplication error
      4: account not updated because not found
      5: server error
  */
  public update (update: any, id: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;
      let body: any = {};
      if (update.email)
        body.email = update.email;
      if (update.password)
        body.password = update.password;
      if (update.username)
        body.username = update.username;
      if (update.bio)
        body.bio = update.bio;
      if (update.location)
        body.location = update.location;
      if (update.status)
        body.status = update.status;

      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.patch<iAccount>(url, body, httpOptions)
      .subscribe(
        (res: HttpResponse<iAccount>) => {
          resolve(0);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              reject(1);
              break;
            case 403:
              reject(2);
              break;
            case 409:
              reject(3);
              break;
            case 404:
              reject(4);
              break;
            default:
              reject(5);
          }
        }
      );

    });
  }

  /*
    success:
      0
    failure
      1: unauthorized
      2: no permission
      3: account not deleted because not found
      4: server error
  */
  public delete (id: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;

      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.delete<iAccount>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iAccount>) => {
          resolve(0);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 200:
              resolve(0);
              break;
            case 401:
              reject(1);
              break;
            case 403:
              reject(2);
              break;
            case 404:
              reject(3);
              break;
            default:
              reject(4);
          }
        }
      );

    });
  }

  /*
    success:
      accounts
    failure
      1: account(s) not found
      2: server error
  */
  public list (username?: string, page?: number) : Promise<Account> {
    return new Promise((resolve, reject) => {

      let url: string = this.url;
      if (username)
        url += ('?username' + username);
      if (page)
        url += ('&page' + page);
      let headers: HttpHeaders = new HttpHeaders();
      headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.get<iAccount[]>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iAccount[]>) => {
          let accounts: Account[] = [];
          res.body.forEach((account: iAccount) => {
            accounts.push(new Account(account));
          })
          resolve(accounts);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 404:
              reject(1);
              break;
            default:
              reject(2);
          }
        }
      );

    });
  }
}
