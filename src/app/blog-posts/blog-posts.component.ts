import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../blog-post.service';
import { AccountService } from '../account.service';
import { BlogPost } from '../blog-post';
import { Account } from '../account';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {

  private blogPosts: BlogPost[];
  private usernames: string[];

  constructor(private blogPostService: BlogPostService,
  private accountService: AccountService) { }

  ngOnInit() {
    this.blogPosts = [];
    this.usernames = [];

    this.blogPostService.list()
    .then((blogPosts: BlogPost[]) => {

      this.blogPosts = blogPosts;

      this.blogPosts.forEach((blogPost: BlogPost) => {
        this.accountService.retrieve(blogPost.getAccountId())
        .then((account: Account) => {
          this.usernames.push(account.getUsername());
        });
      });

    });
  }

}
