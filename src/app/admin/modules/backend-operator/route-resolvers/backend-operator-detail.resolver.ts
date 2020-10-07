import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { IBackendOperator } from "../interfaces";
import { GetBackendOperatorAction } from "../store";

@Injectable({
  providedIn: "root",
})
export class BackendOperatorDetailResolver implements Resolve<any> {
  backendOperatorDetail$: Observable<IBackendOperator>;

  constructor(private store: Store<any>) {}

  resolve(route: ActivatedRouteSnapshot) {
    const backendOperatorId = route.params.id;
    this.store.dispatch(
      new GetBackendOperatorAction(parseInt(backendOperatorId, 10))
    );

    this.backendOperatorDetail$ = this.store.select(
      (store) => store.backendOperator.detail
    );
    return this.backendOperatorDetail$.pipe(
      take(2),
      map((backendOperatorDetail: IBackendOperator) => backendOperatorDetail)
    );
  }
}
