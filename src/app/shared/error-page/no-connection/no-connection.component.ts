import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-no-connection",
  templateUrl: "./no-connection.component.html",
})
export class NoConnectionComponent extends BaseComponent implements OnInit {
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
