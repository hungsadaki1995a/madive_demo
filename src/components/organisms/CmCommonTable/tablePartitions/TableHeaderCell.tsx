import { TableCell, TableSortLabel } from '@mui/material';
import React from 'react';
import { useCallback } from 'react';
import { ICommonTableColumn, IPlainObject, ISortInfo } from '../types';

interface ITableHeaderCellProps<TRowDataType extends IPlainObject> {
  sortInfo: ISortInfo;
  column: ICommonTableColumn<TRowDataType>;
  onSortClick: ({ field }: { field: string }) => void;
}
const TableHeaderCell = <TRowDataType extends IPlainObject>({
  sortInfo,
  column,
  onSortClick,
}: ITableHeaderCellProps<TRowDataType>) => {
  const handleClick = useCallback(() => {
    onSortClick({ field: column.field });
  }, [onSortClick, column]);

  return (
    <TableCell>
      {column.sortable ? (
        <TableSortLabel
          active={sortInfo.field === column.field}
          direction={sortInfo.field === column.field ? sortInfo.direction : 'asc'}
          onClick={handleClick}
        >
          {column.label}
        </TableSortLabel>
      ) : (
        column.label
      )}
    </TableCell>
  );
};

export default React.memo(TableHeaderCell) as typeof TableHeaderCell;
