import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  private email: string;
  private username: string;
  private password: string;
  private password2: string;
  private location: string;
  private bio: string;
  private role: number;
  private status: number;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.error = false;
    this.getAccount(this.route.snapshot.paramMap.get('id'));
  }

  private update () {

    if (this.password != this.password2) {
      this.error = true;
      this.errorTitle = 'Field error!';
      this.errorMessage = 'Your password and password confirmation did not match.';
    }

    let id: string = this.route.snapshot.paramMap.get('id');
    let update: any = {
      email: this.email,
      username: this.username,
      password: this.password,
      location: this.location,
      bio: this.bio,
      role: this.role,
      status: this.status
    }
    this.accountService.update(update, id)
    .then((result: number) => {
      this.error = false;
      this.router.navigate(['/account/' + id]);
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Unauthorized!';
          this.errorMessage = 'You must log in to update an account.';
          break;
        case 2:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'You do not have permission to update this account.';
          break;
        case 3:
          this.errorTitle = 'Field error!';
          this.errorMessage = 'That email/username is already taken, try something else.';
          break;
        case 4:
          this.errorTitle = 'Error!';
          this.errorMessage = 'That account could not be found, and could update.';
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

  private getAccount (id: string) : void {
    this.accountService.retrieve(id)
    .then((account: Account) => {
      this.error = false;
      this.email = account.getEmail();
      this.username = account.getUsername();
      this.location = account.getLocation();
      this.bio = account.getBio();
      this.role = account.getRole();
      this.status = account.getStatus();
      // If account is owned or client is admin, show update nav link.
      if (localStorage.getItem('account_id') != account.getId())
        this.router.navigate(['/home']);
    })
    .catch((err: number) => {
      this.error = true;
      switch (err) {
        case 1:
          this.errorTitle = 'Client error!';
          this.errorMessage = 'The account was not found.';
          break;
        case 2:
          this.errorTitle = 'Forbidden!';
          this.errorMessage = 'This account is deactivated and can not be retrieved.';
          break;
        default:
          this.errorTitle = 'Server error!';
          this.errorMessage = 'A server error has occured, please try again later.';
      }
    });
  }

}
