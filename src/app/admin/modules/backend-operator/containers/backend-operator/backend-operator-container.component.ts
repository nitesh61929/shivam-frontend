import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-backend-operator-container",
  templateUrl: "./backend-operator-container.component.html",
})
export class BackendOperatorContainerComponent extends BaseComponent
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onAddBackendOperator() {
    this.redirectTo(AppRoutes.CREATE_BACKEND_OPERATOR_PAGE);
  }
}
