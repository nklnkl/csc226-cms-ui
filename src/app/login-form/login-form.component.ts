import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private email: string;
  private password: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.error = false;
  }

  private login () {
    this.sessionService.register(this.email, this.password)
    .then((result: number) => {
      this.error = false;
    })
    .catch((result: number) => {
      this.error = true;
      switch (result) {
        case 1:
          this.errorTitle = 'Login incorrect!';
          this.errorMessage = 'Please check your login info.';
          break;
        case 2:
          this.errorTitle = 'Account Error!';
          this.errorMessage = 'This account has been deactivated, please contact support.'
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

}
