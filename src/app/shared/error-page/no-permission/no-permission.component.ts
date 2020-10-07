import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-no-permission",
  templateUrl: "./no-permission.component.html",
})
export class NoPermissionComponent extends BaseComponent implements OnInit {
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
