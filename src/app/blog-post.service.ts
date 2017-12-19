import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
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
      0
    failure
      1: unauthorized
      2: account is inactive
      3: invalid or missing input
      4: duplicated account title for account
      5: server error
  */
  public submit (title: string, body: string, privacy: number) : Promise<string> {
    return new Promise((resolve, reject) => {

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      let data: any = {
        title: title,
        body: body,
        privacy: privacy
      };

      this.http.post<iBlogPost>(this.url, data, httpOptions)
      .subscribe(
        (res: HttpResponse<iBlogPost>) => {
          resolve(res.body.id);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 401:
              reject(1);
              break;
            case 403:
              reject(2);
              break;
            case 422:
              reject(3);
            case 409:
              reject(4);
            default:
              reject(5);
          }
        }
      );

    });
  }

  /*
    success:
      BlogPost
    failure
      1: no blog posts found
      2: client not allowed to see blog pst.
      3: server error
  */
  public retrieve (id: string) : Promise<BlogPost> {
    return new Promise((resolve, reject) => {
      let url: string = this.url + '/' + id;
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.get<iBlogPost>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iBlogPost>) => {
          resolve(new BlogPost(res.body));
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 404:
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
      1: unauthorized
      2: client is not owner or admin
      3: blog post not found and not updated
      4: duplicated account title for blog post
      5: server error
  */
  public update (id: string, title: string, body: string, privacy: number) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      let data: any = {
        title: title,
        body: body,
        privacy: privacy
      };

      this.http.patch<iBlogPost>(url, data, httpOptions)
      .subscribe(
        (res: HttpResponse<iBlogPost>) => {
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
      2: client is not owner or admin
      3: blog post not found
      4: duplicated account title for blog post
      5: server error
  */
  public delete (id: string) : Promise<number> {
    return new Promise((resolve, reject) => {

      let url: string = this.url + '/' + id;

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.delete<iBlogPost>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iBlogPost>) => {
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
            default:
              reject(4);
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
    return new Promise((resolve, reject) => {

      let url = this.url;
      if (account_id)
        url += ('?account_id=' + account_id);

      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('Content-Type','application/json');
      if (localStorage.getItem('account_id'))
        headers = headers.append('account_id', localStorage.getItem('account_id'));
      if (localStorage.getItem('session_id'))
        headers = headers.append('session_id', localStorage.getItem('session_id'));
      let httpOptions: any = {
        headers: headers,
        observe: 'response',
        responseType: 'json'
      };

      this.http.get<iBlogPost[]>(url, httpOptions)
      .subscribe(
        (res: HttpResponse<iBlogPost[]>) => {
          let blogPosts: BlogPost[] = [];
          res.body.forEach((blogPost: iBlogPost) => {
            blogPosts.push(new BlogPost(blogPost));
          })
          resolve(blogPosts);
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
