import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionChapterComponent } from './question-chapter.component';

describe('QuestionChapterComponent', () => {
  let component: QuestionChapterComponent;
  let fixture: ComponentFixture<QuestionChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionChapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
