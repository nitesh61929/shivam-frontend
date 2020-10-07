import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { ITaxation } from "../../interfaces";
import { TaxationService } from "../../services";
import {
  GetTaxationAction,
  GetTaxationFailureAction,
  GetTaxationSuccessAction,
  LoadTaxationAction,
  LoadTaxationFailureAction,
  LoadTaxationSuccessAction,
  TaxationActionTypes,
  UpdateTaxationAction,
  UpdateTaxationFailureAction,
  UpdateTaxationSuccessAction,
} from "../actions";

@Injectable()
export class TaxationEffects {
  constructor(
    private actions$: Actions,
    private taxationService: TaxationService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadTaxation$ = this.actions$.pipe(
    ofType<LoadTaxationAction>(TaxationActionTypes.LOAD_TAXATION),
    mergeMap(() =>
      this.taxationService.getCharges().pipe(
        map((data) => {
          return new LoadTaxationSuccessAction(data);
        }),
        catchError((error) => of(new LoadTaxationFailureAction(error)))
      )
    )
  );

  @Effect() updateTaxation$ = this.actions$.pipe(
    ofType<UpdateTaxationAction>(TaxationActionTypes.UPDATE_TAXATION),
    mergeMap((data) =>
      this.taxationService.updateCharge(data.payload).pipe(
        map(() => new UpdateTaxationSuccessAction(data.payload)),
        catchError((error) => of(new UpdateTaxationFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updateTaxationSuccess$ = this.actions$.pipe(
    ofType<UpdateTaxationSuccessAction>(
      TaxationActionTypes.UPDATE_TAXATION_SUCCESS
    ),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getTaxation$ = this.actions$.pipe(
    ofType<GetTaxationAction>(TaxationActionTypes.GET_TAXATION),
    mergeMap((data) =>
      this.taxationService.getChargeDetail(data.id).pipe(
        map((taxation) => {
          return new GetTaxationSuccessAction(taxation);
        }),
        catchError((error) => of(new GetTaxationFailureAction(error)))
      )
    )
  );

  onSuccess(taxationResponse: ITaxation) {
    const infoMessage = this.translate.instant("item_updated_message");
    this.router.navigateByUrl(AppRoutes.TAXATION_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
