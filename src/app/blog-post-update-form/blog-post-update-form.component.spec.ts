import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostUpdateFormComponent } from './blog-post-update-form.component';

describe('BlogPostUpdateFormComponent', () => {
  let component: BlogPostUpdateFormComponent;
  let fixture: ComponentFixture<BlogPostUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
