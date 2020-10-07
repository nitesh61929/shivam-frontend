import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorFormComponent } from './backend-operator-form.component';

describe('BackendOperatorFormComponent', () => {
  let component: BackendOperatorFormComponent;
  let fixture: ComponentFixture<BackendOperatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
