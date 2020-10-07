import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { LoadErpDealersAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IErpDealer } from "../../../../shared/interfaces/erp-dealers";

@Injectable({
  providedIn: "root",
})
export class ErpDealersResolver implements Resolve<any> {
  erpDealers$: Observable<IErpDealer[]>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new LoadErpDealersAction({}));

    this.erpDealers$ = this.store.select(
      (store) => store.shared.erpDealers.list
    );
    return this.erpDealers$.pipe(
      take(2),
      map((erpDealers: IErpDealer[]) => erpDealers)
    );
  }
}
