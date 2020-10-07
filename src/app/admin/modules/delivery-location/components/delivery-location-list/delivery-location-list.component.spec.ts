import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationListComponent } from './delivery-location-list.component';

describe('DeliveryLocationListComponent', () => {
  let component: DeliveryLocationListComponent;
  let fixture: ComponentFixture<DeliveryLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
