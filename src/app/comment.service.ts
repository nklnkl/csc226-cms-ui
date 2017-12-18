import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Comment } from './comment';

interface iComment {
  id?: string;
  created?: number;
  updated?: number;
  account_id?: string;
  blog_post_id?: string;
  body?: string;
}

@Injectable()
export class CommentService {

  private url: string = 'http://45.55.65.220:10010/api/comment';

  constructor(private http: HttpClient) { }

  /*
    success:
      account
    failure
      1: no comments found
      2: server error
  */
  public listByAccount (id: string) : Promise<Account> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/account/' + id;
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

      this.http.get<iComment[]>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iComment[]>) => {
          let comments: Comment[] = [];
          res.body.forEach((blogPost: iComment) => {
            comments.push(new Comment(blogPost));
          })
          resolve(comments);
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
