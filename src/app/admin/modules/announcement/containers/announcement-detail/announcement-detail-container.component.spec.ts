import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDetailContainerComponent } from './announcement-detail-container.component';

describe('AnnouncementDetailContainerComponent', () => {
  let component: AnnouncementDetailContainerComponent;
  let fixture: ComponentFixture<AnnouncementDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
