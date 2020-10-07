import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorComponent } from './backend-operator.component';

describe('BackendOperatorComponent', () => {
  let component: BackendOperatorComponent;
  let fixture: ComponentFixture<BackendOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
