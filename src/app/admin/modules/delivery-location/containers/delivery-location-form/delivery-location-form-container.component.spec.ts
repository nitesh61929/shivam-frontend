import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationFormContainerComponent } from './delivery-location-form-container.component';

describe('DeliveryLocationFormContainerComponent', () => {
  let component: DeliveryLocationFormContainerComponent;
  let fixture: ComponentFixture<DeliveryLocationFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
