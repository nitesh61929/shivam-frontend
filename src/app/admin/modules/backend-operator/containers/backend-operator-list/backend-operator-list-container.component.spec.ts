import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorListContainerComponent } from './backend-operator-list-container.component';

describe('BackendOperatorListContainerComponent', () => {
  let component: BackendOperatorListContainerComponent;
  let fixture: ComponentFixture<BackendOperatorListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
