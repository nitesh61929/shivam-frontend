export interface IDealerAllocations {
  allocation_id: number;
  order_id: number;
  order_number: string;
  ordered_on: string;
  discount_total: number;
  vat_total: number;
  grand_total: number;
  billing_name: string;
  contact_no: string;
  pan_no: string;
  delivery_address: string;
  delivery_location_id: number;
  landmark: string;
  expected_delivery_date: string;
  status: string;
  created_by: number;
  updated_by: number;
  user: any;
}
