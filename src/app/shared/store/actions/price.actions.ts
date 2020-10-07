import { IParameter, IServerResponse } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum PriceActionTypes {
  LOAD_PRICE = "[PRICE] Load Price",
  LOAD_PRICE_SUCCESS = "[PRICE] Load Price Success",
  LOAD_PRICE_FAILURE = "[PRICE] Load Price Failure",
  ADD_PRICE = "[PRICE] Add Price",
  ADD_PRICE_SUCCESS = "[PRICE] Add Price Success",
  ADD_PRICE_FAILURE = "[PRICE] Add Price Failure",
  UPDATE_PRICE = "[PRICE] Update Price",
  UPDATE_PRICE_SUCCESS = "[PRICE] Update Price Success",
  UPDATE_PRICE_FAILURE = "[PRICE] Update Price Failure",
  GET_PRICE = "[PRICE] Get Price",
  GET_PRICE_SUCCESS = "[PRICE] Get Price Success",
  GET_PRICE_FAILURE = "[PRICE] Get Price Failure",
  DELETE_PRICE = "[PRICE] Delete Price",
  DELETE_PRICE_SUCCESS = "[PRICE] Delete Price Success",
  DELETE_PRICE_FAILURE = "[PRICE] Delete Price Failure",
}

export class LoadPriceAction implements Action {
  readonly type = PriceActionTypes.LOAD_PRICE;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadPriceSuccessAction implements Action {
  readonly type = PriceActionTypes.LOAD_PRICE_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPriceFailureAction implements Action {
  readonly type = PriceActionTypes.LOAD_PRICE_FAILURE;

  constructor(public payload: string) {}
}

export class AddPriceAction implements Action {
  readonly type = PriceActionTypes.ADD_PRICE;

  constructor(public payload: any) {}
}
export class AddPriceSuccessAction implements Action {
  readonly type = PriceActionTypes.ADD_PRICE_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class AddPriceFailureAction implements Action {
  readonly type = PriceActionTypes.ADD_PRICE_FAILURE;

  constructor(public payload: Error) {}
}

export class UpdatePriceAction implements Action {
  readonly type = PriceActionTypes.UPDATE_PRICE;

  constructor(public id: number, public payload: any) {}
}
export class UpdatePriceSuccessAction implements Action {
  readonly type = PriceActionTypes.UPDATE_PRICE_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class UpdatePriceFailureAction implements Action {
  readonly type = PriceActionTypes.UPDATE_PRICE_FAILURE;

  constructor(public payload: Error) {}
}

export class GetPriceAction implements Action {
  readonly type = PriceActionTypes.GET_PRICE;

  constructor(public id: number) {}
}

export class GetPriceSuccessAction implements Action {
  readonly type = PriceActionTypes.GET_PRICE_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class GetPriceFailureAction implements Action {
  readonly type = PriceActionTypes.GET_PRICE_FAILURE;

  constructor(public payload: Error) {}
}

export class DeletePriceAction implements Action {
  readonly type = PriceActionTypes.DELETE_PRICE;

  constructor(public id: number) {}
}

export class DeletePriceSuccessAction implements Action {
  readonly type = PriceActionTypes.DELETE_PRICE_SUCCESS;

  constructor(public id: number) {}
}

export class DeletePriceFailureAction implements Action {
  readonly type = PriceActionTypes.DELETE_PRICE_FAILURE;

  constructor(public payload: string) {}
}

export type PriceActions =
  | LoadPriceAction
  | LoadPriceSuccessAction
  | LoadPriceFailureAction
  | UpdatePriceAction
  | UpdatePriceSuccessAction
  | UpdatePriceFailureAction
  | GetPriceAction
  | GetPriceSuccessAction
  | GetPriceFailureAction
  | DeletePriceAction
  | DeletePriceSuccessAction
  | DeletePriceSuccessAction
  | DeletePriceFailureAction
  | AddPriceAction
  | AddPriceSuccessAction
  | AddPriceFailureAction;
