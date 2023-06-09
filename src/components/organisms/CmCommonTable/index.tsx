import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import useTable from './hooks/useTable';
import TableLayoutDefault from './layout/TableLayoutDefault';
import { ICommonTable, ImperativeHandleDto, IPlainObject, ISortInfo } from './types';

export type CommonTableRefType = {
  resetSelectedRows: () => void;
};
const DataGridView = <TRowDataType extends IPlainObject>(
  {
    renderLayoutAs,
    fieldAsRowId,
    columnsConfig,
    sortDefault,
    renderPaginationAs,
    hasSelectionRows,
    allowMultipleSelect = true,
    onSelectedRows,
    onSortChange,
    filterConfig,
    onFilterTriggerQuery,
    showTopSelect,
    topActionConfig,
    addBtnConfig,
    bottomActionsConfig,
    query,
    rows,
    onRowClick,
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
    [onSortChange, sortInfo.field, sortInfo.direction]
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

  const LayoutComponent = renderLayoutAs ? renderLayoutAs : TableLayoutDefault;

  return (
    <>
      <LayoutComponent
        dispatch={dispatch}
        fieldAsRowId={fieldAsRowId}
        showTopSelect={showTopSelect}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={onFilterTriggerQuery}
        hasSelectionRows={hasSelectionRows}
        rows={currentPageData}
        columnsConfig={columnsConfig}
        handleSortTable={handleSortTable}
        sortInfo={sortInfo}
        renderPaginationAs={renderPaginationAs}
        selectedRows={selectedRows}
        handleCheckAll={handleCheckAll}
        handleCheckRow={handleCheckRow}
        selectedRowsMapping={selectedRowsMapping}
        bottomActionsConfig={bottomActionsConfig}
        tableState={tableState}
        onChangePageSize={onChangePageSize}
        onChangePage={onChangePage}
        onChangeFilterClient={onChangeFilterClient}
        onChangeFilterServer={onChangeFilterServer}
        totalCount={totalCount}
        onRowClick={onRowClick}
        allowMultipleSelect={allowMultipleSelect}
      />
    </>
  );
};

const CommonTable = forwardRef(DataGridView) as <T extends IPlainObject>(
  props: ICommonTable<T> & { ref?: Ref<ImperativeHandleDto<T>> }
) => ReturnType<typeof DataGridView>;

export default CommonTable;
