import { IParameter, IServerResponse } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum PaymentActionTypes {
  LOAD_PAYMENT = "[PAYMENT] Load Payment",
  LOAD_PAYMENT_SUCCESS = "[PAYMENT] Load Payment Success",
  LOAD_PAYMENT_FAILURE = "[PAYMENT] Load Payment Failure",
  UPDATE_PAYMENT_STATUS = "[PAYMENT] Update Payment status",
  UPDATE_PAYMENT_STATUS_SUCCESS = "[PAYMENT] Update Payment status Success",
  UPDATE_PAYMENT_STATUS_FAILURE = "[PAYMENT] Update Payment status Failure",
}

export class LoadPaymentAction implements Action {
  readonly type = PaymentActionTypes.LOAD_PAYMENT;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadPaymentSuccessAction implements Action {
  readonly type = PaymentActionTypes.LOAD_PAYMENT_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class LoadPaymentFailureAction implements Action {
  readonly type = PaymentActionTypes.LOAD_PAYMENT_FAILURE;

  constructor(public payload: string) {}
}

export class UpdatePaymentStatusAction implements Action {
  readonly type = PaymentActionTypes.UPDATE_PAYMENT_STATUS;

  constructor(public id: number, public payload: any) {}
}
export class UpdatePaymentStatusSuccessAction implements Action {
  readonly type = PaymentActionTypes.UPDATE_PAYMENT_STATUS_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class UpdatePaymentStatusFailureAction implements Action {
  readonly type = PaymentActionTypes.UPDATE_PAYMENT_STATUS_FAILURE;

  constructor(public payload: Error) {}
}

export type PaymentActions =
  | LoadPaymentAction
  | LoadPaymentSuccessAction
  | LoadPaymentFailureAction
  | UpdatePaymentStatusAction
  | UpdatePaymentStatusSuccessAction
  | UpdatePaymentStatusFailureAction;
