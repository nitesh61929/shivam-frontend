import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationDetailComponent } from './delivery-location-detail.component';

describe('DeliveryLocationDetailComponent', () => {
  let component: DeliveryLocationDetailComponent;
  let fixture: ComponentFixture<DeliveryLocationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
