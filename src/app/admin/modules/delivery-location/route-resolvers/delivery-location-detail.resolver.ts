import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { IDeliveryLocation } from "@shared/interfaces";
import { GetDeliveryLocationAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DeliveryLocationDetailResolver implements Resolve<any> {
  deliveryLocationDetail$: Observable<IDeliveryLocation>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const deliveryLocationId = route.params.id;
    this.store.dispatch(
      new GetDeliveryLocationAction(parseInt(deliveryLocationId, 10))
    );

    this.deliveryLocationDetail$ = this.store.select(
      (store) => store.shared.deliveryLocation.deliveryLocation
    );

    return this.deliveryLocationDetail$.pipe(
      take(2),
      map((deliveryLocationDetail: IDeliveryLocation) => deliveryLocationDetail)
    );
  }
}
