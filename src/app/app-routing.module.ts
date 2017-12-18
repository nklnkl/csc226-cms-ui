import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BlogPostsComponent } from './blog-posts/blog-posts.component';

const routes: Routes = [
  { path: 'blog-posts', component: BlogPostsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
