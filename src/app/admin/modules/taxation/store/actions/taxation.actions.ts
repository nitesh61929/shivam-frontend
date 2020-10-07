import { IServerResponse } from "@core/interfaces";
import { Action } from "@ngrx/store";

export enum TaxationActionTypes {
  LOAD_TAXATION = "[Taxation] Load Taxation",
  LOAD_TAXATION_SUCCESS = "[Taxation] Load Taxation Success",
  LOAD_TAXATION_FAILURE = "[Taxation] Load Taxation Failure",
  UPDATE_TAXATION = "[Taxation] Update Taxation",
  UPDATE_TAXATION_SUCCESS = "[Taxation] Update Taxation Success",
  UPDATE_TAXATION_FAILURE = "[Taxation] Update Taxation Failure",
  GET_TAXATION = "[Taxation] Get Taxation",
  GET_TAXATION_SUCCESS = "[Taxation] Get Taxation Success",
  GET_TAXATION_FAILURE = "[Taxation] Get Taxation Failure",
}

export class LoadTaxationAction implements Action {
  readonly type = TaxationActionTypes.LOAD_TAXATION;
}

export class LoadTaxationSuccessAction implements Action {
  readonly type = TaxationActionTypes.LOAD_TAXATION_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class LoadTaxationFailureAction implements Action {
  readonly type = TaxationActionTypes.LOAD_TAXATION_FAILURE;

  constructor(public payload: string) {}
}

export class UpdateTaxationAction implements Action {
  readonly type = TaxationActionTypes.UPDATE_TAXATION;

  constructor(public payload: any) {}
}
export class UpdateTaxationSuccessAction implements Action {
  readonly type = TaxationActionTypes.UPDATE_TAXATION_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class UpdateTaxationFailureAction implements Action {
  readonly type = TaxationActionTypes.UPDATE_TAXATION_FAILURE;

  constructor(public payload: Error) {}
}

export class GetTaxationAction implements Action {
  readonly type = TaxationActionTypes.GET_TAXATION;

  constructor(public id: number) {}
}

export class GetTaxationSuccessAction implements Action {
  readonly type = TaxationActionTypes.GET_TAXATION_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class GetTaxationFailureAction implements Action {
  readonly type = TaxationActionTypes.GET_TAXATION_FAILURE;

  constructor(public payload: Error) {}
}

export type TaxationActions =
  | LoadTaxationAction
  | LoadTaxationSuccessAction
  | LoadTaxationFailureAction
  | UpdateTaxationAction
  | UpdateTaxationSuccessAction
  | UpdateTaxationFailureAction
  | GetTaxationAction
  | GetTaxationSuccessAction
  | GetTaxationFailureAction;
