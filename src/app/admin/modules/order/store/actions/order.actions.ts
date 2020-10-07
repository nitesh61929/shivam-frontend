import { IParameter, IServerResponse } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum OrderActionTypes {
  LOAD_ORDER = "[ORDER] Load Order",
  LOAD_ORDER_SUCCESS = "[ORDER] Load Order Success",
  LOAD_ORDER_FAILURE = "[ORDER] Load Order Failure",
  GET_ORDER = "[ORDER] Get Order",
  GET_ORDER_SUCCESS = "[ORDER] Get Order Success",
  GET_ORDER_FAILURE = "[ORDER] Get Order Failure",
  ALLOCATE_ORDER = "[ORDER] Allocate Order",
  ALLOCATE_ORDER_SUCCESS = "[ORDER] Allocate Order Success",
  ALLOCATE_ORDER_FAILURE = "[ORDER] Allocate Order Failure",
  REVOKE_ORDER = "[ORDER] Revoke Order",
  REVOKE_ORDER_SUCCESS = "[ORDER] Revoke Order Success",
  REVOKE_ORDER_FAILURE = "[ORDER] Revoke Order Failure",
  CANCEL_ORDER = "[ORDER] Cancel Order",
  CANCEL_ORDER_SUCCESS = "[ORDER] Cancel Order Success",
  CANCEL_ORDER_FAILURE = "[ORDER] Cancel Order Failure",
}

export class LoadOrderAction implements Action {
  readonly type = OrderActionTypes.LOAD_ORDER;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadOrderSuccessAction implements Action {
  readonly type = OrderActionTypes.LOAD_ORDER_SUCCESS;

  constructor(
    public orderListPayload: any,
    public orderGrandTotalpayload: any
  ) {}
}

export class LoadOrderFailureAction implements Action {
  readonly type = OrderActionTypes.LOAD_ORDER_FAILURE;

  constructor(public payload: string) {}
}

export class GetOrderAction implements Action {
  readonly type = OrderActionTypes.GET_ORDER;

  constructor(public id: number) {}
}

export class GetOrderSuccessAction implements Action {
  readonly type = OrderActionTypes.GET_ORDER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class GetOrderFailureAction implements Action {
  readonly type = OrderActionTypes.GET_ORDER_FAILURE;

  constructor(public payload: Error) {}
}

export class AllocateOrderAction implements Action {
  readonly type = OrderActionTypes.ALLOCATE_ORDER;

  constructor(public id: number, public payload: any) {}
}

export class AllocateOrderSuccessAction implements Action {
  readonly type = OrderActionTypes.ALLOCATE_ORDER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class AllocateOrderFailureAction implements Action {
  readonly type = OrderActionTypes.ALLOCATE_ORDER_FAILURE;

  constructor(public payload: Error) {}
}

export class RevokeOrderAction implements Action {
  readonly type = OrderActionTypes.REVOKE_ORDER;

  constructor(public orderId: number, public allocationId: any) {}
}

export class RevokeOrderSuccessAction implements Action {
  readonly type = OrderActionTypes.REVOKE_ORDER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class RevokeOrderFailureAction implements Action {
  readonly type = OrderActionTypes.REVOKE_ORDER_FAILURE;

  constructor(public payload: Error) {}
}

export class CancelOrderAction implements Action {
  readonly type = OrderActionTypes.CANCEL_ORDER;

  constructor(public orderId: number, public payload: any) {}
}

export class CancelOrderSuccessAction implements Action {
  readonly type = OrderActionTypes.CANCEL_ORDER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class CancelOrderFailureAction implements Action {
  readonly type = OrderActionTypes.CANCEL_ORDER_FAILURE;

  constructor(public payload: Error) {}
}

export type OrderActions =
  | LoadOrderAction
  | LoadOrderSuccessAction
  | LoadOrderFailureAction
  | AllocateOrderAction
  | AllocateOrderSuccessAction
  | AllocateOrderFailureAction
  | GetOrderAction
  | GetOrderSuccessAction
  | GetOrderFailureAction
  | RevokeOrderAction
  | RevokeOrderSuccessAction
  | RevokeOrderFailureAction
  | CancelOrderAction
  | CancelOrderSuccessAction
  | CancelOrderFailureAction;
