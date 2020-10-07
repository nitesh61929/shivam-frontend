import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { IOnlineDeliveryPartner } from "@shared/interfaces";
import { LoadOnlineDeliveryPartnerAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OnlineDeliveryPartnersResolver implements Resolve<any> {
  onlineDeliveryPartners$: Observable<IOnlineDeliveryPartner[]>;
  constructor(private store: Store<any>) {}

  resolve() {
    const param = {
      paginate: 0,
      status: 1,
    };
    this.store.dispatch(new LoadOnlineDeliveryPartnerAction(param));

    this.onlineDeliveryPartners$ = this.store.select(
      (store) => store.shared.onlineDeliveryPartners.list
    );

    return this.onlineDeliveryPartners$.pipe(
      take(2),
      map(
        (onlineDeliveryPartners: IOnlineDeliveryPartner[]) =>
          onlineDeliveryPartners
      )
    );
  }
}
