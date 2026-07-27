export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    pagination?: Pagination;
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}