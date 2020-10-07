import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { IProvinceDistricts } from "@shared/interfaces";
import { LoadProvincesDistrictsAction } from "@shared/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProvincesWithDistrictsResolver implements Resolve<any> {
  provincesWithDistricts$: Observable<IProvinceDistricts>;
  constructor(private store: Store<any>) {}

  resolve() {
    this.store.dispatch(new LoadProvincesDistrictsAction());

    this.provincesWithDistricts$ = this.store.select(
      (store) => store.shared.provincesWithDistricts.provincesWithDistricts
    );

    return this.provincesWithDistricts$.pipe(
      take(2),
      map((provincesWithDistricts: any) => provincesWithDistricts)
    );
  }
}
