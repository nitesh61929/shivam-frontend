import { IPermissions } from "@core/interfaces/permission";
import { PermissionActions, PermissionActionTypes } from "../actions";

export interface IPermissionState {
  list: IPermissions[];
  loading: boolean;
  error: Error;
}

const initialPermissionState: IPermissionState = {
  list: [],
  loading: false,
  error: undefined,
};

export function PermissionReducer(
  state: IPermissionState = initialPermissionState,
  action: PermissionActions
) {
  switch (action.type) {
    case PermissionActionTypes.LOAD_PERMISSION:
      return {
        ...state,
        loading: true,
      };

    case PermissionActionTypes.LOAD_PERMISSION_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case PermissionActionTypes.LOAD_PERMISSION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
