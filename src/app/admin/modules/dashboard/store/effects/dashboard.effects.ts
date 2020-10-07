import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { DashboardService } from "../../services";
import {
  DashboardActionTypes,
  LoadConsumersSmsAction,
  LoadConsumersSmsFailureAction,
  LoadConsumersSmsSuccessAction,
  LoadOrdersAmountAction,
  LoadOrdersAmountFailureAction,
  LoadOrdersAmountSuccessAction,
  LoadOrdersByPaymentMethodsAction,
  LoadOrdersByPaymentMethodsFailureAction,
  LoadOrdersByPaymentMethodsSuccessAction,
} from "../actions";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadConsumers$ = this.actions$.pipe(
    ofType<LoadConsumersSmsAction>(DashboardActionTypes.LOAD_CONSUMERS_SMS),
    mergeMap((d) =>
      this.dashboardService.getConsumersSMS().pipe(
        map((data) => {
          return new LoadConsumersSmsSuccessAction(data);
        }),
        catchError((error) => of(new LoadConsumersSmsFailureAction(error)))
      )
    )
  );

  @Effect() loadOrdersAmount$ = this.actions$.pipe(
    ofType<LoadOrdersAmountAction>(DashboardActionTypes.LOAD_ORDERS_AMOUNT),
    mergeMap((d) =>
      this.dashboardService.getOrdersAmount(d.param).pipe(
        map((data) => {
          return new LoadOrdersAmountSuccessAction(data);
        }),
        catchError((error) => of(new LoadOrdersAmountFailureAction(error)))
      )
    )
  );

  @Effect() loadOrdersByPaymentMethos$ = this.actions$.pipe(
    ofType<LoadOrdersByPaymentMethodsAction>(
      DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS
    ),
    mergeMap((d) =>
      this.dashboardService.getOrdersByPaymentMethods(d.param).pipe(
        map((data) => {
          return new LoadOrdersByPaymentMethodsSuccessAction(data);
        }),
        catchError((error) =>
          of(new LoadOrdersByPaymentMethodsFailureAction(error))
        )
      )
    )
  );
}
