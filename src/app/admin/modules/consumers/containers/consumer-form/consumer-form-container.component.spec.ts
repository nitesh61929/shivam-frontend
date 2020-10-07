import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFormContainerComponent } from './consumer-form-container.component';

describe('ConsumerFormContainerComponent', () => {
  let component: ConsumerFormContainerComponent;
  let fixture: ComponentFixture<ConsumerFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
