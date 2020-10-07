import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BackendOperatorDetailComponent } from "./backend-operator-detail.component";

describe("BakendOperatorDetailComponent", () => {
  let component: BackendOperatorDetailComponent;
  let fixture: ComponentFixture<BackendOperatorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackendOperatorDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendOperatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
