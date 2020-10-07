import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppRoutes } from "@core/enums";
import { GetDealerAllocationsAction } from "@core/store";
import { Store } from "@ngrx/store";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { GetOnlineDeliveryPartnerAction } from "@shared/store";
import { Observable } from "rxjs";
import { IDealerAllocations } from "../../interfaces/dealer-allocations";

@Component({
  selector: "app-online-delivery-partner-detail-container",
  templateUrl: "./online-delivery-partner-detail-container.component.html",
  styles: [],
})
export class OnlineDeliveryPartnerDetailContainerComponent extends BaseComponent
  implements OnInit {
  onlineDeliveryPartnerDetail$: Observable<IOnlineDeliveryPartner>;
  dealerAllocations$: Observable<IDealerAllocations>;
  loading$: Observable<boolean>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    const dealerId = this.activatedRoute.snapshot.paramMap.get("id");

    if (dealerId) {
      this.store.dispatch(
        new GetOnlineDeliveryPartnerAction(parseInt(dealerId, 10))
      );
      this.store.dispatch(
        new GetDealerAllocationsAction(parseInt(dealerId, 10))
      );
    }

    this.onlineDeliveryPartnerDetail$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.detail
    );
    this.dealerAllocations$ = this.store.select(
      (store) => store.core.user.allocations
    );
    this.loading$ = this.store.select((store) => store.core.user.loading);
  }

  onBackClick() {
    this.redirectTo(AppRoutes.ONLINE_DELIVERY_PARTNERS_PAGE);
  }

  onEditDealer(dealerId: number) {
    this.redirectTo(
      `${AppRoutes.EDIT_ONLINE_DELIVERY_PARTNER_PAGE}/${dealerId}`
    );
  }
}
