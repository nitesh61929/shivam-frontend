import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackListContainerComponent } from './feedback-list-container.component';

describe('FeedbackListContainerComponent', () => {
  let component: FeedbackListContainerComponent;
  let fixture: ComponentFixture<FeedbackListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
