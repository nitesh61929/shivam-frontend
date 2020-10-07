import { IPagination } from "@core/interfaces";
import { IOrder } from "../../interfaces";
import { OrderActions, OrderActionTypes } from "../actions";

export interface IOrderState {
  list: IOrder[];
  detail: IOrder;
  loading: boolean;
  pagination: IPagination;
  error: Error;
  grand_total: number;
}

const initialOrderState: IOrderState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
  grand_total: 0,
};

export function OrderReducer(
  state: IOrderState = initialOrderState,
  action: OrderActions
) {
  switch (action.type) {
    case OrderActionTypes.LOAD_ORDER:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.LOAD_ORDER_SUCCESS:
      return {
        ...state,
        list: action.orderListPayload.payload,
        pagination: action.orderListPayload.pagination,
        grand_total: action.orderGrandTotalpayload.payload.grand_total,
        loading: false,
      };

    case OrderActionTypes.LOAD_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OrderActionTypes.GET_ORDER:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        product: action.payload,
        detail: action.payload.payload,
        loading: false,
      };

    case OrderActionTypes.GET_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OrderActionTypes.ALLOCATE_ORDER:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.ALLOCATE_ORDER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case OrderActionTypes.ALLOCATE_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OrderActionTypes.REVOKE_ORDER:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.REVOKE_ORDER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case OrderActionTypes.REVOKE_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OrderActionTypes.CANCEL_ORDER:
      return {
        ...state,
        loading: true,
      };

    case OrderActionTypes.CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case OrderActionTypes.CANCEL_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
