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
      0
    failure
      1: unauthorized
      2: database conflict
      3: invalid input
      4: server error
  */
  public create (body: string, blog_post_id: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url;
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

      let data: any = {
        body: body,
        blog_post_id: blog_post_id
      }

      this.http.post<iComment[]>(url, data, httpOptions)
      .subscribe(
        (res: HttpResponse<iComment[]>) => {
          resolve(0);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              reject(1);
              break;
            case 409:
              reject(2);
              break;
            case 422:
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
      0
    failure
      1: unauthorized
      2: comment not found
      3: client does not own comment
      4: database conflict
      3: server error
  */
  public update (id: string, body: string) : Promise<number> {
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

      let data: any = {
        body: body
      }

      this.http.post<iComment[]>(url, data, httpOptions)
      .subscribe(
        (res: HttpResponse<iComment[]>) => {
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
            case 404:
              reject(3);
              break;
            case 409:
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
      comment[]
    failure
      1: no comments found
      2: server error
  */
  public listByAccount (id: string, page?: number) : Promise<Comment[]> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/account/' + id;
      if (page)
        url += '?page=' + page;
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

  /*
    success:
      comment[]
    failure
      1: no comments found
      2: server error
  */
  public listByBlogPost (id: string, page?: number) : Promise<Comment[]> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/blog-post/' + id;
      if (page) url += '?page=' + page;
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
