import { IPagination } from "@core/interfaces";
import { IOnlineDeliveryPartner } from "../../interfaces/online-delivery-partner";
import {
  OnlineDeliveryPartnerActions,
  OnlineDeliveryPartnerActionTypes,
} from "../actions";

export interface IOnlineDeliveryPartnerState {
  list: IOnlineDeliveryPartner[];
  detail: IOnlineDeliveryPartner;
  loading: boolean;
  pagination: IPagination;
  error: Error;
}

const initialOnlineDeliveryPartnerState: IOnlineDeliveryPartnerState = {
  list: [],
  detail: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function OnlineDeliveryPartnerReducer(
  state: IOnlineDeliveryPartnerState = initialOnlineDeliveryPartnerState,
  action: OnlineDeliveryPartnerActions
) {
  switch (action.type) {
    case OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER:
      return {
        ...state,
        loading: true,
      };

    case OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER:
      return {
        ...state,
        loading: true,
      };

    case OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER:
      return {
        ...state,
        loading: true,
      };

    case OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER_SUCCESS:
      return {
        ...state,
        list: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
        error: action.payload,
      };

    case OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        list: [],
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER:
      return {
        ...state,
        loading: true,
      };

    case OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER_SUCCESS:
      return {
        ...state,
        detail: action.onlineDeliveryPartner.payload,
        loading: false,
      };

    case OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
