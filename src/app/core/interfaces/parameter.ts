export interface IParameter {
  paginate?: number;
  page?: number;
  per_page?: number;
  searchable_field?: string;
  search?: string;
  namespace?: string;
  namespace_id?: number;
  starts_at?: string;
  ends_at?: string;
  from?: string;
  to?: string;
  status?: string | number;
  type?: string;
  role?: string;
  is_general?: string;
  rating?: any;
  is_due?: number;
}
