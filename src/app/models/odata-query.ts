export interface ODataQuery {
  filter?: string;
  expand?: string;
  skip?: number;
  top?: number;
  orderBy?: string;
  filterInput?: string;
  sortDirection?: string;
  sortColumn?: string;
}
