import { HttpClientModule } from "@angular/common/http";
import { Injector } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppInjector } from "@app/app-injector.service";
import { baseImports } from "@core/base.imports";
import { StoreModule } from "@ngrx/store";
import { LoginContainerComponent } from "./login-container.component";

describe("LoginContainerComponent", () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [baseImports, HttpClientModule, StoreModule.forRoot({})],
      declarations: [LoginContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    AppInjector.setInjector(TestBed.inject(Injector));
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
