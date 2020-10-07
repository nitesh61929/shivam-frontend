import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { UpdateDeliveryLocationSuccessAction } from "@shared/store";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { IBackendOperator } from "../../interfaces";
import { BackendOperatorService } from "../../services/backend-operator.service";
import {
  AddBackendOperatorAction,
  AddBackendOperatorFailureAction,
  AddBackendOperatorSuccessAction,
  BackendOperatorActionTypes,
  GetBackendOperatorAction,
  GetBackendOperatorFailureAction,
  GetBackendOperatorSuccessAction,
  LoadBackendOperatorAction,
  LoadBackendOperatorFailureAction,
  LoadBackendOperatorSuccessAction,
  UpdateBackendOperatorAction,
  UpdateBackendOperatorFailureAction,
  UpdateBackendOperatorSuccessAction,
} from "../actions/backend-operator.actions";

@Injectable()
export class BackendOperatorEffects {
  constructor(
    private actions$: Actions,
    private backendOperatorService: BackendOperatorService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() addBackendOperator$ = this.actions$.pipe(
    ofType<AddBackendOperatorAction>(
      BackendOperatorActionTypes.ADD_BACKEND_OPERATOR
    ),
    mergeMap((data) =>
      this.backendOperatorService.createBackEndOperator(data.payload).pipe(
        map(() => new AddBackendOperatorSuccessAction(data.payload)),
        catchError((error) => of(new AddBackendOperatorFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addBackendOperatorSuccess$ = this.actions$.pipe(
    ofType<AddBackendOperatorSuccessAction>(
      BackendOperatorActionTypes.ADD_BACKEND_OPERATOR_SUCCESS
    ),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() updateBackendOperator$ = this.actions$.pipe(
    ofType<UpdateBackendOperatorAction>(
      BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR
    ),
    mergeMap((data) =>
      this.backendOperatorService
        .updateBackEndOperator(data.id, data.payload)
        .pipe(
          map(() => new UpdateBackendOperatorSuccessAction(data.payload)),
          catchError((error) =>
            of(new UpdateBackendOperatorFailureAction(error))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  updateBackendOperatorSuccess$ = this.actions$.pipe(
    ofType<UpdateDeliveryLocationSuccessAction>(
      BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR_SUCCESS
    ),
    tap((response: any) => {
      const infoMessage = this.translate.instant("item_updated_message");
      this.router.navigateByUrl(AppRoutes.BACKEND_OPERATOR_PAGE);
      this.snackbar.open(infoMessage, "success");
    })
  );

  @Effect() loadBackendOperator$ = this.actions$.pipe(
    ofType<LoadBackendOperatorAction>(
      BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR
    ),
    mergeMap((d) =>
      this.backendOperatorService.getBackendOperators(d.param).pipe(
        map((data) => {
          return new LoadBackendOperatorSuccessAction(data);
        }),
        catchError((error) => of(new LoadBackendOperatorFailureAction(error)))
      )
    )
  );

  @Effect() getBackendPerator$ = this.actions$.pipe(
    ofType<GetBackendOperatorAction>(
      BackendOperatorActionTypes.GET_BACKEND_OPERATOR
    ),
    mergeMap((data) =>
      this.backendOperatorService.getBackendOperatorDetail(data.id).pipe(
        map((backendOperator) => {
          return new GetBackendOperatorSuccessAction(backendOperator);
        }),
        catchError((error) => of(new GetBackendOperatorFailureAction(error)))
      )
    )
  );

  onSuccess(backendOperatorResponse: IBackendOperator) {
    const infoMessage = this.translate.instant("item_added_message");
    this.router.navigateByUrl(AppRoutes.BACKEND_OPERATOR_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
