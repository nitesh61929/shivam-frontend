import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationListContainerComponent } from './taxation-list-container.component';

describe('TaxationListContainerComponent', () => {
  let component: TaxationListContainerComponent;
  let fixture: ComponentFixture<TaxationListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
