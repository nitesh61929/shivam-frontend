import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum DashboardActionTypes {
  LOAD_CONSUMERS_SMS = "[DASHBOARD] Load Consumers SMS",
  LOAD_CONSUMERS_SMS_SUCCESS = "[DASHBOARD] Load Consumers SMS Success",
  LOAD_CONSUMERS_SMS_FAILURE = "[DASHBOARD] Load Consumers SMS Failure",
  LOAD_ORDERS_AMOUNT = "[DASHBOARD] Load Orders Amount",
  LOAD_ORDERS_AMOUNT_SUCCESS = "[DASHBOARD] Load Orders Amount Success",
  LOAD_ORDERS_AMOUNT_FAILURE = "[DASHBOARD] Load Orders Amount Failure",
  LOAD_ORDERS_BY_PAYMENT_METHODS = "[DASHBOARD] Load Orders By Payment Methods",
  LOAD_ORDERS_BY_PAYMENT_METHODS_SUCCESS = "[DASHBOARD] Load Orders By Payment Methods Success",
  LOAD_ORDERS_BY_PAYMENT_METHODS_FAILURE = "[DASHBOARD] Load Orders By Payment Methods Failure",
}

export class LoadConsumersSmsAction implements Action {
  readonly type = DashboardActionTypes.LOAD_CONSUMERS_SMS;

  constructor() {}
}

export class LoadConsumersSmsSuccessAction implements Action {
  readonly type = DashboardActionTypes.LOAD_CONSUMERS_SMS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadConsumersSmsFailureAction implements Action {
  readonly type = DashboardActionTypes.LOAD_CONSUMERS_SMS_FAILURE;

  constructor(public payload: string) {}
}

export class LoadOrdersAmountAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_AMOUNT;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadOrdersAmountSuccessAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_AMOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadOrdersAmountFailureAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_AMOUNT_FAILURE;

  constructor(public payload: string) {}
}

export class LoadOrdersByPaymentMethodsAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadOrdersByPaymentMethodsSuccessAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadOrdersByPaymentMethodsFailureAction implements Action {
  readonly type = DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS_FAILURE;

  constructor(public payload: string) {}
}

export type DashboardActions =
  | LoadConsumersSmsAction
  | LoadConsumersSmsSuccessAction
  | LoadConsumersSmsFailureAction
  | LoadOrdersAmountAction
  | LoadOrdersAmountSuccessAction
  | LoadOrdersAmountFailureAction
  | LoadOrdersByPaymentMethodsAction
  | LoadOrdersByPaymentMethodsSuccessAction
  | LoadOrdersByPaymentMethodsFailureAction;
