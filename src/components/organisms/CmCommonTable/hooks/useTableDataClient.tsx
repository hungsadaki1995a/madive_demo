import { useCallback, useEffect, useMemo, useState } from 'react';

import { IPaginationConfig, IPaginationParams, IPlainObject, ISortInfo } from '../types';
import usePaginationClient from './usePaginationClient';

type FilterLogicCallbackType = <TRowDataType extends IPlainObject>(
  row: TRowDataType,
  filterValues: { [key: string]: any }
) => boolean;

interface IUseTableApiParams<TRowDataType extends IPlainObject> {
  queryFn: () => Promise<void>;
  paginationParamsDefault: IPaginationParams;
  sortInfoDefault: ISortInfo;
  queryDataResult: TRowDataType[];
  filterLogic: FilterLogicCallbackType;
}

interface IUseTableDataClientResult<TRowDataType extends IPlainObject> {
  fetch: () => void;
  rows: TRowDataType[];
  pagination: IPaginationConfig;
  sort: (sortInfo: ISortInfo) => void;
  filter: (filterValues: IPlainObject) => void;
}

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

const useTableDataClient = <TRowDataType extends IPlainObject>({
  queryFn,
  queryDataResult,
  paginationParamsDefault,
  sortInfoDefault,
  filterLogic,
}: IUseTableApiParams<TRowDataType>): IUseTableDataClientResult<TRowDataType> => {
  // Store Core Data: original data, current paging info, current filter info, current sort info
  const [state, setState] = useState<{
    originalData: TRowDataType[];
    paginationParamsStore: IPaginationParams;
    sortInfoStore: ISortInfo;
    filterValuesStore: IPlainObject;
  }>({
    originalData: [],
    paginationParamsStore: paginationParamsDefault,
    sortInfoStore: sortInfoDefault,
    filterValuesStore: {},
  });

  useEffect(() => {
    // Update table original data base on query result data
    if (queryDataResult.length) {
      setState((prev) => {
        return {
          ...prev,
          originalData: queryDataResult,
          paginationParamsStore: {
            ...prev.paginationParamsStore,
            totalCount: queryDataResult.length || 0,
          },
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          originalData: [],
          paginationParamsStore: paginationParamsDefault,
        };
      });
    }
  }, [queryDataResult]);

  // data rows after filter and sort
  const derivedRows = useMemo(() => {
    const { originalData, sortInfoStore, filterValuesStore } = state;
    if (originalData.length) {
      let handlingArr = [...originalData];
      if (Object.keys(filterValuesStore).length) {
        handlingArr = execFilter(handlingArr, filterValuesStore, filterLogic);
      }
      handlingArr = execSort(handlingArr, sortInfoStore);
      return handlingArr;
    } else {
      return [];
    }
  }, [state.originalData, state.sortInfoStore, state.filterValuesStore, filterLogic]);

  // Hook Callback Utilities
  const handleQuery = useCallback(async () => {
    await queryFn();
  }, [queryFn]);

  const handleSort = useCallback((sortInfo: ISortInfo) => {
    setState((prev) => {
      return {
        ...prev,
        sortInfoStore: sortInfo,
      };
    });
  }, []);

  const handleFilter = useCallback((filterValues: IPlainObject) => {
    setState((prev) => {
      return {
        ...prev,
        filterValuesStore: filterValues,
      };
    });
  }, []);

  const handlePageChange = useCallback((newPageIndex: number) => {
    setState((prev) => {
      return {
        ...prev,
        paginationParamsStore: {
          ...prev.paginationParamsStore,
          currentPage: newPageIndex,
        },
      };
    });
  }, []);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setState((prev) => {
      return {
        ...prev,
        paginationParamsStore: {
          ...prev.paginationParamsStore,
          currentPage: 0,
          rowsPerPage: newRowsPerPage,
        },
      };
    });
  }, []);

  const { pagingRows } = usePaginationClient({
    derivedRows: derivedRows || [],
    currentPage: state.paginationParamsStore.currentPage,
    rowsPerPage: state.paginationParamsStore.rowsPerPage,
  });

  const pagination = useMemo<IPaginationConfig>(() => {
    return {
      ...state.paginationParamsStore,
      onPageChange: handlePageChange,
      onRowsPerPageChange: handleRowsPerPageChange,
    };
  }, [state.paginationParamsStore, handlePageChange, handleRowsPerPageChange]);

  return {
    rows: pagingRows || [],
    pagination,
    fetch: handleQuery,
    sort: handleSort,
    filter: handleFilter,
  };
};

export default useTableDataClient;
