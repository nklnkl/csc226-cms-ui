import { Component } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private session: boolean;

  private account_id: string;

  constructor(
    private sessionService: SessionService
  ) {
    // Whenever the session variable updates.
    this.sessionService.session.subscribe(
      (session: boolean) => {
        // Set new session indicator.
        this.session = session;
        // Update account_id.
        this.account_id = localStorage.getItem('account_id');
      }
    );
  }
}
