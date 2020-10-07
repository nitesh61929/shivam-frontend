import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementFormContainerComponent } from './announcement-form-container.component';

describe('AnnouncementFormContainerComponent', () => {
  let component: AnnouncementFormContainerComponent;
  let fixture: ComponentFixture<AnnouncementFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
