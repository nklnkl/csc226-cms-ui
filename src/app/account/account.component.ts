import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';
import { BlogPostService } from '../blog-post.service';
import { CommentService } from '../comment.service';
import { Account } from '../account';
import { BlogPost } from '../blog-post';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private account: Account;
  private blogPosts: BlogPost [];
  private comments: Comment [];

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  private canUpdate: boolean;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private blogPostService: BlogPostService,
    private commentService: CommentService
  ) {
    this.account = new Account();
    this.blogPosts = [];
    this.comments = [];
  }

  ngOnInit() {
    this.canUpdate = false;
    this.error = false;
    this.getAccount(this.route.snapshot.paramMap.get('id'));
    this.getBlogPosts(this.route.snapshot.paramMap.get('id'));
    this.getComments(this.route.snapshot.paramMap.get('id'));

    this.route.params.subscribe((params) => {
      let id: string = params['id'];
      this.getAccount(id);
      this.getBlogPosts(id);
      this.getComments(id);
    });
  }

  private getAccount (id: string) : void {
    this.accountService.retrieve(id)
    .then((account: Account) => {
      this.error = false;
      this.account = account;
      // If account is owned or client is admin, show update nav link.
      if (localStorage.getItem('account_id') == this.account.getId())
        this.canUpdate = true;
      else
        this.canUpdate = false;
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Client error!';
          this.errorMessage = 'The account was not found.';
          break;
        case 2:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'This account is deactivated and can not be retrieved.';
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

  private getBlogPosts (id: string) : void {
    this.blogPosts = [];
    this.blogPostService.list(id)
    .then((blogPosts: BlogPost[]) => {
      this.blogPosts = blogPosts;
    })
    .catch((err: number) => {
      switch (err) {
        case 1:
          console.log('no blog posts found for ' + id);
          break;
        default:
      }
    });
  }

  private getComments (id: string) : void {
    this.comments = [];
    this.commentService.listByAccount(id)
    .then((comments: Comment[]) => {
      this.comments = comments;
    })
    .catch((err: number) => {
      switch (err) {
        case 1:
          console.log('no comments found for ' + id);
          break;
        default:
      }
    });
  }

}
