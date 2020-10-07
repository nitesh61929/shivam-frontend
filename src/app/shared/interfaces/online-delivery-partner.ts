import { IDeliveryPartnerInformation } from "./delivery-partner-infos";
import { IOnlineDeliveryPartnerDetail } from "./online-delivery-partner-details";

export interface IOnlineDeliveryPartner {
  id: number;
  mobile_number?: number;
  name?: string;
  username?: string;
  external_id?: string;
  password?: string;
  password_confirmation?: string;
  details?: IOnlineDeliveryPartnerDetail;
  delivery_partner?: IDeliveryPartnerInformation;
}
