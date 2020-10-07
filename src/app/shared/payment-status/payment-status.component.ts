import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";

@Component({
  selector: "app-payment-status",
  templateUrl: "./payment-status.component.html",
})
export class PaymentStatusComponent extends BaseComponent implements OnInit {
  paymentStatus: boolean;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.paymentStatus = JSON.parse(params["status"]);
    });
  }
}
