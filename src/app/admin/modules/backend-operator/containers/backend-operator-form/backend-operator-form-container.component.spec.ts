import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorFormContainerComponent } from './backend-operator-form-container.component';

describe('BackendOperatorFormContainerComponent', () => {
  let component: BackendOperatorFormContainerComponent;
  let fixture: ComponentFixture<BackendOperatorFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
