import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationContainerComponent } from './taxation-container.component';

describe('TaxationContainerComponent', () => {
  let component: TaxationContainerComponent;
  let fixture: ComponentFixture<TaxationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
