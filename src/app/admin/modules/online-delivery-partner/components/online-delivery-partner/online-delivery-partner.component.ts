import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { AppPermissions, AppRoutes } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-online-delivery-partner",
  templateUrl: "./online-delivery-partner.component.html",
})
export class OnlineDeliveryPartnerComponent extends BaseComponent
  implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_DEALER;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "online_delivery_partners",
      showAddBtn: true,
      hasAddAccess: AppPermissions.ADD_DEALER,
    };
  }

  onAddOnlineDeliveryPartner() {
    this.redirectTo(AppRoutes.CREATE_ONLINE_DELIVERY_PARTNER_PAGE);
  }
}
