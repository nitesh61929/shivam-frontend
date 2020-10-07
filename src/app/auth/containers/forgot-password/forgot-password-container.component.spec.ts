import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordContainerComponent } from './forgot-password-container.component';

describe('ForgotPasswordContainerComponent', () => {
  let component: ForgotPasswordContainerComponent;
  let fixture: ComponentFixture<ForgotPasswordContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
