import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationListComponent } from './taxation-list.component';

describe('TaxationListComponent', () => {
  let component: TaxationListComponent;
  let fixture: ComponentFixture<TaxationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
