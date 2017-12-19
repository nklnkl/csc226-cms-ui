import { Component } from '@angular/core';
import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private session: boolean;

  constructor(
    private sessionService: SessionService
  ) {
    this.sessionService.session.subscribe(
      (session: boolean) => { this.session = session; }
    );
  }
}
