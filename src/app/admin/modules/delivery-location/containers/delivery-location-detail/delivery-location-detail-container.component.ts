import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { Store } from "@ngrx/store";
import { GetDeliveryLocationAction } from "@shared/store";
import { Observable } from "rxjs";
import { IDeliveryLocation } from "../../interfaces";

@Component({
  selector: "app-delivery-location-detail-container",
  templateUrl: "./delivery-location-detail-container.component.html",
})
export class DeliveryLocationDetailContainerComponent extends BaseComponent
  implements OnInit {
  deliveryLocationDetail$: Observable<IDeliveryLocation>;
  loading$: Observable<boolean>;
  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    const deliveryLocationId = this.activatedRoute.snapshot.paramMap.get("id");
    if (deliveryLocationId) {
      this.store.dispatch(
        new GetDeliveryLocationAction(parseInt(deliveryLocationId, 10))
      );
    }
    this.deliveryLocationDetail$ = this.store.select(
      (store) => store.shared.deliveryLocation.deliveryLocation
    );
    this.loading$ = this.store.select(
      (store) => store.shared.deliveryLocation.loading
    );
  }

  onEditDeliveryLocation(deliveryLocationId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_DELIVERY_LOCATION_PAGE}/${deliveryLocationId}`
    );
  }

  onBackClick() {
    this.redirectTo(AppRoutes.DELIVERY_LOCATION_PAGE);
  }
}
