import { IServerResponse } from "@core/interfaces";
import * as httpUtilites from "@core/utilities/http-utilities";
import { Action } from "@ngrx/store";

export enum OnlineDeliveryPartnerActionTypes {
  ADD_ONLINE_DELIVERY_PARTNER = "[ONLINE_DELIVERY_PARTNER] Add Online Delivery Partner",
  ADD_ONLINE_DELIVERY_PARTNER_SUCCESS = "[ONLINE_DELIVERY_PARTNER] Add Online Delivery Partner Success",
  ADD_ONLINE_DELIVERY_PARTNER_FAILURE = "[ONLINE_DELIVERY_PARTNER] Add Online Delivery Partner Failure",
  EDIT_ONLINE_DELIVERY_PARTNER = "[ONLINE_DELIVERY_PARTNER] Edit Online Delivery Partner",
  EDIT_ONLINE_DELIVERY_PARTNER_SUCCESS = "[ONLINE_DELIVERY_PARTNER] Edit Online Delivery Partner Success",
  EDIT_ONLINE_DELIVERY_PARTNER_FAILURE = "[ONLINE_DELIVERY_PARTNER] Edit Online Delivery Partner Failure",
  GET_ONLINE_DELIVERY_PARTNER = "[ONLINE_DELIVERY_PARTNER] Get Online Delivery Partner",
  GET_ONLINE_DELIVERY_PARTNER_SUCCESS = "[ONLINE_DELIVERY_PARTNER] Get Online Delivery Partner Success",
  GET_ONLINE_DELIVERY_PARTNER_FAILURE = "[ONLINE_DELIVERY_PARTNER] Get Online Delivery Partner Failure",
  LOAD_ONLINE_DELIVERY_PARTNER = "[ONLINE_DELIVERY_PARTNER] Load Online Delivery Partner",
  LOAD_ONLINE_DELIVERY_PARTNER_SUCCESS = "[ONLINE_DELIVERY_PARTNER] Load Online Delivery Partner Success",
  LOAD_ONLINE_DELIVERY_PARTNER_FAILURE = "[ONLINE_DELIVERY_PARTNER] Load Online Delivery Partner Failure",
}

export class AddOnlineDeliveryPartnerAction implements Action {
  readonly type = OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER;

  constructor(public payload: any) {}
}
export class AddOnlineDeliveryPartnerSuccessAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class AddOnlineDeliveryPartnerFailureAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.ADD_ONLINE_DELIVERY_PARTNER_FAILURE;

  constructor(public payload: Error) {}
}

export class EditOnlineDeliveryPartnerAction implements Action {
  readonly type = OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER;

  constructor(public onlineDeliveryPartnerId: number, public payload: any) {}
}
export class EditOnlineDeliveryPartnerSuccessAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER_SUCCESS;

  constructor(public payload: IServerResponse) {}
}
export class EditOnlineDeliveryPartnerFailureAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.EDIT_ONLINE_DELIVERY_PARTNER_FAILURE;

  constructor(public payload: Error) {}
}

export class GetOnlineDeliveryPartnerAction implements Action {
  readonly type = OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER;

  constructor(public onlineDeliveryPartnerId: number) {}
}

export class GetOnlineDeliveryPartnerSuccessAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER_SUCCESS;

  constructor(public onlineDeliveryPartner: any) {}
}

export class GetOnlineDeliveryPartnerFailureAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.GET_ONLINE_DELIVERY_PARTNER_FAILURE;

  constructor(public payload: any) {}
}

export class LoadOnlineDeliveryPartnerAction implements Action {
  readonly type = OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER;

  constructor(public param: any) {
    param = httpUtilites.setParameters(param);
  }
}

export class LoadOnlineDeliveryPartnerSuccessAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadOnlineDeliveryPartnerFailureAction implements Action {
  readonly type =
    OnlineDeliveryPartnerActionTypes.LOAD_ONLINE_DELIVERY_PARTNER_FAILURE;

  constructor(public payload: string) {}
}

export type OnlineDeliveryPartnerActions =
  | AddOnlineDeliveryPartnerAction
  | AddOnlineDeliveryPartnerSuccessAction
  | AddOnlineDeliveryPartnerFailureAction
  | EditOnlineDeliveryPartnerAction
  | EditOnlineDeliveryPartnerSuccessAction
  | EditOnlineDeliveryPartnerFailureAction
  | GetOnlineDeliveryPartnerAction
  | GetOnlineDeliveryPartnerSuccessAction
  | GetOnlineDeliveryPartnerFailureAction
  | LoadOnlineDeliveryPartnerAction
  | LoadOnlineDeliveryPartnerSuccessAction
  | LoadOnlineDeliveryPartnerFailureAction;
