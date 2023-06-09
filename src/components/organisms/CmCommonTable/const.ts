export enum FilterTypes {
  DROPDOWN = 'dropdown',
  SIMPLE = 'simple',
  ACTION_SELECTION = 'action-selection',
}

export enum SubmitActionTypes {
  BUTTON = 'button',
  ENTER = 'enter',
}

export enum SortDirectionTypes {
  DESC = 'desc',
  ASC = 'asc',
}

export enum TableActionName {
  CHANGE_PAGE = 'CHANGE_PAGE',
  CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE',
  CHANGE_FILTER_CLIENT = 'CHANGE_FILTER_CLIENT',
  CHANGE_FILTER_SERVER = 'CHANGE_FILTER_SERVER',
  CHANGE_SORT_BY = 'CHANGE_SORT_BY',
  RESET_PAGE_AND_RELOAD = 'RESET_PAGE_AND_RELOAD',
  CHANGE_INVALIDATE = 'CHANGE_INVALIDATE',
}
