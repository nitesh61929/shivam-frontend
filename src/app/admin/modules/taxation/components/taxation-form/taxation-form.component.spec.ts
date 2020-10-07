import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxationFormComponent } from './taxation-form.component';

describe('TaxationFormComponent', () => {
  let component: TaxationFormComponent;
  let fixture: ComponentFixture<TaxationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
