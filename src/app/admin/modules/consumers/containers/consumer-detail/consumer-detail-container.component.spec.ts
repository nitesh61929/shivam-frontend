import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ConsumerDetailContainerComponent } from "./consumer-detail-container.component";

describe("ConsumerDetailContainerComponent", () => {
  let component: ConsumerDetailContainerComponent;
  let fixture: ComponentFixture<ConsumerDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerDetailContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
