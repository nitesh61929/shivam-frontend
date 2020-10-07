import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorListComponent } from './backend-operator-list.component';

describe('BackendOperatorListComponent', () => {
  let component: BackendOperatorListComponent;
  let fixture: ComponentFixture<BackendOperatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
