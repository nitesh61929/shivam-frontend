import { Component, OnInit } from "@angular/core";
import { AppPermissions } from "@core/enums";
import { IPageHeaderOptions } from "@shared/page-header";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
})
export class PaymentComponent implements OnInit {
  pageHeaderOptions: IPageHeaderOptions;
  hasListAccess = AppPermissions.LIST_PAYMENT;

  constructor() {}

  ngOnInit(): void {
    this.setPageHeaderOptions();
  }

  setPageHeaderOptions() {
    this.pageHeaderOptions = {
      title: "Payment",
      showAddBtn: false,
    };
  }
}
