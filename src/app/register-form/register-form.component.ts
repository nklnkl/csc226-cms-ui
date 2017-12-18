import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  private email: string;
  private username: string;
  private password: string;
  private password2: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.error = false;
  }

  private register () {
    if (this.password != this.password2) {
      this.error = true;
      this.errorTitle = 'Form Error!';
      this.errorMessage = 'Your password confirmation did not match your password.';
      return;
    }

    this.accountService.register(this.email, this.username, this.password)
    .then((result: number) => {
      this.error = false;
      this.router.navigate(['/login']);
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Form fields incorrect!';
          this.errorMessage = 'Please check your register info.';
          break;
        case 2:
          this.errorTitle = 'Account Error!';
          this.errorMessage = 'Email address or username already taken.'
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }

    });
  }

}
