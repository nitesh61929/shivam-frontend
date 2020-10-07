import { createFeatureSelector } from "@ngrx/store";
import { IPermissionState, PermissionReducer } from "../reducers";
import * as auth from "../reducers/auth.reducer";
import { IUserState, UserReducer } from "../reducers/user.reducer.";

export interface CoreState {
  authState: auth.IAuthState;
  userState: IUserState;
  permissionState: IPermissionState;
}

export const coreReducers = {
  auth: auth.reducer,
  user: UserReducer,
  permission: PermissionReducer,
};

export const selectAuthState = createFeatureSelector<CoreState>("core");
