import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { Store } from "@ngrx/store";
import { IDeliveryLocation, IErpDealer } from "@shared/interfaces";
import {
  AddOnlineDeliveryPartnerAction,
  EditOnlineDeliveryPartnerAction,
  GetOnlineDeliveryPartnerAction,
} from "@shared/store";
import { LoadDeliveryLocationsAction } from "@shared/store/actions/delivery-location.actions";
import { Observable } from "rxjs";
import { IOnlineDeliveryPartner } from "../../../../../shared/interfaces/online-delivery-partner";
import { OnlineDeliveryPartnerFormComponent } from "../../components";

@Component({
  selector: "app-online-delivery-partner-form-container",
  templateUrl: "./online-delivery-partner-form-container.component.html",
})
export class OnlineDeliveryPartnerFormContainerComponent extends BaseComponent
  implements OnInit {
  @ViewChild("onlineDeliveryPartnerFormCmp")
  onlineDeliveryPartnerFormCmp: OnlineDeliveryPartnerFormComponent;
  error$: Observable<any>;
  erpDealers: IErpDealer[];
  deliveryLocations$: Observable<IDeliveryLocation[]>;
  onlineDeliveryPartnerDetail$: Observable<IOnlineDeliveryPartner>;
  loading$: Observable<any>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.fetchDealerById();
    this.onlineDeliveryPartnerDetail$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.detail
    );

    this.activatedRoute.data.subscribe((data) => {
      this.erpDealers = data.erpDealers;
    });

    this.loadDeliveryLocation({});
    this.deliveryLocations$ = this.store.select(
      (store) => store.shared.deliveryLocation.deliveryLocationList
    );

    this.error$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.error
    );
    this.loading$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.loading
    );
    this.error$.subscribe((err) => {
      if (err && this.onlineDeliveryPartnerFormCmp) {
        this.errorMessageService.handleServerSideError(
          this.onlineDeliveryPartnerFormCmp.onlineDeliveryPartnerForm,
          err
        );
      }
    });
  }

  fetchDealerById() {
    const dealerId = this.activatedRoute.snapshot.paramMap.get("id");
    if (dealerId) {
      this.store.dispatch(
        new GetOnlineDeliveryPartnerAction(parseInt(dealerId, 10))
      );
    }
  }

  loadDeliveryLocation(param) {
    this.store.dispatch(new LoadDeliveryLocationsAction(param));
  }

  onSaveOrUpdateOnlineDeliveryPartner(dealerForm: FormGroup) {
    if (dealerForm.valid) {
      const dealerId = dealerForm.get("id").value;
      if (dealerId) {
        this.store.dispatch(
          new EditOnlineDeliveryPartnerAction(
            parseInt(dealerId, 10),
            dealerForm.value
          )
        );
      } else {
        this.store.dispatch(
          new AddOnlineDeliveryPartnerAction(dealerForm.value)
        );
      }
    }
  }

  onCancelOnlineDeliveryPartner() {
    this.redirectTo(AppRoutes.ONLINE_DELIVERY_PARTNERS_PAGE);
  }
}
