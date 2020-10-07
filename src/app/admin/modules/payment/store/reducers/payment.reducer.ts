import { IPayment } from "../../interfaces";
import { PaymentActions, PaymentActionTypes } from "../actions";

export interface IPaymentState {
  list: IPayment[];
  loading: boolean;
  error: Error;
}

const initialPaymentState: IPaymentState = {
  list: [],
  loading: false,
  error: undefined,
};

export function PaymentReducer(
  state: IPaymentState = initialPaymentState,
  action: PaymentActions
) {
  switch (action.type) {
    case PaymentActionTypes.LOAD_PAYMENT:
      return {
        ...state,
        loading: true,
      };

    case PaymentActionTypes.LOAD_PAYMENT_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        loading: false,
        error: action.payload,
      };

    case PaymentActionTypes.LOAD_PAYMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case PaymentActionTypes.UPDATE_PAYMENT_STATUS:
      return {
        ...state,
        loading: true,
      };

    case PaymentActionTypes.UPDATE_PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case PaymentActionTypes.UPDATE_PAYMENT_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
