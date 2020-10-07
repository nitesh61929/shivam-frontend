import { IParameter, IServerResponse } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum BackendOperatorActionTypes {
  ADD_BACKEND_OPERATOR = "[BACKEND_OPERATOR] Add Backend Operator",
  ADD_BACKEND_OPERATOR_SUCCESS = "[BACKEND_OPERATOR] Add Backend Operator Success",
  ADD_BACKEND_OPERATOR_FAILURE = "[BACKEND_OPERATOR] Add Backend Operator Failure",
  UPDATE_BACKEND_OPERATOR = "[BACKEND_OPERATOR] Update Backend Operator",
  UPDATE_BACKEND_OPERATOR_SUCCESS = "[BACKEND_OPERATOR] Update Backend Operator Success",
  UPDATE_BACKEND_OPERATOR_FAILURE = "[BACKEND_OPERATOR] Update Backend Operator Failure",
  LOAD_BACKEND_OPERATOR = "[BACKEND_OPERATOR] Load Backend Operator",
  LOAD_BACKEND_OPERATOR_SUCCESS = "[BACKEND_OPERATOR] Load Backend Operator Success",
  LOAD_BACKEND_OPERATOR_FAILURE = "[BACKEND_OPERATOR] Load Backend Operator Failure",
  GET_BACKEND_OPERATOR = "[BACKEND_OPERATOR] Get Backend Operator",
  GET_BACKEND_OPERATOR_SUCCESS = "[BACKEND_OPERATOR] Get Backend Operator Success",
  GET_BACKEND_OPERATOR_FAILURE = "[BACKEND_OPERATOR] Get Backend Operator Failure",
}

export class AddBackendOperatorAction implements Action {
  readonly type = BackendOperatorActionTypes.ADD_BACKEND_OPERATOR;

  constructor(public payload: any) {}
}
export class AddBackendOperatorSuccessAction implements Action {
  readonly type = BackendOperatorActionTypes.ADD_BACKEND_OPERATOR_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class AddBackendOperatorFailureAction implements Action {
  readonly type = BackendOperatorActionTypes.ADD_BACKEND_OPERATOR_FAILURE;

  constructor(public payload: Error) {}
}

export class UpdateBackendOperatorAction implements Action {
  readonly type = BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR;

  constructor(public id: number, public payload: any) {}
}
export class UpdateBackendOperatorSuccessAction implements Action {
  readonly type = BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class UpdateBackendOperatorFailureAction implements Action {
  readonly type = BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR_FAILURE;

  constructor(public payload: Error) {}
}

export class LoadBackendOperatorAction implements Action {
  readonly type = BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadBackendOperatorSuccessAction implements Action {
  readonly type = BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadBackendOperatorFailureAction implements Action {
  readonly type = BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR_FAILURE;

  constructor(public payload: string) {}
}

export class GetBackendOperatorAction implements Action {
  readonly type = BackendOperatorActionTypes.GET_BACKEND_OPERATOR;

  constructor(public id: number) {}
}

export class GetBackendOperatorSuccessAction implements Action {
  readonly type = BackendOperatorActionTypes.GET_BACKEND_OPERATOR_SUCCESS;

  constructor(public payload: any) {}
}

export class GetBackendOperatorFailureAction implements Action {
  readonly type = BackendOperatorActionTypes.GET_BACKEND_OPERATOR_FAILURE;

  constructor(public payload: any) {}
}

export type BackendOperatorActions =
  | AddBackendOperatorAction
  | AddBackendOperatorSuccessAction
  | AddBackendOperatorFailureAction
  | UpdateBackendOperatorAction
  | UpdateBackendOperatorSuccessAction
  | UpdateBackendOperatorFailureAction
  | LoadBackendOperatorAction
  | LoadBackendOperatorSuccessAction
  | LoadBackendOperatorFailureAction
  | GetBackendOperatorAction
  | GetBackendOperatorSuccessAction
  | GetBackendOperatorFailureAction;
