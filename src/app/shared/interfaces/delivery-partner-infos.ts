import { IErpDealer } from "@shared/interfaces";

export interface IDeliveryPartnerInformation {
  id: number;
  dealer_legal_name: string;
  in_house: boolean;
  delivery_location_id: number;
  delivery_location_name: number;
  extras: IErpDealer;
}
