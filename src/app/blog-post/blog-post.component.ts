import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Moment from 'moment';

import { AccountService } from '../account.service';
import { BlogPostService } from '../blog-post.service';
import { CommentService } from '../comment.service';
import { Account } from '../account';
import { BlogPost } from '../blog-post';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  private blogPost: BlogPost;
  private account: Account;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private blogPostService: BlogPostService,
    private commentService: CommentService) { }

  ngOnInit() {
    this.blogPost = new BlogPost();
    this.getBlogPost();
  }

  private getBlogPost () : void {
    this.blogPostService.retrieve(this.route.snapshot.paramMap.get('id'))
    .then((blogPost: BlogPost) => {
      this.blogPost = blogPost;
    })
    .then(() => this.accountService.retrieve(this.blogPost.getAccountId()))
    .then((account: Account) => {
      this.account = account;
    });
  }

}
