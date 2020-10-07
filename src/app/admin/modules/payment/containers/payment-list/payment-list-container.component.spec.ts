import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentListContainerComponent } from './payment-list-container.component';

describe('PaymentListContainerComponent', () => {
  let component: PaymentListContainerComponent;
  let fixture: ComponentFixture<PaymentListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
