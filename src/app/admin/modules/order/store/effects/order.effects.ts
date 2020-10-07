import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes } from "@core/enums";
import { SnackBarService } from "@core/services";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin, of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { OrderService } from "../../services/order.service";
import {
  AllocateOrderAction,
  AllocateOrderFailureAction,
  AllocateOrderSuccessAction,
  CancelOrderAction,
  CancelOrderFailureAction,
  CancelOrderSuccessAction,
  GetOrderAction,
  GetOrderFailureAction,
  GetOrderSuccessAction,
  LoadOrderAction,
  LoadOrderFailureAction,
  LoadOrderSuccessAction,
  OrderActionTypes,
  RevokeOrderAction,
  RevokeOrderFailureAction,
  RevokeOrderSuccessAction,
} from "../actions";

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router,
    private snackbar: SnackBarService,
    private translate: TranslateService
  ) {}

  @Effect() loadOrder$ = this.actions$.pipe(
    ofType<LoadOrderAction>(OrderActionTypes.LOAD_ORDER),
    mergeMap((d) =>
      forkJoin([
        this.orderService.getOrders(d.param),
        this.orderService.getOrderGrandTotal(d.param),
      ]).pipe(
        map((data) => {
          return new LoadOrderSuccessAction(data[0], data[1]);
        }),
        catchError((error) => of(new LoadOrderFailureAction(error)))
      )
    )
  );

  @Effect() allocateOrder$ = this.actions$.pipe(
    ofType<AllocateOrderAction>(OrderActionTypes.ALLOCATE_ORDER),
    mergeMap((data) =>
      this.orderService.allocateOrder(data.id, data.payload).pipe(
        map(() => new AllocateOrderSuccessAction(data.payload)),
        catchError((error) => of(new AllocateOrderFailureAction(error)))
      )
    )
  );

  @Effect() revokeOrder$ = this.actions$.pipe(
    ofType<RevokeOrderAction>(OrderActionTypes.REVOKE_ORDER),
    mergeMap((data: any) =>
      this.orderService.revokeOrder(data.orderId, data.allocationId).pipe(
        map(() => new RevokeOrderSuccessAction(data.payload)),
        catchError((error) => of(new RevokeOrderFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  allocateOrderSuccess$ = this.actions$.pipe(
    ofType<AllocateOrderSuccessAction>(OrderActionTypes.ALLOCATE_ORDER_SUCCESS),
    tap((response: any) => {
      this.onAllocateSuccess();
    })
  );

  @Effect({ dispatch: false })
  revokeOrderSuccess$ = this.actions$.pipe(
    ofType<RevokeOrderSuccessAction>(OrderActionTypes.REVOKE_ORDER_SUCCESS),
    tap((response: any) => {
      this.onRevokeSuccess();
    })
  );

  @Effect() getOrderDetail$ = this.actions$.pipe(
    ofType<GetOrderAction>(OrderActionTypes.GET_ORDER),
    mergeMap((data) =>
      this.orderService.getOrderDetail(data.id).pipe(
        map((taxation) => {
          return new GetOrderSuccessAction(taxation);
        }),
        catchError((error) => of(new GetOrderFailureAction(error)))
      )
    )
  );

  @Effect() cancelOrder$ = this.actions$.pipe(
    ofType<CancelOrderAction>(OrderActionTypes.CANCEL_ORDER),
    mergeMap((data: any) =>
      this.orderService.cancelOrder(data.orderId, data.payload).pipe(
        map(() => new CancelOrderSuccessAction(data.payload)),
        catchError((error) => of(new CancelOrderFailureAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  cancelOrderSuccess$ = this.actions$.pipe(
    ofType<CancelOrderSuccessAction>(OrderActionTypes.CANCEL_ORDER_SUCCESS),
    tap((response: any) => {
      this.onCancelOrderSuccess();
    })
  );

  onCancelOrderSuccess() {
    const infoMessage = this.translate.instant("cancel_order_success");
    this.router.navigateByUrl(AppRoutes.ORDERS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }

  onAllocateSuccess() {
    const infoMessage = this.translate.instant("order_assign_success");
    this.router.navigateByUrl(AppRoutes.ORDERS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }

  onRevokeSuccess() {
    const infoMessage = this.translate.instant("order_revoke_success");
    this.router.navigateByUrl(AppRoutes.ORDERS_PAGE);
    this.snackbar.open(infoMessage, "success");
  }
}
