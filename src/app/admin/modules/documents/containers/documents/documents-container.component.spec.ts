import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsContainerComponent } from './documents-container.component';

describe('DocumentsContainerComponent', () => {
  let component: DocumentsContainerComponent;
  let fixture: ComponentFixture<DocumentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
