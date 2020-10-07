import { IParameter } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";
import { IDeliveryLocation } from "@shared/interfaces";

export enum DeliveryLocationActionTypes {
  UPDATE_DELIVERY_LOCATION = "[DELIVERY_LOCATION] Update Delivery Location",
  UPDATE_DELIVERY_LOCATION_SUCCESS = "[DELIVERY_LOCATION] Update Delivery Location Success",
  UPDATE_DELIVERY_LOCATION_FAILURE = "[DELIVERY_LOCATION] Update Delivery Location Failure",
  LOAD_DELIVERY_LOCATIONS = "[DELIVERY_LOCATION] Load Delivery Locations",
  LOAD_DELIVERY_LOCATION_SUCCESS = "[DELIVERY_LOCATION] Load Delivery locations Success",
  LOAD_DELIVERY_LOCATION_FAILURE = "[DELIVERY_LOCATION] Load Delivery locations Failure",
  GET_DELIVERY_LOCATION = "[DELIVERY_LOCATION] Get Delivery Location",
  GET_DELIVERY_LOCATION_SUCCESS = "[DELIVERY_LOCATION] Get Delivery Location Success",
  GET_DELIVERY_LOCATION_FAILURE = "[DELIVERY_LOCATION] Get Delivery Location Failure",
  DELETE_DELIVERY_LOCATION = "[DELIVERY_LOCATION] Delete Delivery Location",
  DELETE_DELIVERY_LOCATION_SUCCESS = "[DELIVERY_LOCATION] Delete Delivery Location Success",
  DELETE_DELIVERY_LOCATION_FAILURE = "[DELIVERY_LOCATION] Delete DElivery Location Failure",
}

export class UpdateDeliveryLocationAction implements Action {
  readonly type = DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION;

  constructor(public deliveryLocationPayload: IDeliveryLocation) {}
}

export class UpdateDeliveryLocationSuccessAction implements Action {
  readonly type = DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateDeliveryLocationFailureAction implements Action {
  readonly type = DeliveryLocationActionTypes.UPDATE_DELIVERY_LOCATION_FAILURE;

  constructor(public payload: Error) {}
}

export class LoadDeliveryLocationsAction implements Action {
  readonly type = DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATIONS;

  constructor(public param: IParameter) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadDeliveryLocationsSuccessAction implements Action {
  readonly type = DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATION_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadDeliveryLocationsFailureAction implements Action {
  readonly type = DeliveryLocationActionTypes.LOAD_DELIVERY_LOCATION_FAILURE;

  constructor(public payload: string) {}
}

export class GetDeliveryLocationAction implements Action {
  readonly type = DeliveryLocationActionTypes.GET_DELIVERY_LOCATION;

  constructor(public deliveryLocationId: number) {}
}

export class GetDeliveryLocationSuccessAction implements Action {
  readonly type = DeliveryLocationActionTypes.GET_DELIVERY_LOCATION_SUCCESS;

  constructor(public deliveryLocation: any) {}
}

export class GetDeliveryLocationFailureAction implements Action {
  readonly type = DeliveryLocationActionTypes.GET_DELIVERY_LOCATION_FAILURE;

  constructor(public payload: any) {}
}

export class DeleteDeliveryLocationAction implements Action {
  readonly type = DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION;

  constructor(public deliveryLocationId: number) {}
}

export class DeleteDeliveryLocationSuccessAction implements Action {
  readonly type = DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_SUCCESS;

  constructor(public deliveryLocationId: number) {}
}

export class DeleteDeliveryLocationFailureAction implements Action {
  readonly type = DeliveryLocationActionTypes.DELETE_DELIVERY_LOCATION_FAILURE;

  constructor(public payload: string) {}
}

export type DeliveryLocationActions =
  | UpdateDeliveryLocationAction
  | UpdateDeliveryLocationSuccessAction
  | UpdateDeliveryLocationFailureAction
  | LoadDeliveryLocationsAction
  | LoadDeliveryLocationsSuccessAction
  | LoadDeliveryLocationsFailureAction
  | GetDeliveryLocationAction
  | GetDeliveryLocationSuccessAction
  | GetDeliveryLocationFailureAction
  | DeleteDeliveryLocationAction
  | DeleteDeliveryLocationSuccessAction
  | DeleteDeliveryLocationFailureAction;
