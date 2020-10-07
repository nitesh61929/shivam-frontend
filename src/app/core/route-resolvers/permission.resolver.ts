import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { IPermissions } from "@core/interfaces/permission";
import { LoadPermissionAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PermissionResolver implements Resolve<any> {
  permissions$: Observable<IPermissions>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new LoadPermissionAction());

    this.permissions$ = this.store.select(
      (store) => store.core.permission.list
    );
    return this.permissions$.pipe(
      take(2),
      map((permissions: IPermissions) => permissions)
    );
  }
}
