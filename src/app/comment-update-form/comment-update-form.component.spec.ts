import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUpdateFormComponent } from './comment-update-form.component';

describe('CommentUpdateFormComponent', () => {
  let component: CommentUpdateFormComponent;
  let fixture: ComponentFixture<CommentUpdateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentUpdateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
