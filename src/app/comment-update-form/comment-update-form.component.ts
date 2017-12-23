import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-update-form',
  templateUrl: './comment-update-form.component.html',
  styleUrls: ['./comment-update-form.component.css']
})
export class CommentUpdateFormComponent implements OnInit {

  private id: string;
  private body: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.error = false;
  }

  private update () : void {
    this.commentService.update(this.id, this.body)
    .then(() => {
      this.error = false;
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Unauthorized!';
          this.errorMessage = 'You must be logged in to update a comment.';
          break;
        case 2:
          this.errorTitle = 'Not found!';
          this.errorMessage = 'The comment was not found.'
          break;
        case 3:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'You are not allowed to update this comment.'
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

}
