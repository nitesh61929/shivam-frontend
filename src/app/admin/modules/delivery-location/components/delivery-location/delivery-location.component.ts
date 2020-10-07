import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-delivery-location",
  templateUrl: "./delivery-location.component.html",
})
export class DeliveryLocationComponent implements OnInit {
  @Output() addDeliveryLocation: EventEmitter<any> = new EventEmitter<any>();

  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_DELIVERY_LOCATION;

  constructor() {}

  ngOnInit(): void {
    this.pageHeaderOptions = {
      title: "delivery_location",
      showAddBtn: true,
      hasAddAccess: AppPermissions.ADD_DELIVERY_LOCATION,
    };
  }

  onAddDeliveryLocation() {
    this.addDeliveryLocation.emit();
  }
}
