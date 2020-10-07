import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersListContainerComponent } from './consumers-list-container.component';

describe('ConsumersListContainerComponent', () => {
  let component: ConsumersListContainerComponent;
  let fixture: ComponentFixture<ConsumersListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
