import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementContainerComponent } from './announcement-container.component';

describe('AnnouncementContainerComponent', () => {
  let component: AnnouncementContainerComponent;
  let fixture: ComponentFixture<AnnouncementContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
