import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { Session } from './session';

interface SessionBody {
  id?: string;
  created?: number;
  updated?: number;
  account_id?: string;
}

@Injectable()
export class SessionService {

  private url: string = 'http://45.55.65.220:10010/api/account';

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
      headers.append('Content-Type','application/json');
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.post<SessionBody>(this.url, body, httpOptions).subscribe(

        (res: HttpResponse<SessionBody>) => {
          switch (res.status) {
            case 200:
              localStorage.setItem('account_id', res.body.account_id);
              localStorage.setItem('session_id', res.body.id);
              resolve(0);
              break;
            case 401:
              reject(1);
              break;
            case 403:
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
      1: not authorized
      2: session not found
      3: no permission
      4: server error
  */
  public delete (id: string) : Promise<number> {
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

    return new Promise((resolve, reject) => {
      this.http.delete<SessionBody>(url, httpOptions).subscribe(

        (res: HttpResponse<SessionBody>) => {
          switch (res.status) {
            case 200:
              resolve(0);
              break;
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
