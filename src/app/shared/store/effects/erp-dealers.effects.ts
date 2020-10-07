import { Injectable } from "@angular/core";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ErpDealersService } from "../../services/erp-dealers/erp-dealers.service";
import {
  ErpDealersActionTypes,
  LoadErpDataFailureAction,
  LoadErpDataSuccessAction,
  LoadErpDealersAction,
  LoadErpDealersFailureAction,
  LoadErpDealersSuccessAction,
} from "../actions";

@Injectable()
export class ErpDealersEffects {
  constructor(
    private actions$: Actions,
    private erpDealersService: ErpDealersService,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadErpDealers$ = this.actions$.pipe(
    ofType<LoadErpDealersAction>(ErpDealersActionTypes.LOAD_ERP_DEALERS),
    mergeMap((d) =>
      this.erpDealersService.getErpDealers(d.param).pipe(
        map((data) => {
          return new LoadErpDealersSuccessAction(data);
        }),
        catchError((error) => of(new LoadErpDealersFailureAction(error)))
      )
    )
  );

  @Effect() loadErpData$ = this.actions$.pipe(
    ofType<LoadErpDealersAction>(ErpDealersActionTypes.LOAD_ERP_DATA),
    mergeMap((d) =>
      this.erpDealersService.getErpData(d.param).pipe(
        map((data) => {
          return new LoadErpDataSuccessAction(data);
        }),
        catchError((error) => of(new LoadErpDataFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loadDataSuccess$ = this.actions$.pipe(
    ofType(ErpDealersActionTypes.LOAD_ERP_DATA_SUCCESS),
    tap((response: any) => {
      const infoMessage = this.translate.instant("fetch_erp_data_success");
      this.snackbar.open(infoMessage, "success");
    })
  );
}
