import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { SessionService } from './session.service';
import { BlogPostService } from './blog-post.service';
import { CommentService } from './comment.service';
import { AppRoutingModule } from './app-routing.module';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule
  ],
  providers: [AccountService, SessionService, BlogPostService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
