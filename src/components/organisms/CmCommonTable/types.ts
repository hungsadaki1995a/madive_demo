export type DirectionType = 'asc' | 'desc';

export type IPlainObject = {
  [key: string]: any;
};

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

export interface IFilterDropdown extends IFilterBase {
  type: 'dropdown';
  options: {
    label: string;
    value: string;
  }[];
}

export interface IFilterActionSelection extends IFilterBase {
  type: 'action-selection';
  options: {
    label: string;
    value: string;
  }[];
}

export interface IFilterConfigBase {
  submitBy: SubmitFilterType;
  filters: (IFilterSimple | IFilterDropdown | IFilterActionSelection)[];
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

export interface ITopAction {
  label: string;
  onClick: () => void;
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
  rowsPerPageOptions: number[];
  totalCount: number;
  rowsPerPage: number;
  currentPage: number;
}

export interface IPaginationConfig extends IPaginationParams {
  onPageChange: (newPageIndex: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
}

export interface ICommonTable<TRowDataType extends IPlainObject> {
  tableName: string;
  fieldAsRowId: string;
  // eslint-disable-next-line no-use-before-define
  renderLayoutAs?: (props: TableLayoutProps<TRowDataType>) => JSX.Element;
  columnsConfig: ICommonTableColumn<TRowDataType>[];
  rows: TRowDataType[];
  //
  hasSelectionRows: boolean;
  onSelectedRows?: (selectedRows: TRowDataType[]) => void;
  //
  topActionConfig?: ITopAction;
  //
  filterConfig?: IFilterConfig;
  onFilterTriggerQuery?: (filterValues: IPlainObject) => void;
  //
  sortDefault: ISortInfo;
  onSortChange: (sortInfo: ISortInfo) => void;
  //
  paginationConfig: IPaginationConfig;
  renderPaginationAs?: (props: IPaginationConfig) => JSX.Element;
  //
  showResultCount?: boolean;
  //
  bottomActionsConfig: IBottomAction<TRowDataType>[];
}

export type TableLayoutProps<TRowDataType extends IPlainObject> = Pick<
  ICommonTable<TRowDataType>,
  | 'topActionConfig'
  | 'filterConfig'
  | 'onFilterTriggerQuery'
  | 'hasSelectionRows'
  | 'rows'
  | 'columnsConfig'
  | 'paginationConfig'
  | 'renderPaginationAs'
  | 'fieldAsRowId'
  | 'bottomActionsConfig'
> & {
  handleCheckAll: ({ checked }: { checked: boolean }) => void;
  sortInfo: ISortInfo;
  handleSortTable: ({ field }: { field: string }) => void;
  handleCheckRow: ({ row, checked }: { row: any; checked: boolean }) => void;
  selectedRowsMapping: {
    [key: string]: TRowDataType;
  };
  selectedRows: TRowDataType[];
};
