import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersContainerComponent } from './consumers-container.component';

describe('ConsumersContainerComponent', () => {
  let component: ConsumersContainerComponent;
  let fixture: ComponentFixture<ConsumersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
