import { IOrdersAmount } from "./orders-amount";

export interface IOrderByPaymentMethod {
  payment_method: Array<IOrdersAmount>;
}
