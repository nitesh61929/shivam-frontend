import { IServerResponse } from "@core/interfaces";
import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  LOGIN_SUCCESS = "[Auth] Login Success",
  LOGIN_FAILURE = "[Auth] Login Failure",
  LOGOUT = "[Auth] Logout",
  LOGOUT_SUCCESS = "[Auth] Logout Success",
  GET_PROFILE = "[Auth] Get Profile",
  GET_PROFILE_SUCCESS = "[Auth] Get Profile Success",
  GET_PROFILE_FAILURE = "[Auth] Get Profile Failure",
  UPDATE_PROFILE = "[Auth] Update Profile",
  UPDATE_PROFILE_SUCCESS = "[Auth] Update Profile Success",
  UPDATE_PROFILE_FAILURE = "[Auth] Update Profile Failure",
  UPDATE_PASSWORD = "[Auth] Update Password",
  UPDATE_PASSWORD_SUCCESS = "[Auth] Update Password Success",
  UPDATE_PASSWORD_FAILURE = "[Auth] Update Password Failure",
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetProfileAction implements Action {
  readonly type = AuthActionTypes.GET_PROFILE;

  constructor() {}
}

export class GetProfileSuccessAction implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProfileFailureAction implements Action {
  readonly type = AuthActionTypes.GET_PROFILE_FAILURE;

  constructor(public payload: any) {}
}

export class UpdateProfileAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE;

  constructor(public payload: any) {}
}

export class UpdateProfileSuccessAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class UpdateProfileFailureAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PROFILE_FAILURE;

  constructor(public payload: Error) {}
}

export class UpdatePasswordAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PASSWORD;

  constructor(public payload: any) {}
}

export class UpdatePasswordSuccessAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PASSWORD_SUCCESS;

  constructor(public payload: IServerResponse) {}
}

export class UpdatePasswordFailureAction implements Action {
  readonly type = AuthActionTypes.UPDATE_PASSWORD_FAILURE;

  constructor(public payload: Error) {}
}

export type AuthActions =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | LogOut
  | LogOutSuccess
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileFailureAction
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UpdateProfileFailureAction
  | UpdatePasswordAction
  | UpdatePasswordSuccessAction
  | UpdatePasswordFailureAction;
