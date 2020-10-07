import { IPagination } from "@core/interfaces";
import { IErpDealer } from "../../interfaces/erp-dealers";
import { ErpDealersActions, ErpDealersActionTypes } from "../actions";

export interface IErpDealersState {
  list: IErpDealer[];
  pagination: IPagination | null;
  detail: IErpDealer;
  loading: boolean;
  error: Error;
  erpLoading: boolean;
}

const initialErpDealersState: IErpDealersState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
  erpLoading: false,
};

export function ErpDealersReducer(
  state: IErpDealersState = initialErpDealersState,
  action: ErpDealersActions
) {
  switch (action.type) {
    case ErpDealersActionTypes.LOAD_ERP_DEALERS:
      return {
        ...state,
        loading: true,
      };

    case ErpDealersActionTypes.LOAD_ERP_DEALERS_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case ErpDealersActionTypes.LOAD_ERP_DEALERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        list: [],
        loading: false,
      };

    case ErpDealersActionTypes.LOAD_ERP_DATA:
      return {
        ...state,
        erpLoading: true,
      };

    case ErpDealersActionTypes.LOAD_ERP_DATA_SUCCESS:
      return {
        ...state,
        erpLoading: false,
      };

    case ErpDealersActionTypes.LOAD_ERP_DATA_FAILURE:
      return {
        ...state,
        erpLoading: false,
      };

    default:
      return state;
  }
}
