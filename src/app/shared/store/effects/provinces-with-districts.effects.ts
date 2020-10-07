import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ProvincesWithDistrictsService } from "@shared/services";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import {
  LoadProvincesDistrictsAction,
  LoadProvincesDistrictsFailureAction,
  LoadProvincesDistrictsSuccessAction,
  ProvincesWithDistrictsActionTypes,
} from "../actions";

@Injectable()
export class ProvincesWithDistrictsEffects {
  constructor(
    private actions$: Actions,
    private ProvinceWithDistrictsService: ProvincesWithDistrictsService
  ) {}

  @Effect() loadProvinceWithDistricts$ = this.actions$.pipe(
    ofType<LoadProvincesDistrictsAction>(
      ProvincesWithDistrictsActionTypes.LOAD_PROVINCES_DISTRICTS
    ),
    mergeMap(() =>
      this.ProvinceWithDistrictsService.getProvincesWithDistricts().pipe(
        map((provincesWithDistricts: any) => {
          return new LoadProvincesDistrictsSuccessAction(
            provincesWithDistricts
          );
        }),
        catchError((error) =>
          of(new LoadProvincesDistrictsFailureAction(error))
        )
      )
    )
  );
}
