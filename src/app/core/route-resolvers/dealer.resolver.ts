import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { IPermissions } from "@core/interfaces/permission";
import { LoadUserAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DealerResolver implements Resolve<any> {
  dealers$: Observable<IPermissions>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const param = {
      paginate: 0,
      role: "online_delivery_partner",
      status: 1,
    };

    this.store.dispatch(new LoadUserAction(param));

    this.dealers$ = this.store.select((store) => store.core.user.list);
    return this.dealers$.pipe(
      take(2),
      map((dealers: any) => dealers)
    );
  }
}
