import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { IPrice, PriceService } from "@shared/price";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import {
  DeletePriceAction,
  DeletePriceFailureAction,
  DeletePriceSuccessAction,
  GetPriceAction,
  GetPriceFailureAction,
  GetPriceSuccessAction,
  LoadPriceAction,
  LoadPriceFailureAction,
  LoadPriceSuccessAction,
  PriceActionTypes,
  UpdatePriceAction,
  UpdatePriceFailureAction,
  UpdatePriceSuccessAction,
} from "../actions";
import {
  AddPriceAction,
  AddPriceFailureAction,
  AddPriceSuccessAction,
} from "../actions/price.actions";

@Injectable()
export class PriceEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService,
    private priceService: PriceService
  ) {}

  @Effect() loadPrice$ = this.actions$.pipe(
    ofType<LoadPriceAction>(PriceActionTypes.LOAD_PRICE),
    mergeMap((d) =>
      this.priceService.getPrices(d.param).pipe(
        map((data) => {
          return new LoadPriceSuccessAction(data);
        }),
        catchError((error) => of(new LoadPriceFailureAction(error)))
      )
    )
  );

  @Effect() updatePrice$ = this.actions$.pipe(
    ofType<UpdatePriceAction>(PriceActionTypes.UPDATE_PRICE),
    mergeMap((data) =>
      this.priceService.updatePrice(data.id, data.payload).pipe(
        map(() => new UpdatePriceSuccessAction(data.payload)),
        catchError((error) => of(new UpdatePriceFailureAction(error)))
      )
    )
  );

  @Effect() addPrice$ = this.actions$.pipe(
    ofType<AddPriceAction>(PriceActionTypes.ADD_PRICE),
    mergeMap((data) =>
      this.priceService.addPrice(data.payload).pipe(
        map(() => new AddPriceSuccessAction(data.payload)),
        catchError((error) => of(new AddPriceFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  addPriceSuccess$ = this.actions$.pipe(
    ofType(PriceActionTypes.ADD_PRICE_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect({ dispatch: false })
  addPriceFailure$ = this.actions$.pipe(
    ofType(PriceActionTypes.ADD_PRICE_FAILURE),
    tap((error: any) => {
      this.snackbar.open(error.payload.error.message, "danger");
    })
  );

  @Effect({ dispatch: false })
  updatePriceSuccess$ = this.actions$.pipe(
    ofType(PriceActionTypes.UPDATE_PRICE_SUCCESS),
    tap((response: any) => {
      this.onSuccess(response.payload);
    })
  );

  @Effect() getPrice$ = this.actions$.pipe(
    ofType<GetPriceAction>(PriceActionTypes.GET_PRICE),
    mergeMap((data) =>
      this.priceService.getPriceDetail(data.id).pipe(
        map((price) => {
          return new GetPriceSuccessAction(price);
        }),
        catchError((error) => of(new GetPriceFailureAction(error)))
      )
    )
  );

  @Effect() deletePrice$ = this.actions$.pipe(
    ofType<DeletePriceAction>(PriceActionTypes.DELETE_PRICE),
    mergeMap((data) =>
      this.priceService.deletePrice(data.id).pipe(
        map(() => new DeletePriceSuccessAction(data.id)),
        catchError((error) => of(new DeletePriceFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  deletePriceSuccess$ = this.actions$.pipe(
    ofType(PriceActionTypes.DELETE_PRICE_SUCCESS),
    tap((response) => {
      this.snackbar.open(
        this.translate.instant("item_deleted_message"),
        "success"
      );
    })
  );

  onSuccess(price: IPrice) {
    const infoMessage = price.id
      ? this.translate.instant("item_updated_message")
      : this.translate.instant("item_added_message");

    this.snackbar.open(infoMessage, "success");
  }
}
