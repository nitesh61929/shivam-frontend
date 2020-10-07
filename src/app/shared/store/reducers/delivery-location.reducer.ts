import { IPagination } from "@core/interfaces";
import { IDeliveryLocation } from "@shared/interfaces";
import {
  DeliveryLocationActions,
  DeliveryLocationActionTypes,
} from "../actions/delivery-location.actions";

export interface IDeliveryLocationState {
  deliveryLocationList: IDeliveryLocation[];
  deliveryLocation: IDeliveryLocation;
  loading: boolean;
  pagination: IPagination | null;
  error: Error;
}

const initialDeliveryLocationState: IDeliveryLocationState = {
  deliveryLocationList: [],
  deliveryLocation: null,
  loading: false,
  pagination: null,
  error: undefined,
};

export function DeliveryLocationReducer(
  state: IDeliveryLocationState = initialDeliveryLocationState,
  action: DeliveryLocationActions
) {
  switch (action.type) {
    case DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION:
      return {
        ...state,
        loading: true,
      };

    case DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION_SUCCESS:
      return {
        ...state,
        deliveryLocationList: [...state.deliveryLocationList, action.payload],
        loading: false,
      };

    case DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATIONS:
      return {
        ...state,
        loading: true,
      };

    case DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATION_SUCCESS:
      return {
        ...state,
        deliveryLocationList: action.payload.payload,
        pagination: action.payload.pagination,
        loading: false,
      };

    case DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DeliveryLocationActionTypes.GET_DELIVERY_LOCATION:
      return {
        ...state,
        loading: true,
      };

    case DeliveryLocationActionTypes.GET_DELIVERY_LOCATION_SUCCESS:
      return {
        ...state,
        deliveryLocation: action.deliveryLocation.payload,
        loading: false,
      };

    case DeliveryLocationActionTypes.GET_DELIVERY_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION:
      return {
        ...state,
        loading: true,
      };

    case DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_SUCCESS:
      return {
        ...state,
        deliveryLocationList: state.deliveryLocationList.filter(
          (deliveryLocation) =>
            deliveryLocation.id !== action.deliveryLocationId
        ),
        loading: false,
      };

    case DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
