import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Moment from 'moment';

import { AccountService } from '../account.service';
import { BlogPostService } from '../blog-post.service';
import { CommentService } from '../comment.service';
import { Account } from '../account';
import { BlogPost } from '../blog-post';
import { Comment } from '../comment';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  private clientAccountId: string;

  private blogPost: BlogPost;
  private blogPostAuthor: Account;

  private comments: Comment[];
  private commentAuthors: Account[];
  private commentsLoaded: boolean;
  private commentAuthorsLoaded: boolean;
  private page: number;
  private pageUpdating: boolean;

  private canUpdate: boolean;

  private body: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private blogPostService: BlogPostService,
    private commentService: CommentService) { }

  ngOnInit() {
    if (localStorage.getItem('account_id'))
      this.clientAccountId = localStorage.getItem('account_id');

    this.blogPost = new BlogPost();
    this.comments = new Array<Comment>();
    this.commentAuthors = new Array<Account>();
    this.blogPostAuthor = new Account();
    this.page = 0;
    this.pageUpdating = false;

    this.commentsLoaded = false;
    this.commentAuthorsLoaded = false;

    this.getBlogPost();
  }

  private getBlogPost () : void {
    this.blogPostService.retrieve(this.route.snapshot.paramMap.get('id'))
    .then((blogPost: BlogPost) => {
      this.blogPost = blogPost;
      if (this.blogPost.getAccountId() == localStorage.getItem('account_id'))
        this.canUpdate = true;
      else
        this.canUpdate = false;
    })
    .then(() => this.accountService.retrieve(this.blogPost.getAccountId()))
    .then((account: Account) => {
      this.blogPostAuthor = account;
    })
    .then(() => this.getComments());
  }

  private getComments () : void {
    this.comments = new Array<Comment>();
    this.commentService.listByBlogPost(this.blogPost.getId(), this.page)
    .then((comments: Comment[]) => {
      this.comments = comments;
      this.commentsLoaded = true;
    })
    .catch((err: number) => {
      switch (err) {
        case 1:
          break;
        default:
      }
    })
    .then(() => this.getCommentAuthors());
  }

  private getCommentAuthors () : void {
    this.commentAuthors = new Array<Account>();
    this.comments.forEach((comment: Comment) => {
      this.accountService.retrieve(comment.getAccountId())
      .then((account: Account) => {
        this.commentAuthors.push(account);
      });
    });
    this.commentAuthorsLoaded = true;
  }

  private next () : void {
    if (this.pageUpdating) return;
    else this.pageUpdating = true;
    this.commentService.listByBlogPost(this.blogPost.getId(), this.page + 1)
    .then((comments: Comment[]) => {
      this.comments = comments;
      this.page += 1;
      this.pageUpdating = false;
    })
    .catch((err: number) => {
      this.pageUpdating = false;
      switch (err) {
        case 1:
          break;
        default:
      }
    })
    .then(() => this.getCommentAuthors());
  }

  private previous () : void {
    if (0 || this.pageUpdating) return;
    this.pageUpdating = true;
    this.commentService.listByBlogPost(this.blogPost.getId(), this.page - 1)
    .then((comments: Comment[]) => {
      this.pageUpdating = false;
      this.comments = comments;
      this.page -= 1;
    })
    .catch((err: number) => {
      this.pageUpdating = false;
      switch (err) {
        case 1:
          break;
        default:
      }
    })
    .then(() => this.getCommentAuthors());
  }

  private submit () : void {
    this.commentService.create(this.body, this.blogPost.getId())
    .then((result: number) => {
      this.getComments();
    })
    .catch((err: number) => {
      switch (err) {
        case 1:
          this.errorTitle = 'Unauthorized!';
          this.errorMessage = 'You must be logged in to submit a comment.';
          break;
        case 2:
          this.errorTitle = 'Database conflict!';
          this.errorMessage = 'The comment service is currently unavailable, please try again later.';
          break;
        case 3:
          this.errorTitle = 'Invalid input!';
          this.errorMessage = 'You must enter a comment to submit a comment.';
          break;
        case 4:
          this.errorTitle = 'Invalid input!';
          this.errorMessage = 'You must enter a comment to submit a comment.';
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

}
