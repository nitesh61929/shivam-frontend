export interface IOrderLines {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  final_rate: string;
  discount_amount: string;
  vat: string;
  vat_amount: string;
  excise_duty_amount: string;
  foc_count: string;
  amount: string;
}
