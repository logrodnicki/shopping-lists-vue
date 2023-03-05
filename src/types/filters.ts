export enum FiltersType {
  ALL = 'all',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted'
}

export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SelectedFilters {
  searchText: string;
  sortingOrder: SortingOrder;
  type: FiltersType;

  [key: string]: string | SortingOrder | FiltersType;
}
