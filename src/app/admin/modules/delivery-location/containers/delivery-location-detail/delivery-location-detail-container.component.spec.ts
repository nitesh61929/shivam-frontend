import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationDetailContainerComponent } from './delivery-location-detail-container.component';

describe('DeliveryLocationDetailContainerComponent', () => {
  let component: DeliveryLocationDetailContainerComponent;
  let fixture: ComponentFixture<DeliveryLocationDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
