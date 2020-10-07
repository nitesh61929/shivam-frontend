import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { ApiUrls, AppRoutes, StorageKeys } from "@core/enums";
import { IPagination, IParameter } from "@core/interfaces";
import { Store } from "@ngrx/store";
import { IDownloadOptions } from "@shared/download";
import { IDeliveryLocation } from "@shared/interfaces";
import {
  DeleteDeliveryLocationAction,
  LoadDeliveryLocationsAction,
} from "@shared/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-delivery-location-list-container",
  templateUrl: "./delivery-location-list-container.component.html",
})
export class DeliveryLocationListContainerComponent extends BaseComponent
  implements OnInit {
  deliveryLocations$: Observable<IDeliveryLocation[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  pagination$: Observable<IPagination>;
  downloadOptions: IDownloadOptions;
  page = 0;
  perPage = 5;
  search = "";

  constructor(private store: Store<any>, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadDeliveryLocation(this.getParam());

    this.deliveryLocations$ = this.store.select(
      (store) => store.shared.deliveryLocation.deliveryLocationList
    );

    this.loading$ = this.store.select(
      (store) => store.shared.deliveryLocation.loading
    );
    this.error$ = this.store.select(
      (store) => store.shared.deliveryLocation.error
    );
    this.pagination$ = this.store.select(
      (store) => store.shared.deliveryLocation.pagination
    );

    this.setDownloadOptions();
  }

  getParam(parameter?: IParameter) {
    return {
      paginate: 1,
      page: this.page,
      per_page: this.storage.get(StorageKeys.PER_PAGE),
      search: this.search,
    };
  }

  setDownloadOptions() {
    this.downloadOptions = {
      resourceUrl: ApiUrls.DELIVERY_LOCATIONS_EXPORT_TO_EXCEL,
      fileName: this.translateService.instant("single_delivery_location"),
    };
  }

  loadDeliveryLocation(param) {
    this.store.dispatch(new LoadDeliveryLocationsAction(param));
  }

  onEditDeliveryLocation(deliveryLocationId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_DELIVERY_LOCATION_PAGE}/${deliveryLocationId}`
    );
  }

  onDeliveryLocationDetail(deliveryLocationId: number) {
    this.redirectTo(
      `${AppRoutes.DETAIL_DELIVERY_LOCATION_PAGE}/${deliveryLocationId}`
    );
  }

  onDeleteDeliveryLocation(deliveryLocationId: number) {
    const options = {
      title: "Delete",
      message:
        "Are you sure you want to delete this item? Prices associated with this delivery location will also be deleted.",
      cancelText: "Cancel",
      confirmText: "Confirm",
    };
    this.confirmDialog.open(options);

    this.confirmDialog.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.store.dispatch(
          new DeleteDeliveryLocationAction(deliveryLocationId)
        );
      }
    });
  }

  onParamChanged(param) {
    this.page = param.page || param.page === 0 ? param.page : this.page;
    this.perPage = this.storage.get(StorageKeys.PER_PAGE);
    this.search =
      param.search || param.search === "" ? param.search : this.search;

    this.loadDeliveryLocation(this.getParam(param));
  }
}
