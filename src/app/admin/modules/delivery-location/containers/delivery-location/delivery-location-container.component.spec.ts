import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationContainerComponent } from './delivery-location-container.component';

describe('DeliveryLocationContainerComponent', () => {
  let component: DeliveryLocationContainerComponent;
  let fixture: ComponentFixture<DeliveryLocationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
