export interface IPayment {
  id: number;
  title: string;
}

export interface IPaymentMethod {
  amount: number;
  payment_method: IPayment;
}
