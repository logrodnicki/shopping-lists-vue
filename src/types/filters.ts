export enum FiltersTypes {
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
  type: FiltersTypes;

  [key: string]: string | SortingOrder | FiltersTypes;
}
