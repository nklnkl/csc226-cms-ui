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

  private page: number;
  private pageUpdating: boolean;

  private canUpdate: boolean;

  constructor(private blogPostService: BlogPostService,
  private accountService: AccountService) { }

  ngOnInit() {
    this.blogPosts = [];
    this.usernames = [];
    this.page = 0;
    this.pageUpdating = false;

    this.blogPostService.list(undefined, this.page)
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

  private next () : void {
    if (this.pageUpdating) return;
    else this.pageUpdating = true;
    this.blogPostService.list(undefined, this.page + 1)
    .then((blogPosts: BlogPost[]) => {
      this.blogPosts = blogPosts;
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
    });
  }

  private previous () : void {
    if (0 || this.pageUpdating) return;
    this.pageUpdating = true;
    this.blogPostService.list(undefined, this.page - 1)
    .then((blogPosts: BlogPost[]) => {
      this.pageUpdating = false;
      this.blogPosts = blogPosts;
      this.page -= 1;
    })
    .catch((err: number) => {
      this.pageUpdating = false;
      switch (err) {
        case 1:
          break;
        default:
      }
    });
  }


}
