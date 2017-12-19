import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlogPostService } from '../blog-post.service';

@Component({
  selector: 'app-blog-post-form',
  templateUrl: './blog-post-form.component.html',
  styleUrls: ['./blog-post-form.component.css']
})
export class BlogPostFormComponent implements OnInit {

  private title: string;
  private body: string;
  private privacy: number;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private blogPostService: BlogPostService,
    private router: Router
  ) { }

  ngOnInit() {
    this.privacy = 1;
  }

  private submit () {
    this.blogPostService.submit(this.title, this.body, this.privacy)
    .then((id: string) => {
      this.router.navigate(['/blog-post/update/' + id]);
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
          this.errorMessage = 'You are not allowed to submit a post due to deactivation.'
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
    })
  }

}
