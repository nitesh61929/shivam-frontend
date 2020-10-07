export interface IPagination {
  count: number;
  current_page: number;
  first_page: number;
  last_page: number;
  links: object;
  per_page: number;
  total: number;
  total_pages: number;
}
