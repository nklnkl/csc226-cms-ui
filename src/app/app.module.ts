import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { SessionService } from './session.service';
import { BlogPostService } from './blog-post.service';
import { CommentService } from './comment.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AccountService, SessionService, BlogPostService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
