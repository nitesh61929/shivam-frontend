import { IPagination } from "@core/interfaces";
import { IBackendOperator } from "../../interfaces";
import {
  BackendOperatorActions,
  BackendOperatorActionTypes,
} from "../actions/backend-operator.actions";

export interface IBackendOperatorState {
  list: IBackendOperator[];
  detail: IBackendOperator;
  loading: boolean;
  pagination: IPagination;
  error: Error;
}

const initialBackendOperatorState: IBackendOperatorState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function BackendOperatorReducer(
  state: IBackendOperatorState = initialBackendOperatorState,
  action: BackendOperatorActions
) {
  switch (action.type) {
    case BackendOperatorActionTypes.ADD_BACKEND_OPERATOR:
      return {
        ...state,
        loading: true,
      };

    case BackendOperatorActionTypes.ADD_BACKEND_OPERATOR_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case BackendOperatorActionTypes.ADD_BACKEND_OPERATOR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR:
      return {
        ...state,
        loading: true,
      };

    case BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case BackendOperatorActionTypes.UPDATE_BACKEND_OPERATOR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR:
      return {
        ...state,
        loading: true,
      };

    case BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case BackendOperatorActionTypes.LOAD_BACKEND_OPERATOR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case BackendOperatorActionTypes.GET_BACKEND_OPERATOR:
      return {
        ...state,
        loading: true,
      };

    case BackendOperatorActionTypes.GET_BACKEND_OPERATOR_SUCCESS:
      return {
        ...state,
        detail: action.payload.payload,
        loading: false,
      };

    case BackendOperatorActionTypes.GET_BACKEND_OPERATOR_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
