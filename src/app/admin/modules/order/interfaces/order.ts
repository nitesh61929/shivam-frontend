import { IFeedback } from "./feedback";
import { IOrderDealer } from "./order-dealer";
import { IOrderLines } from "./order-lines";
import { IPaymentMethod } from "./payment";

export interface IOrder {
  id: number;
  cancel_reason?: string;
  user_id: number;
  email: number;
  order_number: string;
  status: string;
  billing_name: string;
  contact_no: string;
  pan_no: string;
  delivery_address: string;
  landmark: string;
  expected_delivery_date: string;
  ordered_on: string;
  discount_total: string;
  vat_total: string;
  grand_total: string;
  delivery_partner: IOrderDealer;
  orderLines: Array<IOrderLines>;
  feedbacks: Array<IFeedback>;
  payment: IPaymentMethod;
  bill_number: string;
  issued_date: string;
  personalInfo: any;
  delivery_location_name: string;
}
