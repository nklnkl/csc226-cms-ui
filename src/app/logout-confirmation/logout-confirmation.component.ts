import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-logout-confirmation',
  templateUrl: './logout-confirmation.component.html',
  styleUrls: ['./logout-confirmation.component.css']
})
export class LogoutConfirmationComponent implements OnInit {

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.error = false;
  }

  private logout () : void {
    if (localStorage.getItem('session_id') && localStorage.getItem('account_id')) {
      this.sessionService.delete(localStorage.getItem('session_id'))
      .then((result: number) => {
        this.error = false;
        localStorage.removeItem('account_id');
        localStorage.removeItem('session_id');
        this.router.navigate(['/blog-posts']);
      })
      .catch((err: number) => {
        this.error = true;
        switch (err) {
          case 1:
            this.errorTitle = 'Unauthorized!';
            this.errorMessage = 'You must be logged in to delete a session.';
            break;
          case 2:
            this.errorTitle = 'Not found!';
            this.errorMessage = 'That session did not exist.';
            break;
          case 3:
            this.errorTitle = 'Forbidden!';
            this.errorMessage = 'You are not allowed to delete this session.';
            break;
          default:
            this.errorTitle = 'Server error!';
            this.errorMessage = 'A server error has occured, please try again later.';
        }
      });
    }
    else {
      this.router.navigate(['/blog-posts']);
    }
  }

}
