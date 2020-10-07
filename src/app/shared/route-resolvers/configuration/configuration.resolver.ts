import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { IConfiguration } from "@shared/interfaces";
import { LoadConfigurationsAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ConfigurationResolver implements Resolve<any> {
  configurations$: Observable<IConfiguration[]>;
  constructor(private store: Store<any>) {}

  resolve() {
    const param = {
      paginate: 0,
    };
    this.store.dispatch(new LoadConfigurationsAction(param));

    this.configurations$ = this.store.select(
      (store) => store.shared.configuration.list
    );

    return this.configurations$.pipe(
      take(2),
      map((configurations: any) => configurations)
    );
  }
}
