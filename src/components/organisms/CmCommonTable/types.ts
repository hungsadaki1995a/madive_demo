import { IPlainObject } from '@/types/common';
import { IOriginalResponse } from '@/types/http';

import { FilterTypes, TableActionName } from './const';

export type DirectionType = 'asc' | 'desc';

export interface ISortInfo {
  field: string;
  direction: DirectionType;
}

export type SubmitFilterType = 'button' | 'enter';
export type FilterType = 'simple' | 'dropdown' | 'action-selection';
export type ColumnType = 'text' | 'number' | 'checkbox';

interface IFilterBase {
  name: string;
  type: FilterType;
  className?: string;
}

export interface IOption<T = string | number> {
  value: T;
  label: string;
}

export interface IFilterSimple extends IFilterBase {
  type: 'simple';
  label?: string;
  icon?: React.ReactNode;
}

export type DropdownOptionType = {
  label: string;
  value: string;
};
export interface IFilterDropdown extends IFilterBase {
  type: 'dropdown';
  options: DropdownOptionType[];
}

export interface IFilterActionSelection extends IFilterBase {
  type: 'action-selection';
  options: DropdownOptionType[];
}

export type IFilterElementType = IFilterSimple | IFilterDropdown | IFilterActionSelection;

export interface IFilterConfigBase {
  submitBy: SubmitFilterType;
  filters: IFilterElementType[];
}

export interface IFilterConfigSubmitByButton extends IFilterConfigBase {
  submitBy: 'button';
  submitLabel: string;
}

export interface IFilterConfigSubmitByEnter extends IFilterConfigBase {
  submitBy: 'enter';
}

export type IFilterConfig = IFilterConfigSubmitByButton | IFilterConfigSubmitByEnter;

export interface IFilterInputProps {
  filterInfo: IFilterDropdown | IFilterSimple;
  onChange: ({ name, value }: { name: string; value: any }) => void;
}

export type FilterOnChangeType = ({ name, value }: { name: string; value: any }) => void;

export interface IBottomAction<TRowDataType extends IPlainObject> {
  label: string;
  onClick: (selectedRows: TRowDataType[]) => void;
  checkDisabled: (selectedRows: TRowDataType[]) => boolean;
}

export interface ITopAction<TRowDataType extends IPlainObject> {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface IAddAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface ICommonTableColumn<TRowDataType extends IPlainObject> {
  field: string;
  label?: string;
  type?: ColumnType;
  width?: number;
  valueRenderAs?: (rowData: TRowDataType) => React.ReactNode;
  sortable?: boolean;
  onHeaderCheckboxChange?: () => void;
}

export interface IPaginationParams {
  rowsPerPageOptions?: number[];
  totalCount: number;
  rowsPerPage?: number;
  currentPage: number;
  rowsPerPagePosition?: 'first' | 'last';
}

export interface IPaginationConfig extends IPaginationParams {
  onPageChange: (newPageIndex: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export interface ICommonTable<TRowDataType extends IPlainObject> {
  fieldAsRowId: string;
  columnsConfig: ICommonTableColumn<TRowDataType>[];
  rows: TRowDataType[];
  hasSelectionRows?: boolean;
  allowMultipleSelect?: boolean;
  onSelectedRows?: (selectedRows: TRowDataType[]) => void;
  filterConfig?: IFilterConfig;
  sortDefault: ISortInfo;
  paginationConfig?: IPaginationConfig;
  onRowClick?: (event: React.MouseEvent, row: TRowDataType) => void;
  searchServerConfig?: SearchServerConfig;
  convertPayloadRequest?: (filterData: TableViewState) => IPlainObject;
  map?: (response: IOriginalResponse) => TableDataResponseDto<TRowDataType>;
  endpoint?: string;
  onTriggerRequest?: (tableFilterData: TableViewState) => void;
  isLoading?: boolean;
}

export type TableLayoutProps<TRowDataType extends IPlainObject> = Pick<
  ICommonTable<TRowDataType>,
  | 'filterConfig'
  | 'hasSelectionRows'
  | 'rows'
  | 'columnsConfig'
  | 'paginationConfig'
  | 'fieldAsRowId'
  | 'onRowClick'
  | 'allowMultipleSelect'
> & {
  handleCheckAll: ({ checked }: { checked: boolean }) => void;
  sortInfo: ISortInfo;
  handleSortTable: ({ field }: { field: string }) => void;
  handleCheckRow: ({ row, checked }: { row: TRowDataType; checked: boolean }) => void;
  selectedRowsMapping: {
    [key: string]: TRowDataType;
  };
  selectedRows: TRowDataType[];
  dispatch: (type: ActionType) => void;
  tableState: TableViewState;
  onChangePage: (page: number) => void;
  onChangePageSize: (pageNumber: number) => void;
  onChangeFilterClient?: (filterData: FilterFormType) => void;
  onChangeFilterServer?: (filterData: FilterFormType) => void;
  totalCount?: number;
};

export interface IButtonMenuConfig {
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}

export type FilterFieldType = string | number | boolean | Array<unknown> | Record<string, unknown> | unknown;

export type FilterFormType = {
  [fieldName: string]: FilterFieldType;
};

export type PageChangeActionType = {
  type: TableActionName.CHANGE_PAGE;
  payload: { page: number };
};

export type PageSizeChangeActionType = {
  type: TableActionName.CHANGE_PAGE_SIZE;
  payload: { pageSize: number; page: number };
};

export type SortByChangeActionType = {
  type: TableActionName.CHANGE_SORT_BY;
  payload: { sortBy: ISortInfo };
};

export type FilterChangeActionType = {
  type: TableActionName.CHANGE_FILTER_CLIENT | TableActionName.CHANGE_FILTER_SERVER;
  payload: FilterFormType;
};

export type ResetPageAndReloadActionType = {
  type: TableActionName.RESET_PAGE_AND_RELOAD;
  payload: null;
};

export type InvalidateChangeActionType = {
  type: TableActionName.CHANGE_INVALIDATE;
  payload: { invalidate: boolean };
};

export type ActionType =
  | PageChangeActionType
  | PageSizeChangeActionType
  | SortByChangeActionType
  | FilterChangeActionType
  | ResetPageAndReloadActionType
  | InvalidateChangeActionType;

export type DispatchFunction = {
  (dispatch: ActionType): void;
};

export type TableViewState = {
  currentPage: number;
  pageSize: number;
  sortBy: ISortInfo;
  filter: {
    client: FilterFormType;
    server: FilterFormType;
  };
  invalidate: boolean;
  [key: string]: unknown;
};

export type TableDataResponseDto<TRowType> = {
  data: TRowType[];
  total: number;
};

export interface IUploadAction {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export type ImperativeHandleDto<TRowType> = {
  fetch: () => void;
  resetPageAndRefresh: () => void;
  changeFilterServer: (filter: FilterFormType) => void;
};

export type SearchServerConfigOption = {
  label: string;
  fieldName: string;
  value?: string;
  type?: FilterTypes;
  options?: {
    label: string;
    value: string;
  }[];
};

export type SearchServerConfig = {
  fieldOptions: SearchServerConfigOption[];
};

export type SearchServerFieldValue = {
  fieldName: string;
  value: string;
  label: string;
};

export type SearchCachedCondition = {
  name: string;
  conditions: SearchServerFieldValue[];
};

export type SearchCachedFromPath = {
  path: string;
  conditions: SearchCachedCondition[];
};

export type SaveCacheConditionForm = {
  conditionName: string;
};
