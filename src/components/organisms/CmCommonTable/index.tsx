import { useCallback, useEffect, useMemo, useState } from 'react';

import TableLayoutDefault from './layout/TableLayoutDefault';
import { ICommonTable, IPlainObject, ISortInfo } from './types';

export type CommonTableRefType = {
  resetSelectedRows: () => void;
};
const CommonTable = <TRowDataType extends IPlainObject>({
  tableName,
  renderLayoutAs,
  fieldAsRowId,
  columnsConfig,
  rows,
  sortDefault,
  paginationConfig,
  renderPaginationAs,
  hasSelectionRows,
  onSelectedRows,
  onSortChange,
  filterConfig,
  onFilterTriggerQuery,
  showTopSelect,
  topActionConfig,
  excelBtnConfig,
  addBtnConfig,
  bottomActionsConfig,
  onRowClick,
}: ICommonTable<TRowDataType>) => {
  const [selectedRows, setSelectedRows] = useState<TRowDataType[]>([]);
  const [sortInfo, setSortInfo] = useState<ISortInfo>(sortDefault);

  const handleCheckRow = useCallback(({ row, checked }: { row: any; checked: boolean }) => {
    if (checked) {
      setSelectedRows((prev) => {
        const temp = [...prev];
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
          return [...rows];
        } else {
          return [];
        }
      });
    },
    [rows]
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

  const handleSortTable = useCallback(
    ({ field }: { field: string }) => {
      let temp: ISortInfo;
      if (field === sortInfo.field) {
        temp = {
          field: field,
          direction: sortInfo.direction === 'asc' ? 'desc' : 'asc',
        };
      } else {
        temp = {
          field: field,
          direction: 'asc',
        };
      }
      setSortInfo(temp);
      onSortChange(temp);
    },
    [onSortChange, sortInfo.field, sortInfo.direction]
  );

  const handleRowClick = useCallback(({ event, row }: { event: React.MouseEvent<unknown>; row: any }) => {
    typeof onRowClick === 'function' && onRowClick(event, row);
  }, []);

  const handleSelectedRows = useCallback(() => {
    typeof onSelectedRows === 'function' && onSelectedRows?.(selectedRows);
  }, [selectedRows]);

  useEffect(() => {
    handleSelectedRows();
  }, [selectedRows]);

  useEffect(() => {
    setSelectedRows([]);
  }, [rows]);

  const LayoutComponent = renderLayoutAs ? renderLayoutAs : TableLayoutDefault;

  return (
    <>
      <LayoutComponent
        fieldAsRowId={fieldAsRowId}
        showTopSelect={showTopSelect}
        topActionConfig={topActionConfig}
        excelBtnConfig={excelBtnConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={onFilterTriggerQuery}
        hasSelectionRows={hasSelectionRows}
        rows={rows}
        columnsConfig={columnsConfig}
        handleSortTable={handleSortTable}
        sortInfo={sortInfo}
        paginationConfig={paginationConfig}
        renderPaginationAs={renderPaginationAs}
        selectedRows={selectedRows}
        handleCheckAll={handleCheckAll}
        handleCheckRow={handleCheckRow}
        handleRowClick={handleRowClick}
        selectedRowsMapping={selectedRowsMapping}
        bottomActionsConfig={bottomActionsConfig}
      />
    </>
  );
};

export default CommonTable as typeof CommonTable;
