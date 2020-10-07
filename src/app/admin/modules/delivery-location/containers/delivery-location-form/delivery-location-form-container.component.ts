import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { Store } from "@ngrx/store";
import { IDeliveryLocation } from "@shared/interfaces";
import { UpdateDeliveryLocationAction } from "@shared/store";
import { Observable } from "rxjs";
import { DeliveryLocationFormComponent } from "../../components";

@Component({
  selector: "app-delivery-location-form-container",
  templateUrl: "./delivery-location-form-container.component.html",
})
export class DeliveryLocationFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("deliveryLocationFormCmp")
  deliveryLocationFormCmp: DeliveryLocationFormComponent;
  provincesWithDistricts: any;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  deliveryLocationDetail: IDeliveryLocation;

  constructor(private store: Store<any>, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.trackRoute();
    this.listenObservables();
  }

  listenObservables() {
    this.loading$ = this.store.select(
      (store) => store.shared.deliveryLocation.loading
    );

    this.error$ = this.store.select(
      (store) => store.shared.deliveryLocation.error
    );

    this.error$.subscribe((err) => {
      if (err && this.deliveryLocationFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.deliveryLocationFormCmp.deliveryLocationForm,
          err
        );
      }
    });
  }

  trackRoute() {
    this.activatedRoute.data.subscribe((data) => {
      this.provincesWithDistricts = data.provincesWithDistricts;
      this.deliveryLocationDetail = data.deliveryLocationDetail;
    });
  }

  onSaveOrUpdateDeliveryLocation(deliveryLocationForm: FormGroup) {
    if (deliveryLocationForm.valid) {
      this.store.dispatch(
        new UpdateDeliveryLocationAction(deliveryLocationForm.value)
      );
    }
  }

  onCancelDeliveryLocation() {
    this.redirectTo(AppRoutes.DELIVERY_LOCATION_PAGE);
  }
}
