import { createFeatureSelector } from "@ngrx/store";
import {
  ConfigurationReducer,
  DocumentsReducer,
  ErpDealersReducer,
  IConfigurationState,
  IDocumentState,
  IErpDealersState,
  IOnlineDeliveryPartnerState,
  IPagesState,
  IPriceState,
  IProvincesWithDistrictsState,
  OnlineDeliveryPartnerReducer,
  PagesReducer,
  PriceReducer,
  ProvincesWithDistrictsReducer,
} from "../reducers";
import {
  DeliveryLocationReducer,
  IDeliveryLocationState,
} from "../reducers/delivery-location.reducer";

export interface SharedState {
  deliveryLocationState: IDeliveryLocationState;
  priceState: IPriceState;
  erpDealersState: IErpDealersState;
  onlineDeliveryPartnerState: IOnlineDeliveryPartnerState;
  provincesWithDistrictsState: IProvincesWithDistrictsState;
  documentsState: IDocumentState;
  configurationState: IConfigurationState;
  pagesState: IPagesState;
}

export const SharedReducers = {
  deliveryLocation: DeliveryLocationReducer,
  price: PriceReducer,
  erpDealers: ErpDealersReducer,
  onlineDeliveryPartners: OnlineDeliveryPartnerReducer,
  provincesWithDistricts: ProvincesWithDistrictsReducer,
  documents: DocumentsReducer,
  configuration: ConfigurationReducer,
  pages: PagesReducer,
};

export const selectSharedState = createFeatureSelector<SharedState>("shared");
