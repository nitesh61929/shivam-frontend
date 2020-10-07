import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum UserActionTypes {
  LOAD_USER = "[USER] Load Users",
  LOAD_USER_SUCCESS = "[USER] Load User Success",
  LOAD_USER_FAILURE = "[USER] Load User Failure",
  TOGGLE_USER = "[USER] Toggle User",
  TOGGLE_USER_SUCCESS = "[USER] Toggle User Success",
  TOGGLE_USER_FAILURE = "[USER] Toggle User Failure",
  GET_USER = "[USER] Get Users",
  GET_USER_SUCCESS = "[USER] Get User Success",
  GET_USER_FAILURE = "[USER] Get User Failure",
  GET_DEALER_ALLOCATIONS = "[USER] Get Dealer Allocations",
  GET_DEALER_ALLOCATIONS_SUCCESS = "[USER] Get Dealer Allocations Success",
  GET_DEALER_ALLOCATIONS_FAILURE = "[USER] Get Dealer Allocations Failure",
  EDIT_USER = "[USER] Edit Users",
  EDIT_USER_SUCCESS = "[USER] Edit User Success",
  EDIT_USER_FAILURE = "[USER] Edit User Failure",
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER;

  constructor(public param: any) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadUserSuccessAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadUserFailureAction implements Action {
  readonly type = UserActionTypes.LOAD_USER_FAILURE;

  constructor(public payload: string) {}
}

export class ToggleUserAction implements Action {
  readonly type = UserActionTypes.TOGGLE_USER;

  constructor(public id: number, public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class ToggleUserSuccessAction implements Action {
  readonly type = UserActionTypes.TOGGLE_USER_SUCCESS;

  constructor(public payload: any) {}
}

export class ToggleUserFailureAction implements Action {
  readonly type = UserActionTypes.TOGGLE_USER_FAILURE;

  constructor(public payload: string) {}
}

export class GetUserAction implements Action {
  readonly type = UserActionTypes.GET_USER;

  constructor(public userId: number) {}
}

export class GetUserSuccessAction implements Action {
  readonly type = UserActionTypes.GET_USER_SUCCESS;

  constructor(public user: any) {}
}

export class GetUserFailureAction implements Action {
  readonly type = UserActionTypes.GET_USER_FAILURE;

  constructor(public payload: any) {}
}

export class GetDealerAllocationsAction implements Action {
  readonly type = UserActionTypes.GET_DEALER_ALLOCATIONS;

  constructor(public dealerId: number) {}
}

export class GetDealerAllocationsSuccessAction implements Action {
  readonly type = UserActionTypes.GET_DEALER_ALLOCATIONS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDealerAllocationsFailureAction implements Action {
  readonly type = UserActionTypes.GET_DEALER_ALLOCATIONS_FAILURE;

  constructor(public payload: any) {}
}

export class EditUserAction implements Action {
  readonly type = UserActionTypes.EDIT_USER;

  constructor(public userId: number, public payload: any) {}
}

export class EditUserSuccessAction implements Action {
  readonly type = UserActionTypes.EDIT_USER_SUCCESS;

  constructor(public payload: any) {}
}

export class EditUserFailureAction implements Action {
  readonly type = UserActionTypes.EDIT_USER_FAILURE;

  constructor(public payload: Error) {}
}

export type UserActions =
  | LoadUserAction
  | LoadUserSuccessAction
  | LoadUserFailureAction
  | ToggleUserAction
  | ToggleUserSuccessAction
  | ToggleUserFailureAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | GetDealerAllocationsAction
  | GetDealerAllocationsSuccessAction
  | GetDealerAllocationsFailureAction
  | EditUserAction
  | EditUserSuccessAction
  | EditUserFailureAction;
