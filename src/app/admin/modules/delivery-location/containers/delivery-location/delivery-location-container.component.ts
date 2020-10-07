import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components/base";
import { AppRoutes } from "@core/enums";

@Component({
  selector: "app-delivery-location-container",
  templateUrl: "./delivery-location-container.component.html",
})
export class DeliveryLocationContainerComponent extends BaseComponent
  implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  onAddDeliveryLocation() {
    this.redirectTo(AppRoutes.CREATE_DELIVERY_LOCATION_PAGE);
  }
}
