import { IOrder } from "../../order/interfaces";

export interface IFeedback {
  id: number;
  submitted_by: string;
  role: string;
  submitted_at: string;
  comment: string;
  order: IOrder;
}
