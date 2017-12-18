import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'blog-posts', component: BlogPostsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'logout', component: LogoutConfirmationComponent },
  { path: 'account/:id', component: AccountComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
