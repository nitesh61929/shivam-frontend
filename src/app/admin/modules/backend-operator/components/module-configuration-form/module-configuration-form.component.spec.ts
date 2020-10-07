import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleConfigurationFormComponent } from './module-configuration-form.component';

describe('ModuleConfigurationFormComponent', () => {
  let component: ModuleConfigurationFormComponent;
  let fixture: ComponentFixture<ModuleConfigurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleConfigurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleConfigurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
