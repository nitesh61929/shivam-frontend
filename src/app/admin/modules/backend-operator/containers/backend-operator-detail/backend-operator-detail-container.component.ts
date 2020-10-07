import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { IBackendOperator } from "../../interfaces";

@Component({
  selector: "app-backend-operator-detail-container",
  templateUrl: "./backend-operator-detail-container.component.html",
})
export class BackendOperatorDetailContainerComponent extends BaseComponent
  implements OnInit {
  backendOperatorDetail: IBackendOperator;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.trackRoute();
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.backendOperatorDetail = data.backendOperatorDetail;
    });
  }

  onBackClick() {
    this.redirectTo(AppRoutes.BACKEND_OPERATOR_PAGE);
  }

  onEditBackendOperator(backendOperatorId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_BACKEND_OPERATOR_PAGE}/${backendOperatorId}`
    );
  }
}
