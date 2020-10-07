import { IPagination, IUser } from "@core/interfaces";
import { UserActions, UserActionTypes } from "../actions";

export interface IUserState {
  list: IUser[];
  pagination: IPagination | null;
  detail: IUser;
  loading: boolean;
  error: Error;
}

const initialUserState: IUserState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function UserReducer(
  state: IUserState = initialUserState,
  action: UserActions
) {
  switch (action.type) {
    case UserActionTypes.LOAD_USER:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        list: [],
        loading: false,
      };

    case UserActionTypes.GET_USER:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user.payload,
        loading: false,
      };

    case UserActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UserActionTypes.GET_DEALER_ALLOCATIONS:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.GET_DEALER_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allocations: action.payload.payload,
        loading: false,
      };

    case UserActionTypes.GET_DEALER_ALLOCATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UserActionTypes.TOGGLE_USER:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.TOGGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UserActionTypes.TOGGLE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UserActionTypes.EDIT_USER:
      return {
        ...state,
        loading: true,
      };

    case UserActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case UserActionTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
