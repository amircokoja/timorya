export interface PaginatedResut<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
