import { useCallback, useEffect, useMemo, useState } from 'react';
import { IPaginationConfig, IPaginationParams, IPlainObject, ISortInfo } from '../types';

interface IUseTableApiParams<TRowDataType extends IPlainObject> {
  queryFn: (params: { filter: IPlainObject; sort: ISortInfo; pagination: IPaginationParams }) => Promise<void>;
  paginationParamsDefault: IPaginationParams;
  sortInfoDefault: ISortInfo;
  queryResult: {
    data: TRowDataType[];
    total: number;
  };
}

interface IUseTableDataClientResult<TRowDataType extends IPlainObject> {
  fetch: () => void;
  rows: TRowDataType[];
  pagination: IPaginationConfig;
  sort: (sortInfo: ISortInfo) => void;
  filter: (filterValues: IPlainObject) => void;
}

const useTableDataServer = <TRowDataType extends IPlainObject>({
  queryFn,
  queryResult,
  paginationParamsDefault,
  sortInfoDefault,
}: IUseTableApiParams<TRowDataType>): IUseTableDataClientResult<TRowDataType> => {
  // Store Core Data: original data, current paging info, current filter info, current sort info
  const [state, setState] = useState<{
    originalData: TRowDataType[];
    paginationParamsStore: IPaginationParams;
    sortInfoStore: ISortInfo;
    filterValuesStore: IPlainObject;
    // when invalidate = true => auto refetch query
    invalidate: boolean;
  }>({
    originalData: [],
    paginationParamsStore: paginationParamsDefault,
    sortInfoStore: sortInfoDefault,
    filterValuesStore: {},
    invalidate: false,
  });

  useEffect(() => {
    // Update table original data base on query result data
    if (queryResult?.data?.length) {
      setState((prev) => {
        return {
          ...prev,
          originalData: queryResult.data,
          paginationParamsStore: {
            ...prev.paginationParamsStore,
            totalCount: queryResult.total || 0,
          },
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          originalData: [],
          paginationParamsStore: {
            ...paginationParamsDefault,
            totalCount: queryResult?.total || 0,
          },
        };
      });
    }
  }, [queryResult?.data, queryResult?.total]);

  // Hook Callback Utilities
  const handleQuery = useCallback(async () => {
    await queryFn({
      filter: state.filterValuesStore,
      sort: state.sortInfoStore,
      pagination: state.paginationParamsStore,
    });
    // Data newest => set invalidate = false
    setState((prev) => {
      return { ...prev, invalidate: false };
    });
  }, [queryFn, state]);

  useEffect(() => {
    if (state.invalidate === true) {
      handleQuery();
    }
  }, [state.invalidate, handleQuery]);

  const handleSort = useCallback((sortInfo: ISortInfo) => {
    setState((prev) => {
      return {
        ...prev,
        sortInfoStore: sortInfo,
        invalidate: true, // => auto refetch
      };
    });
  }, []);

  const handleFilter = useCallback((filterValues: IPlainObject) => {
    setState((prev) => {
      return {
        ...prev,
        filterValuesStore: filterValues,
        invalidate: true, // => auto refetch
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
        invalidate: true, // => auto refetch
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
        invalidate: true, // => auto refetch
      };
    });
  }, []);

  const pagination = useMemo<IPaginationConfig>(() => {
    return {
      ...state.paginationParamsStore,
      onPageChange: handlePageChange,
      onRowsPerPageChange: handleRowsPerPageChange,
    };
  }, [state.paginationParamsStore, handlePageChange, handleRowsPerPageChange]);

  return {
    rows: state.originalData || [],
    pagination,
    fetch: handleQuery,
    sort: handleSort,
    filter: handleFilter,
  };
};

export default useTableDataServer;
