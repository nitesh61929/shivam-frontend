import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendOperatorContainerComponent } from './backend-operator-container.component';

describe('BackendOperatorContainerComponent', () => {
  let component: BackendOperatorContainerComponent;
  let fixture: ComponentFixture<BackendOperatorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendOperatorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
