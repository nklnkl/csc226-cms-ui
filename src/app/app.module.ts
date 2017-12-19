import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { SessionService } from './session.service';
import { BlogPostService } from './blog-post.service';
import { CommentService } from './comment.service';
import { AppRoutingModule } from './app-routing.module';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { AccountComponent } from './account/account.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { HomeComponent } from './home/home.component';
import { AccountUpdateComponent } from './account-update/account-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LogoutConfirmationComponent,
    AccountComponent,
    BlogPostComponent,
    HomeComponent,
    AccountUpdateComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, FormsModule
  ],
  providers: [AccountService, SessionService, BlogPostService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
