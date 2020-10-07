import { IProfile, IUser } from "@core/interfaces";
import { AuthActions, AuthActionTypes } from "../actions";

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
  error: Error | null;
  loading: boolean;
  profile: IProfile;
}

export const initialAuthState: IAuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
  error: null,
  loading: false,
  profile: null,
};

export function reducer(
  state = initialAuthState,
  action: AuthActions
): IAuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.body.payload,
        errorMessage: null,
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: "Incorrect email and/or password.",
        error: action.payload.error,
      };
    }

    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null,
      };
    }

    case AuthActionTypes.GET_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case AuthActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload.payload,
        loading: false,
      };

    case AuthActionTypes.GET_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AuthActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        loading: true,
      };

    case AuthActionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case AuthActionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case AuthActionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        loading: true,
      };

    case AuthActionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case AuthActionTypes.UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default: {
      return state;
    }
  }
}
