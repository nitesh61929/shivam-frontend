import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { StorageKeys } from "@core/enums";
import { IProfile } from "@core/interfaces";
import { StorageService } from "@core/services";
import { GetProfileAction } from "@core/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProfileResolver implements Resolve<any> {
  profile$: Observable<IProfile>;

  constructor(private store: Store<any>, private storage: StorageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new GetProfileAction());

    this.profile$ = this.store.select((store) => store.core.auth.profile);
    return this.profile$.pipe(
      take(2),
      map((profile: any) => {
        this.storage.set(StorageKeys.USER, profile);
        return profile;
      })
    );
  }
}
