import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { AccountComponent } from './account/account.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { HomeComponent } from './home/home.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { BlogPostFormComponent } from './blog-post-form/blog-post-form.component';
import { BlogPostUpdateFormComponent } from './blog-post-update-form/blog-post-update-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog-posts', component: BlogPostsComponent },
  { path: 'blog-post/:id', component: BlogPostComponent },
  { path: 'blog-post/update/:id', component: BlogPostUpdateFormComponent },
  { path: 'blog-post', component: BlogPostFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutConfirmationComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'account/update/:id', component: AccountUpdateComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
