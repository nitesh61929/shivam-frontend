import { IPagination } from "@core/interfaces";
import {
  IConsumersSms,
  IOrderByPaymentMethod,
  IOrdersAmount,
} from "../../interfaces";
import { DashboardActions, DashboardActionTypes } from "../actions";

export interface IDashboardState {
  consumersSmsList: IConsumersSms[];
  ordersAmountList: IOrdersAmount[];
  ordersByPaymentMethods: IOrderByPaymentMethod[];
  loading: boolean;
  pagination: IPagination;
  error: Error;
}

const initialDashboardState: IDashboardState = {
  consumersSmsList: [],
  ordersAmountList: [],
  ordersByPaymentMethods: [],
  loading: false,
  pagination: null,
  error: undefined,
};

export function DashboardReducer(
  state: IDashboardState = initialDashboardState,
  action: DashboardActions
) {
  switch (action.type) {
    case DashboardActionTypes.LOAD_CONSUMERS_SMS:
      return {
        ...state,
        loading: true,
      };

    case DashboardActionTypes.LOAD_CONSUMERS_SMS_SUCCESS:
      return {
        ...state,
        consumersSmsList: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case DashboardActionTypes.LOAD_CONSUMERS_SMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DashboardActionTypes.LOAD_ORDERS_AMOUNT:
      return {
        ...state,
        loading: true,
      };

    case DashboardActionTypes.LOAD_ORDERS_AMOUNT_SUCCESS:
      return {
        ...state,
        ordersAmountList: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case DashboardActionTypes.LOAD_ORDERS_AMOUNT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS:
      return {
        ...state,
        loading: true,
      };

    case DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        ordersByPaymentMethods: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case DashboardActionTypes.LOAD_ORDERS_BY_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
