import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListContainerComponent } from './orders-list-container.component';

describe('OrdersListContainerComponent', () => {
  let component: OrdersListContainerComponent;
  let fixture: ComponentFixture<OrdersListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
