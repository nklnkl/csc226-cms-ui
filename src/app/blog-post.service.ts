import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { BlogPost } from './blog-post';

interface iBlogPost {
  id?: string;
  created?: number;
  updated?: number;
  account_id?: string;
  title?: string;
  body?: string;
  privacy?: number;
}

@Injectable()
export class BlogPostService {

  private url: string = 'http://45.55.65.220:10010/api/blog-post';

  constructor(private http: HttpClient) { }

  /*
    success:
      BlogPost  none
    failure
      0: unauthorized
      1: account is inactive
      2: invalid or missing input
      3: duplicated account title for account
      4: server error
  */
  public submit (title: string, body: string, privacy: string) : Promise<BlogPost> {
    return new Promise((resolve, reject) => {

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

      this.http.post<HttpResponse<iBlogPost>>(this.url, httpOptions).subscribe(

        (res: HttpResponse<iBlogPost>) => {
          switch (res.status) {
            case 200:
              reject();
              break;
            case 401:
              reject(0);
              break;
            case 403:
              reject(1);
              break;
            case 422:
              reject(2);
            case 409:
              reject(3);
            default:
              reject(4);
          }
        }

      );
    });
  }

  /*
    success:
      BlogPost
    failure
      0: no blog posts found
      1: client not allowed to see blog pst.
      2: server error
  */
  public retrieve (id: string) : Promise<BlogPost> {
    let url: string = this.url + '/' + id;

    return new Promise((resolve, reject) => {

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

      this.http.get<iBlogPost>(url, httpOptions).subscribe(

        (res: HttpResponse<iBlogPost>) => {
          switch (res.status) {
            case 200:
              resolve(new BlogPost(res.body));
              break;
            case 404:
              reject(0);
              break;
            case 403:
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
      BlogPost []
    failure
      0: no blog posts found
      1: server error
  */
  public list (account_id?: string) : Promise<BlogPost[]> {
    let url = this.url;
    if (account_id)
      url += ('?account_id=' + account_id);

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
      this.http.get<iBlogPost[]>(url, httpOptions).subscribe(

        (res: HttpResponse<iBlogPost[]>) => {
          switch (res.status) {
            case 200:
              let blogPosts: BlogPost[] = [];
              res.body.forEach((blogPost: iBlogPost) => {
                blogPosts.push(new BlogPost(blogPost));
              })
              resolve(blogPosts);
              break;
            case 404:
              reject(0);
              break;
            default:
              reject(1);
          }
        }

      );
    });
  }

}
