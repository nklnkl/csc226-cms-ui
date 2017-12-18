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
    this.error = false;
    this.getAccount();
    this.getBlogPosts();
    this.getComments();
  }

  private getAccount () : void {
    this.accountService.retrieve(this.route.snapshot.paramMap.get('id'))
    .then((account: Account) => {
      this.error = false;
      this.account = account;
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

  private getBlogPosts () : void {
    this.blogPostService.list(this.route.snapshot.paramMap.get('id'))
    .then((blogPosts: BlogPost[]) => {
      this.blogPosts = blogPosts;
    });
  }

  private getComments () : void {
    this.commentService.listByAccount(this.route.snapshot.paramMap.get('id'))
    .then((comments: Comment[]) => {
      this.comments = comments;
    });
  }

}
