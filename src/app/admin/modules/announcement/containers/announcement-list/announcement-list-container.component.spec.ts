import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListContainerComponent } from './announcement-list-container.component';

describe('AnnouncementListContainerComponent', () => {
  let component: AnnouncementListContainerComponent;
  let fixture: ComponentFixture<AnnouncementListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
