import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
})
export class ErrorPageComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  goToDashboard() {
    this.redirectTo(AppRoutes.DASHBOARD_PAGE);
  }

  goToLogin() {
    this.redirectTo(AppRoutes.LOGIN_PAGE);
  }
}
