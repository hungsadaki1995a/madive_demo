import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { Paper } from '@mui/material';

import { IPlainObject } from '@/types/common';

import useTable from './hooks/useTable';
import TableLayoutDefault from './layout/TableLayoutDefault';
import SearchServerSection from './searchServerSection';
import { ICommonTable, ImperativeHandleDto, ISortInfo } from './types';

export type CommonTableRefType = {
  resetSelectedRows: () => void;
};
const DataGridView = <TRowDataType extends IPlainObject>(
  {
    fieldAsRowId,
    columnsConfig,
    sortDefault,
    hasSelectionRows,
    allowMultipleSelect = true,
    onSelectedRows,
    filterConfig,
    query,
    rows,
    onRowClick,
    searchServerConfig,
    convertPayloadRequest,
    convertResponse,
    endpoint,
  }: ICommonTable<TRowDataType>,
  ref: Ref<ImperativeHandleDto<TRowDataType>> | undefined
) => {
  const {
    dispatch,
    tableState,
    onChangePage,
    onChangePageSize,
    currentPageData,
    totalCount,
    onChangeSortBy,
    onChangeFilterClient,
    fetch,
    onChangeFilterServer,
    resetCurrentPageAndRefresh,
  } = useTable<TRowDataType>({
    query: query,
    rows: rows,
    convertPayloadRequest: convertPayloadRequest,
    convertResponse: convertResponse,
    endpoint: endpoint,
  });

  const [selectedRows, setSelectedRows] = useState<TRowDataType[]>([]);

  // Selection Rows
  const handleCheckRow = useCallback(({ row, checked }: { row: any; checked: boolean }) => {
    if (checked) {
      setSelectedRows((prev) => {
        const temp = allowMultipleSelect ? [...prev] : [];
        temp.push(row);
        return temp;
      });
    } else {
      setSelectedRows((prev) => {
        return [...prev.filter((x) => x[fieldAsRowId] !== row[fieldAsRowId])];
      });
    }
  }, []);

  const handleCheckAll = useCallback(
    ({ checked }: { checked: boolean }) => {
      setSelectedRows(() => {
        if (checked) {
          return [...currentPageData];
        } else {
          return [];
        }
      });
    },
    [currentPageData]
  );

  const selectedRowsMapping = useMemo<{
    [key: string]: TRowDataType;
  }>(() => {
    return selectedRows.reduce(
      (obj, item) => {
        obj[item[fieldAsRowId]] = item;
        return obj;
      },
      {} as {
        [key: string]: TRowDataType;
      }
    );
  }, [selectedRows]);

  // -------------------------------------------
  useEffect(() => {
    onSelectedRows?.(selectedRows);
    // Above line will make useEffect run infinity
    // (instead that I suggest that we should move func onSelectRows into
    // func handleCheckRow and handleCheckAll)

    // such as:
    // ...
    // setSelectedRows((prev) => {
    //    const newSelectData [...prev.filter((x) => x[fieldAsRowId] !== row[fieldAsRowId])];
    //    onSelectedRows?.(newSelectData)
    //    return newSelectData
    // });
    // ...
  }, [onSelectedRows, selectedRows]);

  // -------------------------------------------

  const [sortInfo, setSortInfo] = useState<ISortInfo>(sortDefault);

  const handleSortTable = useCallback(
    ({ field }: { field: string }) => {
      let sort: ISortInfo;
      if (field === sortInfo.field) {
        sort = {
          field: field,
          direction: sortInfo.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        sort = {
          field: field,
          direction: 'asc',
        };
      }
      setSortInfo(sort);
      onChangeSortBy(sort);
    },
    [sortInfo.field, sortInfo.direction]
  );

  useEffect(() => {
    setSelectedRows([]);
  }, [currentPageData]);

  useImperativeHandle(
    ref,
    () => ({
      fetch: () => fetch(),
      resetPageAndRefresh: () => resetCurrentPageAndRefresh(),
      changeFilterServer: onChangeFilterServer,
    }),
    []
  );

  return (
    <>
      {searchServerConfig && (
        <SearchServerSection
          config={searchServerConfig}
          onChangeFilterServer={onChangeFilterServer}
        />
      )}
      <Paper style={{ padding: '20px' }}>
        <TableLayoutDefault
          dispatch={dispatch}
          fieldAsRowId={fieldAsRowId}
          filterConfig={filterConfig}
          hasSelectionRows={hasSelectionRows}
          rows={currentPageData}
          columnsConfig={columnsConfig}
          handleSortTable={handleSortTable}
          sortInfo={sortInfo}
          selectedRows={selectedRows}
          handleCheckAll={handleCheckAll}
          handleCheckRow={handleCheckRow}
          selectedRowsMapping={selectedRowsMapping}
          tableState={tableState}
          onChangePageSize={onChangePageSize}
          onChangePage={onChangePage}
          onChangeFilterClient={onChangeFilterClient}
          onChangeFilterServer={onChangeFilterServer}
          totalCount={totalCount}
          onRowClick={onRowClick}
          allowMultipleSelect={allowMultipleSelect}
        />
      </Paper>
    </>
  );
};

const CommonTable = forwardRef(DataGridView) as <T extends IPlainObject>(
  props: ICommonTable<T> & { ref?: Ref<ImperativeHandleDto<T>> }
) => ReturnType<typeof DataGridView>;

export default CommonTable;
