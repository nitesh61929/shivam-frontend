import { createFeatureSelector } from "@ngrx/store";
import {
  IOnlineDeliveryPartnerState,
  OnlineDeliveryPartnerReducer,
} from "../reducers";

export interface OnlineDeliveryState {
  onlineDeliveryPartnerState: IOnlineDeliveryPartnerState;
}

export const OnlineDeliveryReducers = {
  onlineDeliveryPartner: OnlineDeliveryPartnerReducer,
};

export const selectOnlineDeliveryState = createFeatureSelector<
  OnlineDeliveryState
>("onlineDelivery");
