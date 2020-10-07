import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationFormComponent } from './delivery-location-form.component';

describe('DeliveryLocationFormComponent', () => {
  let component: DeliveryLocationFormComponent;
  let fixture: ComponentFixture<DeliveryLocationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
