import { useEffect, useMemo, useReducer, useState } from 'react';

import { IPlainObject } from '@/types/common';
import { rowsPerPageDefault } from '@/utils/const/form';

import { TableActions } from '../state/action';
import { tableReducer } from '../state/reducer';
import { ActionType, FilterFormType, ICommonTable, ISortInfo, TableDataResponseDto, TableViewState } from '../types';
import usePaginationClient from './usePaginationClient';

type FilterLogicCallbackType = <TRowDataType extends IPlainObject>(
  row: TRowDataType,
  filterValues: { [key: string]: any }
) => boolean;
type UseTableProps<TRowData extends IPlainObject> = Pick<
  ICommonTable<TRowData>,
  'rows' | 'onTriggerRequest' | 'sortDefault'
>;

interface IUseTableResult<TRowDataType extends IPlainObject> {
  dispatch: (type: ActionType) => void;
  tableState: TableViewState;
  onChangePage: (page: number) => void;
  onChangePageSize: (pageSize: number) => void;
  onChangeSortBy: (sortBy: ISortInfo) => void;
  onChangeFilterClient: (filter: FilterFormType) => void;
  currentPageData: TRowDataType[];
  totalCount: number;
  fetch: () => void;
  onChangeFilterServer: (filter: FilterFormType) => void;
  resetCurrentPageAndRefresh: () => void;
}

const filterLogic = (row: Record<string, unknown>, filterFormValue: FilterFormType) => {
  let result = true;
  Object.keys(filterFormValue).forEach((key: string) => {
    if (Object.prototype.hasOwnProperty.call(row, key)) {
      if (!(row[key] as string)?.toLowerCase().includes((filterFormValue[key] as string)?.toLowerCase())) {
        result = false;
        return;
      }
    }
  });
  return result;
};

const execSort = <TRowDataType extends IPlainObject>(list: TRowDataType[], { field, direction }: ISortInfo) => {
  const temp = [...list];
  const thisOrder = direction === 'asc' ? 1 : -1;
  return temp.sort((a, b) => {
    const x = a[field] as string;
    const y = b[field] as string;
    const newOrder = x > y ? 1 : x < y ? -1 : 0;
    return newOrder * thisOrder;
  });
};

// Pure function handle filtering
const execFilter = <TRowDataType extends IPlainObject>(
  list: TRowDataType[],
  filterValues: IPlainObject,
  filterLogic: FilterLogicCallbackType
) => {
  let arr = [...list];
  arr = arr.filter((row) => {
    return filterLogic(row, filterValues);
  });
  return arr;
};

const initValue: TableViewState = {
  currentPage: 0,
  pageSize: rowsPerPageDefault,
  filter: {
    client: {},
    server: {},
  },
  sortBy: {
    direction: 'desc',
    field: '',
  },
  invalidate: false,
};

const useTable = <TRowDataType extends IPlainObject>({
  rows = [],
  onTriggerRequest,
  sortDefault,
}: UseTableProps<TRowDataType>): IUseTableResult<TRowDataType> => {
  const [tableState, dispatch] = useReducer(tableReducer, { ...initValue, sortBy: sortDefault });
  const [tableData, setTableData] = useState<TableDataResponseDto<TRowDataType>>({
    data: rows,
    total: rows?.length || 0,
  });

  const queryData = async () => {
    onTriggerRequest?.(tableState);
  };

  const derivedRows = useMemo(() => {
    if (tableData?.data?.length) {
      let handlingArr = [...tableData.data];
      if (Object.keys(tableState.filter.client).length) {
        handlingArr = execFilter(handlingArr, tableState.filter.client, filterLogic);
      }
      handlingArr = execSort(handlingArr, tableState.sortBy);
      return handlingArr;
    } else {
      return [];
    }
  }, [tableData.data, tableState.sortBy, tableState.filter.client]);

  const { pagingRows } = usePaginationClient({
    derivedRows: derivedRows || [],
    currentPage: tableState.currentPage,
    rowsPerPage: tableState.pageSize,
  });

  useEffect(() => {
    queryData();
  }, [tableState.filter.server]);

  useEffect(() => {
    if (rows) {
      setTableData({ data: rows, total: rows?.length || 0 });
    }
  }, [rows]);

  useEffect(() => {
    if (tableState.invalidate) {
      queryData();
      changeInvalidateTableState(false /* invalidate */);
    }
  }, [tableState.invalidate]);

  const onChangePage = (page: number) => TableActions.changePage(dispatch)(page);
  const onChangePageSize = (pageSize: number) => TableActions.changePageSize(dispatch)(pageSize);
  const onChangeSortBy = (sortBy: ISortInfo) => TableActions.changeSort(dispatch)(sortBy);
  const onChangeFilterClient = (filterData: FilterFormType) => TableActions.changeFilterClient(dispatch)(filterData);
  const onChangeFilterServer = (filterData: FilterFormType) => TableActions.changeFilterServer(dispatch)(filterData);
  const resetCurrentPageAndRefresh = () => TableActions.resetCurrentPageAndRefresh(dispatch)();
  const changeInvalidateTableState = (invalidate: boolean) =>
    TableActions.changeInvalidateTableState(dispatch)(invalidate);

  return {
    dispatch,
    tableState,
    onChangePage,
    onChangePageSize,
    currentPageData: pagingRows,
    totalCount: derivedRows.length,
    onChangeSortBy,
    onChangeFilterClient,
    onChangeFilterServer,
    fetch: queryData,
    resetCurrentPageAndRefresh,
  };
};

export default useTable;
