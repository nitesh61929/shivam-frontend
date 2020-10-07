export interface IProduct {
  id: number;
  active: number;
  max_order_quantity: number;
  min_order_quantity: number;
  name: string;
  is_for_consumer: number;
  image_url: string;
  meta_description: string;
  description: string;
}
