import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationListContainerComponent } from './delivery-location-list-container.component';

describe('DeliveryLocationListContainerComponent', () => {
  let component: DeliveryLocationListContainerComponent;
  let fixture: ComponentFixture<DeliveryLocationListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
