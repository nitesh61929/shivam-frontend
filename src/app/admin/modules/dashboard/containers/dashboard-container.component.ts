import { Component, OnInit } from "@angular/core";
import { IParameter } from "@core/interfaces";
import DateUtilities from "@core/utilities/date-utilities";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  IConsumersSms,
  IOrderByPaymentMethod,
  IOrdersAmount,
} from "../interfaces";
import {
  LoadConsumersSmsAction,
  LoadOrdersAmountAction,
  LoadOrdersByPaymentMethodsAction,
} from "../store";

@Component({
  selector: "app-dashboard-container",
  templateUrl: "./dashboard-container.component.html",
})
export class DashboardContainerComponent implements OnInit {
  consumersSmsList$: Observable<IConsumersSms[]>;
  ordersAmount$: Observable<IOrdersAmount[]>;
  ordersByPaymentMethods$: Observable<IOrderByPaymentMethod[]>;
  from = DateUtilities.substractMonthFromToday();
  to = DateUtilities.getday("today", "YYYY-MM-DD");
  isDue = 0;
  isDueForOrderByPaymentMethod = 0;
  orderByPaymentMethodFrom = DateUtilities.substractMonthFromToday();
  orderByPaymentMethodTo = DateUtilities.getday("today", "YYYY-MM-DD");

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.consumersSmsList$ = this.store.select(
      (store) => store.dashboard.consumersSmsList
    );

    this.ordersAmount$ = this.store.select(
      (store) => store.dashboard.ordersAmountList
    );

    this.ordersByPaymentMethods$ = this.store.select(
      (store) => store.dashboard.ordersByPaymentMethods
    );

    this.loadConsumersSms();
    this.loadOrdersAmount(this.getParam());
    this.loadOrdersByPaymentMethods(this.getParam());
  }

  loadOrdersByPaymentMethods(param: IParameter) {
    this.store.dispatch(new LoadOrdersByPaymentMethodsAction(param));
  }

  loadConsumersSms() {
    this.store.dispatch(new LoadConsumersSmsAction());
  }

  loadOrdersAmount(param: IParameter) {
    this.store.dispatch(new LoadOrdersAmountAction(param));
  }

  onParamChange(param: IParameter) {
    this.from =
      param.starts_at || param.starts_at === null ? param.starts_at : this.from;
    this.to = param.ends_at || param.ends_at === null ? param.ends_at : this.to;
    this.isDue = param.is_due || param.is_due === 0 ? param.is_due : this.isDue;
    this.loadOrdersAmount(this.getParam(param));
  }

  onOrderForPaymentMethodParamChange(param: IParameter) {
    this.orderByPaymentMethodFrom =
      param.starts_at || param.starts_at === null
        ? param.starts_at
        : this.orderByPaymentMethodFrom;
    this.orderByPaymentMethodTo =
      param.ends_at || param.ends_at === null
        ? param.ends_at
        : this.orderByPaymentMethodTo;
    this.isDueForOrderByPaymentMethod =
      param.is_due || param.is_due === 0
        ? param.is_due
        : this.isDueForOrderByPaymentMethod;
    this.loadOrdersByPaymentMethods(
      this.getParamForOrderByPaymentMethod(param)
    );
  }

  getParamForOrderByPaymentMethod(parameter?: IParameter) {
    return {
      from: this.orderByPaymentMethodFrom,
      to: this.orderByPaymentMethodTo,
      is_due: this.isDueForOrderByPaymentMethod,
    };
  }

  getParam(parameter?: IParameter) {
    return {
      from: this.from,
      to: this.to,
      is_due: this.isDue,
    };
  }
}
