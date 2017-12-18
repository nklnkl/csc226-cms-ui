import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Session } from './session';

interface SessionBody {
  session_id?: string;
  created?: number;
  updated?: number;
  account_id?: string;
}

@Injectable()
export class SessionService {

  private url: string = 'http://45.55.65.220:10010/api/session';

  constructor(private http: HttpClient) { }

  /*
    success:
      0: new session set
    failure
      1: user input error
      2: account inactive
      3: server error
  */
  public register (email: string, password: string) : Promise<number> {
    return new Promise((resolve, reject) => {
      let body: any = {
        email: email,
        password: password
      }

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.post<SessionBody>(this.url, body, httpOptions)
      .subscribe(
        (res: HttpResponse<SessionBody>) => {
          localStorage.setItem('account_id', res.body.account_id);
          localStorage.setItem('session_id', res.body.session_id);
          resolve(0)
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              return reject(1);
            case 403:
              return reject(2);
            default:
              return reject(3);
          }
        }
      );

    });
  }

  /*
    success:
      0
    failure
      1: not authorized
      2: session not found
      3: no permission
      4: server error
  */
  public delete (id: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.delete<SessionBody>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<SessionBody>) => {
          resolve(0)
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              reject(1);
              break;
            case 404:
              reject(2);
              break;
            case 403:
              reject(3);
              break;
            default:
              reject(4);
          }
        }
      );

    });
  }

}
