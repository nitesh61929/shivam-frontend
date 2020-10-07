import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { IDeliveryLocation } from "@shared/interfaces";
import { LoadDeliveryLocationsAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DeliveryLocationResolver implements Resolve<any> {
  deliveryLocations$: Observable<IDeliveryLocation>;
  constructor(private store: Store<any>) {}

  resolve() {
    const param = {
      paginate: 0,
    };
    this.store.dispatch(new LoadDeliveryLocationsAction(param));

    this.deliveryLocations$ = this.store.select(
      (store) => store.shared.deliveryLocation.deliveryLocationList
    );

    return this.deliveryLocations$.pipe(
      take(2),
      map((deliveryLocationList: any) => deliveryLocationList)
    );
  }
}
