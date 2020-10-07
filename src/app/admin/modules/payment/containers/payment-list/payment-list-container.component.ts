import { Component, Injector, OnInit } from "@angular/core";
import { IPayment } from "@app/admin/modules/order/interfaces/payment";
import { BaseComponent } from "@core/components";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IToggleObj } from "@shared/interfaces";
import { Observable } from "rxjs";
import {
  LoadPaymentAction,
  PaymentActionTypes,
  UpdatePaymentStatusAction,
} from "../../store";

@Component({
  selector: "app-payment-list-container",
  templateUrl: "./payment-list-container.component.html",
})
export class PaymentListContainerComponent extends BaseComponent
  implements OnInit {
  paymentMethods$: Observable<IPayment[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private store: Store<any>,
    injector: Injector,
    updatePaymentSuccess$: Actions
  ) {
    super(injector);
    updatePaymentSuccess$
      .pipe(ofType(PaymentActionTypes.UPDATE_PAYMENT_STATUS_SUCCESS))
      .subscribe(() => {
        this.loadPaymentMethods();
      });
  }

  ngOnInit(): void {
    this.paymentMethods$ = this.store.select((store) => store.payment.list);
    this.loading$ = this.store.select((store) => store.payment.loading);
    this.error$ = this.store.select((store) => store.payment.error);

    this.loadPaymentMethods();
  }

  loadPaymentMethods() {
    const param = {
      status: -1,
    };
    this.store.dispatch(new LoadPaymentAction(param));
  }

  onTogglePaymentMethod(togglePaymentMethodObj: IToggleObj) {
    const statusObj = {
      status: togglePaymentMethodObj.value,
    };

    this.store.dispatch(
      new UpdatePaymentStatusAction(togglePaymentMethodObj.id, statusObj)
    );
  }
}
