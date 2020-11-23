export interface ListResponse<T> {
  data: T[];
  count: number;
  page: number;
  totalPages: number;
  pageSize: number;

  ok: boolean;
  status: number;
}
