import { Action } from "@ngrx/store";

export enum PermissionActionTypes {
  LOAD_PERMISSION = "[PERMISSION] Load Permission",
  LOAD_PERMISSION_SUCCESS = "[PERMISSION] Load Permission Success",
  LOAD_PERMISSION_FAILURE = "[PERMISSION] Load Permission Failure",
}

export class LoadPermissionAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSION;

  constructor() {}
}

export class LoadPermissionSuccessAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSION_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadPermissionFailureAction implements Action {
  readonly type = PermissionActionTypes.LOAD_PERMISSION_FAILURE;

  constructor(public payload: string) {}
}

export type PermissionActions =
  | LoadPermissionAction
  | LoadPermissionSuccessAction
  | LoadPermissionFailureAction;
