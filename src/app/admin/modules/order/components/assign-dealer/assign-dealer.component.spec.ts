import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDealerComponent } from './assign-dealer.component';

describe('AssignDealerComponent', () => {
  let component: AssignDealerComponent;
  let fixture: ComponentFixture<AssignDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
