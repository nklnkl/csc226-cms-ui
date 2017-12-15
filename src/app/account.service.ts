import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }


  public register (): Observable<> {

  }
}
