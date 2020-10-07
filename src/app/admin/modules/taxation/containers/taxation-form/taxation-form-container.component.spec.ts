import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationFormContainerComponent } from './taxation-form-container.component';

describe('TaxationFormContainerComponent', () => {
  let component: TaxationFormContainerComponent;
  let fixture: ComponentFixture<TaxationFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
