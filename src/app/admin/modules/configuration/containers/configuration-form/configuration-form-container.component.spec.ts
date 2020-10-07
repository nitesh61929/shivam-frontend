import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationFormContainerComponent } from './configuration-form-container.component';

describe('ConfigurationFormContainerComponent', () => {
  let component: ConfigurationFormContainerComponent;
  let fixture: ComponentFixture<ConfigurationFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
