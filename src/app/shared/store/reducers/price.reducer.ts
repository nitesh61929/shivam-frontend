import { IPagination } from "@core/interfaces";
import { IPrice } from "@shared/price";
import { PriceActions, PriceActionTypes } from "../actions";

export interface IPriceState {
  list: IPrice[];
  detail: IPrice;
  loading: boolean;
  pagination: IPagination | null;
  error: Error;
}

const initialPriceState: IPriceState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function PriceReducer(
  state: IPriceState = initialPriceState,
  action: PriceActions
) {
  switch (action.type) {
    case PriceActionTypes.LOAD_PRICE:
      return {
        ...state,
        loading: true,
      };

    case PriceActionTypes.LOAD_PRICE_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case PriceActionTypes.LOAD_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PriceActionTypes.ADD_PRICE:
      return {
        ...state,
        loading: true,
      };

    case PriceActionTypes.ADD_PRICE_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list],
        loading: false,
      };

    case PriceActionTypes.ADD_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PriceActionTypes.UPDATE_PRICE:
      return {
        ...state,
        loading: true,
      };

    case PriceActionTypes.UPDATE_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PriceActionTypes.UPDATE_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PriceActionTypes.GET_PRICE:
      return {
        ...state,
        loading: true,
      };

    case PriceActionTypes.GET_PRICE_SUCCESS:
      return {
        ...state,
        detail: action.payload.payload,
        loading: false,
      };

    case PriceActionTypes.GET_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case PriceActionTypes.DELETE_PRICE:
      return {
        ...state,
        loading: true,
      };

    case PriceActionTypes.DELETE_PRICE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.id),
        loading: false,
      };

    case PriceActionTypes.DELETE_PRICE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
