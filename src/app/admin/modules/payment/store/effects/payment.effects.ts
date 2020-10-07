import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { IPayment } from "../../interfaces";
import { PaymentService } from "../../services";
import {
  LoadPaymentAction,
  LoadPaymentFailureAction,
  LoadPaymentSuccessAction,
  PaymentActionTypes,
  UpdatePaymentStatusAction,
  UpdatePaymentStatusFailureAction,
  UpdatePaymentStatusSuccessAction,
} from "../actions";

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private store: Store<any>
  ) {}

  @Effect() loadPaymentMethods$ = this.actions$.pipe(
    ofType<LoadPaymentAction>(PaymentActionTypes.LOAD_PAYMENT),
    mergeMap((d) =>
      this.paymentService.getPaymentMethods(d.param).pipe(
        map((data) => {
          return new LoadPaymentSuccessAction(data);
        }),
        catchError((error) => of(new LoadPaymentFailureAction(error)))
      )
    )
  );

  @Effect() updatePaymentMethod$ = this.actions$.pipe(
    ofType<UpdatePaymentStatusAction>(PaymentActionTypes.UPDATE_PAYMENT_STATUS),
    mergeMap((data) =>
      this.paymentService.updatePaymentMethod(data.id, data.payload).pipe(
        map(() => new UpdatePaymentStatusSuccessAction(data.payload)),
        catchError((error) => of(new UpdatePaymentStatusFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  updatePaymentSuccess$ = this.actions$.pipe(
    ofType<UpdatePaymentStatusSuccessAction>(
      PaymentActionTypes.UPDATE_PAYMENT_STATUS_SUCCESS
    ),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  onSuccess(paymentResponse: IPayment) {
    const infoMessage = this.translate.instant("item_updated_message");
    this.snackbar.open(infoMessage, "success");
  }
}
