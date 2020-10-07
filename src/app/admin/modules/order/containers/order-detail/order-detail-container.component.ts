import { Component, Injector, OnInit } from "@angular/core";
import { BaseComponent } from "@core/components";
import { Store } from "@ngrx/store";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { Observable } from "rxjs";
import { IOrder, IOrderCancelReason } from "../../interfaces";
import { CancelOrderAction } from "../../store/actions/order.actions";

@Component({
  selector: "app-order-detail-container",
  templateUrl: "./order-detail-container.component.html",
})
export class OrderDetailContainerComponent extends BaseComponent
  implements OnInit {
  onlineDeliveryPartners: IOnlineDeliveryPartner[];
  orderDetail: IOrder;
  orderDetail$: Observable<any>;

  constructor(injector: Injector, private store: Store<any>) {
    super(injector);
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.onlineDeliveryPartners = data.onlineDeliveryPartners;
      this.orderDetail = data.orderDetail;
    });
  }

  onCancelOrder(cancelReason: IOrderCancelReason) {
    this.store.dispatch(
      new CancelOrderAction(this.orderDetail.id, cancelReason)
    );
  }
}
