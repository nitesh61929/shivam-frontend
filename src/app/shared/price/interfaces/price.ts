export interface IPrice {
  id: number;
  price: number;
  unit: string;
  foc_eleigible_count: number;
  foc: number;
  discount_aomount: number;
  product_id: number;
  delivery_location_id: number;
  delivery_location?: any;
  product?: any;
}
