import { ITaxation } from "../../interfaces";
import { TaxationActions, TaxationActionTypes } from "../actions";

export interface ITaxationState {
  list: ITaxation[];
  detail: ITaxation;
  loading: boolean;
  error: Error;
}

const initialTaxationState: ITaxationState = {
  list: [],
  detail: null,
  loading: false,
  error: undefined,
};

export function TaxationReducer(
  state: ITaxationState = initialTaxationState,
  action: TaxationActions
) {
  switch (action.type) {
    case TaxationActionTypes.LOAD_TAXATION:
      return {
        ...state,
        loading: true,
      };

    case TaxationActionTypes.LOAD_TAXATION_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case TaxationActionTypes.LOAD_TAXATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TaxationActionTypes.UPDATE_TAXATION:
      return {
        ...state,
        loading: true,
      };

    case TaxationActionTypes.UPDATE_TAXATION_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case TaxationActionTypes.UPDATE_TAXATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case TaxationActionTypes.GET_TAXATION:
      return {
        ...state,
        loading: true,
      };

    case TaxationActionTypes.GET_TAXATION_SUCCESS:
      return {
        ...state,
        product: action.payload,
        detail: action.payload.payload,
        loading: false,
      };

    case TaxationActionTypes.GET_TAXATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
