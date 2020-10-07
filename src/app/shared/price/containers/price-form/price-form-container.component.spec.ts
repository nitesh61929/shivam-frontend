import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFormContainerComponent } from './price-form-container.component';

describe('PriceFormContainerComponent', () => {
  let component: PriceFormContainerComponent;
  let fixture: ComponentFixture<PriceFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
