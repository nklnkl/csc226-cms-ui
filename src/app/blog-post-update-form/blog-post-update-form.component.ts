import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogPostService } from '../blog-post.service';
import { BlogPost } from '../blog-post';

@Component({
  selector: 'app-blog-post-update-form',
  templateUrl: './blog-post-update-form.component.html',
  styleUrls: ['./blog-post-update-form.component.css']
})
export class BlogPostUpdateFormComponent implements OnInit {

  private id: string;
  private title: string;
  private body: string;
  private privacy: number;

  private account_id: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getBlogPost(this.route.snapshot.paramMap.get('id'));
  }

  private getBlogPost (id: string) : void {
    this.blogPostService.retrieve(id)
    .then((blogPost: BlogPost) => {
      this.title = blogPost.getTitle();
      this.body = blogPost.getBody();
      this.privacy = blogPost.getPrivacy();
      this.id = blogPost.getId();
      this.account_id = blogPost.getAccountId();
    });
  }

  private delete () : void {
    this.blogPostService.delete(this.id)
    .then((result: number) => {
      this.router.navigate(['/account/' + this.account_id]);
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Unauthorized!';
          this.errorMessage = 'You must be logged in to delete a post.';
          break;
        case 2:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'You are not allowed to delete this post.'
          break;
        case 3:
          this.errorTitle = 'Not found!';
          this.errorMessage = 'The blog post was not found.'
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

  private update () : void {
    this.blogPostService.update(this.id ,this.title, this.body, this.privacy)
    .then((result: number) => {
      this.router.navigate(['/blog-post/' + this.id]);
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Unauthorized!';
          this.errorMessage = 'You must be logged in to submit a post.';
          break;
        case 2:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'You are not allowed to update this post.'
          break;
        case 3:
          this.errorTitle = 'Field error!';
          this.errorMessage = 'Invalid submission data, please check the input fields.'
          break;
        case 4:
          this.errorTitle = 'Duplication!';
          this.errorMessage = 'You can not submit a post with the same title of another post you already submitted.'
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

}
