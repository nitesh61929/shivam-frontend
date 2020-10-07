import { IUserBillingDetail } from "./user-billing-details";
import { IUserDeliveryAddress } from "./user-delivery-address";
import { IUserDetail } from "./user-detail";

export interface IUser {
  email: string;
  id: number;
  mobile_number: string;
  name: string;
  role: string;
  status: number;
  username: string;
  details: IUserDetail;
  billing_details?: IUserBillingDetail;
  delivery_addresses?: IUserDeliveryAddress;
}
