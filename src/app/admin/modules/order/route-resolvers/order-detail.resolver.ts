import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IOrder } from "../interfaces";
import { GetOrderAction } from "../store";

@Injectable({
  providedIn: "root",
})
export class OrderDetailResolver implements Resolve<any> {
  orderDetail$: Observable<IOrder>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const orderId = route.params.id;
    this.store.dispatch(new GetOrderAction(parseInt(orderId, 10)));

    this.orderDetail$ = this.store.select((store) => store.order.detail);
    return this.orderDetail$.pipe(
      take(2),
      map((orderDetail: IOrder) => orderDetail)
    );
  }
}
