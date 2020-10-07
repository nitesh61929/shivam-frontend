import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorDetailContainerComponent } from './backend-operator-detail-container.component';

describe('BackendOperatorDetailContainerComponent', () => {
  let component: BackendOperatorDetailContainerComponent;
  let fixture: ComponentFixture<BackendOperatorDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
